import React, { Component ,PropTypes} from 'react';
import { Menu } from 'antd';
import { Link } from 'dva/router';
import styles from './contestTabs.less';

const Item = Menu.Item;

function getMenuKeyFromUrl(pathname) {
  let key = '';
  try {
    key = pathname.match(/\/([^]*)/i)[1];
    /* eslint no-empty:0 */
  } catch (e) {}
  return key;
}

function TabsItems({location,tabData}){
    const navChildren = Object.keys(tabData)
      .map((key, i) => (
        <Item key={key} className = { styles.tabItem } >
            <Link 
                to={key} 
                style = {{ color:'#FE7E13'}} 
                activeStyle={{ background: 'light', color: '#FE7E13' }}>
                {tabData[key]}
            </Link>
        </Item>
    ));
    return (
        <Menu 
            className = {styles.tab}
            mode = "horizontal"
            selectedKeys={[getMenuKeyFromUrl(location.pathname)]}
        >
        {navChildren}
        </Menu>
    )
};

export default class ContestTabs extends Component {
    render() {
        return (
            <div>
                <TabsItems location={this.props.location} tabData = {this.props.tabData}/>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
};

ContestTabs.propTypes = {
    location:PropTypes.object,
    tabData:PropTypes.object,
}