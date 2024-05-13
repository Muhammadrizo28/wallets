import { getData, postData} from "../wallets/modules/http"

let form = document.querySelector('form')
let signIn = document.querySelector('.sign_in')

form.onsubmit = (e) => {

    e.preventDefault()

    let obj = {
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {

        if(value.trim() !== '') {

            obj[key] = value
            console.log(obj);

            if(Object.keys(obj).length == 4) {

                getData('users?email=' + fm.get("email"))
                .then(res => {

                    if(res.length > 0) {
                        
                        alert('User already exists')
                    }
                    else {

                        console.log(res);
                        postData('users', obj)
                          .then(res => {

                            console.log(res);
                            localStorage.setItem('alert', 'true')
                            window.location.replace('/pages/signIn/signIn.html')
                        })

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

signIn.onclick = () => {

    window.location.replace('/pages/signIn/signIn.html')

}

