import React,{PropTypes,Component} from 'react';
import styles from './allRoleListItem.less';
import { Icon,Button } from 'antd';
import { Link } from 'dva/router';
import thumb_up from '../../assets/rank/thumb_up.png';
import vote from '../../assets/rank/vote.png';
import isvote from '../../assets/rank/isvote.png';
import headImage from '../../assets/icon/header.png';


let vUpCount = 0;

class AllRoleListItem extends Component{


    constructor(props) {
        super(props);
        this.state = {
            upCount:props.upCount,
        };
    }

    onChangeClick(){

        if (this.props.isThumbUp) {
            this.setState({upCount: this.state.upCount+1});
        }
        if (this.props.upCountClick) {
            this.props.upCountClick(this.props.recordId);
        }
       
    }

    render(){
        const { heatCount,nickName,roleName,ranking,
                tagNames,headPortrait,upCount,voteCount,
                upCountClick,voteCountClick,roleId
            } = this.props; 

         return (
            <div>
                <div className={styles.box}>
                    <div className={styles.boxTop}>
                        <img src = {headPortrait?headPortrait:headImage}/>
                        <div className={styles.character}>
                            <p>{nickName}</p>
                            <p>
                                <span>《水浒传》</span>
                                <span className={styles.fontColor}>{roleName}</span>
                                <span>第{ranking}名</span>
                                <span className={styles.fontColor}>{heatCount}</span>
                                <span>热度</span>
                            </p>
                            <span className={styles.tag}>标签：{tagNames}</span>
                        </div>
                    </div>
                    <div className={styles.botton}>
                        <div className={styles.boxBotton}>
                            <div className={styles.count} onClick={()=>this.onChangeClick()}>
                                <img src = {thumb_up}/>
                                <span>{this.state.upCount}</span>
                            </div>
                            <Link href={`http://iwantfame.91youlin.com/wxpay/?roleId=${roleId}`} target="_blank">
                                <div className={styles.count}><img src = {vote}/><span>{voteCount}</span></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
   
};

AllRoleListItem.propTypes = {
    heatCount:PropTypes.number,
    nickName:PropTypes.string,
    roleName:PropTypes.string,
    ranking:PropTypes.number,
    tagNames:PropTypes.string,
    headPortrait:PropTypes.string,
    upCount:PropTypes.number,
    voteCount:PropTypes.number,
    upCountClick:PropTypes.func,
    voteCountClick:PropTypes.func,
    recordId:PropTypes.number,
    roleId:PropTypes.number,
    isThumbUp:PropTypes.bool,
};

export default AllRoleListItem;