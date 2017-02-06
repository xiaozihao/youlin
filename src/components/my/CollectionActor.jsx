import React,{PropTypes} from 'react';
import { Form, Input,Tag ,Button} from 'antd';
import { Link } from 'dva/router';
import styles from './CollectionActor.less';
import headerImage from '../../assets/icon/header.png';

function CollectionActor(props){
    const {data} = props;

    return (
        <div>
            {
                data.map((value,i)=>{
                    console.log(value);
                    return(
                        <Link  key = {i} to={`performer/detail/${value.id}`}>
                            <div className={styles.performer}>
                                <div className={styles.box}>
                                    <img src = {value.cover?value.cover:headerImage}/>
                                    <div>
                                        <p>{value.nickName}</p>
                                        <div>标签:
                                            {
                                              value.tags > 0 ? value.tags.map((tag)=> {
                                                return<Tag className={styles.tag}>{tag.id}</Tag>
                                              }):''
                                            }
                                        </div>
                                        <p>个人介绍：{value.description}</p>
                                    </div>
                                </div>
                           </div>
                       </Link>
                    );
                })
            }
        </div>
    );
};

CollectionActor.propTypes = {
  data:PropTypes.array,
};

export default CollectionActor;
// {
//             data.map((value,i)=>{
//                 <div className={styles.performer}>
//                     <div className={styles.box}>
//                         <img />
//                         <div>
//                             <p>{name}</p>
//                             <div>
//                                 {
//                                   tags.map((tag)=> {
//                                     return<Tag className={styles.tag}>{tag}</Tag>
//                                   })
//                                 }
//                             </div>
//                             <p>个人介绍：{introduction}</p>
//                         </div>
//                     </div>
//                 </div>
//             })
//           }