import { 
	fetchCanvassingList,
	refereshToken 
} from '../../services/my';
import { relanding } from '../../utils/relanding';

export default {

	namespace:'canvassing',

	state:{
		resultObject:[],
	},

	subscriptions: {
    	setup({dispatch}) {
	       dispatch({
	       		type: 'fetchCanvassingList',
	       		payload:{'pageNo':0,'pageSize':10}
			})
    	}
  	},

	effects:{
		 *fetchCanvassingList({ 
		 	payload 
		  }, { call, put }) {
		   	const resultData = yield call( fetchCanvassingList,payload);
		   	console.log(resultData);
		   	if (resultData.data){
		   		if(resultData.data.success) {
			   		yield put({
			   			type:'queryListSuccess',
			   			payload:{...resultData.data}
			   		});

			   	}else{
		   			if (resultData.data.code === -10) {
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
				...action.payload,
			}
		},

	},

}