import request from '../utils/request';
import { httpUrl } from '../tests/testHttpUrl';

let URL = httpUrl();

export function fetchPerformerList(params) {
  return request(`${URL}/performer/list.do`,{
    method: 'post',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`queryContent=${JSON.stringify(params)}`,
    mode:"cors",
  });
}

export function fetchPerformerDetailList(params) {
  return request(`${URL}/performer/show.do`,{
    method: 'post',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`id=${params.id}`,
    mode:"cors",
  });
}

export function fetchBanner(params) {
  return request(`${URL}/banner/get_list.do`,{
    method: 'post',
    headers: {
       "Content-Type": "application/x-www-form-urlencoded",
    },
    body:`queryContent=${JSON.stringify(params)}`,
    mode:"cors",
  });
}