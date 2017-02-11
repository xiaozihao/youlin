// 
const evn = false;

let URL = '';

export function httpUrl() {
    if (evn) {
        URL = 'http://localhost:8080/iwantfame';
    } else {
        URL = 'http://iwantfame.91youlin.com/api';
    }
    return URL;
}