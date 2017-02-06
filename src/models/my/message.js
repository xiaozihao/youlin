import { 
	fetchMessageList,
	fetchCheckMessageDetail,
	refereshToken 
} from '../../services/my';

import { relanding } from '../../utils/relanding';

export default {

	namespace:'message',

	state:{
		resultObject:[],
	},

	subscriptions: {
    	setup({dispatch}) {
	       dispatch({
	       		type: 'fetchMessageList',
	       		payload:{
	       			'pageNo':0,
	       			'pageSize':10
	       	}})
    	}
  	},

	effects:{
		 *fetchMessageList({ 
		 	payload 
		  }, { call, put }) {
		   	const req = JSON.stringify( yield call( fetchMessageList,payload));
		   	const data = JSON.parse(req);
		   	console.log(data);
		   	if (data.data){
			   	if(data.data.success) {
			   		yield put({
			   			type:'queryListSuccess',
			   			payload:{
			   				resultObject:data.data
			   			}
			   		});
			   	}else{
			   		if (data.data.code === -10) {
			   			alert(requestData.data.message + ', 请重试');
                        relanding();
			   		}
			   	}
			}
	    },
	    *fetchCheckMessageDetail({ 
		 	payload 
		  }, { call, put }) {
		   	const req = JSON.stringify( yield call( fetchMessageList,payload));
		   	const data = JSON.parse(req);
		   	if (data.data && data.data.success) {
		   		yield put({
		   			type:'queryListSuccess',
		   			payload:{
		   				resultObject:data.data
		   			}
		   		});
		   	}
	    },
	},

	reducers:{
		queryListSuccess(state,action){
			return{
				...state,
				resultObject:action.payload.resultObject,
			}
		},

	},
}