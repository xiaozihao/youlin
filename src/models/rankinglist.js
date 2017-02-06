import { fetchList,fetchHotRoleList } from '../services/ranking';

export default {

	namespace:'rankinglist',

	state:{
		hotestRoleData:[],
		allRoleData:[],
		hotestRoldNextPage:false,
		allHotNextPage:false,
	},

	subscriptions: {
    	setup({dispatch}) {
	       dispatch({type: 'fetchHotestList',payload:{pageNo:0,pageSize:10}})
    	}
  	},

	effects:{
		 *fetchHotestList({ 
		 	payload 
		  }, { call, put }) {
		   	const reqData = yield call( fetchList,payload);
		   	if (reqData.data && reqData.data.success) {
		   		yield put({type:'queryHotestRoleListSuccess',payload:{
		   			hotestRoleData:reqData.data.resultObject,
		   			hotestRoldNextPage:reqData.data.nextPage,
		   		}});
		   	}
	    },
	     *fetchAllRoleList({ 
		 	payload 
		  }, { call, put }) {
		   	const reqData = yield call( fetchHotRoleList,payload);
		   	if (reqData.data && reqData.data.success) {
		   		yield put({type:'queryAllRoleListSuccess',payload:{
		   			allRoleData:reqData.data.resultObject,
		   			allHotNextPage:reqData.data.nextPage,
		   		}});
		   	}
	    },

	},

	reducers:{
		loading(state,action){
			return{

			}
		},
		queryHotestRoleListSuccess(state,action){
			action.payload.hotestRoleData = state.hotestRoleData.concat(action.payload.hotestRoleData);
			return{
				...state,
				hotestRoleData:action.payload.hotestRoleData,
				hotestRoldNextPage:action.payload.hotestRoldNextPage,
			}
		},
		queryAllRoleListSuccess(state,action){
			action.payload.allRoleData = state.allRoleData.concat(action.payload.allRoleData);
			return{
				...state,
				allRoleData:action.payload.allRoleData,
				allHotNextPage:action.payload.allHotNextPage,
			}
		},

	},

}