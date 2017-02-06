import request from '../utils/request';

import { httpUrl } from '../tests/testHttpUrl';

let URL = httpUrl();

export function fetchWXPay(params) {
  return request(`${URL}/user/support/vote.do`,{
    method: 'post',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`recordId=${params.recordId}&voteCount=${params.voteCount}&openId=${params.openId}`,
    mode:"cors",
  });
}

export function fetchWxOauth(code){//微信登陆
  return request(`${URL}/oauth/wx_oauth.do`,{
    method: 'post',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`code=${code}`,
    mode:"cors",
  });
}

export function fetchWXToken(params){//获取微信sdk签名
  return request(`${URL}/oauth/get_wx_token.do`,{
    method: 'post',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`url=${params.url}`,
    mode:"cors",
  });
}