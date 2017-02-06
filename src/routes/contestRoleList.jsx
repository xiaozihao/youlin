import React,{ Component, PropTypes } from 'react';
import { Row, Col ,Tag ,Icon ,Button} from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './contestRoleList.less';
import ContestRoleListItem from '../components/contest/contestPollListItem';
import ranking_header from '../assets/icon/ranking_header.png';

class ContestRoleList extends  Component{

    onChange(groundId){
        if (this.props.changeClick) {
            this.props.changeClick(groundId);
        }
    }

    render(){

        const { roleData,data,groundId} = this.props;
        console.log(roleData);

        let no_1,no_2,no_3;
        
        return(
            <div className = {styles.normal}>
                <ul className = {styles.items}>
                    {
                        roleData.map((data,i)=>{
                            return(
                                <div key = {i} >
                                    <li className = { styles.item} onClick = {()=>this.onChange(groundId)}>
                                        <img src = {data.movieRoleAtom.cover?data.movieRoleAtom.cover:ranking_header} className = {styles.itemPoster}/>
                                        <p>{data.movieRoleAtom.name}</p>
                                    </li>
                                </div>
                            );
                        })
                    }
                </ul>

                <div className={styles.rank}>

                    <p className={styles.ranktitle}>本角色排行榜</p>
                    <div className = {styles.ranklist}>
                        <div>
                            <img className = {styles.no2Img}/>
                            <p>NO2</p>
                            <p>魏晨-20票</p>
                        </div>
                        <div>
                            <div style = {{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                                <div className = {styles.crown}/>
                                <img className = {styles.no1Img}/>
                                </div>

                                <p>NO1</p>
                                <p>赵总-80票</p>
                            </div>
                            <div>
                                <img className = {styles.no3Img}/>
                                <p>NO3</p>
                                <p>张三-20票</p>
                            </div>
                        </div> 
                    </div>
                    {
                        data.map((data,i)=>{
                            console.log(data);
                            return(
                                <Link to={`rolePerformerInfo/groundId=${groundId}&roleId=${data.roleAtom.id}`}>
                                    <ContestRoleListItem
                                      key = {i}
                                      number = { i+1 }
                                      name = {data.roleAtom.name}
                                      totalRank = { data.roleAtom.headPortrait }
                                    />
                                </Link>
                            );
                           
                        })
                    }
                 
                <div>
            </div>
        </div>
        );
    }
}

ContestRoleList.propTypes = {
    location:PropTypes.object,
    roleData:PropTypes.array,
    data:PropTypes.array,
    groundId:PropTypes.number,
};

export default ContestRoleList;
