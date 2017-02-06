import React,{PropTypes} from 'react';
import styles from './ReleaseList.less';

const ReleaseList = ({dramaName,release,person,applicant,bootTime,endTime}) => {

    let status = '';
    switch(release){
        case 0:
        status = '审核中';
        break;

        case 1:
        status = '招募中';
        break;

        default :status = '开机';
        break;
    }

  return (
    <div className={styles.contact}>
    	<div className={styles.theatrical }>
    		<div className={styles.film} ><span>{dramaName}</span><span>{status}</span></div>
    		<p><span>角色：<span>{person}</span>个</span><span style={{ float:'right'}}>已申请<span>{applicant}</span>人</span></p>
    		<p><span>开机时间：<span>{bootTime}</span></span></p>
    		<p><span>截至招募时间：<span>{endTime}</span></span></p>
    	</div>
    </div>
  );
};

ReleaseList.propTypes = {
    dramaName:PropTypes.string,
    release:PropTypes.number,
    person:PropTypes.number,
    applicant:PropTypes.number,
    bootTime:PropTypes.string,
    endTime:PropTypes.string,
};

export default ReleaseList;
