import { refereshToken } from '../services/my';

export function relanding() {

    const userinfo = JSON.parse(localStorage.getItem('MY_USER_INFO'));

    let parmas = {};
    parmas.refereshToken = userinfo.refreshToken

    refereshToken(parmas).then((value) => {
        if (value.data && value.data.success) {
            document.cookie = 'JSESSIONID=' + value.data.resultObject.accessToken;
            localStorage.setItem('MY_USER_INFO', JSON.stringify(value.data.resultObject));
        }
    }), (error) => {

    }
}