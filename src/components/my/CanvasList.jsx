import React,{PropTypes } from 'react';
import styles from './CanvasList.less';

const CanvasList = ({name,voteName,voteNumber,income}) => {
  return (
    <div>
    	<div className={styles.canvassing}>
    		<p>{name}</p>
            <table>
                <tbody>
                    <tr>
                        <th>{voteName}</th>
                        <th><span>{voteNumber}</span>票</th>
                        <th>获益<span>{income}</span>元</th>
                    </tr>
                </tbody>
            </table>
    	</div>
        <div className={styles.canvassing}>
            <p>{name}</p>
            <table>
                <tbody>
                    <tr>
                        <th>{voteName}</th>
                        <th><span>{voteNumber}</span>票</th>
                        <th>获益<span>{income}</span>元</th>
                    </tr>
                    <tr>
                        <th>{voteName}</th>
                        <th><span>{voteNumber}</span>票</th>
                        <th>获益<span>{income}</span>元</th>
                    </tr>
                    <tr>
                        <th>{voteName}</th>
                        <th><span>{voteNumber}</span>票</th>
                        <th>获益<span>{income}</span>元</th>
                    </tr> 
                </tbody>
            </table>
        </div>
    </div>
  );
};

CanvasList.propTypes = {
    name:PropTypes.string,
    voteName:PropTypes.string,
    voteNumber:PropTypes.number,
    income:PropTypes.number,
};

export default CanvasList;
