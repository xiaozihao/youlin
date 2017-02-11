import React,{PropTypes} from 'react';
import {Button} from 'antd';
import styles from './FocusBar.less';
import vote from '../assets/crew/vote.png';
import collected from '../assets/crew/vote.png';
import share from '../assets/crew/share.png';
import rankingList from '../assets/crew/rankingList.png';
import crewIcon from '../assets/icon/crew.png';

const style = {
	collection:{
		display:'inline-block',
		marginLeft:12.5,
		marginRight:12.5,
		height:17,
		width:17,
	}
}

const FocusBar = ({
	isFirst,
	isNewest,
	Keyword2,
	cover,
	onCollection,
	isCollection,
	onShare,
	status

}) => {

  return (
		<div className = { styles.customImage } >
			<img alt="example" src = {cover?cover:crewIcon}/>
			<div className = { styles.keyword }>
	    		{isNewest === 1? <p>最新剧</p> : ''}
		    	<p>{Keyword2}</p>
			</div>
			<div className = {styles.firstPublish}>
			{ isFirst === 1 ? <p>首发</p> : '' }
			</div>

			<div>
				{status === 1 ? (<p className={styles.recruit}>筹备中</p>):(<p className={styles.recruit}>招募结束</p>)}
			</div>
			<div className = { styles.features}>
				<img alt="example" src = {isCollection ? vote: collected} onClick = {onCollection}/>
				<img alt="example" src = {share} onClick = {onShare}/>
			</div>
		</div>
	);
}

FocusBar.propTypes = {
	isFirst:PropTypes.number,
    Keyword2: PropTypes.string,
    isNewest:PropTypes.number,
    cover:PropTypes.string,
    onCollection:PropTypes.func,
    isCollection:PropTypes.bool,
    onShare:PropTypes.func,
    status:PropTypes.number,
};

export default FocusBar;