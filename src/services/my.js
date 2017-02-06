import request from '../utils/request';
import { httpUrl } from '../tests/testHttpUrl';

let URL = httpUrl();

// 
export function fetchApplicationList(params) { //我的申请
    return request(`${URL}/user/performer/apply_role_list.do`, {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `queryContent=${JSON.stringify(params)}`,
        mode: "cors",
    });
}

// user/performer/modify_apply.do

export function fetchModifyApply(params) { //我的申请
    return request(`${URL}/user/performer/modify_apply.do`, {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `photos=${JSON.stringify(params.photos)}&move=${JSON.stringify(params.move)}&id=${params.id}`,
        mode: "cors",
    });
}

export function fetchCanvassingList(params) { //我的拉票
    return request(`${URL}/user/canvassing_list.do`, {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `queryContent=${JSON.stringify(params)}`,
        mode: "cors",
    });
}

// URL: http://localhost:8080/iwantfame/user/canvassing.do

export function shareCanvassingId(params) { //分享id
    return request(`${URL}/user/canvassing.do`, {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `recordId=${params.recordId}`,
        mode: "cors",
    });
}


export function fetchRelease(params) { //我的发布
    return request(`${URL}/user/director/get_group_list.do`, {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `queryContent=${JSON.stringify(params)}`,
        mode: "cors",
    });
}


export function fetchMessageList(params) { //我的消息

    return request(`${URL}/user/message_list.do`, {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `queryContent=${JSON.stringify(params)}`,
        mode: "cors",
    });
}

export function fetchCheckMessageDetail(params) { //查看消息详情
    return request(`${URL}/user/message_read.do`, {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `messageId=${params.messageId}`,
        mode: "cors",
    });
}


export function fetchCollectList(params) { //我的收藏
    let URL = httpUrl();
    return request(`${URL}/user/collect_list.do`, {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `queryContent=${JSON.stringify(params)}`,
        mode: "cors",
    });
}


export function setBaseInfo(params) { //设置演员的两个视频
    return request(`${URL}/user/performer/set_movies.do`, {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `trailersUrl=${params.trailersUrl}&introduceMyselfMoveUrl=${params.introduceMyselfMoveUrl}`,
        mode: "cors",
    });
}

export function refereshToken(params) { //刷新token
    return request(`${URL}/oauth/referesh_token.do`, {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `refereshToken=${params.refereshToken}`,
        mode: "cors",
    });
}