import React,{ Component, PropTypes } from 'react';
import Modal from 'react-modal';
import {Button, Upload,Icon ,Input,message} from 'antd';
import styles from './editApplication.less';
import FileInput from '../../utils/fileInput';
import { fetchUpdatePhoto,fetchUpdateVideo } from '../../services/role';
import { fetchModifyApply } from '../../services/my';
import pathToRegexp from 'path-to-regexp';
import relanding from '../../utils/relanding'

var config ={
    userInfo:JSON.parse(localStorage.getItem('MY_USER_INFO')),
};

var roleValue = '';

class EditApplication extends Component{
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
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        const match = pathToRegexp('/me/application/edit/:editId').exec(this.props.location.pathname);
        if (match) {
            roleValue = match[1]
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
                id:roleValue,
            }
            fetchModifyApply(parmas).then((value)=>{
                if (value.data.success) {
                     alert('报名'+value.data.success);
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

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    getUserInfo(){
        this.setState({photoUrl:config.userInfo.userAtom.headImg});
        this.closeModal();
    }

    render(){
        return (
            <div>
            <Modal
                isOpen={this.state.modalIsOpen}
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

EditApplication.propTypes = {
};

export default EditApplication;