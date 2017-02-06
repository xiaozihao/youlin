import React,{ PropTypes,Component } from 'react';
import styles from './theatreGroupInfo.less';

const TheatreGroupInfoType = {
  // infoData: PropTypes.elememt,
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

function localTimeDay(nS){
	getDateTest();
	return new Date(parseInt(nS)).Format("dd"); 
}


function TheatreGroupInfo(props){

  const data = props.infoData;

  	var startTime = localTime(data.startTime);
	var stopTime = localTime(data.stopTime);
	var bootTime = localTime(data.bootTime);

  return(
  	<div>
	    <div className={styles.input}>
	        <p><span>剧名:</span>{data.title?data.title:''}<span className={styles.recruit}>招募中</span></p>
	        <p><span>题材:</span>{data.theme?data.theme:''}</p>
	        <p><span>影片类型:</span>{}</p>
	        <p><span>播放平台:</span>{}</p>
	        <p><span>开机时间:</span>{bootTime?bootTime:''}</p>
	        <p><span>招募开始时间:</span>{startTime?startTime:''}</p>
	        <p><span>招募结束时间:</span>{stopTime?stopTime:''}</p>
	        <p><span>拍摄地点:</span>{data.shootLocations?data.shootLocations:''}</p>
	        <p><span>拍摄周期:</span>{data.shootPeriod?data.shootPeriod:''}</p>
	        <p><span>出品公司:</span>{data.productCompany?data.productCompany:''}</p>
	        <p><span>出品人:</span>{data.productPersion?data.productPersion:''}</p>
	        <p><span>制片人:</span>{data.makingPersion?data.makingPersion:''}</p>
	        <p><span>执行制片人:</span>{data.performPersion?data.performPersion:''}</p>
	        <p><span>原著:</span>{data.originalWork?data.originalWork:''}</p>
	        <p><span>编剧:</span>{data.scriptwriterName?data.scriptwriterName:''}</p>
	        <p><span>导演:</span>{data.directorName?data.directorName:''}</p>
	        <p><span>顾问:</span>{data.counselorName?data.counselorName:''}</p>
	        <p><span>演员统筹:</span>{data.comprehensiveName?data.comprehensiveName:''}</p>
	        <p><span>演员统筹电话:</span>{data.comprehensiveMobile?data.comprehensiveMobile:''}</p>
	        <p><span>演员统筹邮箱:</span>{data.comprehensiveEmail?data.comprehensiveEmail:''}</p>
	        <p><span>演员统筹助理:</span>{data.comprehensiveAssistantName?data.comprehensiveAssistantName:''}</p>
	        <p><span>演员统筹助理电话:</span>{data.comprehensiveAssistantMobile?data.comprehensiveAssistantMobile:''}</p>
	        <p><span>总策划:</span>{data.schemeName?data.schemeName:''}</p>
	        <p><span>监制:</span>{data.producerName?data.producerName:''}</p>
	        <p><span>已定演员:</span>{}</p>
	        <p><span>副导演:</span>{}</p>
	        <p><span>副导演电话:</span>{}</p>
	        <p><span>副导演邮箱:</span>{data.assistantDirectorEmail?data.assistantDirectorEmail:''}</p>
	        <p><span>筹备地址:</span>{data.makeAddress ?data.makeAddress :''}</p>
	    </div>
      	
      	<div className={styles.introduction}>
          <p><span>剧情介绍:</span>{}</p>
          <p><span>暂时报名:</span>{}</p>
      	</div>
      	
      	<p className={styles.publicity1}>关于“共同抵制虚假组讯”的公示</p>
      	<p className={styles.publicity2}>平台所有组讯均由剧组提供，如您在浏览组讯时发现"虚假或诈骗"信息,请第一时间点击海报右下角的举报按钮,我们将及时及时处理,以保证演员同胞们的权利;</p>
    
    </div>
  )
}

TheatreGroupInfo.propTypes = TheatreGroupInfoType;

export default TheatreGroupInfo;
