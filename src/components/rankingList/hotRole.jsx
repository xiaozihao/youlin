import React,{ Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import HotRoleListItem from './hotRoleListItem';

const HotRoleType = {
  data: PropTypes.array.isRequired,
};

function HotRole(props){
	const data = props.data;
    return (
    	<div>
	    	{	
	    		data.map((data,i)=>(
	    			<Link key = {i} to={`hotRole/hotRoleItem/${data.roleAtom.id}`} style = {{ color:'#666'}} activeStyle={{ background: 'light', color: '#fff' }}>
	    		 		<HotRoleListItem
	    		 			key = {i}
	    		 			name = {data.roleAtom.name}
	    		 			character = {data.roleAtom.character}
	    		 			trait = {data.roleAtom.trait}
	    		 			description = {data.roleAtom.description}
	    		 			performers = {data.performers}
	    		 			cover = {data.roleAtom.cover}
	    		 		/>
	    		 	</Link>
	    		))
	    	}
	    </div>
    );
};

HotRole.propTypes = HotRoleType;

export default HotRole;
