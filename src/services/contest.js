import request from '../utils/request';
import { httpUrl } from '../tests/testHttpUrl';

var URL = httpUrl();

export function fetchContestRoleList(params) {
  return request(`${URL}/hot/performers.do`,{
    method: 'post',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`queryContent=${JSON.stringify(params)}`,
    mode:"cors",
  });
}

// 
export function fetchRoleList(params) {
  return request(`${URL}/role/list.do`,{
    method: 'post',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`queryContent=${JSON.stringify(params)}`,
    mode:"cors",
  });
}