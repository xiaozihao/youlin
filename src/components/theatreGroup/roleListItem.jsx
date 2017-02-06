import React,{ PropTypes } from 'react';
import { Tag ,Icon } from 'antd';
import { Link,browserHistory } from 'dva/router';
import styles from './roleListItem.less';
import ranking_header from '../../assets/icon/ranking_header.png';


const RoleListItem = ({
    name,
    linePosition,
    people,
    ageGroup,
    sex,
    roleTag,
    signUp,
    groupId,
    performerAtom,
    cover,
}) => {
  return (
    <div>
        <div className={styles.box}>
            <div className={styles.roleInfo}>
                <img src = {cover?cover:ranking_header} className={styles.headPortrait}/>
                <span>角色名:{name}</span>
            </div>
            <p>线位:{ linePosition }
                <Link to={`roleList/contestPoll/groupId=${groupId}`} style = {{ color:'#FE7E13',float:'right',marginLeft:10}}>查看排行榜</Link>
                <span>已申请{people}人</span>
            </p>
            <p>年龄段:{ageGroup}</p>
            <p>性别:{sex}</p>
            <p>角色标签:{roleTag}</p>
            <p>
                {
                    performerAtom.map((value,i)=>{
                        return(
                            <img src={value?value:ranking_header} className={styles.img}/>
                        )
                    })
                }
                <Icon type="ight-circle-o"  className={styles.icon}/>
                <span>{signUp}人</span>
                <span>已报名:</span>
            </p>
        </div>
    </div>
  );
};

RoleListItem.propTypes = {
    name:PropTypes.string,
    linePosition:PropTypes.string,
    people:PropTypes.number,
    ageGroup:PropTypes.string,
    sex:PropTypes.string,
    roleTag:PropTypes.string,
    signUp:PropTypes.number,
    groupId:PropTypes.number,
    performerAtom:PropTypes.array,
    cover:PropTypes.string,
};


export default RoleListItem;