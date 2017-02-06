import React,{ Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './Message.less';
import MessageList from '../../components/my/MessageList';

const Message = ({
	message,dispatch
})=>{
	const { resultObject } = message;

	function onCheck(){
		dispatch({
			type:'message/fetchCheckMessageDetail',
			payload:{
				messageId:resultObject.id
			}
		})
	}

	const messageData = resultObject.resultObject;

    return (
		<div>
			<div onClick = {onCheck}>
				{
					messageData ?(
						messageData.map((value,i)=>{
							return(
								<MessageList />
							)
						})
					):<div/>
				}
			</div>
		</div>
    );  
}

function mapStateToProps({ message }) {
  return { message };
}

Message.propTypes = {

};

export default connect(mapStateToProps)(Message);;