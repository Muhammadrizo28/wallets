let header = document.querySelector('header')


header.innerHTML = `

<nav>

<span class="main">Главная</span>
<span class="wallets">Мои кошельки</span>
<span class="transactions">Мои транзакции</span>

</nav>

<span class="email_txt">email@gmail.com</span>

<svg class="exit_icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="M19.002 3h-14c-1.103 0-2 .897-2 2v4h2V5h14v14h-14v-4h-2v4c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.898-2-2-2z"></path><path d="m11 16 5-4-5-4v3.001H3v2h8z"></path></svg>

`;

let main_page = header.children[0].children[0]
let wallets_page = header.children[0].children[1]

main_page.onclick = () => {
    
    window.location.replace('/pages/main/main.html')
    localStorage.setItem('page', 'main')
}

wallets_page.onclick = () => {
    
    window.location.replace('/pages/cards/cards.html')
    localStorage.setItem('page', 'wallets')

}

header.children[1].textContent = localStorage.getItem('email')
header.children[0].children[2].onclick = () => {

    window.location.replace('/pages/transactions/transaction.html')
    localStorage.setItem('page', 'transactions')


}

let page_now = localStorage.getItem('page')

let active_page = document.querySelector(`.${page_now}`)

active_page.style.fontWeight = 900






let exit_icon = document.querySelector('.exit_icon')

exit_icon.onclick = () => {
    
    window.location.replace('/')
    
}


export {header}



function numbers() {

    let num = []

    for(let i = 0; i < 12; i++) {

        let number = Math.random() * 10

        num.push(number.toFixed(0))
    }

    return num
    
}

export {numbers}



