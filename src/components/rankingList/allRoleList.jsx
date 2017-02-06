import React,{ Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import AllRoleListItem from './allRoleListItem'

class AllRoleList extends Component{


	render(){
		
		const { data } = this.props;

		return (
	    	<div style = {{marginBottom:50}}>
	        {
	            data.map((data,i)=>(
	                <Link key = {i} to={`rolePerformerInfo/groundId=${data.roleAtom.groupId}&roleId=${data.roleAtom.id}`} style = {{ color:'#666'}} activeStyle={{ background: 'light', color: '#fff' }}>
	                    <AllRoleListItem
	                        key = {i}
	                        cover = {data.roleAtom.cover}
	                        roleName = {data.roleAtom.name}
	                        tagNames = {data.roleAtom.name}
	                        heatCount = {data.recordAtom.heatCount}
	                        nickName = {data.performerAtom.nickName}
	                        ranking = {i+1}
	                        tagNames = {data.roleAtom.tagNames}
	                    />
	                </Link>
	            ))
	        }
	        </div>
		);
	}
    // rolePerformerInfo/:groundId&:roleId
   
};


AllRoleList.propTypes = {
    data:PropTypes.array.isRequired,
};

export default AllRoleList;