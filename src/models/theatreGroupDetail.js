import pathToRegexp from 'path-to-regexp';
import { 
	fetchDetailItems,
	fetchRoleInfo,
	fetchCollection
} from '../services/theatreGroup';

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
		        	}
		        dispatch({ type: 'queryWXJSSDK', payload:{url:window.location.href.split('#')[0] }});
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