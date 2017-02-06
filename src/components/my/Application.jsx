import React,{PropTypes } from 'react';
import styles from './application.less';
import { Button } from 'antd';
import { Link } from 'dva/router';

const Application = ({dramaName,name,count,date,sex,votes,roleId}) => {
  return (
    	<div className={styles.card}>
            <div className={styles.title}>
                <span>《{dramaName}》</span>
                <Link to = {`me/application/edit/${roleId}`}><span>编辑</span></Link>
            </div>

    		<div>
                <span>{name}</span>
                <span>{date}</span>
                <span className={styles.ranking}>第<span>{count}</span>名</span>
            </div>

    		<p>角色性别：{sex}</p>
    		<p className={styles.vote}>
            <span>投票数：<span>{votes}</span></span>
            <Button type="ghost" className={styles.btn}>找人拉票</Button>
            </p>

    	</div>

  );
};

Application.propTypes = {
    dramaName:PropTypes.string,
    name:PropTypes.string,
    date:PropTypes.number,
    count:PropTypes.number,
    sex:PropTypes.string,
    votes:PropTypes.number,
    roleId:PropTypes.number,
};

export default Application;
