import React,{ Component, PropTypes } from 'react';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';

import ContestPollList from '../components/contest/contestPollList';
import ContestRoleList from './contestRoleList';
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
    }
};

const tab_styles = {
    menuItem:{
        backgroundColor:'#ffffff',
        color:'#FC7E2A',
        fontSize:17,
    }
}

var valueId;

class ContestPoll extends Component{

    constructor(props){
        super(props);
        this.state={
            selectItem:'allContest',
            curPageNo:1,
        }
    }

    componentDidMount() {

    }

    componentWillUnmount(){
         window.location.reload();    
    }

    changeClick=(id)=>{
        this.props.dispatch({
            type:'contestPoll/fetchContestRoleList',
            payload:{"theaterGroupId":null, "movieRoleId":id , "pageNo":0, "pageSize":50
            }
        })
    }

    handleChange=(e)=>{

        var groundId = '';
        const match = pathToRegexp('/roleList/contestPoll/:groundId').exec(this.props.location.pathname);

        if (match) {
          groundId = match[1];
          valueId = groundId.replace(/[^0-9]/ig,"");
        }   


        if (e === 'contestRole') {
            this.props.dispatch({
                type: 'contestPoll/fetchRoleList',
                payload:{'groupId':valueId,"ids":[], 'pageNo':0,'pageSize':10
            }})
        }

        this.setState({selectItem:e});
    }

     onNextPage(){
        this.props.dispatch({
            type: 'contestPoll/fetchContestRoleList',
            payload:{'theaterGroupId':valueId,"movieRoleId":null, 'pageNo':this.state.curPageNo + 1,'pageSize':10}
        })
        this.setState({curPageNo: this.state.curPageNo + 1});
    }

    render(){

        const { roleData,contestRoleData,allContestData,allNextPage } = this.props.contestPoll;

        var vNextPage;
        if (allNextPage) {
            vNextPage = (<button onClick={()=>this.onNextPage()}>点击加载更多</button>);
        } else {
            vNextPage = (<p>没有更多数据...</p>);
        }   

        return (
            <MuiThemeProvider>
                <div>
                    <img src = {banner} width='100%' height = '180'/>
                        <Tabs
                            value={this.state.selectItem}
                            onChange={this.handleChange}
                          >
                            <Tab style = {tab_styles.menuItem} label="总投票" value="allContest" >
                                <div>
                                    <ContestPollList data = {allContestData}/>
                                    <div style = {{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:20}} className = {styles.loadMoreButton}>{vNextPage}</div> 
                                </div>
                            </Tab>
                            <Tab style = {tab_styles.menuItem} label="角色榜" value="contestRole">
                                <ContestRoleList
                                    changeClick = {this.changeClick}
                                    roleData = {roleData} 
                                    data = {contestRoleData}
                                    groundId = {valueId}
                                />
                            </Tab>
                          </Tabs>
                </div>
            </MuiThemeProvider>
        );
    }
 
};

function mapStateToProps({ contestPoll }) {
  return { contestPoll };
}

ContestPoll.propTypes = {
	location:PropTypes.object,
};

export default connect(mapStateToProps)(ContestPoll);
