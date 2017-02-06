import React,{Component,PropTypes }from 'react';
import { Tag,Input ,Icon ,Button} from 'antd';
import { connect } from 'dva';
import styles from './otherComment.less';
import CommentRow from '../rankingList/commentRow';

function OtherComment({
    onSumbit,
    changeValue,
    data
}){

    return (
            <div>
                <div style ={{marginBottom:50}}>
                {
                  data.length ? (
                      data.map((value,key)=>{
                          return(
                               <CommentRow
                                title={ value.userName }
                                comment={ value.content }
                                date={ '' }
                                />       
                          )
                      })
                       
                  ):(
                    <div>暂时没有任何评价</div>
                  )
                }
                </div>
                <div className={styles.comment}>
                    <Input size="large" placeholder="来一条评论吧" onChange = {changeValue} className={styles.item}/>
                    <Button type="ghost" onClick = {onSumbit}>
                    <Icon type="check-circle-o" className={styles.icon}/>
                    </Button>
                </div>
            </div>
        );
};


OtherComment.propTypes = {
    location:PropTypes.object,
    onSumbit:PropTypes.func,
    changeValue:PropTypes.func,
    data:PropTypes.array,
};

export default OtherComment;