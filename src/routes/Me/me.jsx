import React,{ Component, PropTypes } from 'react';
import { Menu, Icon,Button,Input} from 'antd';
import { Link } from 'dva/router';
import styles from './Me.less';
import Nav from '../../components/layout/nav';

var config ={
    userInfo:JSON.parse(localStorage.getItem('MY_USER_INFO')),
};

class Me extends Component{


	componentWillMount() {
		if (config.userInfo && config.userInfo.userAtom && config.userInfo.userAtom.mobile) {
           	window.location.href = '/#/me';
            // window.location.reload(); 
		}else{
			window.location.href = '/#/signup';
            // window.location.reload(); 
		}
	}

	componentWillUnmount(){
         window.location.reload();    
    }

    logout(){
    	localStorage.removeItem('MY_USER_INFO');
    	window.location.href = '/#/';
    }

	render(){

		config.userInfo = JSON.parse(localStorage.getItem('MY_USER_INFO'));
		var tags = config.userInfo && config.userInfo.userAtom.tags && JSON.parse(config.userInfo.userAtom.tags) || [];
		var specialtys = config.userInfo && config.userInfo.userAtom.specialtys && JSON.parse(config.userInfo.userAtom.specialtys) || [];

		const type = config.userInfo && config.userInfo.userAtom && config.userInfo.userAtom.type || null;
	
	    return (
	    	<div>
	    		<Nav>
			    <div className={styles.me}>
			       	<p style={{ fontSize:20 ,color:'#fff'}}>
			    	<span>{config.userInfo && (config.userInfo.userAtom.nickName ||config.userInfo.userAtom.username) || '我要成名'}</span>
			    	<button>
			    		<Link to ='me/edit'><Icon className={styles.iconTop} type="edit"/></Link>
			    	</button>
			     	</p>
			    	<div>
			      		<p>星座:{config.userInfo && config.userInfo.userAtom.constellation || ''}</p>
			      		<p>标签:{tags && tags.map && tags.map(function(tag) {return tag.tagsname.trim()}).join(',') || ''}</p>
			      		<p>特长:{specialtys && specialtys.map && specialtys.map(function(tag) {return tag.tagsname.trim()}).join(',') || ''}</p>
			      		{/*<p>编辑资料</p>*/} 
			      	</div>
			      </div>
			      <div className={styles.table1}>

			      	{
			      		type !== 3 ? (
			      			<Link to = "me/application" className={styles.link}>
				      			<Icon className={styles.icon} type="solution" />
				      			我的申请
			      			</Link>
			      		):(<div/>)
			      	}
			      		
				    	<Link to = "me/canvassing" className={styles.link}><Icon className={styles.icon} type="like-o" />我的拉票</Link>
			      	 	</div>
			      	 	<div className={styles.table2}>

			      	 	{
				      		type === 3 ? (
				      			<Link to = "me/release" className={styles.link}>
							     <Icon className={styles.icon} type="addfile" />
							     	我的发布
						     	</Link>
				      		):(<div/>)
				      	}

				    		<Link to = "me/collection" className={styles.link}>
						     	<Icon className={styles.icon} type="addfile" />
						     	我的收藏
					     	</Link>
				    		<Link to = "me/message" className={styles.link}>
						     	<Icon className={styles.icon} type="message" />
						     	我的消息
					     	</Link>
				      		<Link to = "me/contact" className={styles.link}>
				      			<Icon className={styles.icon} type="team" />
				      			联系我们
				      		</Link>
				      		<div className={styles.link} onClick = {()=>this.logout()}>
				      			<Icon className={styles.icon} type="logout" />
				      			退出登录
				      		</div>
			      		</div>
			      		<div>
			      	</div>
			    </Nav>
		    </div>
	    	);  
		}
};

Me.contextTypes = { router: PropTypes.object.isRequired }

Me.propTypes = {
};
export default Me;