import React,{ Component, PropTypes } from 'react';
import { } from 'antd';
import ContactUs from '../../components/my/ContactUs';
import { Link } from 'dva/router';


const contactUs = (props)=>{
    return (
		<div>
			<ContactUs/>
		</div>
    );  
}
contactUs.propTypes = {
};

export default contactUs;