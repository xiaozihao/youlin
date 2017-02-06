import React,{ Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import { connect,Menu } from 'dva';
import RoleListItem from '../components/theatreGroup/roleListItem';

const TheatreGroupRoleListType = {
	data:PropTypes.array,
};

const TheatreGroupRoleList =(props)=>{
	const { data } = props;
  	return ( 
    	<div>
    		{
		    	data.map((data, i) => (
	    			<RoleListItem
			     		key = {i}
			     		cover = {data.movieRoleAtom.cover}
			  			name = {data.movieRoleAtom.name?data.movieRoleAtom.name:''}
			  			linePosition = {data.movieRoleAtom.levelName?data.movieRoleAtom.levelName:''}
			  			ageGroup = {data.movieRoleAtom.ageGroup?data.movieRoleAtom.ageGroup:''}
			  			sex = {data.movieRoleAtom.sex?data.movieRoleAtom.sex:''}
			  			roleTag = { data.movieRoleAtom.tagNames?data.movieRoleAtom.tagNames:'' }
			  			people = {data.movieRoleAtom.regNumber}
			  			signUp = {data.performerAtom ? data.performerAtom.length : 0}
			  			groupId = { data.movieRoleAtom.groupId?data.movieRoleAtom.groupId:'' }
			  			performerAtom = { data.performerAtom?data.performerAtom:[] }
			  		/>
		    	))
			}
	  	</div>
    );
};

TheatreGroupRoleList.propTypes = TheatreGroupRoleListType;

export default TheatreGroupRoleList;
