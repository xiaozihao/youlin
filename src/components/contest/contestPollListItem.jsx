import React,{PropTypes} from 'react';
import styles from './contestPollListItem.less';
import { Row, Col } from 'antd';
import img from '../on1.png'
import header from '../../assets/icon/ranking_header.png';

const ContestPollListItem = ({
    number,name,totalRank,cover
}) => {

  return (
        <div className={styles.normal}>
            <div className={styles.col}>
                <img src = {cover?cover:header}/>
                <p>NO{number}</p>
                <p>
                {name}
                { number === 1? <img src={img} />:''}
                </p>
            </div>
            <p>{totalRank}<span>票</span></p>
        </div>
  );
};

ContestPollListItem.propTypes = {
    number:PropTypes.number,
    name: PropTypes.string,
    totalRank:PropTypes.string,
    cover:PropTypes.string,
};

export default ContestPollListItem;
