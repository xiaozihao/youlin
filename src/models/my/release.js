import { fetchRelease } from '../../services/my';
import { relanding } from '../../utils/relanding';

export default {

	namespace:'release',

	state:{
		releaseData:[],
		nextPage:false,
	},

	subscriptions: {
    	setup({dispatch}) {
	       dispatch({
	       		type: 'fetchRelease',
	       		payload:{'pageNo':0,'pageSize':100}
			})
    	}
  	},

	effects:{
		 *fetchRelease({ 
		 	payload 
		  }, { call, put }) {
		   	const resultData = yield call( fetchRelease,payload);
		   	if (resultData.data){
		   		if(resultData.data.success) {
			   		yield put({
			   			type:'queryListSuccess',
			   			payload:{
			   				releaseData:resultData.data.resultObject,
			   				nextPage:resultData.data.nextPage,
			   			}
			   		});
			   	}
		   	}else{
		   		if (resultData.data.code === -10) {
			   		alert(requestData.data.message + ', 请重试');
                    relanding();
			   	}
		   	}
	    },

	},

	reducers:{
		queryListSuccess(state,action){
			action.payload.releaseData = state.releaseData.concat(action.payload.releaseData);
			return{
				...state,
				releaseData:action.payload.releaseData,
				nextPage:action.payload.nextPage,
			}
		},

	},

}