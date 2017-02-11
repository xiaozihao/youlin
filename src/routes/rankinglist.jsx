import React, { Component ,PropTypes} from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './rankinglist.less';
import Nav from '../components/layout/nav';
import HostestRole from '../components/rankingList/hotRole';
import AllRole from '../components/rankingList/allRoleList';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';

const defaultProps = {};

const propTypes = {
  rankinglist:PropTypes.object,
  dispatch:PropTypes.func,
  location:PropTypes.object,
};

const tab_styles = {
    menuItem:{
        backgroundColor:'#FC7E2A',
        color:'#fff',
        fontSize:17,
    }
}


class Rankinglist extends Component {

    constructor(props){
        super(props);
        this.state={
             selectItem: 'hotestRole',
             hotestRoldCurPageNo: 1,
             allHotRoldCurPageNo: 1,
             loading:true,
             value:'hotestRole',
        }
    }

    componentWillMount() {
        
    }

    componentWillUnmount(){
         window.location.reload();    
    }

    handleChange=(value)=>{
        this.setState({selectItem:value});
    }

    onNextPage(){
        if (this.state.selectItem === 'hotestRole') {
            this.props.dispatch({
                type: 'theatreGroup/fetchList',
                payload:{pageNo:this.state.hotestRoldCurPageNo + 1,pageSize:10},
            });
            this.setState({curPageNo: this.state.hotestRoldCurPageNo + 1});
        }
        if (this.state.selectItem === 'allHot') {
            this.props.dispatch({
                type:'rankinglist/fetchAllRoleList',
                payload:{'movieRoleId':null,pageNo:this.state.allHotRoldCurPageNo + 1,pageSize:10}
            });
            this.setState({curPageNo: this.state.allHotRoldCurPageNo + 1});
        }
    }

    render() {
        const { hotestRoleData,allRoleData,allHotNextPage,hotestRoldNextPage } = this.props.rankinglist;

        var vNextPage;
        if (allHotNextPage || hotestRoldNextPage) {
            vNextPage = (<button onClick={()=>this.onNextPage()}>点击加载更多</button>);
        } else {
            vNextPage = (<p>没有更多数据...</p>);
        }   

        return (
            <MuiThemeProvider>
                <div style = {{paddingBottom:50}}>
                    <Nav>
                        <Tabs
                            value={this.state.selectItem}
                            onChange={this.handleChange}
                          >
                            <Tab style = {tab_styles.menuItem} label="最热角色" value="hotestRole" >
                                <HostestRole data = {hotestRoleData ? hotestRoleData:[]}/>
                            </Tab>
                            <Tab style = {tab_styles.menuItem} label="总热度" value="allHot">
                                <AllRole data = { allRoleData?allRoleData:[] }/>
                            </Tab>
                        </Tabs>
                    <div style = {{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:20}} className = {styles.loadMoreButton}>{vNextPage}</div> 
                    </Nav>
                </div>
            </MuiThemeProvider>
        );
    }
};

function mapStateToProps({ rankinglist }) {
  return { rankinglist };
}

Rankinglist.defaultProps = defaultProps;
Rankinglist.propTypes = propTypes;

export default connect(mapStateToProps)(Rankinglist);