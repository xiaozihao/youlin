import React,{ Component, PropTypes } from 'react';
import { Tag,Button,Card } from 'antd';
import { Link } from 'dva/router';
import styles from './theatreGroupItem.less';
import vote from '../../assets/crew/vote.png';
import share from '../../assets/crew/share.png';
import rankingList from '../../assets/crew/rankingList.png';
import crewIcon from '../../assets/icon/crew.png';

function getDateTest(){
    Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {  
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };  
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
    for (var k in o)  
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
    return fmt;  
    }
}

function localTime(nS){
	getDateTest();
	return new Date(parseInt(nS)).Format("yyyy-MM-dd"); 
}

function localTimeDay(nS){
	getDateTest();
	return new Date(parseInt(nS)).Format("dd"); 
}

const TheatreGroupItem = ({
	id,title,
	cover,startTime,
	stopTime,isFirst,
	isNewest,createTime,theme

})=>{

	var startTime = localTime(startTime);
	var stopTime = localTime(stopTime);
	var now = localTimeDay(Date.now());
	var createTime = localTimeDay(createTime);

	return(
		<div style = {{margin:10}}>
			<div className = { styles.customCard }>
				<div className = { styles.customImage } >
					<Link to = { `theatreGroupDetail/${id}`}>
						<img src = {cover?cover:crewIcon} />
					</Link>

			    	<div className = { styles.keyword }>
			    		<p>{ isNewest === 1? '最新剧' : ''}</p>
			    		<p>{ now === createTime ? '今日新剧' : '' }</p>
			    	</div>
			    	<div className = {styles.firstPublish}>
			    		<p>{ isFirst === 1 ? '首发' : ''}</p>
			    	</div>
			    	<div className = { styles.features}>
						<img alt="example" src = {vote}/>
						<img alt="example" src = {share}/>
						<img alt="example" src = {rankingList}/>
					</div>
			    </div>
				
				<div className = { styles.opus }>
					<p>{title}</p>
					<div>
						{ theme? <Tag className = { styles.tag }>{theme}</Tag> : ''}
						<Tag className = { styles.tag }>标签</Tag>
					</div>
				</div>

				<div className = { styles.time }>
					<p>开机时间{startTime}</p>
					<p>招募截止时间{stopTime}</p>
				</div>
			</div>
		</div>
	);
}

TheatreGroupItem.propTypes = {
	title:PropTypes.string,
	id:PropTypes.number,
	cover:PropTypes.string,
	isFirst : PropTypes.number,
	isNewest : PropTypes.number,
	createTime : PropTypes.number,
	theme : PropTypes.string,
};

export default TheatreGroupItem;

