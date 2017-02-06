import React,{ Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Menu } from 'antd';
import ContestPollListItem from './contestPollListItem';

function ContestPollList(props){
	const data = props.data;
	console.log(data);
	return(
		<div>
			{
				data.map((value,i)=>{
					return(
						<ContestPollListItem
	                        key = {i}
	                        number = {i+1}
	                        name = {value.roleAtom.name}
	                        totalRank = { value.roleAtom.headPortrait }
	                    />
					)
					
				})
			}
		</div>
	);
}

ContestPollList.propTypes = {

};

export default ContestPollList;