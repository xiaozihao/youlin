
import { fetchList } from '../services/theatreGroup';

export default {

	namespace:'search',

	state:{
		resultData:{},
		nextPage:false,
	},

	subscriptions: {
		setup({dispatch}) {
    	}
  	},

	effects:{
		 *search({ 
		 	payload 
		  }, { call, put,select }) {
		   	const reqData = yield call( fetchList,payload);
		   	console.log(reqData);
		   	if (reqData.data && reqData.data.success) {
		   		yield put({type:'querySearchSuccess',payload:{
		   			resultData:reqData.data.resultObject,
		   			nextPage:reqData.data.nextPage,
		   		}});
		   	}
	    },
	},

	reducers:{
		querySearchSuccess(state,action){
			action.payload.resultData = state.resultData.concat(action.payload.resultData);
			return{
				...state,
				resultData:action.payload.resultData,
				nextPage:action.payload.nextPage,
			}
		},
	},
}