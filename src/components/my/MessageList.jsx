
import React from 'react';
import styles from './MessageList.less';

const MessageList = (props) => {
  return (
    <div className={styles.contact}>
    	<div className={styles.message}>
    		<div>
    			<p>关于我们关于我们关于我们关于我们关于我们关于我们关于我们</p>
    			<span>未读</span>
    		</div>
    		<span style={{ display:'inline-block',padding:'5px 2px',color:'#D8D8D8'}}>2016-12-03</span>
    	</div>
    </div>
  );
};

MessageList.propTypes = {

};



export default MessageList;

