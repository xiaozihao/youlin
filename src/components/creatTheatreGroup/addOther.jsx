import React,{ Component, PropTypes } from 'react';
import { Input,message,Form,Button } from 'antd';
import styles from './addOther.less';

const FormItem = Form.Item;

const AddOther =  Form.create()(React.createClass({

	render(){
		const { getFieldDecorator } = this.props.form;

		return (
	    	<div className = {styles.customContent}>
	    		<p onClick = {this.props.onDelect}>删除</p>
	    		<div style = {{marginLeft:10}}>
		    		<div className = {styles.input}>
			    		<FormItem>
			                { getFieldDecorator(this.props.index + 'firstTitle')(
			                	<Input size="large" placeholder="请输入标题" className={styles.item}/>
			                )}
			            </FormItem>
			        </div>

				    <div className={styles.other}>
                        <Button type="ghost" className={styles.otherbtn} onClick ={()=>this.addOther()}>+添加其他</Button> 
                    </div>
		        </div>
	        </div>
  		);
	}	
}));

AddOther.propTypes = {
    onDelect:PropTypes.func,
    onSubtime:PropTypes.func,
    index:PropTypes.number,
    onChange:PropTypes.func,
};

export default AddOther;
