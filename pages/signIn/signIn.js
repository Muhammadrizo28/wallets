import { getData } from "../../modules/http.js"

let form = document.querySelector('form')
let sign_up= document.querySelector('.sign_up')

form.onsubmit = (e) => {

    e.preventDefault()

    let obj = {}

    let fm = new FormData(form)

    fm.forEach((value, key) => {

        if(value.trim() !== '') {

            obj[key] = value

            if(Object.keys(obj).length > 1) {

                getData('users?email=' + fm.get("email"))
                .then(res => {

                    if(res.length > 0 && res[0].password == fm.get("password")) {
                        
                        localStorage.setItem('id', res[0].id)
                        localStorage.setItem('holder_name', res[0].name)
                        localStorage.setItem('holder_surname', res[0].surname)
                        localStorage.setItem('email', res[0].email)

                        window.location.replace('/pages/main/main.html')
                        
                        
                    }
                    else {

                        alert('No such user')
                      

                    }
                })


            }
            else {
                console.log('empty');
            }

        }


    })

    for(let i = 0; i < form.children.length; i++) {

        form.children[i].value = ''
    }

    
}

if(localStorage.getItem('alert') == 'true') {

    console.log('cool');

    localStorage.setItem('alert', 'false') 

    let alert_box = document.querySelector('.alert')

    alert_box.classList.add('animation')

    setTimeout(() => {

        alert_box.classList.remove('animation')

    }, 5000)
}

sign_up.onclick = () => {

    window.location.replace('/')

}

