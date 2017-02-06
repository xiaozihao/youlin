import React,{ Component, PropTypes } from 'react';
import { Menu,Affix} from 'antd';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import RolePerformerInfo from '../components/performer/rolePerformerInfo';
import OtherComment from '../components/performer/otherComment';
import FocusBar from '../components/FocusBar';

import banner from '../assets/crew/banner.png';

const styles = {
   'tab':{
        width: '100%',
        fontSize: 16,
    },

   'tabItem':{
        width: '50%',
        textAlign: 'center',
        color: '#FE7E14',
    },
};

const Item = Menu.Item;

let roldIdNumber,groundIdNumber;

class ActorInfo extends Component{

    constructor(props) {
        super(props);
        this.state = {
          selectItem: 'persionInfo',
          commentValue:'',
        };
    }

    componentWillMount(){
      	const match = pathToRegexp('/rolePerformerInfo/:groundId&:roleId').exec(this.props.location.pathname);
        if (match) {
            const roleId = match[2];
            const groundId = match[1];
            groundIdNumber = groundId.replace(/[^0-9]/ig,"");
            roldIdNumber = roleId.replace(/[^0-9]/ig,"");
        }   
    }

    componentDidMount(){

    }

    onSelect(e,userId){

        this.setState({selectItem:e.key});

        if (e.key === 'otherComment') {
            this.props.dispatch({type: 'actorInfo/otherComment',payload:{toUserId:userId,pageNo:0,pageSize:100} });
        }
    }

    onCollection(){

    }

    changeValue(e){
        const value = e.target.value;
        this.setState({commentValue:value});
    }

    onSumbit(userId){
        if (this.state.commentValue) {
            this.props.dispatch({
                type:'actorInfo/submitComment',
                payload:{content:this.state.commentValue,toUserid:userId}
            })
        }else{
            alert('没有任何评价！');
        }
        
    }

    render() {

    const { infoData,commnetData } = this.props.actorInfo;

    return (  
        <div>
            <img src = {banner} width='100%' height = '170'/>
            <Menu 
                style = {styles.tab}
                mode = "horizontal"
                selectedKeys={[this.state.selectItem]}
                onSelect = {(e)=>this.onSelect(e,infoData.userId)}
            >
                <Item key={'persionInfo'} style = { styles.tabItem }>个人信息</Item>
                <Item key={'otherComment'} style = { styles.tabItem }>他人评价</Item>
            </Menu>
            <div>
                {
                    this.state.selectItem === 'persionInfo' ? 
                    <RolePerformerInfo
                        data ={infoData}
                        roleId = {roldIdNumber}
                        groundId = {groundIdNumber}
                    />: <OtherComment
                            data = {commnetData}
                            changeValue = {(e)=>this.changeValue(e)}
                            onSumbit = {()=>this.onSumbit(infoData.userId)}
                    />
                }
            </div>
        </div>
    );
  }
};


function mapStateToProps({ actorInfo }) {
  return { actorInfo };
}

ActorInfo.propTypes = {
    dispatch:PropTypes.func,
};

export default connect(mapStateToProps)(ActorInfo);