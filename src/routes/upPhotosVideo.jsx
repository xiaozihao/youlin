import React,{ Component, PropTypes } from 'react';
import Modal from 'react-modal';
import {Button, Upload,Icon ,Input,message} from 'antd';
import styles from './upPhotosVideo.less';
import FileInput from '../utils/fileInput';
import { fetchUpdatePhoto,fetchUpdateVideo,fetchSignup } from '../services/role';
import pathToRegexp from 'path-to-regexp';
import relanding from '../utils/relanding'

var config ={
    userInfo:JSON.parse(localStorage.getItem('MY_USER_INFO')),
};

var groundValue = '';
var roleValue = '';

class UpPhotosVideo extends Component{
    constructor(props){
        super(props);
        this.state={
             photoUrl : '',
             videoUrl : '',
             error:'',
             modalIsOpen: false,
             loading:true,
             roleId:'',
             groupId:'',
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        // if (!config.userInfo) {
        //      this.context.router.push('signup');
        // }
        const match = pathToRegexp('/rolePerformerInfo/signup/:roleId&:groupId').exec(this.props.location.pathname);
        if (match) {
           var roleId = match[1]
            var groundId = match[2];
            roleValue = roleId.replace(/[^0-9]/ig,"");
            groundValue =  groundId.replace(/[^0-9]/ig,"");
        }   
    }

    updatePhoto(files){
        this.closeModal();
        var formData = new FormData();
        formData.append('userfile',files[0]);

        fetchUpdatePhoto(formData).then( 
            value => this.setState({photoUrl:value.data.url}),
            error => this.setState({error: error})
        );
    }

    updateVideo(files){
        this.closeModal();
        var formData = new FormData();
        formData.append('userfile',files[0]);

        fetchUpdateVideo(formData).then(
            value => this.setState({videoUrl:value.data.url}),
            error => this.setState({error: error})
        );
    }

    onSure(){
        if (this.state.videoUrl && this.state.photoUrl) {
            var parmas = {
                photos:this.state.photoUrl,
                move:this.state.videoUrl,
                roleId:roleValue,
                groupId:groundValue,
            }
            fetchSignup(parmas).then((value)=>{
                if (value.data.success) {
                    alert('报名'+value.data.message);
                }else{
                    if (value.data.code === -10) {
                        alert('系统异常，请重试！');
                        relanding();
                    }
                }
               
            },(error)=>{
                this.setState({error: error})
            })

        }else{
            alert('请上传视频和照片，否则无法完成报名！');
        }
        
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.refs.subtitle.style.color = '#ff4455';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    getUserInfo(){
        config.userInfo = JSON.parse(localStorage.getItem('MY_USER_INFO'));
         // console.log(config.userInfo.);
         this.setState({photoUrl:config.userInfo.userAtom.headImg,videoUrl:config.userInfo.userAtom.introduceMyselfMoveUrl});
         this.closeModal();
    }

    render(){
        return (
            <div>
            <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className = {styles.modal}>
                    <FileInput onChange={(e)=>this.updatePhoto(e)} multiple={false} className={styles.modalBtn} btnValue = '拍一张'/>
                    <Button onClick={()=>this.getUserInfo()} className = {styles.modalBtn2}>个人资料</Button>
                    <FileInput onChange={(e)=>this.updateVideo(e)} multiple={false} className={styles.modalBtn3} btnValue = '手机视频'/>
                </div>
            </Modal>

              <p className={styles.title}>请上传贴合本角色的照片及视频</p>
                <div>
                    <img type = 'file' src = {this.state.photoUrl} onClick={()=>this.openModal()} className={styles.upPhoto} />
                </div>
                <div>
                    <video controls="controls" src = {this.state.videoUrl} onClick={()=>this.openModal()} multiple={false} className={styles.upVideo} />
                </div>
                <Button onClick={()=>this.onSure()} className={styles.upButton}>确定</Button>
            </div>

        ); 
    }
     
}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    // right                 : '0',
    // bottom                : '0',
    marginRight           : '-50%',
    padding               : '0',
    transform             : 'translate(-50%, -50%)',
  }
};

UpPhotosVideo.propTypes = {
};

export default UpPhotosVideo;
