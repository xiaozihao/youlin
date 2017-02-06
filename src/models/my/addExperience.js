import { fetchTagList } from '../../services/theatreGroup';
import { relanding } from '../../utils/relanding';
import { fetchAddExperience,fetchQueryActorExperience } from '../../services/edit';
import pathToRegexp from 'path-to-regexp';
import { message} from 'antd';

export default {

	namespace:'experience',

	state:{
		movieTag:[],
		queryExperienceData:{},
	},

	subscriptions: {
    	setup({dispatch,history}) {
    		history.listen(({pathname}) => {
    			const match = pathToRegexp('/me/addExperience/:addExperienceId').exec(pathname);
		        if (match) {
		          const userId = match[1];
		          dispatch({ type:'queryExperience',payload:{ id:userId } })
		        } 
				dispatch({ type:'movieTag', payload:{ types:[2] }});
    		})
    	}
  	},

	effects:{
		 *movieTag({ 
		 	payload 
		  }, { call, put }) {
		   	const resultData = yield call( fetchTagList,payload);
		   	if (resultData.data)
		   		if(resultData.data.success) {
			   		yield put({type:'queryTagSuccess',payload:{
			   			movieTag:resultData.data.resultObject,
			   		}});
			   	}else{
			   		if (resultData.data.code === -10) {
				   		alert(requestData.data.message + ', 请重试');
                        relanding();
			   		}
			   	}
	    	},
	    	*submitExperience({ 
			 	payload 
			}, { call, put }) {
			   	const resultData = yield call( fetchAddExperience,payload);
			   	if (resultData.data)
			   		if(resultData.data.success) {
			   			message.success('发布成功'+ resultData.data.message );
				   	}else{
				   		if (resultData.data.code === -10) {
				   			alert(requestData.data.message + ', 请重试');
                            relanding();
				   		}
				   	}
		    },

		    *queryExperience({ 
			 	payload 
			}, { call, put }) {
			   	const resultData = yield call( fetchQueryActorExperience,payload);
			   	if (resultData.data)
			   		if(resultData.data.success) {
			   			yield put({type:'querySuccess',payload:{
			   				queryExperienceData:resultData.data.resultObject,
			   			}});
				   	}else{
				   		if (resultData.data.code === -10) {
				   			alert(requestData.data.message + ', 请重试');
                            relanding();
				   		}
				   	}
		    },
	},

	reducers:{
		queryTagSuccess(state,action){
			return{
				...state,
				movieTag:action.payload.movieTag,
			}
		},
		querySuccess(state,action){
			return{
				...state,
				queryExperienceData:action.payload.queryExperienceData,
			}
		},
	},
}