import request from '../utils/request';
import { httpUrl } from '../tests/testHttpUrl';

let URL = httpUrl();

export function fetchList(params) {
    return request(`${URL}/role/list.do`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `queryContent=${JSON.stringify(params)}`,
        mode: "cors",
    });
}

export function fetchOtherComment(params) {
    return request(`${URL}/performer/comment_list.do`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `queryContent=${JSON.stringify(params)}`,
        mode: "cors",
    });
}

export function fetchSubmitComment(params) {
    return request(`${URL}/user/support/comment.do`, {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `content=${params.content}&toUserId=${params.toUserid}`,
        mode: "cors",
    });
}

export function fetchUpdatePhoto(params) {
    return request(`${URL}/upload/uploadimg.do`, {
        method: 'post',
        // headers: {
        //    "Content-Type": "multipart/form-data",
        // },
        body: params,
        // mode:"cors",
    });
}

export function fetchUpdateVideo(params) {
    return request(`${URL}/upload/uploadvideo.do`, {
        method: 'post',
        // headers: {
        //    "Content-Type": "application/x-www-form-urlencoded",
        // },
        body: params,
        // mode:"cors",
    });
}

export function fetchUpdateVideo2(params) {
    return request('http://file.api.weixin.qq.com/cgi-bin/media/upload?access_token=ACCESS_TOKEN&type=video', {
        method: 'post',
        // headers: {
        //    "Content-Type": "application/x-www-form-urlencoded",
        // },
        body: params,
        // mode:"cors",
    });
}

export function fetchAccessToken(params) {
    return request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx93bec9ce3a446c79&secret=217eb2ac16769d89d47194a5b197ad15', {
        method: 'get',
        //headers: {
        //   "Access-Control-Allow-Origin": "*",
        //},
        mode:"no-cors",
    });
}

export function fetchSignup(params) {
    return request(`${URL}/user/performer/apply_role.do`, {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `photos=${JSON.stringify(params.photos)}&move=${JSON.stringify(params.move)}&roleId=${params.roleId}&groupId=${params.groupId}`,
        mode: "cors",
    });
}