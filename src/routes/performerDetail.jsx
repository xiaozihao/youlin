import React,{ PropTypes,Component } from 'react';
import { Tag ,Button ,Icon } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './performerDetail.less';
import vote from '../assets/crew/vote.png'
import share from '../assets/crew/share.png'
import img from '../assets/actor/search.png';
import Modal from 'react-modal';

import videoIcon from '../assets/icon/video.png';
import photoIcon from '../assets/icon/photo.png';
import coverIcon from '../assets/icon/actorDetail.png';


var data = {
    nickName:'',
    ageGroup:'' ,
    birthDate:'' ,
    constellation:'',
    cover:'',
    description:'',
    height:'',
    hotDegree:'',
    photos:'',
    residentCity:'',
    tags:[],
    introduceMyselfMove:'',
    weight:'',
    id:'',
    roleAtoms:'',
};
var names = ['张飞', '赵云' ];

var tags = [];

class PerformerDetail extends Component{

    constructor(props){
        super(props);
        this.state={
             modalIsOpen: false,
        }
        this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    openModal() {
        var data = this.props.performerDetail.resultObject;
        if (data.roleAtoms && data.roleAtoms[0]) {
            this.props.dispatch({ type: 'performerDetail/shareCanvassingId', payload:{recordId:data.roleAtoms[0].id}});
        }
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    componentDidMount() {

    }


    render(){
        const { resultObject, canvassingId } = this.props.performerDetail;

        console.log(canvassingId);

            if(resultObject.length !== 0){
                data.nickName = resultObject.performerAtom.nickName;
                data.ageGroup = resultObject.performerAtom.ageGroup;
                data.constellation = resultObject.performerAtom.constellation;
                data.birthDate = resultObject.performerAtom.birthDate;
                data.cover = resultObject.performerAtom.cover;
                data.description = resultObject.performerAtom.description;
                data.height = resultObject.performerAtom.height;
                data.hotDegree = resultObject.performerAtom.hotDegree;//票数
                data.photos = resultObject.performerAtom.photos;
                data.residentCity = resultObject.performerAtom.residentCity;
                data.tags = eval(resultObject.performerAtom.tags);
                data.introduceMyselfMove = resultObject.performerAtom.introduceMyselfMove;
                data.weight = resultObject.performerAtom.weight;
                data.roleAtoms = resultObject.roleAtoms;
                data.id = resultObject.performerAtom.id;

                
            }

            var competeRole = [];
            if(!!data.roleAtoms){
                for (var i = 0; i < data.roleAtoms.length; i++) {
                   competeRole.push(<p key= {i} >竞演角色{i+1}:{data.roleAtoms[i].name}</p>)
                }
            }

            return (
                <div style = {{marginBottom:50}}>
                    <img src={data.cover?data.cover:coverIcon} style = {{height:170,width:'100%',display:'flex',justifyContent:'space-between',position:'relative'}}/>
                    <div className= {styles.topBox}>
                        <div>
                            <p>{data.nickName}</p>
                            <p>{'有档期'}</p>
                        </div>
                        <div>
                            <span>{data.hotDegree}票</span>
                            <span onClick={()=>this.openModal()}>分享</span>
                        </div>
                    </div>

                    <div className={styles.profile}>
                        <div>
                            <p className={styles.name}>个人简介</p>
                            <p>{data.constellation}</p>
                            <div className={styles.tags}>
                                <span className={styles.tag1}>标签：</span>
                                <div>
                                    {
                                      data.tags !== null? data.tags.map((value,i)=>{
                                            return<Tag key= {i} className={styles.tag}>{value.tagsname}</Tag>
                                        }):[]
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.role}>
                        <div>
                            <p className={styles.name}>竞演角色</p>
                            { competeRole}
                        </div>
                        <p className={styles.more}><Link to = {`hotRole/hotRoleItem/${data.id}`}>更多>></Link></p>
                    </div>
                    <div className={styles.essential}>
                        <p className={styles.name}>基本信息</p>
                        <div className={styles.personalData}>
                            <div>
                                <span>居住地：{ data.residentCity}</span>
                                <span>星座：{data.constellation}</span>
                            </div>
                            <div>
                                <span>身高：{data.height}</span>
                                <span>体重：{data.weight}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.photo}>
                        <p className={styles.name}>照片展示</p>
                        <div className={styles.exhibition}>
                            <img src={ data.photos?data.photos:photoIcon}/>
                        </div>
                    </div>
                    <div className={styles.video}>
                        <p className={styles.name}>视频展示</p>
                        <div>
                        <video poster = {videoIcon} src={ data.residentCity} controls="controls" className={styles.videos}>
                        </video>
                        </div>
                    </div>

                    <div className={styles.canvass}>
                        <Button type="primary" className={styles.btn1}><img src={vote}/>
                            <a href={`http://iwantfame.91youlin.com/wxpay/?roleId=${data.id}&canvassingId=${canvassingId}`} target="_blank">给他投票</a>
                        </Button>
                        <Button onClick={()=>this.openModal()} type="primary" className={styles.btn2}><img src={share}/>为他拉票</Button>
                    </div>

                    <Modal
                        isOpen={this.state.modalIsOpen}
                        // onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                    >
                        <img onClick = {()=>this.closeModal()} src = {img} width = '100%' height = '100%'/>
                    </Modal>
                </div>
            );
        }
}
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    padding: 0,
    transform             : 'translate(-50%, -50%)',
  }
};

function mapStateToProps({ performerDetail }) {
  return { performerDetail };
}

PerformerDetail.propTypes = {

};

export default connect(mapStateToProps)(PerformerDetail);
