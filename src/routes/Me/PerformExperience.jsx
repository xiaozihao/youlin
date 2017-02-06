import React,{ Component, PropTypes } from 'react';
import { Button } from 'antd';
import styles from './PerformExperience.less';
import { Link } from 'dva/router';
import PerformExperienceList from '../../components/my/PerformExperienceList';

function PerformExperience({
    location,id,data,onDelect
}){

  return (
  	<div> 
	    <div className={styles.undergo}>
	    	<Link to = {`me/addExperience/${id}`}><p className={styles.title}>添加演出经历</p></Link>
	    	{
	    		data && data.map && data.map((value,i)=>{
		    		return(
		    			<PerformExperienceList
		    				key = {i}
		    				year = {value.year}
		    				type = {value.type}
		    				name = {value.roleName}
		    				director = {value.cooperationDirector}
		    				cooperationPerformer = {value.cooperationPerformer}
		    				description = {value.description}
		    				filmName = {''}
		    				id = {value.id}
		    				onDelect = {onDelect}
		    			/>
		    		)
		    	})
	    	}
	    </div>
	</div>
  );
};

PerformExperience.propTypes = {
	location:PropTypes.object,
	id:PropTypes.number,
	data:PropTypes.array,
	onDelect:PropTypes.func,
};

export default PerformExperience;