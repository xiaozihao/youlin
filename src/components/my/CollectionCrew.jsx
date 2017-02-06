import React,{ Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import styles from './CollectionCrew.less';
import colletcionCrew from '../../assets/icon/collection_crew.png';


function timeStamp(nS){
    getDateTest();
    return new Date(parseInt(nS)).Format("yyyy-MM-dd"); 
}

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


function CollectionCrew(props){
    const { data } = props;
    return (
        <div>
            {
                data.map((value,i)=>{
                    return(
                        <Link to={`theatreGroupDetail/${value.id}`}>
                            <div key= {i} className={styles.theatrical}>
                                <div>
                                    <p>{value.title?value.title:''}</p>
                                    <p>开机时间: {timeStamp(value.startTime)}</p>
                                </div>
                                <img src = {value.cover?value.cover:colletcionCrew}/>
                            </div>
                        </Link>
                    ) 
                })
            }
        </div>
      );  
}

CollectionCrew.propTypes = {
  data:PropTypes.array,
};

export default CollectionCrew;
