import React,{ PropTypes,Component } from 'react';
import { Tag ,Button ,Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './rolePerformerInfo.less';
import Modal from 'react-modal';
import pathToRegexp from 'path-to-regexp';
import img from '../../assets/actor/search.png';

import videoIcon from '../../assets/icon/video.png';
import photoIcon from '../../assets/icon/photo.png';
import coverIcon from '../../assets/icon/actorDetail.png';
import rankingHeader from '../../assets/icon/ranking_header.png';

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
    tags:'',
    introduceMyselfMove:'',
    weight:'',
    status:'',
    id:'',
    userId:'',
};

let roldIdNumber,groundIdNumber;

class PersonalInfo extends Component{

    constructor(props){
        super(props);
        this.state={
             modalIsOpen: false,
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    signup(){
        var myUserInfo = JSON.parse(localStorage.MY_USER_INFO);
        if (myUserInfo && myUserInfo.targetObject) {
            switch(myUserInfo.targetObject.status) {
                case 1: 
                this.context.router.push('/me/edit');
                break;
                
                case 2 :
                this.context.router.push(`/rolePerformerInfo/signup/roleId=${this.props.roleId}&groupId=${this.props.groundId}`);
                break;

                default : alert('此账号被封，请联系客服'); break;
            }
        } else {
            this.context.router.push('/me/edit');
        }
    }
    
    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {

    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render(){

    const data = this.props.data; 
    let vtags = [];
    var competeRole = [];

    if(data !== 0){
        console.log(data.performerAtom);
        if (data.performerAtom) {
            // console.log(data.performerAtom.ageGroup);
            data.nickName = data.performerAtom.nickName;
            data.ageGroup = data.performerAtom.ageGroup;
            data.constellation = data.performerAtom.constellation;
            data.birthDate = data.performerAtom.birthDate;
            data.cover = data.performerAtom.cover;
            data.description = data.performerAtom.description;
            data.height = data.performerAtom.height;
            data.hotDegree = data.performerAtom.hotDegree;//票数
            data.photos = data.performerAtom.photos;
            data.residentCity = data.performerAtom.residentCity;
            data.tags = data.performerAtom.tags;
            data.introduceMyselfMove = data.performerAtom.introduceMyselfMove;
            data.weight = data.performerAtom.weight;
            data.roleAtoms = data.roleAtoms;
            data.status = data.performerAtom.status;
            data.id = data.performerAtom.id;
            data.userId = data.performerAtom.userId;

            try {
                if (eval(data.tags)) {
                    for (let i = 0; i < eval(data.tags).length; i++) {
                        vtags.push(<Tag className={styles.tag}>{data.tags[i].tagsname}</Tag>);
                    }
                }

                if(!!data.roleAtoms){
                    for (var i = 0; i < data.roleAtoms.length; i++) {
                       competeRole.push(<p key= {i} >竞演角色{i+1}:{data.roleAtoms[i].name}</p>)
                    }
                }
            } catch(e) {}   
        }        
    }

    return (
        <div>
            <div className={styles.profile}>
                <div>
                    <img src = {data.cover?data.cover:rankingHeader} className={styles.img}/>
                    <p>{data.nickName}</p>
                </div>
                <div>
                    <p className={styles.name}>个人简介</p>
                    <p>{data.description}</p>
                    <div>
                        <span>标签:</span>
                        { vtags }
                    </div>
                </div>
            </div>
            <div className={styles.role}>
                <div>
                    <p className={styles.name}>竞演角色</p>
                        {competeRole}
                </div>
                <Link to = {`hotRole/hotRoleItem/${data.id}`}>更多>></Link>
            </div>
            <div className={styles.essential}>
                <p className={styles.name}>基本信息</p>
                <div className={styles.personalData}>
                    <div>
                        <span>居住地:{data.residentCity}</span><span>星座:{data.constellation}</span>
                    </div>
                    <div>
                        <span>身高:{data.height}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span>体重:{data.weight}</span>
                    </div>
                </div>
            </div>
            <div className={styles.photo}>
                <p className={styles.name}>照片展示</p>
                <div className={styles.exhibition}>
                    <img src = {data.photos?data.photos:photoIcon}/>
                </div>
            </div>
            <div className={styles.video}>
                <p className={styles.name}>视频展示</p>
                <video poster = {videoIcon} src={data.introduceMyselfMove} type="video/mp4">
                </video>
            </div>
            <div className={styles.canvass}>
                <Button type="primary" className={styles.btn}><Icon type="link" />
                     <a href={`http://iwantfame.91youlin.com/wxpay/?roleId=${ data.id}`} target="_blank">给他投票</a>
                </Button>
                <Button type="primary" onClick={()=>this.openModal()} className={styles.btn} ><Icon type="link" />为他投票</Button>
                <Button type="primary"  onClick={()=>{this.signup()}} className={styles.btn}>
                    <Icon type="link" />
                    我要报名
                </Button>
            </div>

            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
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

PersonalInfo.contextTypes = { router: PropTypes.object.isRequired }

PersonalInfo.propTypes = {
    data:PropTypes.object,
    roleId:PropTypes.number,
    groundId:PropTypes.number,
};

export default PersonalInfo;