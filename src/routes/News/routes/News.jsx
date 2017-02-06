import React,{ Component, PropTypes } from 'react';
import NewsRow from '../components/NewsRow';
import styles from './News.less';

class News extends Component{

	componentDidMount() {
		// window.addEventListener('scroll');

		window.onscroll = function(){
			if(getScrollTop() + getWindowHeight() == getScrollHeight()){
		　　　　alert("you are in the bottom!");
		　　}
			function getScrollTop(){
			　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
			　　if(document.body){
			　　　　bodyScrollTop = document.body.scrollTop;
			　　}
			　　if(document.documentElement){
			　　　　documentScrollTop = document.documentElement.scrollTop;
			　　}
			　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
			　　return scrollTop;
			}
			//文档的总高度
			function getScrollHeight(){
			　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
			　　if(document.body){
			　　　　bodyScrollHeight = document.body.scrollHeight;
			　　}
			　　if(document.documentElement){
			　　　　documentScrollHeight = document.documentElement.scrollHeight;
			　　}
			　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
			　　return scrollHeight;
			}
			//浏览器视口的高度
			function getWindowHeight(){
			　　var windowHeight = 0;
			　　if(document.compatMode == "CSS1Compat"){
			　　　　windowHeight = document.documentElement.clientHeight;
			　　}else{
			　　　　windowHeight = document.body.clientHeight;
			　　}
			　　return windowHeight;
			}
		}
	}
	componentWillUnmount() {
		// window.removeEventListener('scroll', this.handleScroll.bind(this));
	}
	handleScroll(e) {
		console.log(e);
	}

	handleWheel(e){
		// if (e.deltaY >10) {
		// 	console.log('加在更多数据');
		// }
		// console.log(e);
	}

	render(){

	    return (
	    	<div className = {styles.nornal} onWheel ={(e)=>this.handleWheel(e)}>
		  		<NewsRow/>
		  		<NewsRow/>
		  		<NewsRow/>
		  		<NewsRow/>
		  		<NewsRow/>
		  		<NewsRow/>
		  		<NewsRow/>
		  		<NewsRow/>
		  		

			  		<ul className = {styles.items}>
			  			<li className = { styles.item}>
			  				<div className = {styles.itemPoster}>
			  				</div>
			  			</li>
			  			<li className = { styles.item}>
			  				<div className = {styles.itemPoster}>
			  				</div>
			  			</li>
			  			<li className = { styles.item}>
			  				<div className = {styles.itemPoster}>
			  				</div>
			  			</li>
			  			<li className = { styles.item}>
			  				<div className = {styles.itemPoster}>
			  				</div>
			  			</li>
			  			<li className = { styles.item}>
			  				<div className = {styles.itemPoster}>
			  				</div>
			  			</li>
			  			<li className = { styles.item}>
			  				<div className = {styles.itemPoster}>
			  				</div>
			  			</li>
			  		</ul>
			  	</div>

	    	);
	}
};

News.propTypes = {
};

export default News;
