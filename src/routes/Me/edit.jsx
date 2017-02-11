import React,{ Component, PropTypes } from 'react';
import { Menu,Affix } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './edit.less';

import BaseInfo from './BaseInfo';
import UpdatePhotos from './UpdatePhotos';
import UpdateVideo from './UpdateVideo';
import PerformExperience from './PerformExperience';

import { fetchUpdatePhoto,fetchAccessToken } from '../../services/role';

var config ={
    userInfo:JSON.parse(localStorage.getItem('MY_USER_INFO')),
};

const EditType = {
	data:PropTypes.array,
    edit:PropTypes.object,
};

const Item = Menu.Item;

class Edit extends Component{
    constructor(props){
        super(props);
        this.state={
            selectItem: 'info',
            component:'',
            coverUrl:'',
            loading:true,
            error:'',
            trailersUrl:'',
            introduceMyselfMoveUrl:'',
        }
    }

    componentWillMount() {
        if(config.userInfo!= null && config.userInfo.userAtom && config.userInfo.userAtom.mobile){
           this.setState({
                coverUrl:config.userInfo.userAtom.cover,
                trailersUrl:config.userInfo.userAtom.trailersUrl,
                introduceMyselfMoveUrl:config.userInfo.userAtom.introduceMyselfMoveUrl,
            });
        } else {
            //this.context.router.push('/signup');
            window.location.href = '/#/signup';
            window.location.reload();
        }
    }

    componentDidMount() {
        fetchAccessToken().then(value => {
            console.log(JSON.stringify(value));
        },error => {);
    }

    onSelect(e){
        this.setState({selectItem:e.key});
    }

    sumbitUserInfo(data){
        this.props.dispatch({
            type:'edit/savaUerInfo',
            payload:data,
        });
        var userInfo = JSON.parse(localStorage.getItem('MY_USER_INFO'));
        if (!userInfo) {
            return;
        }

        function merge(res, des) {
            Object.keys(res).map(function(key) {
                des[key] = res[key];
            });
            return des;
        }

        userInfo.userAtom = merge(data, userInfo.userAtom);
        localStorage.MY_USER_INFO = JSON.stringify(userInfo);
    }

    updateCover(files){
        var formData = new FormData();
        formData.append('userfile',files[0]);

        fetchUpdatePhoto(formData).then(
            value => {
                this.setState({cover:value.data.url});
                this.props.dispatch({ type:'edit/setCover',payload:{cover:value.data.url}});
                },
            error => this.setState({error: error})
        );
    }         

    updateHeaderImage(files){
        var formData = new FormData();
        formData.append('userfile',files[0]);

        fetchUpdatePhoto(formData).then(
            value => this.props.dispatch({ type:'edit/setHeaderImage',payload:{headImg:value.data.url}}),
            error => this.setState({error: error})
        );
    }

    updateImage(files){
        var formData = new FormData();
        formData.append('userfile',files[0]);

        fetchUpdatePhoto(formData).then(
            value => this.props.dispatch({ type:'edit/setPhoto',payload:{albums:value.data.url}}),
            error => this.setState({error: error})
        );
    }

    updateFirstVideo(files){
        var formData = new FormData();
        formData.append('userfile',files[0]);
        fetchUpdateVideo(formData).then(
            value => {
                this.props.dispatch({ type:'edit/updatefirstVideo',payload:{trailersUrl:'',introduceMyselfMoveUrl:value.data.url}});
                this.setState({
                    introduceMyselfMoveUrl: value.data.url
                });
            },
            error => this.setState({error: error})
        );
    }

    updateSecondVideo(files){
        var formData = new FormData();
        formData.append('userfile',files[0]);
        fetchUpdateVideo2(formData).then(
            value => {
                this.props.dispatch({ type:'edit/updateSecondVideo',payload:{trailersUrl:value.data.url,introduceMyselfMoveUrl:''}});
                this.setState({
                    trailersUrl: value.data.url
                });
            },
            error => this.setState({error: error})
        );
    }

    onDelectExperience(id){
        this.props.dispatch({
            type:'edit/delectExperience',
            payload:{id:id}
        })
    }


 	render(){

        const { 
            persionTag,
            specialtyTag,
            coverUrl,
            headImageMessage,
            photoMessage,
            experienceData,
            delectSuccess,
            trailersUrl,
            introduceMyselfMoveUrl,
        } = this.props.edit;

        let component;
        if (this.state.selectItem === 'info') {
            component = <BaseInfo 
                        persionTag = {persionTag} 
                        specialtyTag = {specialtyTag} 
                        submitData = {(data)=>{this.sumbitUserInfo(data)}}
                        />;
        }else if(this.state.selectItem === 'photo'){
            component = <UpdatePhotos
                            updateCover = {this.updateCover.bind(this)}
                            updateHeaderImage = {this.updateHeaderImage.bind(this)} 
                            updateImage = {this.updateImage.bind(this)}
                        />; 
        }else if(this.state.selectItem === 'video'){
            component = <UpdateVideo
                            trailersUrl = {this.state.trailersUrl}
                            introduceMyselfMoveUrl = {this.state.introduceMyselfMoveUrl}
                            updateVide_30 = {(e)=>this.updateFirstVideo(e)}
                            updateVide_40 = {(e)=>this.updateSecondVideo(e)}
                        />; 
        }else if(this.state.selectItem === 'experience'){
            component = <PerformExperience
                            data = {experienceData}
                            onDelect = {(id)=>this.onDelectExperience(id)}
                        />; 
        }else{

        }

	 	return (
            <div>
                <div>
                    <img src = {this.state.coverUrl } style ={{backgroundSize: 'cover',width:'100%',height:180}}/>
                </div>
               
                <div>
                    <Affix>
    	    		<Menu 
                        className = {styles.customMenu}
                        mode = "horizontal"
                        selectedKeys={[this.state.selectItem]}
                        onSelect = {(e)=>this.onSelect(e)}
                    >
                        <Item key={'info'} className = { styles.customMenuItem }>个人资料</Item>
                        <Item key={'photo'} className = { styles.customMenuItem }>照片</Item>
                    	<Item key={'video'} className = { styles.customMenuItem }>视频</Item>
                    	<Item key={'experience'} className = { styles.customMenuItem }>演员经历</Item>
                    </Menu>
                    </Affix>
                    <div>{ component }</div>
                </div>
            </div>
		);
	}
};

function mapStateToProps({ edit }) {
  return { edit };
}

Edit.propTypes = EditType;

export default connect(mapStateToProps)(Edit);