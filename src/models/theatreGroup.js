import { fetchList,fetchTagList} from '../services/theatreGroup';

export default {

	namespace:'theatreGroup',

	state:{
		resultObject:[],
		loading:true,
		tagArray:[],
		nextPage:false,
	},

	subscriptions: {
    	setup({dispatch}) {
	       dispatch({type: 'fetchList',payload:{ likeName:'', tagIds:[], pageNo:0, pageSize:10} });
	       dispatch({type: 'tagList',payload:{ types:[1,2,3] }});
    	}
  	},

	effects:{
		 *fetchList({ 
		 	payload 
		  }, { call, put }) {
		   	const data = yield call( fetchList,payload);
		   	if (data.data && data.data.success) {
		   		yield put({type:'queryListSuccess',payload:{
		   			resultObject:data.data.resultObject,
		   			nextPage:data.data.nextPage
		   		}});
		   	}
	    },
	    *tagList({ 
		 	payload 
		  }, { call, put }) {
		   	const req = JSON.stringify( yield call( fetchTagList,payload ));
		   	const data = JSON.parse(req);
		   	if (data.data && data.data.success) {
		   		yield put({type:'tagSuccess',payload:{tagArray:data.data.resultObject}
		   		});
		   	}
	    },
	},

	reducers:{
		queryListSuccess(state,action){
			const pageData = state.resultObject.concat(action.payload.resultObject);
			return{
				...state,
				resultObject:pageData,
				nextPage:action.payload.nextPage,
				loading:false,
			}
		},
		tagSuccess(state,action){
			return{
				...state,
				tagArray:action.payload.tagArray,
				loading:false,
			}
		},
	},
}