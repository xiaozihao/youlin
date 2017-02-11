import React,{PropTypes} from 'react';
import { Link } from 'dva/router';
import styles from './hotRoleListItem.less';
import header from '../../assets/icon/header.png';
import rankingHeader from '../../assets/icon/ranking_header.png';

const HotRoleListItem = ({
  name,
  character,
  trait,
  description,
  performers,
  cover,
  groupId,
  id,
  people
}) => {

  return (
    <div className = { styles.normal }>
        <div className = { styles.row }>
          	<img width = '80' height = '80' src ={cover?cover:header}/>
          	<div className = { styles.rowRigth }>
          		<p>{name}
                    <Link to={`rolePerformerInfo/groundId=${groupId}&roleId=${id}`}>
                        <span className = {styles.applicationState}>报名</span>
                    </Link>
                </p>
          		<p>性格：{character}</p>
          		<p>特征：{trait}</p>
          		<p>{description}</p>
          	</div>
        </div>
        <div className = { styles.enlist }>
              {
                  performers.map((data,i)=>(
                      <img
                        src = {data?data:rankingHeader}
                        key = {i}
                      />
                  ))
                }
              <div>
                <p>已报名:{people}人</p>
                <p></p>
              </div>
        </div>
    </div>
  );
};

HotRoleListItem.propTypes = {
    name:PropTypes.string,
    character:PropTypes.string,
    trait:PropTypes.string,
    description:PropTypes.string,
    performers:PropTypes.array,
    cover:PropTypes.string,
    groupId:PropTypes.number,
    id:PropTypes.number,
    people:PropTypes.number,
};

export default HotRoleListItem;
