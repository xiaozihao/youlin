import React,{ Component, PropTypes } from 'react';
import {Button} from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './Release.less';
import ReleaseList from '../../components/my/ReleaseList';

var config ={
    userInfo:JSON.parse(localStorage.getItem('MY_USER_INFO')),
};

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

var config ={
	userInfo:JSON.parse(localStorage.getItem('MY_USER_INFO')),
};


class Release extends Component{

	componentWillMount() {
		if(config.userInfo != null){
           return JSON.parse(localStorage.getItem('MY_USER_INFO'));
        }
	}

	render(){

		const { releaseData , nextPage} = this.props.release;
		const type = config.userInfo.userAtom.type;

		let ReleaseItem = [];

		var vNextPage;
		if (nextPage) {
			vNextPage = (<button onClick={()=>this.onNextPage()}>点击加载更多</button>);
		} else {
			vNextPage = (<p>没有更多数据...</p>);
		}		

		if (releaseData) {
			console.log(releaseData);
			for (let i = 0; i < releaseData.length; i++) {
				ReleaseItem.push(
					<ReleaseList
						key = {i}
						dramaName={`${releaseData[i].productCompany}《${releaseData[i].name}》`}
						release = {releaseData[i].status}
						person = {releaseData[i].roleCount}
						applicant = {releaseData[i].applyCount}
						bootTime = {localTime(releaseData[i].startTime)}
						endTime = {localTime(releaseData[i].bootTime)}
					/>
				)
			}
		}

		console.log(config.userInfo);

		return (
	    	<div>
		    	{ type === 2?<Link to = "/me/creatTheatreGroup" className={styles.btn}>创建剧组</Link>:<div/>}
		    	{ReleaseItem}
		    	<div style = {{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:20}} className = {styles.loadMoreButton}>{vNextPage}</div> 
			</div>
    	); 
	} 
}

function mapStateToProps({ release }) {
  return { release };
}

Release.propTypes = {
};

export default connect(mapStateToProps)(Release);