import React,{ Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import RoleListItem from '../components/theatreGroup/roleListItem';

const TheatreGroupRoleListType = {
	data:PropTypes.array,
};

let people = 0;

const TheatreGroupRoleList =(props)=>{
	const { data } = props;
	console.log(data);
  	return ( 
    	<div>
    		{
		    	data.map((data, i) => {
		    		if (i === 0) {
		    			people = 20;
		    		}else if (i === 1) {
		    			people = 32;
		    		}else if (i === 2) {
		    			people = 15;
		    		}else if (i === 3) {
		    			people = 7;
		    		}else if (i === 4) {
		    			people = 2;
		    		}else{
		    			return people;
		    		}

		    		return(
		    			<RoleListItem
				     		key = {i}
				     		cover = {data.movieRoleAtom.cover}
				  			name = {data.movieRoleAtom.name?data.movieRoleAtom.name:''}
				  			linePosition = {data.movieRoleAtom.levelName?data.movieRoleAtom.levelName:''}
				  			ageGroup = {data.movieRoleAtom.ageGroup?data.movieRoleAtom.ageGroup:''}
				  			sex = {data.movieRoleAtom.sex?data.movieRoleAtom.sex:''}
				  			roleTag = { data.movieRoleAtom.tagNames?data.movieRoleAtom.tagNames:'' }
				  			people = {people}
				  			signUp = {people}
				  			groupId = { data.movieRoleAtom.groupId?data.movieRoleAtom.groupId:'' }
				  			id = {data.movieRoleAtom.id?data.movieRoleAtom.id:0}
				  			performerAtom = { data.performerAtom?data.performerAtom:[] }
				  		/>
		    		)
		    	})
			}
	  	</div>
    );
};

TheatreGroupRoleList.propTypes = TheatreGroupRoleListType;

export default TheatreGroupRoleList;
