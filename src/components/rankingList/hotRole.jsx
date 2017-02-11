import React,{ Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import HotRoleListItem from './hotRoleListItem';

const HotRoleType = {
  data: PropTypes.array.isRequired,
};

let people = 0;

function HotRole(props){
	const data = props.data;
    return (
    	<div>
	    	{	
	    		data.map((data,i)=>{
	    			if (i === 0) {
	    				people = 100;
	    			}else if (i === 1) {
	    				people = 80;
	    			}else if (i === 2) {
	    				people = 76;
	    			}else if (i === 3) {
	    				people = 32;
	    			}else if (i === 4) {
	    				people = 32;
	    			}else{
	    				people = 0;
	    			}
	    			return(
	    				<Link key = {i} to={`hotRole/hotRoleItem/${data.roleAtom.id}`} style = {{ color:'#666'}} activeStyle={{ background: 'light', color: '#fff' }}>
		    		 		<HotRoleListItem
		    		 			key = {i}
		    		 			groupId ={data.roleAtom.groupId}
		    		 			id = {data.roleAtom.id}
		    		 			name = {data.roleAtom.name}
		    		 			character = {data.roleAtom.character}
		    		 			trait = {data.roleAtom.trait}
		    		 			description = {data.roleAtom.description}
		    		 			performers = {data.performers}
		    		 			people = {people}
		    		 			cover = {data.roleAtom.cover}
		    		 		/>
		    		 	</Link>
	    			)
	    		})
	    	}
	    </div>
    );
};

HotRole.propTypes = HotRoleType;

export default HotRole;
