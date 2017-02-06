import React,{ Component, PropTypes } from 'react';
import { Menu } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './collection.less';

import CollectionActor from '../../components/my/CollectionActor';
import CollectionCrew from '../../components/my/CollectionCrew';

const Item = Menu.Item;

const defaultProps = {

};
const propTypes = {
  dispatch:PropTypes.func,
  collection:PropTypes.object
};

class MyCollection extends Component {

    constructor(props){
        super(props);
        this.state={
             selectItem: 'crew',
             loading:true,
        }
    }

    onSelect(e){
    	this.setState({selectItem:e.key});
    	if (this.state.selectItem === 'actor') {
    		this.props.dispatch({
    			type: 'collection/collectList',
	       		payload:{
	       			'type':2,
	       			'pageNo':0,
	       			'pageSize':10
	       		}
    		})
    	}else{
    		this.props.dispatch({
    			type: 'collection/collectList',
	       		payload:{
	       			'type':1,
	       			'pageNo':0,
	       			'pageSize':10
	       		}
    		})
    	}
    }

    render() {
        const { resultObject } =  this.props.collection;
        console.log(resultObject);

        return (
            <div>
                 <Menu 
                    className = {styles.tab}
                    mode = "horizontal"
                    selectedKeys={[this.state.selectItem]}
                    onSelect = {(e)=>this.onSelect(e)}
                >
                    <Item key={'crew'} className = { styles.tabItem }>剧组收藏</Item>
                    <Item key={'actor'} className = { styles.tabItem }>演员收藏</Item>
                </Menu>
                <div>
                    {
                    	this.state.selectItem === 'crew' ? 
                    	<CollectionCrew
                            data = { resultObject ? resultObject :[]}
                        /> :
                    	<CollectionActor
                            data = { resultObject ? resultObject :[]}
                        />
                    }
                </div>
            </div>
        );
    }
};

function mapStateToProps({ collection }) {
  return { collection };
}

MyCollection.defaultProps = defaultProps;
MyCollection.propTypes = propTypes;

export default connect(mapStateToProps)(MyCollection);
