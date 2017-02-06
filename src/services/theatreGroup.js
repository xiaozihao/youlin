import request from '../utils/request';
import { httpUrl } from '../tests/testHttpUrl';

let URL = httpUrl();

export function fetchList(params) {

  return request(`${URL}/theatergroup/list.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`queryContent=${JSON.stringify(params)}`,
    mode:"cors",
  });
}

export function fetchDetailItems(params){
  return request(`${URL}/theatergroup/show.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`id=${params.id}`,
    mode:"cors",
  });
}

export function fetchRoleInfo(params) {
  return request(`${URL}/role/list.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`queryContent=${JSON.stringify(params)}`,
    mode:"cors",
  });
}

export function fetchCollection(params) {
  return request(`${URL}/user/collect.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`type=${params.type}&value=${params.id}`,
    mode:"cors",
  });
}

export function fetchTagList(params) {
  return request(`${URL}/tag/list.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`queryContent=${JSON.stringify(params)}`,
    mode:"cors",
  });
}
