import { 
	fetchCollectList,
	refereshToken
} from '../../services/my';
import { relanding } from '../../utils/relanding';

export default {

	namespace:'collection',

	state:{
		resultObject:[],
	},

	subscriptions: {
    	setup({dispatch}) {
	        dispatch({
	       		type: 'collectList',
	       		payload:{
	       			'type':2,
	       			'pageNo':0,
	       			'pageSize':10
	       		}
	        })
    	}
  	},

	effects:{
		 *collectList({ 
		 	payload 
		  }, { call, put }) {
		   	const data = yield call( fetchCollectList,payload);
		   	if (data.data){
		   		if(data.data.success) {
			   		yield put({
			   			type:'queryListSuccess',
			   			payload:{
			   				resultObject:data.data.resultObject
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