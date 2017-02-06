import React, { Component ,PropTypes} from 'react';
import { Menu } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './rankinglist.less';
import Nav from '../components/layout/nav';
import HostestRole from '../components/rankingList/hotRole';
import AllRole from '../components/rankingList/allRoleList';

const Item = Menu.Item;

const defaultProps = {

};

const propTypes = {
  rankinglist:PropTypes.object,
  dispatch:PropTypes.func,
  location:PropTypes.object,
};


class Rankinglist extends Component {

    constructor(props){
        super(props);
        this.state={
             selectItem: 'hotestRole',
             hotestRoldCurPageNo: 1,
             allHotRoldCurPageNo: 1,
             fetchAllhot:false,
             loading:true,
        }
    }

    componentWillMount() {
        
    }

    componentWillUnmount(){
         window.location.reload();    
    }

    onSelect(e){
        this.setState({
            selectItem:e.key,
            hotestRoldCurPageNo: 1,
            allHotRoldCurPageNo: 1,
            fetchAllhot:true,
        });
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
            <div style = {{paddingBottom:50}}>
                <Nav>
                 <Menu 
                    className = {styles.tab}
                    mode = "horizontal"
                    selectedKeys={[this.state.selectItem]}
                     onSelect = {(e)=>this.onSelect(e)}
                >
                    <Item key={'hotestRole'} className = { styles.tabItem }>最热角色</Item>
                    <Item key={'allHot'} className = { styles.tabItem }>总热度</Item>
                </Menu>
                <div>
                   {
                        this.state.selectItem === 'hotestRole' ?
                        <HostestRole data = {hotestRoleData ? hotestRoleData:[]}/>:
                        <AllRole data = { allRoleData?allRoleData:[] }/>
                   }
                </div>
                <div style = {{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:20}} className = {styles.loadMoreButton}>{vNextPage}</div> 
                </Nav>
            </div>
        );
    }
};

function mapStateToProps({ rankinglist }) {
  return { rankinglist };
}

Rankinglist.defaultProps = defaultProps;
Rankinglist.propTypes = propTypes;

export default connect(mapStateToProps)(Rankinglist);