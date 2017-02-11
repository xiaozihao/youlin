import { fetchList,fetchTagList,fetchCollection} from '../services/theatreGroup';
import { message } from 'antd';
import { relanding } from '../utils/relanding';

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
	    *collection({ 
		 	payload 
		  }, { call, put }) {
		  	const reqData = yield call(fetchCollection,payload);
		   	if (reqData.data && reqData.data.success) {
		   		message.success('收藏'+reqData.data.message);
		   		yield put({ type:'collectionSuccess',payload:{ isCollection:reqData.data.success} });
		   	}else{
		   		if (reqData.data.code === -10) {
		   			message.error(requestData.data.message + ', 请重试');
                    relanding();
		   		}
		   		if (reqData.data.code === -1) {
		   			message.error(reqData.data.message);
		   		}
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