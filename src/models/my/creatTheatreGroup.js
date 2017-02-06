import { relanding } from '../../utils/relanding';
import { fetchTagList } from '../../services/theatreGroup';
import { fetchCreatTheatreGrounp  } from '../../services/creatTheatreGroup';
import { message } from 'antd';
import { refereshToken } from '../../services/my';

export default {

	namespace:'creatTheatreGroup',

	state:{
		themeSelect:[],
		movieSelect:[],
		playSelect:[],
	},

	subscriptions: {
    	setup({dispatch}) {
	       dispatch({
    			type:'themeSelect',
    			payload:{
    				types:[1] 
    			}
    		})
    		dispatch({
    			type:'movieSelect',
    			payload:{
    				types:[2] 
    			}
    		})
    		dispatch({
    			type:'playSelect',
    			payload:{
    				types:[3] 
    			}
    		})
    	}
  	},

	effects:{
		*themeSelect({ 
		 	payload 
		  }, { call, put }) {
		   	const resultData = yield call( fetchTagList,payload);
		   	if (resultData.data){
		   		if(resultData.data.success) {
			   		yield put({ type:'queryThemeSuccess', payload:{ themeSelect:resultData.data.resultObject }});
		   		}else{
		   			if (resultData.data.code === -10) {
		   				relanding;
		   			}
		   		}
		   	}
	    },

	    *movieSelect({ 
		 	payload 
		  }, { call, put }) {
		   	const resultData = yield call( fetchTagList,payload);
		   	if (resultData.data){
		   		if(resultData.data.success) {
			   		yield put({ type:'querymovieSelectSuccess', payload:{ movieSelect:resultData.data.resultObject }});
		   		}else{
		   			if (resultData.data.code === -10) {
		   				relanding;
		   			}
		   		}
		   	}
	    },

	    *playSelect({ 
		 	payload 
		  }, { call, put }) {
		   	const resultData = yield call( fetchTagList,payload);
		   	if (resultData.data){
		   		if(resultData.data.success) {
			   		yield put({ type:'queryplaySelectSuccess', payload:{ playSelect:resultData.data.resultObject }});
		   		}else{
		   			if (resultData.data.code === -10) {
		   				relanding;
		   			}
		   		}
		   	}
	    },

		 *submit({ 
		 	payload 
		  }, { call, put }) {
		   	const resultData = yield call( fetchCreatTheatreGrounp,payload);
		   	if (resultData.data){
		   		if(resultData.data.success) {
		   			message.success('剧组创建'+resultData.data.message);
		   		}else{
		   			if (resultData.data.code === -10) {
		   					relanding
					}else{
						if (resultData.data.code === -12) {
								localStorage.removeItem('MY_USER_INFO');
								 window.location.href = '/';
						}
		   			}
		   		}
		   	}
	    },
	},

	reducers:{
		queryThemeSuccess(state,action){
			return{
				...state,
				themeSelect:action.payload.themeSelect,
			}
		},
		querymovieSelectSuccess(state,action){
			return{
				...state,
				movieSelect:action.payload.movieSelect,
			}
		},
		queryplaySelectSuccess(state,action){
			return{
				...state,
				playSelect:action.payload.playSelect,
			}
		},

	},
}