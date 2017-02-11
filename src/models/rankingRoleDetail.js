import { fetchHotRoleList,fetchThumbUp } from '../services/ranking';
import { relanding } from '../utils/relanding';
import pathToRegexp from 'path-to-regexp';

export default {

	namespace:'rankingRoleDetail',

	state:{
		resultObject:[],
		thumbUpSuccess:false,
		nextPage:false,
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
		   		yield put({type:'queryListSuccess',payload:{
		   			resultObject:req.data.resultObject,
		   			nextPage:req.data.nextPage,
		   		}});
		   	}
	    },
	    *thumbUp({ 
		 	payload 
		  }, { call, put }) {
		   	const req = yield call( fetchThumbUp,payload);
		   	if (req.data){
			   	if(req.data.success) {
			   		yield put({type:'thumbUpSuccess',payload:{thumbUpSuccess:req.data.success}});
			   	}else{
			   		yield put({type:'thumbUpSuccess',payload:{thumbUpSuccess:false}});
			   		if (req.data.code === -10) {			   			
			   			alert(req.data.message + ', 请重试');
                        relanding();
    					window.location.href = '/#/signup';
			   		}else if (req.data.code === -1) {
			   			localStorage.removeItem('MY_USER_INFO');
    					window.location.href = '/#/signup';
			   		}else{
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
				resultObject:action.payload.resultObject,
				nextPage:action.payload.nextPage,
			}
		},
		thumbUpSuccess(state,action){
			return{
				...state,
				...action.payload,
			}
		},

	},
}