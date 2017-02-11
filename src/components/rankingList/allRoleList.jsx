import React,{ Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import AllRoleListItem from './allRoleListItem'

class AllRoleList extends Component{


	render(){
		
		const { data } = this.props;

		return (
	    	<div style = {{paddingBottom:50}}>
	        {
	            data.map((data,i)=>{
	            	console.log(data);
	            	return(
	            		<Link key = {i} to={`rolePerformerInfo/groundId=${data.roleAtom.groupId}&roleId=${data.roleAtom.id}`} style = {{ color:'#666'}} activeStyle={{ background: 'light', color: '#fff' }}>
		                    <AllRoleListItem
		                        key = {i}
		                        cover = {data.roleAtom.photos}
		                        roleName = {data.roleAtom.name}
		                        tagNames = {data.roleAtom.name}
		                        heatCount = {data.recordAtom.heatCount}
		                        upCount = {data.recordAtom.upCount}
		                        voteCount = {data.recordAtom.voteCount}
		                        nickName = {data.performerAtom && data.performerAtom.nickName ? data.performerAtom.nickName:''}
		                        ranking = {i+1}
		                        groupName = {data.roleAtom.groupName}
		                        tagNames = {data.roleAtom.tagNames}
		                    />
	                	</Link>
	            	);
	            })
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