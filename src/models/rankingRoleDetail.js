import { fetchHotRoleList,fetchThumbUp } from '../services/ranking';
import { relanding } from '../utils/relanding';
import pathToRegexp from 'path-to-regexp';

export default {

	namespace:'rankingRoleDetail',

	state:{
		resultObject:[],
		success:false,
	},

	subscriptions: {
		setup({dispatch,history}) {
    		history.listen(({pathname}) => {
    			const match = pathToRegexp('/hotRole/hotRoleItem/:hotRoleItemId').exec(pathname);
    			let userId = '';
    			if (match) {
		         	userId = match[1]; 

		         	dispatch({type: 'fetchHotRoleList',payload:{'movieRoleId':userId,'pageNo':0,'pageSize':10}});
		        }
		     });
		},
  	},

	effects:{
		 *fetchHotRoleList({ 
		 	payload 
		  }, { call, put }) {
		   	const req = yield call( fetchHotRoleList,payload);
		   	if (req.data && req.data.success) {
		   		yield put({type:'queryListSuccess',payload:{...req.data}});
		   	}
	    },
	    *thumbUp({ 
		 	payload 
		  }, { call, put }) {
		   	const req = yield call( fetchThumbUp,payload);
		   	if (req.data){
			   	if(req.data.success) {
			   			
			   	}else{
			   		console.log(req.data);
			   		if (req.data.code === -10) {
			   			alert(req.data.message + ', 请重试');
                        relanding();
			   		}
			   		if (req.data.code === -1) {
			   			alert(req.data.message);
			   		}
			   	}
			}
	    }, 

	},

	reducers:{
		queryListSuccess(state,action){
			action.payload.resultObject = state.resultObject.concat(action.payload.resultObject);
			return{
				...state,
				...action.payload
			}
		},

	},
}