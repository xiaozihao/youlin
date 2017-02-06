import React, { Component ,PropTypes} from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './Foot.less';

const Item = Menu.Item;

const navData = [
    ['theatreGroup', '剧组'],
    ['performer','演员'], 
    ['rankingList', '排行榜'],
    ['me','我的']
];

const Foot = (props)=>{
        return (
            <div className = {styles.normal }>
                <Menu className = {styles.menu} mode = "horizontal" theme="dark">
                    { 
                        navData.map((tab, i) => (
                            <Item key={tab[0]} className = { styles.meunItem }>
                                <Link to={`${tab[0]}`} style = {{ color:'#fff'}} activeStyle={{ background: 'light', color: '#FE7E13'}}>{tab[1]}</Link>
                            </Item>
                        )) 
                    }
                </Menu>
            </div>
        )   
}

Foot.propTypes = {
    location: PropTypes.object,
};

export default Foot;