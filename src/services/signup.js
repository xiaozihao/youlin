import request from '../utils/request';
import { httpUrl } from '../tests/testHttpUrl';

let URL = httpUrl();

export function fetchSendSMS(params) {//发送短信
  return request(`${URL}/sms/send.do`,{
    method: 'post',
    headers: {
       "Content-Type":"application/x-www-form-urlencoded",
    },
    body:`telphone=${params.telphone}&type=1`,
    mode:'cors',
  });
}

// export function fetchFormat(params) {//发送短信
// 	return request(`${URL}/sms/check.do`,{
// 	    method: 'post',
// 	    headers: {
// 	       "Content-Type":"application/x-www-form-urlencoded",
// 	    },
// 	    body:`telphone=${params.telphone}&type=1&code=${params.code}`,
// 	    mode:'cors',
// 	});
// }

// export function fetchLogin(params) {//手机登录
// 	return request(`${URL}/oauth/login.do`,{
// 	    method: 'post',
// 	    credentials:'include',
// 	    headers: {
// 	       "Content-Type":"application/x-www-form-urlencoded",
// 	    },
// 	    body:`mobile=${params.mobile}&code=${params.code}`,
// 	    mode:'cors',
// 	 });
// }

export function fetchBindPhoneNumber(params) {//手机绑定
	return request(`${URL}/user/bind_mobile.do`,{
	    method: 'post',
	    credentials:'include',
	    headers: {
	       "Content-Type":"application/x-www-form-urlencoded",
	    },
	    body:`mobile=${params.mobile}&userType=${params.type}&code=${params.code}`,
	    mode:'cors',
	 });
}


