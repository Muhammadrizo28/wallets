import { header } from "../../modules/ui";
import { getData } from "../../modules/http";

let email_txt = document.querySelector('.email_txt')

let cards_box = document.getElementById('cards_box')




getData('wallets?id=' + localStorage.getItem('id'))
    .then(res => {


        for (let i = 0; i < res.length - (res.length - 3); i++) {  //error

            console.log(i);

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

            balance.textContent = res[i].balance
            card_number.textContent = res[i].number
            name.textContent = res[i].name.toUpperCase()
            currency.textContent = 'RUB'
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

                if (but_inf[i].name == 'clicked') {


                    but_inf[i].parentElement.classList.remove('turn')
                    but_inf[i].parentElement.classList.add('turn2')


                    but_inf[i].name = ''

                }
                else {

                    but_inf[i].parentElement.classList.remove('turn2')
                    but_inf[i].parentElement.classList.add('turn')

                    but_inf[i].name = 'clicked'

                }

                setTimeout(() => {

                    but_inf[i].parentElement.children[0].classList.toggle('notshow')
                    but_inf[i].parentElement.children[1].classList.toggle('change')
                    but_inf[i].parentElement.children[2].classList.toggle('cordinate')
                    but_inf[i].parentElement.children[3].classList.toggle('show')
                    but_inf[i].parentElement.children[4].classList.toggle('show')
                    but_inf[i].parentElement.children[5].classList.toggle('show')
                    but_inf[i].parentElement.children[6].classList.toggle('show')
                    but_inf[i].parentElement.children[7].classList.toggle('change2')


                }, 300)


            }
        }

    })


let table = document.querySelector('table')

table = table.children[1]



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

                table.append(tr)

            }

            let trs = table.children

            for(let i = 0; i < table.children.length; i++) {

                for (let j = 0; j < trs[i].children.length; j++) {

                    let tds = trs[i].children[j]

                    tds.innerHTML = arr[i][arr2[j]]

                }
            }
        })
        .catch(err => console.log(err))
}









