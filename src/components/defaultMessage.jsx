import React,{PropTypes} from 'react';
import {Button} from 'antd';
import styles from './defaultMessage.less';

const DefaultMessage = ({
	message
}) => {

  return (
  		<div className = {styles.message}><p>{message}</p></div>
	);
}

DefaultMessage.propTypes = {
	message:PropTypes.string,
};

export default DefaultMessage;