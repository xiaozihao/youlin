import React,{ Component, PropTypes } from 'react';
import {Spin, Button,Tag,Affix } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './theatreGroup.less';
import Nav from '../components/layout/nav';
import TheatreGroupItem from '../components/theatreGroup/theatreGroupItem';
import { fetchWxOauth} from '../services/wxpay';

var config ={
	url:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx93bec9ce3a446c79&redirect_uri=http%3A%2F%2Fiwantfame.91youlin.com&response_type=code&scope=snsapi_userinfo&state=123&#wechat_redirect',
	userInfo:JSON.parse(localStorage.getItem('MY_USER_INFO')),
};

class TheatreGroup extends Component{
	constructor() {
	    super();
	    this.state = {
	      	 checked: false,
	      	 curPageNo: 1,
			 curTag: '',
	    };
	}

	componentWillMount() {	
		// localStorage.removeItem('MY_USER_INFO');
		// var info = JSON.parse(localStorage.getItem('MY_USER_INFO'));
		// if (info !== null) {
		// 	if (!info.userAtom.openId) {
		// 		localStorage.removeItem('MY_USER_INFO');
		// 	}
		// }
	}

	componentDidMount() {
		this.getUserInfo();
	}

	getUserInfo(){
        if(config.userInfo != null){
            return JSON.parse(localStorage.getItem('MY_USER_INFO'));
        }else{
            if(this.getQueryString('code') != null){
                this.getUser(this.getQueryString('code'));
                return JSON.parse(localStorage.getItem('MY_USER_INFO'));
            }else{
                window.location.href = config.url;
            }
        }
    }

    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    }

    getUser(code){
    	fetchWxOauth(code).then(function(value) {
    		document.cookie='JSESSIONID='+ value.data.resultObject.accessToken;
    		//只保存需要的参数
    		var myUserInfoStr = localStorage.getItem('MY_USER_INFO');
    		var myUserInfo;
    		try {
    			myUserInfo = JSON.parse(myUserInfoStr) || {};
    		} catch(e) {
    			myUserInfo = {
    				userAtom: {}
    			};
    		}
    		myUserInfo.refreshToken = value.data.resultObject.refreshToken;
    		myUserInfo.accessToken = value.data.resultObject.accessToken;
    		myUserInfo.userAtom = myUserInfo.userAtom || {};
    		myUserInfo.userAtom.username = value.data.resultObject.userAtom.username;
    		myUserInfo.userAtom.nickName = value.data.resultObject.userAtom.username;
    		myUserInfo.userAtom.headImg = value.data.resultObject.userAtom.headImg;
    		myUserInfo.userAtom.openId = value.data.resultObject.userAtom.openId;
            localStorage.setItem('MY_USER_INFO',JSON.stringify(myUserInfo));
        }, function(value) {
            console.log('req error!');
        });
    }

    onChangeTag(i){
    	this.setState({curTag: i});
    	this.props.dispatch({
	       	type: 'theatreGroup/fetchList',
	       	payload:{ likeName:'', tagIds:[i], pageNo:0, pageSize:10} 
	    });
    }

    onNextPage(){
    	this.props.dispatch({
	       	type: 'theatreGroup/fetchList',
	       	payload:{ likeName:'', tagIds: this.state.curTag ? [this.state.curTag]:[], pageNo:this.state.curPageNo + 1, pageSize:10} 
	    });
	    this.setState({curPageNo: this.state.curPageNo + 1});
    }

    onCollection(e){
    	 this.props.dispatch({ type:'theatreGroup/collection', payload:{ type:1,id:e} });
    }
   
	render(){

		const { resultObject,loading,tagArray,nextPage } = this.props.theatreGroup;

		var vNextPage;
		if (nextPage) {
			vNextPage = (<button onClick={()=>this.onNextPage()}>点击加载更多</button>);
		} else {
			vNextPage = (<p>没有更多数据...</p>);
		}		

		let someThing = [];
		if (tagArray.length) {
			for(let i = 0; i < tagArray.length; i++) {
				if (i < 6) {
					someThing.push(tagArray[i])
				}
			}
		}

		return (
			<div>
		    	<Nav>
		    		<div className = { styles.normal }>
		    			<Affix>
			    			<div className = { styles.searchLayout }>
			    				<Link to='search'>
				  					<Button  className = { styles.search } type="ghost" icon="search">搜索</Button>
				  				</Link>
				  			</div>
				  			<div className = {styles.tagLayout}>
								{
									someThing.map((value,i)=>{
										return <div className = {styles.tagDiv}><Button  key = {i} type = 'ghost' onClick = {()=>this.onChangeTag(value.id)} className = {styles.tag}>{value.name}</Button></div>
									})
								}
							</div>
						</Affix>
					    {	

					    	resultObject.map((value,i)=>{
					    		return(
					    			<TheatreGroupItem
					    				key = {i} 
					    				status = {value.status}
					    				id = {value.id}
					    				cover = {value.cover}
					    				title = {value.title}
					    				startTime = {value.startTime}
					    				stopTime = {value.stopTime}
					    				onCollection = {(e)=>this.onCollection(e)}
					    			/>
					    		)
					    	})
					    }
					   <div style = {{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:20}} className = {styles.loadMoreButton}>{vNextPage}</div> 
			  		</div>
			    </Nav>
		  	</div>
		)
	}
};

TheatreGroup.propTypes = {
  location:PropTypes.object,
  history:PropTypes.object,
};

function mapStateToProps({ theatreGroup }) {
  return { theatreGroup };
}

export default connect(mapStateToProps)(TheatreGroup);
