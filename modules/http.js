import axios from "axios";

let url = 'http://localhost:3001/'

async function getData(path) {

    try {

        let res = await axios.get(url + path)
        let way = url + path

        console.log(way);
        
        return res.data
    }
    catch {err => console.log(err);}
}


async function postData(path, body) {
    try {
        let res = await axios.post(url + path, body)
        return res
    } catch (err) {
        console.log(err);
    }
}







export {getData, postData}