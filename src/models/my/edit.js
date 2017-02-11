import { refereshToken } from '../../services/my';
import { 
	fetchUserInfo,
	fetchUpdateCover,
	fetchUpdateHeaderImage ,
	fetchUpdatePhoto,
	fetchUpdateVideo,
	fetchActorExperience,
	fetchDelectExperience
} from '../../services/edit';

import { fetchTagList } from '../../services/theatreGroup';
import { relanding } from '../../utils/relanding';
import { message } from 'antd';

export default {

	namespace:'edit',

	state:{
		persionTag:[],
		specialtyTag:[],
		changeInfo:[],
		coverUrl:'',
		headImageMessage:'',
		experienceData:{},
		delectSuccess:false,
		trailersUrl:'',
		introduceMyselfMoveUrl:'',
	},

	subscriptions: {
    	setup({dispatch}) {
    		dispatch({type:'queryPersionTag',payload:{types:[4] }})
    		dispatch({ type:'querySpecialtyTag',payload:{ types:[5] }})
    		dispatch({type:'queryExperience',payload:{pageNo:0,pageSize:10}})
    	}
  	},

	effects:{
		*queryPersionTag({ 
		 	payload 
		  }, { call, put }) {
		   const resultData = yield call( fetchTagList,payload);
		   if (resultData.data && resultData.data.success) {
		   		yield put({type:'queryPersionTagSuccess',payload:{persionTag:resultData.data.resultObject}});
		   }
	    },

	    *querySpecialtyTag({ 
		 	payload 
		  }, { call, put }) {
		   const resultData = yield call( fetchTagList,payload);
		   if (resultData.data && resultData.data.success) {
		   		yield put({type:'querySpecialtyTagSuccess',payload:{specialtyTag:resultData.data.resultObject}});
		   }
	    },

		*savaUerInfo({ 
		 	payload 
		  }, { call, put }) {
			   const resultData = yield call( fetchUserInfo,payload);
			   if (resultData.data ) {
			   		if (resultData.data.success) {
			   			alert('修改个人资料'+resultData.data.message);
			   			var status = resultData.data.resultObject.status;
			   			var myUserInfo = JSON.parse(localStorage.MY_USER_INFO);
			   			if (myUserInfo && status) {
			   				myUserInfo.targetObject = myUserInfo.targetObject || {};
			   				myUserInfo.targetObject.status = status;
			   				localStorage.setItem('MY_USER_INFO', JSON.stringify(myUserInfo));
			   			}
			   		}else{
				   		if (resultData.data.code === -10) {
				   			console.log(resultData.data.message + ', 请重试');
                            relanding();
			   			}
			   		}
			   	}		// yield put({type:'querySpecialtyTagSuccess',payload:{specialtyTag:resultData.data.resultObject}});
	    },

	    *setCover({ 
		 	payload 
		  }, { call, put,select}) {
			   const resultData = yield call( fetchUpdateCover,payload);
			   if (resultData.data) {
			   		if (resultData.data.success) {
			   			message.success('设置封面'+resultData.data.message);
			   			// yield put({
				   		// 	type:'setCoverSuccess',
				   		// 	payload:{
				   		// 		// coverUrl:resultData.data.resultObject.cover,
				   		// }});
				   		var status = resultData.data.resultObject.status;
			   			var myUserInfo = JSON.parse(localStorage.MY_USER_INFO);
			   			if (myUserInfo && status) {
			   				myUserInfo.targetObject = myUserInfo.targetObject || {};
			   				myUserInfo.targetObject.status = status;
			   			}
			   			myUserInfo.userAtom.cover = resultData.data.resultObject.cover;
			   	 		localStorage.setItem('MY_USER_INFO',JSON.stringify(myUserInfo));			   	 		
			   		}else{
			   			message.error('设置封面'+resultData.data.message);
			   			if (resultData.data.code === -10) {
			   				alert(resultData.data.message + ', 请重试');
                            relanding();
		   				}
			   		}
			   	}
	    },

	    *setHeaderImage({ 
		 	payload 
		  }, { call, put,select}) {
			   const resultData = yield call( fetchUpdateHeaderImage,payload);
			   if (resultData.data) {
			   		if (resultData.data.success) {
			   			message.success('上传头像'+resultData.data.message);
			   			yield put({
				   			type:'setheaderSuccess',
				   			payload:{
				   				// headImageMessage:resultData.data.message,
				   			}});
			   				var status = resultData.data.resultObject.status;
				   			var myUserInfo = JSON.parse(localStorage.MY_USER_INFO);
				   			if (myUserInfo && status) {
				   				myUserInfo.targetObject = myUserInfo.targetObject || {};
				   				myUserInfo.targetObject.status = status;
				   				localStorage.setItem('MY_USER_INFO', JSON.stringify(myUserInfo));
				   			}
			   			}else{
			   				message.error('上传头像'+resultData.data.message);
					   		if (resultData.data.code === -10) {
					   			alert(resultData.data.message + ', 请重试');
                            	relanding();
				   			}
			   			}
			   }
	    },

	    *setPhoto({ 
		 	payload 
		  }, { call, put,select}) {
			   const resultData = yield call( fetchUpdatePhoto,payload);
			   if (resultData.data) {
			   		if (resultData.data.success) {
			   			message.success('上传照片'+resultData.data.message);
			   			yield put({
				   			type:'setPhotoSuccess',
				   			payload:{
				   				// photoMessage:resultData.data.message,
				   			}});
			   				var status = resultData.data.resultObject.status;
				   			var myUserInfo = JSON.parse(localStorage.MY_USER_INFO);
				   			if (myUserInfo && status) {
				   				myUserInfo.targetObject = myUserInfo.targetObject || {};
				   				myUserInfo.targetObject.status = status;
				   				localStorage.setItem('MY_USER_INFO', JSON.stringify(myUserInfo));
				   			}
			   			}else{
			   				message.error('上传照片'+resultData.data.message);
					   		if (resultData.data.code === -10) {
					   			alert(resultData.data.message + ', 请重试');
                            	relanding();
				   			}
			   			}
			   			
			   }
	    },

	    *updatefirstVideo({ 
		 	payload 
		  }, { call, put,select}) {
			   const resultData = yield call( fetchUpdateVideo,payload);
			   if (resultData.data) {
			   		console.log(resultData);
			   		if (resultData.data.success) {
			   			message.success('上传视频'+resultData.data.message);
			   			yield put({
				   			type:'setFirstVideoSuccess',
				   			payload:{
				   				introduceMyselfMoveUrl:resultData.data.resultObject.introduceMyselfMove
				   			}});
			   			var status = resultData.data.resultObject.status;
			   			var myUserInfo = JSON.parse(localStorage.MY_USER_INFO);
			   			if (myUserInfo && status) {
			   				myUserInfo.targetObject = myUserInfo.targetObject || {};
			   				myUserInfo.targetObject.status = status;
			   			}
			   			myUserInfo.userAtom.introduceMyselfMoveUrl = resultData.data.resultObject.introduceMyselfMove;
			   	 		localStorage.setItem('MY_USER_INFO',JSON.stringify(myUserInfo));

		   			}else{
		   				message.error('上传视频'+resultData.data.message);
				   		if (resultData.data.code === -10) {
				   			alert(resultData.data.message + ', 请重试');
                            relanding();
			   			}
		   			}
		   			
			   }
	    }, 
	    *updateSecondVideo({ 
		 	payload 
		  }, { call, put,select}) {

			   const resultData = yield call( fetchUpdateVideo,payload);
			   if (resultData.data) {
			   		if (resultData.data.success) {
			   			message.success('上传视频'+resultData.data.message);
				   			yield put({
					   			type:'setSecondVideoSuccess',
					   			payload:{
					   				trailersUrl:resultData.data.resultObject.trailersUrl,
					   			}});
				   			var status = resultData.data.resultObject.status;
				   			var myUserInfo = JSON.parse(localStorage.MY_USER_INFO);
				   			if (myUserInfo && status) {
				   				myUserInfo.targetObject = myUserInfo.targetObject || {};
				   				myUserInfo.targetObject.status = status;
				   			}
				   			
			   				myUserInfo.userAtom.trailersUrl = resultData.data.resultObject.trailers;
			   	 			localStorage.setItem('MY_USER_INFO',JSON.stringify(myUserInfo));
			   		}else{
			   			message.error('上传视频'+resultData.data.message);
				   		if (resultData.data.code === -10) {
				   			alert(resultData.data.message + ', 请重试');
                            relanding();
				   		}
			   		}
			   		
			   }
	    },
	    *queryExperience({ 
		 	payload 
		  }, { call, put,select}) {
			   const resultData = yield call( fetchActorExperience,payload);
			   if (resultData.data) {
			   		if (resultData.data.success) {
			   			yield put({
				   			type:'queryExperienceSuccess',
				   			payload:{
				   				experienceData:resultData.data.resultObject,
				   			}});
			   			}else{
					   		if (resultData.data.code === -10) {
					   			alert(resultData.data.message + ', 请重试');
                            	relanding();
				   			}
			   			}
			   }
	    },
	    *delectExperience({ 
		 	payload 
		  }, { call, put,select}) {
			   const resultData = yield call( fetchDelectExperience,payload);
			   if (resultData.data) {
			   		if (resultData.data.success) {
			   				message.success('删除成功'+ resultData.data.success);
			   				yield put({
					   			type:'delectExperienceSuccess',
					   			payload:{
					   				delectSuccess:resultData.data.success,
					   		}});
			   				window.location.reload();
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
		queryPersionTagSuccess(state,action){
			return{
				...state,
				persionTag:action.payload.persionTag,
			}
		},
		querySpecialtyTagSuccess(state,action){
			return{
				...state,
				specialtyTag:action.payload.specialtyTag,
			}
		},
		setCoverSuccess(state,action){
			return{
				...state,
				cover:action.payload.coverUrl,
			}
		},
		setheaderSuccess(state,action){
			return{
				...state,
				headImageMessage:action.payload.headImageMessage,
			}
		},

		setPhotoSuccess(state,action){
			return{
				...state,
				photoMessage:action.payload.photoMessage,
			}
		},

		setFirstVideoSuccess(state,action){
			return{
				...state,
				introduceMyselfMoveUrl:action.payload.introduceMyselfMoveUrl,
			}
		},

		setSecondVideoSuccess(state,action){
			return{
				...state,
				trailersUrl:action.payload.trailersUrl,
			}
		},

		queryExperienceSuccess(state,action){
			return{
				...state,
				experienceData:action.payload.experienceData,
			}
		},
		delectExperienceSuccess(state,action){
			return{
				...state,
				delectSuccess:action.payload.delectSuccess,
			}
		},
	},
}