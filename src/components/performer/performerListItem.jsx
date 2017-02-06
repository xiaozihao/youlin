import React,{ Component, PropTypes } from 'react';
import { Tag,Card,Icon,Button } from 'antd';
import { Link } from 'dva/router';
import styles from './performerListItem.less';
import img from '../../assets/actor/activity1.png';

const PerformerListItem = ({
  nickName,
  ageGroup,
  tags,
  sex,
  createTime,
  height,
  weight,
  specialtys,
  cover,
  hotDegree
}) => {

  let vTags = [];
  if (eval(tags)) {
    for (var i = 0; i < eval(tags).length; i++) {
        vTags.push(<Tag key = {i} className={styles.tag}>{eval(tags)[i].tagsname}</Tag>);
    }
  }

  let specialtysTag =[];

  if (eval(specialtys)) {
    for (var i = 0; i < eval(specialtys).length; i++) {
      specialtysTag.push(<Tag key = {i} className={styles.tag}>{eval(specialtys)[i].tagsname}</Tag>);
    }
  }


return (	
	<div className = { styles.normal}>
        <div className = { styles.customCard}>
    			<div className = {styles.customImage}>
            <div style = {{ position:'relative' }}>
                <img alt="example" width="100%" height="200" src = {cover}/>
      				<p className={styles.recommend}>推荐</p>

      				<div className={styles.topHot}>
      					<Icon className={styles.hot} type="" /><span>{hotDegree}</span>
      				</div>
              </div>

        			<div style = {{margin:5}}>
        				<div className = { styles.opus }>
                    <div>
      					<p>{nickName}</p>
      					<p>{ageGroup}</p>
                    </div>
    					<div>
                            {vTags}
    					</div>
        			</div>

                    
                    
        			<div className = { styles.time }>
                        <div>
              				<span>{sex === 1 ?'女':'男'} </span>
                        <span>&nbsp;{height}&nbsp;cm&nbsp;&nbsp;&nbsp;{weight}&nbsp;kg</span>
                    </div>
    			 		<div className={styles.tag}>
    					   {specialtysTag}
    					</div>
        				</div>
        			</div>
    		</div>
		</div>
	</div>
  );
};

PerformerListItem.propTypes = {
  ageGroup:PropTypes.string,
  nickName:PropTypes.string,
  sex:PropTypes.number,
  tags:PropTypes.string,
  createTime:PropTypes.number,
  specialtys:PropTypes.string,
  tags:PropTypes.string,
  weight:PropTypes.number,
  height:PropTypes.number,
  hotDegree:PropTypes.string,
  cover:PropTypes.string,
};

export default PerformerListItem;

