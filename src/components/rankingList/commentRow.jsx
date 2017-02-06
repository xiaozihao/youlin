import React,{ PropTypes } from 'react';
import styles from './CommentRow.less';
import { Tag ,Button,Input ,Icon } from 'antd';

const CommentRow = ({ title,comment,date }) => {
  return (
    <div>
        <div className={styles.director}>
            <p className={styles.name}>{ title }</p>
            <div>
                <p>{ comment }</p>
                <p>{ date }</p>
            </div>
        </div>
    </div>
  );
};

CommentRow.propTypes = {
   title:PropTypes.string,
   comment:PropTypes.string,
   date:PropTypes.string,
};

export default CommentRow;
