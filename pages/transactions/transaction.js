import { header } from "../../modules/ui";
import { postData } from "../../modules/http";
import { getData } from "../../modules/http";

let button = document.querySelector('.button_add_transaction')

let box = document.querySelector('.box_add_transaction')

let table = document.querySelector('table')

let cards_box = document.querySelector('.cards_box1')

let choose_card = document.querySelector('.choose_card')


let c = 0

button.onclick = () => {

    c += 1

    

    if(c%2 !== 0) {

        button.textContent = 'Отмена'
        table.style.opacity = '0'
        table.style.zIndex = '-1'
        cards_box.style.display = 'block'
        cards_box.style.display = 'grid'
        cards_box.style.gridtemplateColumns = 'repeat(3, 1fr)'
        choose_card.style.display = 'block'
    
    
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
    
                
                card.style.cursor = 'pointer'
                card.style.transition = '0.5s'
    
                card.addEventListener('mouseover', () => {
    
                    card.style.boxShadow = '1px 5px 10px 5px'
                })
                card.addEventListener('mouseleave', () => {
    
                    card.style.boxShadow = 'none'
                })
    
                card.onclick = () => {
    
                    for (let j = 0; j < card.children.length; j++) {
    
                        localStorage.setItem('card_name', card.children[0].textContent)
                    }
    
                    cards_box.style.display = 'none'
    
                    table.style.opacity = '1'
                    table.style.zIndex = '2'
                    choose_card.style.display = 'none'
    
                    let card_name = document.querySelector('.card_name1')
    
                    card_name.textContent = localStorage.getItem('card_name')
    
                    start(2)
                }
    
            }
    
        })

    }
    else {

        table.style.opacity = '1'
        table.style.zIndex = '1'
        cards_box.style.display = 'none'
        choose_card.style.display = 'none'
        button.textContent = 'Добавить транзакцию'

        start(1)

    }
   
    


    
}

let form_add_transaction = document.querySelector('.form_add_transaction')

function start(m) {

    m += 1
    
    if(m%2 !== 0) {
    
        box.classList.remove('transaction_animation2')
        box.classList.add('transaction_animation')
    }
    else {
    
        box.classList.remove('transaction_animation')
        box.classList.add('transaction_animation2')
    
    }

}

const now = new Date();

const hours = now.getHours();
const minutes = now.getMinutes();

const formattedHours = hours < 10 ? '0' + hours : hours;
const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

let currentTime = `${formattedHours}:${formattedMinutes}`;

form_add_transaction.onsubmit = (e) => {

    e.preventDefault()

    let transaction_obj = {

        id : localStorage.getItem('id'),
        card_name : localStorage.getItem('card_name'),
        time : currentTime
    }

    let fm = new FormData(form_add_transaction)

    fm.forEach((value, key) => {

        if(value.trim() !== '') {
            
            transaction_obj[key] = value
            
            check_transaction_form()

        }
        else {

            alert('fill inputs')
        }

    })

    function check_transaction_form() {

        console.log(transaction_obj);

        if (/^\d+$/.test(transaction_obj.amount)) {

            postData('transactions', transaction_obj)
            .then (res => add_transaction())
            .catch(err => console.log(err))

            for(let i = 0; i < 2; i ++) {

                form_add_transaction.children[i].value = ''
                start(1)

                button.textContent = 'Добавть транзакцию'

            }

        }
        

    }

}


let table1 = document.querySelector('table')

table1 = table.children[1]



add_transaction()

function add_transaction() {

    getData('transactions?id=' + localStorage.getItem('id'))
        .then(res => {

            let arr = []
            
            arr.push(...res)

            let arr1 = Object.keys(arr[0])

            let arr2 = []

            arr2.push(arr1[0], arr1[1], arr1[3], arr1[4], arr1[2])

            for (let i = 0 ; i < arr.length; i++) {

                let tr = document.createElement('tr')

                for(let j = 0; j < 5; j++) {

                    let td = document.createElement('td')

                    tr.append(td)
                }

                table1.append(tr)

            }

            let trs = table1.children

            for(let i = 0; i < table1.children.length; i++) {

                for (let j = 0; j < trs[i].children.length; j++) {

                    let tds = trs[i].children[j]

                    tds.innerHTML = arr[i][arr2[j]]

                }
            }
        })
        .catch(err => console.log(err))
}
