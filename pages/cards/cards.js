import { header } from "../../modules/ui";
import { getData } from "../../modules/http";
import { postData } from "../../modules/http";


let email_txt = document.querySelector('.email_txt')

let cards_box = document.querySelector('.cards_box2')

addind_card()
function addind_card() {

    getData('wallets?id=' + localStorage.getItem('id'))
    .then (res => {

        cards_box.innerHTML = ''
    
        for(let i = 0; i < res.length; i++) {
    
            let card = document.createElement('div')
    
            let button_inf = document.createElement('div')
    
            let name = document.createElement('p')
    
            let currency = document.createElement('p')
    
            let user_name = document.createElement('p')
    
            let user_surname = document.createElement('p')
    
            let card_number = document.createElement('p')
    
            let balance = document.createElement('p')
    
            let rub = document.createElement('span')
    
            card.classList.add('card')
            button_inf.classList.add('but_inf')
            name.classList.add('card_name')
            currency.classList.add('currency')
            user_name.classList.add('user_name')
            user_surname.classList.add('user_surname')
            card_number.classList.add('card_number')
            balance.classList.add('balance')
            rub.classList.add('rub')
    
            name.textContent = res[i].name.toUpperCase()
            currency.textContent = 'RUB'
            balance.textContent = res[i].balance
            card_number.textContent = res[i].number
            user_name.textContent = res[i].holder_name.toUpperCase()
            user_surname.textContent = res[i].holder_surname.toUpperCase()
            rub.textContent = 'RUB'
    
    
            card.append(name, currency, button_inf, user_name, user_surname, card_number, balance, rub)
    
            cards_box.append(card)
            
            
        }
        for (let i = 0; i < cards_box.children.length; i++) {
        
            cards_box.children[i].onmouseover = () => {
        
                cards_box.children[i].children[2].style.opacity = '1'
            }
            cards_box.children[i].onmouseleave = () => {
        
                cards_box.children[i].children[2].style.opacity = '0'
            }
        }
    
        let but_inf = document.querySelectorAll('.but_inf')
    
    
        for (let i = 0; i < but_inf.length; i++) {
    
            but_inf[i].onclick = () => {
    
                if(but_inf[i].name == 'clicked') {
    
                    
                    but_inf[i].parentElement.classList.remove('turn')
                    but_inf[i].parentElement.classList.add('turn2')
                    
                    
                    but_inf[i].name = ''
                    
                }
                else {
                    
                    but_inf[i].parentElement.classList.remove('turn2')
                    but_inf[i].parentElement.classList.add('turn')
                    
                    but_inf[i].name = 'clicked'
                    
                }
    
                setTimeout (() => {
    
                    but_inf[i].parentElement.children[0].classList.toggle('notshow')
                    but_inf[i].parentElement.children[1].classList.toggle('change')
                    but_inf[i].parentElement.children[2].classList.toggle('cordinate')
                    but_inf[i].parentElement.children[3].classList.toggle('show')
                    but_inf[i].parentElement.children[4].classList.toggle('show')
                    but_inf[i].parentElement.children[5].classList.toggle('show')
                    but_inf[i].parentElement.children[6].classList.toggle('show')
                    but_inf[i].parentElement.children[7].classList.toggle('change2')
    
    
                },300)
       
        
            }
        }
    
    })

}




let add_card_box = document.querySelector('.add_card_box')

let button = document.querySelector('.add_card')

let n = 0

button.onclick = () => {

    n += 1

    console.log(n);

    if(n%2 == 1) {

        add_card_box.classList.add('move')
        add_card_box.classList.remove('move2')
        button.textContent = 'Отмена'

    }
    else {

        add_card_box.classList.add('move2')
        add_card_box.classList.remove('move')
        button.textContent = 'Добавить карту'


    }

}

let form_add_card = document.querySelector('.form_add_card')

form_add_card.onsubmit = (e) => {

    e.preventDefault();

    let new_card = {

        id : localStorage.getItem('id'),
        balance: 0,
        holder_name: localStorage.getItem('holder_name'),
        holder_surname: localStorage.getItem('holder_surname')
    };
    let fm = new FormData(form_add_card);

    fm.forEach((value, key) => {

        new_card[key] = value;

    });
    
    if (/^\d+$/.test(new_card.number)) {

        if(new_card.number.length == 12) {

            postData('wallets', new_card)
            .then(response => {
                console.log(response);
                addind_card()
                form_add_card.children[0].value = ''
                form_add_card.children[1].value = ''

                button.click()

            })
            .catch(error => {
                console.error(error);
            });
        
        }
        else {
            alert("Введите 12 цифр для поля");

        }
    } 
    else {
        alert("Введите только цифры для поля");
        
    }

};

