import React,{ PropTypes,Component } from 'react';
import pathToRegexp from 'path-to-regexp';
import Modal from 'react-modal';
import { Menu,Affix } from 'antd';
import { connect } from 'dva';
import FocusBar from '../components/FocusBar';
import {fetchWXToken} from '../services/wxpay';
import TheatreGroupInfo from '../components/theatreGroup/TheatreGroupInfo';
import TheatreGroupRoleList from './theatreGroupRoleList';
import img from '../assets/actor/search.png';
import styles from './theatreGroupDetail.less'

const defaultProps = {

};

const propTypes = {
  theatreGroupDetail:PropTypes.object,
  dispatch:PropTypes.func,
  location:PropTypes.object,
};

const Item = Menu.Item;

class TheatreGroupDetail extends Component{ 

    constructor(props){
        super(props);
        this.state={
            selectItem: 'crewInfo',
            loading:true,
            cover:'',
            modalIsOpen: false,
            collectionId:1,
            curPageNo:1,
            isCheckRold:false,
            roleData:[],
        }
        this.openModal = this.openModal.bind(this);
        // this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        document.title = '我要成名';
    }   

    componentWillUnmount(){
         window.location.reload();    
    }

    onSelect(e){
        this.setState({selectItem:e.key});
        if (e.key === 'roleInfo') {
            this.setState({collectionId:2});
        }else{
            this.setState({collectionId:1});
        }   
    }

    onCollection(type,id){
        this.props.dispatch({ type:'theatreGroupDetail/collection', payload:{ type:type,id:id} });
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }  

    getDateTest(){
        Date.prototype.Format = function (fmt) { //author: meizz   
        var o = {  
            "M+": this.getMonth() + 1, //月份   
            "d+": this.getDate(), //日   
            "h+": this.getHours(), //小时   
            "m+": this.getMinutes(), //分   
            "s+": this.getSeconds(), //秒   
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
            "S": this.getMilliseconds() //毫秒   
        };  
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
        for (var k in o)  
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
        return fmt;  
        }
    }

    localTimeDay(nS){
        this.getDateTest();
        return new Date(parseInt(nS)).Format("dd"); 
    }

    onNextPage(){
        this.props.dispatch({ type:'theatreGroup/roleInfo',payload:{groupId:groundId,ids:[],pageNo:this.state.curPageNo + 1,pageSize:10}});
        this.setState({curPageNo: this.state.curPageNo + 1});
    }

    render(){
        const { crewInfo,roleInfo,isCollection,nextPage } = this.props.theatreGroupDetail;
        const roledata = this.state.roleData.concat(roleInfo);

        var now = this.localTimeDay(Date.now());
        var createTime = this.localTimeDay(crewInfo.createTime);

        var vNextPage;
        if (nextPage) {
            vNextPage = (<button onClick={()=>this.onNextPage()}>点击加载更多</button>);
        } else {
            vNextPage = (<p>没有更多数据...</p>);
        }   

        return (
            <div>
                <FocusBar
                    isNewest = {crewInfo.isNewest}
                    Keyword2 = {createTime === now?'今日新剧':''}
                    isFirst = {crewInfo.isFirst}
                    cover = {crewInfo.cover}
                    onShare = {()=>this.openModal()}
                    onCollection = {this.onCollection.bind(this,this.state.collectionId,crewInfo.id)}
                    isCollection = { isCollection }
                    status = {crewInfo.status}
                />
                <Menu 
                    className = {styles.menu}
                    mode = "horizontal"
                    selectedKeys={[this.state.selectItem]}
                    onSelect = {(e)=>this.onSelect(e)}
                >
                    <Item key={'crewInfo'} className = { styles.menuItem }>剧组信息</Item>
                    <Item key={'roleInfo'} className = { styles.menuItem }>演员信息</Item>
                </Menu>
                <div>
                    {
                        this.state.selectItem === 'crewInfo' ? 
                        <TheatreGroupInfo infoData = {crewInfo}/> :
                        (<div>
                            <TheatreGroupRoleList data = { roledata }/>
                            <div style = {{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:20}} className = {styles.loadMoreButton}>{vNextPage}</div> 
                        </div>) 
                        
                    }
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
};

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

function mapStateToProps({ theatreGroupDetail }) {
  return { theatreGroupDetail };
}

TheatreGroupDetail.defaultProps = defaultProps;
TheatreGroupDetail.propTypes = propTypes;

export default connect(mapStateToProps)(TheatreGroupDetail);