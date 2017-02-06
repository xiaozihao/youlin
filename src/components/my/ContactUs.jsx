import React,{ Component, PropTypes } from 'react';
import styles from './ContactUs.less';

const contactUs = (props)=>{
    return (
    	<div className={styles.contact}>
			<div className={styles.contact_icon}></div>
				<p className = {styles.contact_icon_p}>影视娱乐行业的最专业</p>
				<p className = {styles.contact_icon_p}>海量并且高效的服务平台</p>
			<div/>
			<div className = {styles.info}>
				<p>客服电话 : 13520990010</p>
				<p>微信公众号 : 全民竞演资讯</p>
				<p>微信号 : 13520990010</p>
				<p>新浪微博 : 北京有邻文化</p>
				<p>QQ号码 : 3210265587</p>
			</div>
			<div className = {styles.logo}/>
		</div>
    );  
}
contactUs.propTypes = {
};

export default contactUs;