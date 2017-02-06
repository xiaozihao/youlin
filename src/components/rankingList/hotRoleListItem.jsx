import React,{PropTypes} from 'react';
import styles from './hotRoleListItem.less';
import header from '../../assets/icon/header.png';
import rankingHeader from '../../assets/icon/ranking_header.png';

const HotRoleListItem = ({
  name,
  character,
  trait,
  description,
  performers,
  cover
}) => {


  return (
    <div className = { styles.normal }>
      <div className = { styles.row }>
      	<img width = '80' height = '80' src ={cover?cover:header}/>
      	<div className = { styles.rowRigth }>
      		<p>{name}</p>
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
            <p>已报名:{performers.length}人</p>
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
};

export default HotRoleListItem;
