import React, { Component ,PropTypes} from 'react';
import { Menu, Icon } from 'antd';
import styles from './Nav.less';

const TabsDom = React.createClass({
    getInitialState() {
        return {
            current: 'info/recommend',
        };
    },
    handleClick(e) {
        window.location.hash = e.key; // 被点击元素的‘key’的值‘about’就是页面跳转的路径
        this.setState({
            current: e.key,
        });
    },
    render: function(){
        return (
          <div className = {styles.normal }>
            <Menu 
                onClick = {this.handleClick}
                className={styles.menu}
                selectedKeys = {[this.state.current]}
                mode = "horizontal"
                theme="dark"
            >
                <Menu.Item key="info/recommend" className = { styles.menuItem }>推荐</Menu.Item>
                <Menu.Item key="info/new" className = { styles.menuItem }>最新</Menu.Item>
                <Menu.Item key="info/crew" className = { styles.menuItem }>剧组</Menu.Item>
                <Menu.Item key="info/actor" className = { styles.menuItem }>演员</Menu.Item>
            </Menu>
          </div>
        )   
    }
});

// 定义了要输出的类 MenuList （这个要用于路由配置中）
export default class Nav extends Component {
    render() {
        return (
            <div>
                <TabsDom location={this.props.location} />
                <div>
                    {this.props.children}
                </div>
             
            </div>
        );
    }
};