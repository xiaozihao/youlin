import { fetchApplicationList  } from '../../services/my';
import { relanding } from '../../utils/relanding';

export default {

	namespace:'application',

	state:{
		dataList:{},
	},

	subscriptions: {
    	setup({dispatch,history}) {
		   dispatch({ type:'fetchList', payload:{ pageNo:0,pageSize:10 }} );
    	}
  	},

	effects:{
		 *fetchList({ 
		 	payload 
		  }, { call, put }) {
		   	const resultData = yield call( fetchApplicationList,payload);
		   	if (resultData.data)
		   		if(resultData.data.success) {
			   		yield put({type:'querySuccess',payload:{ dataList:resultData.data.resultObject }});
			   	}else{
			   		if (resultData.data.code === -10) {
				   		alert(requestData.data.message + ', 请重试');
                        relanding();
			   		}
			   	}
	    	},
	},

	reducers:{
		querySuccess(state,action){
			return{
				...state,
				dataList:action.payload.dataList,
			}
		},
	},
}