import React,{ Component, PropTypes } from 'react';
import { Menu, Icon,Button,Input} from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import CanvasList from '../../components/my/CanvasList';
import styles from './Canvassing.less';

const Canvassing = ({
	canvassing,dispatch
})=>{

	// const { resultObject } = canvassing;

    return (
    	<div>
			
		</div>
    );  
}

function mapStateToProps({ canvassing }) {
  return { canvassing };
}

Canvassing.propTypes = {
};

export default Canvassing;
// <CanvasList
// 				name = {'张飞'}
// 				voteName = {'匿名头条'}
// 				voteNumber ={100}
// 				income ={12}
// 			/>
// 			<CanvasList
// 				name = {'赵云'}
// 				voteName = {'赵总'}
// 				voteNumber ={66}
// 				income ={33}
// 			/>