import request from '../utils/request';
import { httpUrl } from '../tests/testHttpUrl';

let URL = httpUrl();

export function fetchList(params) {
  return request(`${URL}/hot/roles.do`,{
    method: 'post',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`queryContent=${JSON.stringify(params)}`,
    mode:"cors",
  });
}

export function fetchHotRoleList(params) {
  return request(`${URL}/hot/performers.do`,{
    method: 'post',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`queryContent=${JSON.stringify(params)}`,
    mode:"cors",
  });
}

export function fetchThumbUp(params) {
  return request(`${URL}/user/support/thumb_up.do`,{
    method: 'post',
    credentials:'include',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`recordId=${params.recordId}`,
    mode:"cors",
  });
}
