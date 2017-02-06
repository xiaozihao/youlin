import React,{ Component, PropTypes } from 'react';
import { Menu, Icon,Button,Input} from 'antd';
import { Link } from 'dva/router';
import CanvasList from '../components/CanvasList';
import styles from './Canvassing.less';

const Canvassing = ()=>{
    return (
    	<div>
    		<p className={styles.title}>我的拉票</p>
			<CanvasList
				name = {'张飞'}
				voteName = {'匿名头条'}
				voteNumber ={100}
				income ={12}
			/>
			<CanvasList
				name = {'刘备'}
				voteName = {'小花'}
				voteNumber ={20}
				income ={10}
			/>
			<CanvasList
				name = {'诸葛亮'}
				voteName = {'abby'}
				voteNumber ={300}
				income ={0}
			/>
			<CanvasList
				name = {'关羽'}
				voteName = {'lick'}
				voteNumber ={12}
				income ={5}
			/>
		</div>
    );  
}
Canvassing.propTypes = {
};

export default Canvassing;