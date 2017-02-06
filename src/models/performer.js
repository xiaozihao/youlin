import { fetchPerformerList,fetchBanner } from '../services/performer';

export default {

	namespace:'performer',

	state:{
		resultObject:[],
		bannerArray:[],
		nextPage:true,
	},

	subscriptions: {
    	setup({dispatch}) {
	       dispatch({type: 'fetchPerformerList',payload:{ids:[],pageNo:0,pageSize:10}});
	       dispatch({type: 'reqBanner',payload:{pageNo:0,pageSize:5}});
    	}
  	},

	effects:{
		 *fetchPerformerList({ 
		 	payload 
		  }, { call, put }) {
		   	const data = yield call( fetchPerformerList,payload);
		   	if (data.data && data.data.success) {
		   		yield put({type:'queryListSuccess',payload:{
		   			resultObject:data.data.resultObject,
		   			nextPage:data.data.nextPage,
		   		}});
		   	}
	    },
	    *reqBanner({ 
		 	payload 
		  }, { call, put }) {
		   	const data = yield call( fetchBanner,payload);
		   	if (data.data && data.data.success) {
		   		yield put({type:'queryBanner',payload:{bannerArray:data.data.resultObject}});
		   	}
	    },

	},

	reducers:{
		queryListSuccess(state,action){
			action.payload.resultObject = state.resultObject.concat(action.payload.resultObject);
			return{
				...state,
				resultObject:action.payload.resultObject,
				nextPage:action.payload.nextPage
			}
		},
		queryBanner(state,action){
			return{
				...state,
				bannerArray:action.payload.bannerArray
			}
		},

	},

}