import React,{ Component, PropTypes } from 'react';
import {  } from 'antd';
import styles from './NewsRow.less';
import img from '../../../assets/info/info1.png';

const NewsRow = (props) => {
  return (
    <div className = { styles.normal}>
    	<div style = {{ marginRight:11 }}>
    		<p>高雪儿，中央戏剧学院表演系毕业，是一个94年出生的...</p>
    		<p>腾讯  2016-12-14</p>
		</div>
		<div>
			<img src={img} />
		</div>
	</div>
  );
};

NewsRow.propTypes = {
};

export default NewsRow;

