import { fetchSendSMS,fetchBindPhoneNumber,fetchLogin} from '../services/signup';
import { refereshToken } from '../services/my';

export default {

	namespace:'signup',

	state:{
		isSend:false,
		isbind:false,
		islogin:false,
	},

	subscriptions: {

  	},

	effects:{
		 *sendSMS({ 
		 	payload 
		  }, { call, put,select }) {
		   	const reqData = yield call( fetchSendSMS,payload);
		   	if (reqData.data && reqData.data.success) {
		   		yield put({type:'querySmsSuccess',payload:{isSend:reqData.data.resultObject}});
		   	}
	    },
	},

	reducers:{
		querySmsSuccess(state,action){
			return{
				...state,
				isSend:action.payload.isSend,
			}
		},
	},
}