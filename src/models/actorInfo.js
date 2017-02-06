import { fetchList } from '../services/theatreGroup';
import pathToRegexp from 'path-to-regexp';
import { fetchPerformerDetailList } from '../services/performer';
import { fetchOtherComment,fetchSubmitComment } from '../services/role';
import { relanding } from '../utils/relanding';

export default {

	namespace:'actorInfo',

	state:{
		infoData:{},
		commnetData:[],
	},

	subscriptions: {
		setup({dispatch,history}) {
			history.listen(({pathname}) => {
    			const match = pathToRegexp('/rolePerformerInfo/:groundId&:roleId').exec(pathname);
    			if (match) {
		          const roleId = match[2];
		          let userId = roleId.replace(/[^0-9]/ig,"");
		          dispatch({ type: 'fetchPerformerDetailList', payload:{id:userId}});
		        }		        
		    });
    	}
  	},

	effects:{
		*fetchPerformerDetailList({ 
		 	payload 
		  }, { call, put }) {
		   	const resultData = yield call( fetchPerformerDetailList,payload);
		   	if (resultData.data && resultData.data.success) {
		   		yield put({type:'queryInfoSuccess',payload:{infoData:resultData.data.resultObject}});
		   	}
	    },

	    *otherComment({ 
		 	payload 
		  }, { call, put }) {
		   	const resultData = yield call( fetchOtherComment,payload);
		   	if (resultData.data && resultData.data.success) {
		   		yield put({type:'queryCommentSuccess',payload:{commnetData:resultData.data.resultObject}});
		   	}
	    },

	    *submitComment({ 
		 	payload 
		  }, { call, put }) {
		   	const resultData = yield call( fetchSubmitComment,payload);
			   console.log(resultData);
			   if (resultData.data ){
				   if( resultData.data.success){
					   alert('评价成功！');
				   }else{
					   if (resultData.data.code === -10) {
				   			alert(resultData.data.message + ', 请重试');
                            relanding();
				   		}
				   }
			   }
	    },

	},

	reducers:{
		queryInfoSuccess(state,action){
			return{
				...state,
				infoData:action.payload.infoData
			}
		},
		queryCommentSuccess(state,action){
			return{
				...state,
				commnetData:action.payload.commnetData
			}
		},
	},
}