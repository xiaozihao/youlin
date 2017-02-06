import pathToRegexp from 'path-to-regexp';
import { 
	fetchDetailItems,
	fetchRoleInfo,
	fetchCollection
} from '../services/theatreGroup';
import {  shareCanvassingId } from '../services/my';

import { relanding } from '../utils/relanding';
import { fetchWXToken } from '../services/wxpay';
import { wxshare } from '../utils/wxshare'; 

import { message } from 'antd';

export default {

	namespace:'theatreGroupDetail',

	state:{
		crewInfo:[],
		roleInfo:[],
		isCollection:false,
		nextPage:false,
		isFirstRender:true,
	},

	subscriptions: {
    	setup({dispatch,history}) {
    		history.listen(({pathname}) => {
    			const match = pathToRegexp('/theatreGroupDetail/:theatreGroupDetailId').exec(pathname);
    			let userId = '';
	    			if (match) {
			         	userId = match[1];  
			         	dispatch({ type:'roleInfo',payload:{groupId:userId,ids:[],pageNo:0,pageSize:10} });
			         	dispatch({ type: 'theatreGroupInfo', payload:{id:userId} });
			         	dispatch({ type: 'shareCanvassingId', payload:{recordId:userId}});
		        	}
		        //dispatch({ type: 'queryWXJSSDK', payload:{url:window.location.href.split('#')[0] }});
		     });
		},
  	},

	effects:{
		*queryWXJSSDK({ 
		 	payload 
		  }, { call, put ,select}) {
		  	const reqData = yield call(fetchWXToken,payload);
			   	if (reqData.data && reqData.data.success) {
					const data = reqData.data.resultObject;
					wxshare(data,null);
			}
	    }, 

	    *shareCanvassingId({ 
		 	payload 
		  }, { call, put ,select}) {
		   	const resultData = yield call( shareCanvassingId,payload);
		   	console.log('shareCanvassingId');
		   	if (resultData.data){
			   if(resultData.data.success) {

				   	const recodeId = resultData.data.resultObject.id;
					   
					yield put({type:'canvassingId',payload:{canvassingId:recodeId}});
			   		const wxdata = yield call(fetchWXToken,payload={url:window.location.href});

					const url = window.location.href+`&canvassingId=${recodeId}`;
					console.log(url);
					   
					if (wxdata.data && wxdata.data.success) {
						const data = wxdata.data.resultObject;
						 wx.config({
								debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
								appId: data.appId, // 必填，公众号的唯一标识
								timestamp: data.timestamp, // 必填，生成签名的时间戳
								nonceStr:data.nonceStr, // 必填，生成签名的随机串
								signature:data.signature,// 必填，签名，见附录1
								jsApiList: [
									'onMenuShareTimeline',
									'onMenuShareAppMessage',
								] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							});

							wx.ready(function(){
								// alert('请求成功');
								wx.onMenuShareTimeline({
									title: document.title, // 分享标题
									link: url, // 分享链接
									imgUrl: '', // 分享图标
									success: function () { 
										console.log('success'); 
										// 用户确认分享后执行的回调函数
									},
									cancel: function () { 
										console.log('error');
										// 用户取消分享后执行的回调函数
									}
								});
								// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
							});

							wx.ready(function(){
								wx.onMenuShareAppMessage({
									title: document.title, // 分享标题
									desc: '我要成名，赶紧为我投票吧！', // 分享描述
									link: url, // 分享链接
									imgUrl: '', // 分享图标
									type: '', // 分享类型,music、video或link，不填默认为link
									dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
									success: function () {
										console.log('success'); 
										alert('url:' + url);
									// 用户确认分享后执行的回调函数
									},
									cancel: function () { 
										console.log('error');
									// 用户取消分享后执行的回调函数
									}
								});
							})

							wx.error(function(res){
								// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
							});
						}
					
					}
			}else{
				if(resultData.data.code === -10){
					relanding();
				}
			}
				
				
			},


		 *theatreGroupInfo({ 
		 	payload 
		  }, { call, put }) {
		  	const reqData = yield call(fetchDetailItems,payload);
			   	if (reqData.data && reqData.data.success) {
			   		yield put({type:'querySuccess',payload:{crewInfo:reqData.data.resultObject}
			   	});
			}
	    }, 

	    *roleInfo({ 
		 	payload 
		  }, { call, put,select }) {
		  	const reqData = yield call(fetchRoleInfo,payload);
		   	if (reqData.data && reqData.data.success) {
		   		yield put({type:'reqRoleInfoSuccess', payload:{roleInfo:reqData.data.resultObject} });
		   	}
	    },

	    *collection({ 
		 	payload 
		  }, { call, put }) {
		  	const reqData = yield call(fetchCollection,payload);
		   	if (reqData.data && reqData.data.success) {
		   		message.success('收藏'+reqData.data.message);
		   		yield put({ type:'collectionSuccess',payload:{ isCollection:reqData.data.success} });
		   	}else{
		   		if (reqData.data.code === -10) {
		   			alert(requestData.data.message + ', 请重试');
                    relanding();
		   		}
		   		if (reqData.data.code === -1) {
		   			message.error(reqData.data.message);
		   		}
		   	}
	    },
	},

	reducers:{
		querySuccess(state,action){
			return{...state,
				crewInfo:action.payload.crewInfo,
			}
		},
		reqRoleInfoSuccess(state,action){
			// const data = state.roleInfo.concat(action.payload.roleInfo);
			return{...state,
				roleInfo:action.payload.roleInfo,
				nextPage:action.payload.nextPage,
			}
		},
		collectionSuccess(state,action){
			return{...state,
				isCollection:action.payload.isCollection,
			}
		},
	},

}