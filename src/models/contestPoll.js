import { fetchContestRoleList,fetchRoleList } from '../services/contest';
import pathToRegexp from 'path-to-regexp';

export default {

	namespace:'contestPoll',

	state:{
		resultObject:[],
		allContestData:[],
		contestRoleData:[],
		roleData:[],
		allNextPage:false,
		roldNextPage:false,
	},

	subscriptions: {
		setup({dispatch,history}) {
    		history.listen(({pathname}) => {
    			const match = pathToRegexp('/roleList/contestPoll/:groupId').exec(pathname);
    			let groundId = '';
    			if (match) {
		         	groundId = match[1]; 
		         	var theaterGroupId = groundId.replace(/[^0-9]/ig,""); 
	       			dispatch({ type: 'fetchContestRoleList',payload:{'theaterGroupId':theaterGroupId,"movieRoleId":null, 'pageNo':0,'pageSize':10}})
		        }
		     });
		},
  	},

	effects:{
		 *fetchContestRoleList({ 
		 	payload 
		  }, { call, put }) {
		   	const reqData = yield call( fetchContestRoleList,payload);
		   	if (reqData.data && reqData.data.success) {
		   		yield put({type:'queryListSuccess',payload:{
		   			allContestData:reqData.data.resultObject,
		   			allNextPage:reqData.data.nextPage,
		   		}});
		   	}
	    },

	    *fetchRoleList({ 
		 	payload 
		  }, { call, put }) {
		   	const reqData = yield call( fetchRoleList,payload);
		   	if (reqData.data && reqData.data.success) {
		   		yield put({
		   			type:'queryRoleListSuccess',
		   			payload:{
		   				roleData:reqData.data.resultObject,
		   			}
		   		});
		   		const contestReq = JSON.stringify( yield call(
		   			fetchContestRoleList,{ 
			   			"theaterGroupId":null, 
			   			"movieRoleId":reqData.data.resultObject[0].movieRoleAtom.id , 
			   			"pageNo":0, 
			   			"pageSize":100 
		   			}
		   		));
		   		const contestData = JSON.parse(contestReq);
		   		if (contestData.data && contestData.data.success) {
			   		yield put({
			   			type:'queryContestRoleListSuccess',
			   			payload:{
			   				contestRoleData:contestData.data.resultObject,
			   			}
			   		});
			   	}
		   	}
	    },

	},

	reducers:{
		loading(state,action){
			return{

			}
		},
		queryListSuccess(state,action){
			action.payload.allContestData = state.allContestData.concat(action.payload.allContestData);
			return{
				...state,
				allContestData:action.payload.allContestData,
				allNextPage:action.payload.allNextPage,
			}
		},
		queryRoleListSuccess(state,action){
			return{
				...state,
				roleData:action.payload.roleData,
			}
		},
		queryContestRoleListSuccess(state,action){
			return{
				...state,
				contestRoleData:action.payload.contestRoleData,
			}
		},

	},

}