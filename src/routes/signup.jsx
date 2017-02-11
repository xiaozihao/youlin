import React,{ Component ,PropTypes} from 'react';
import {Input,Button,Icon,Form} from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './signup.less';
import { fetchSendSMS ,fetchBindPhoneNumber,fetchLogin } from '../services/signup';

const FormItem = Form.Item;

var config ={
    userInfo:JSON.parse(localStorage.getItem('MY_USER_INFO')),
};

const style = {
    noselect :{
        height:30,
        padding:0,
        paddingLeft:22,
        paddingRight:22,
        fontSize:13,
        background:'#fff',
        color:'#fe7e13',
        border:'.5px solid #fe7e13',
        borderRadius:60,
        marginRight:12,
        marginBottom:22,
    },
    select :{
        height:30,
        padding:0,
        paddingLeft:22,
        paddingRight:22,
        fontSize:13,
        background:'#fe7e13',
        color:'#fff',
        border:'.5px solid #fe7e13',
        borderRadius:60,
        marginRight:12,
        marginBottom: 22,
    }
}


const Signup = Form.create()(React.createClass({

    contextTypes: {
        router: React.PropTypes.object
    },

    getInitialState(){
        return {
            isPhoneNumber:false,
            message:'',
            error:'',
            selectIdentity:'',
            login:false,
            userInfoData:{},
            count: 60,
            liked: true
        }
    },
        
    componentDidMount() {
        // if(config.userInfo){
        //    // MY_USER_INFO 的格式有修改
        //     if (config.userInfo.userAtom) {
        //         if (config.userInfo.userAtom.mobile !== null) {
        //             this.context.router.push('me');
        //         }
        //     }
        // }
    },


    selectBtn1(){
       var btn1 =  document.getElementById('performer').id;
       this.setState({selectIdentity:2});
    },

    selectBtn2(){
        var btn2 =  document.getElementById('director').id;
        this.setState({selectIdentity:3});
    },

    submitFormat() {
        let tel = document.getElementById('tel').value;

        if (tel) {
            var re = /^1\d{10}$/
            if (re.test(tel)) {

                if(this.state.liked){
                    this.timer = setInterval(function () {
                    var count = this.state.count;
                    this.state.liked = false;
                        count -= 1;
                        if (count < 1) {
                          this.setState({
                            liked: true
                          });
                          count = 60;
                        }
                        this.setState({
                          count: count
                        });
                    }.bind(this), 1000);
                    this.props.dispatch({
                        type:'signup/sendSMS',
                            payload:{
                                telphone:tel,
                            }
                    });
                }
            } else {
                alert("输入的号码有误错误");
            }
        }else{
            alert("请输入号码"); 
        } 
    },


    login() {
        let tel = document.getElementById('tel').value;
        let format = document.getElementById('format').value;
        if (this.state.selectIdentity && format) {
            let params = {
                mobile:tel,
                type:this.state.selectIdentity,
                code:format,
            };
            fetchBindPhoneNumber(params).then(value=>{
                if (value.data && value.data.success) {  

                    var userInfo = JSON.parse(localStorage.getItem('MY_USER_INFO'));
                    if (!userInfo) {
                        userInfo = {
                            userAtom: {}
                        };
                    }

                    function merge(res, des) {
                        Object.keys(res).map(function(key) {
                            des[key] = res[key];
                        });
                        return des;
                    }

                    var newInfo = value.data.resultObject;
                    newInfo.userAtom.username = newInfo.userAtom.username || userInfo.userAtom.username || '';
                    newInfo.userAtom.nickName = newInfo.userAtom.nickName || userInfo.userAtom.nickName || '';
                    newInfo.userAtom.openId = userInfo.userAtom.openId;
                    
                    localStorage.MY_USER_INFO = JSON.stringify(newInfo);
                    document.cookie = 'JSESSIONID=' + newInfo.accessToken;

                    try{
                        this.context.router.replace('me/edit');
                    } catch(e) {
                        window.location.href = '/#/me/edit';
                        window.location.reload();
                    }
                }
            },error=>{

            });
        }else{
            if (!format && !this.state.selectIdentity ) {
                 alert('请输入验证码');
            }else if (format && !this.state.selectIdentity ) {
                alert('请选择注册的身份！');
            }else if(!format && this.state.selectIdentity) {
                alert('请输入验证码');
            }else{
                console.log('error');
            }
            
        }
    },  

    cancel(){
        try{
            this.context.router.replace('/');
        } catch(e) {
            window.location.href = '/';
            window.location.reload();
        }
    },

    render(){

        const { isSend,userInfo,islogin } = this.props.signup;
        let text = this.state.liked ? '验证码' : '等待'+this.state.count ;
        return (
            <div className={styles.sign}>
            <div className={styles.btnBox}>
                <Button style={ this.state.selectIdentity === 2 ? style.select :style.noselect } onClick = {this.selectBtn1} id='performer'>成为演员</Button>
                <Button style={ this.state.selectIdentity === 3 ? style.select :style.noselect}  onClick = {this.selectBtn2} id='director'>成为导演</Button>
            </div>
                <Form>
                    <div className = {styles.input}>
                        <Input id='tel' size="large" placeholder="请输入手机号" className={styles.inputPhone}/>
                    </div>
                    <div className = {styles.input}>
                        <Input id ='format' size="large" placeholder="请输入验证码" className={styles.inputPassword} type="tel"/>
                           <Button className={styles.code} onClick = { this.submitFormat }>{text}</Button>
                    </div>
                </Form>
                <Button type='primary' onClick = { this.login } className={styles.btn}>确定</Button>
                <Button type='primary' onClick = { this.cancel } className={styles.btn2}>取消</Button>
            </div>
        );
    }

}))


Signup.propTypes = {
    dispatch:PropTypes.func,
    history:PropTypes.object,
    signup:PropTypes.object,
};

function mapStateToProps({ signup }) {
  return { signup };
}

export default connect(mapStateToProps)(Signup);

