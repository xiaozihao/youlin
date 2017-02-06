import React,{ PropTypes } from 'react';
import { Icon, message,Form, Input,Button,Upload} from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './creatTheatreGroup.less';
import AddOther from '../../components/creatTheatreGroup/addOther';
import AddItsRole from '../../components/creatTheatreGroup/addItsRole';

import { fetchUpdatePhoto } from '../../services/role';
import FileInput from '../../utils/fileInput';

const FormItem = Form.Item;

const inputArray = [
    { key:'shootLocations', value:'拍摄地点' },
    { key:'shootPeriod', value:'拍摄周期' },
    { key:'productPersion', value:'出品人' },
    { key:'makingPersion', value:'制片人' },
    { key:'performPersion', value:'执行制片人' },
    { key:'originalWork', value:'原著' },
    { key:'scriptwriterName', value:'编剧' },
    { key:'directorName', value:'导演名称' },
    { key:'counselorName', value:'顾问' },
    { key:'comprehensiveName', value:'演员统筹名称' },
    { key:'comprehensiveMobile', value:'演员统筹号码' },
    { key:'comprehensiveEmail', value:'演员统筹助理邮' },
    { key:'comprehensiveAssistantName', value:'演员头筹助理名称' },
    { key:'comprehensiveAssistantMobile', value:'演员统筹助理电话' },
    { key:'schemeName', value:'总策划名称' },
    { key:'producerName', value:'监制名称' },
    { key:'reservePerformerNames', value:'已经定了的演员' },
    { key:'directorMobile', value:'导演号码' },
    { key:'assistantDirectorEmail', value:'副导演邮箱' },
    { key:'makeAddress', value:'筹备地址' },
]


const addOtherItem = [];
const addRoleItem = [];

let otheruuid = 0;
let roleuuid = 0;


const CreatTheatreGroup = Form.create()(React.createClass({

    getInitialState() {
        return {
            isSelectTheme:[],
            isSelectMovie:[],
            isSelectPlay:[],
            photoUrl:'',
            roleJSON:{name:'title',type:'json'},
            addOtherItem:[],
            addRoleItem:[],
            delectRoleIte:[],
            roleCover:[],
            roleCoverData:[],
          }
    },


    updatePhoto(files){
        var formData = new FormData();
        formData.append('userfile',files[0]);

        fetchUpdatePhoto(formData).then( 
            value => this.setState({photoUrl:value.data.url}),
            error => this.setState({error: error})
        );
    },

    onThemeSelect(value,select){
        for (var i = 0; i < select.length; i++) {
            if (select[i].name === value) {
                this.setState({ isSelectTheme:[{tagsname:value,tagsId:select[i].id}] });
            }
        }
    },

    onMovieSelect(value,select){
        for (var i = 0; i < select.length; i++) {
            if (select[i].name === value) {
                this.setState({ isSelectMovie:[{tagsname:value,tagsId:select[i].id}] });
            }
        }
    },

    onPlaySelect(value,select){
        for (var i = 0; i < select.length; i++) {
            if (select[i].name === value) {
                this.setState({ isSelectPlay:[{tagsname:value,tagsId:select[i].id}] });
            }
        }
    },


    makeOtherConfigJson(values){
        let otherConfigJson = [];
            for(var value in values){  
                if(value.indexOf('otherConfig')!== -1){
                    let vIndex = value.match(/\d+/g)-1;
                    otherConfigJson[vIndex] = Object.assign({}, {otherConfig:values[value]});
                }
            }
        return otherConfigJson;
    },

    onRolePhoto(key,files,index){

        var formData = new FormData();
        formData.append('userfile',files[0]);

        fetchUpdatePhoto(formData).then(
            value => {
                var roleCover = this.state.roleCover;
                roleCover[+index] = value.data.url;
                this.setState({roleCover:roleCover})
            },
            error => message.error('添加失败，请重试！'),
        );

        this.state.roleCoverData.push(this.state.roleCover);
        this.setState({roleCoverData:this.state.roleCoverData});

        this.props.form.setFieldsValue({
            [key]: this.state.roleCoverData[index],
        });
    },

    onSubtime(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                console.log('Received values of form: ', values);
                 var otherConfigJson = this.makeOtherConfigJson(values);  
                 let roleJson = [];
                 if (values.roleKeys.length>0) { 
                    for(var value in values){  
                        if(value.indexOf('name')!== -1){
                            let vIndex = value.match(/\d+/g)-1;
                            let oldObj = roleJson[vIndex]||{};
                            roleJson[vIndex] = Object.assign(oldObj, {name:values[value]});
                        }
                        if(value.indexOf('cover')!== -1){
                            let vIndex = value.match(/\d+/g)-1;
                            let oldObj = roleJson[vIndex]||{};
                            roleJson[vIndex] = Object.assign(oldObj, {cover:values[value]});
                        }
                        if(value.indexOf('levelName')!== -1){
                            let vIndex = value.match(/\d+/g)-1;
                            let oldObj = roleJson[vIndex]||{};
                            roleJson[vIndex] = Object.assign(oldObj, {levelName:values[value]});
                        }
                        if(value.indexOf('ageGroup')!== -1){
                            let vIndex = value.match(/\d+/g)-1;
                            let oldObj = roleJson[vIndex]||{};
                            roleJson[vIndex] = Object.assign(oldObj, {ageGroup:values[value]});
                        }
                        if(value.indexOf('tagNames')!== -1){
                            let vIndex = value.match(/\d+/g)-1;
                            let oldObj = roleJson[vIndex]||{};
                            roleJson[vIndex] = Object.assign(oldObj, {tagNames:values[value]});
                        }
                        if(value.indexOf('description')!== -1){
                            let vIndex = value.match(/\d+/g)-1;
                            let oldObj = roleJson[vIndex]||{};
                            roleJson[vIndex] = Object.assign(oldObj, {description:values[value]});
                        }
                        if(value.indexOf('other_desc')!== -1){
                            let vIndex = value.match(/\d+/g)-1;
                            let oldObj = roleJson[vIndex]||{};
                            roleJson[vIndex] = Object.assign(oldObj, {other_desc:values[value]});
                        }            
                    }
                    
                 }
                 console.log(roleJson);

                if (this.state.isSelectTheme && this.state.isSelectMovie && values.nickName
                    && this.state.isSelectPlay && values.startTime&& 
                    values.stopTime && values.bootTime && values.synopsis && this.state.photoUrl ) {


                     var parmas = {
                            cover:this.state.photoUrl,
                            name:values.nickName,
                            theme:this.state.isSelectTheme,
                            type:this.state.isSelectMovie,
                            broadcastPlatform:this.state.isSelectPlay,
                            startTime:values.startTime,
                            stopTime:values.stopTime,
                            bootTime:values.bootTime,
                            shootLocations:values.shootLocations,
                            shootPeriod:values.shootPeriod ? values.shootPeriod : 0,
                            productCompany:values.productCompany,
                            productPersion:values.productPersion,
                            makingPersion:values.makingPersion,
                            performPersion:values.performPersion,
                            originalWork:values.originalWork,
                            scriptwriterName:values.scriptwriterName,
                            directorName:values.directorName,
                            counselorName:values.counselorName,
                            comprehensiveName:values.comprehensiveName,
                            comprehensiveMobile:values.comprehensiveMobile,
                            comprehensiveEmail:values.comprehensiveEmail,
                            comprehensiveAssistantName:values.comprehensiveAssistantName,
                            comprehensiveAssistantMobile:values.comprehensiveAssistantMobile,
                            schemeName:values.schemeName,
                            producerName:values.producerName,
                            reservePerformerNames:values.reservePerformerNames,
                            directorMobile:values.directorMobile,
                            assistantDirectorEmail:values.assistantDirectorEmail,
                            makeAddress:values.makeAddress,
                            synopsis:values.synopsis,
                            otherConfigJson:otherConfigJson, 
                            roleJson:roleJson,
                        }

                        this.props.dispatch({
                            type:'creatTheatreGroup/submit',
                            payload:parmas,
                        })
                        console.log(roleJson);
                    }else{
                            message.error('有必要数据没有填写，请修改！');
                    }
            }
        });
    },

    addOther(){
        otheruuid++;
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(otheruuid);
            form.setFieldsValue({
                  keys: nextKeys,
            });
    },

    onDelectOther(k){
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 0) {
          return;
        }

        form.setFieldsValue({
          keys:keys.filter(key => key !== k)
        });
    },

    addRole(){
        roleuuid++;
        const { form } = this.props;
        const keys = form.getFieldValue('roleKeys');
        const nextKeys = keys.concat(roleuuid);
        form.setFieldsValue({
            roleKeys: nextKeys,
        });
    },

    onDelectRole(k){
        const { form } = this.props;
        const keys = form.getFieldValue('roleKeys');
        if (keys.length === 0) {
          return;
        }

        form.setFieldsValue({
          roleKeys:keys.filter(key => key !== k)
        });
    },

    normFile(e) {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    },


    render(){

        const { getFieldDecorator,getFieldValue } = this.props.form;
        const { themeSelect,movieSelect,playSelect } = this.props.creatTheatreGroup;
        getFieldDecorator('keys', { initialValue: [] });
        getFieldDecorator('roleKeys', { initialValue: [] });
        const addOtherkeys = getFieldValue('keys');
        const addRolekeys = getFieldValue('roleKeys');

        return (
                <div style = {{backgroundColor:'#fff'}}>
                    <img src={this.state.photoUrl} style = {{height:170,width:'100%',display:'flex',position:'relative'}}/>
                    <div className={styles.topBox}>
                        <FileInput 
                            onChange={(e)=>this.updatePhoto(e)}
                            className = {styles.topBoxFile}
                            multiple={false} 
                            btnValue = '上传封面'/>
                    </div>
                    
                    <Form className = {styles.exampleInput} onSubmit={(e)=>this.onSubtime(e)}>
                        <div className = {styles.zhinput}>
                            <p><span>剧名<span>(必填)</span>:</span></p>
                            <FormItem>
                                {getFieldDecorator('nickName')(  
                                    <Input  size="large" placeholder="请输入剧名" className={styles.inputItem}/>
                                )}
                            </FormItem>
                        </div>

                        <div className = {styles.zhinput}>
                            <p><span>题材<span>(必填)</span>:</span></p>
                            <select className={styles.inputItem} onChange={(e)=> this.onThemeSelect(e.target.value,themeSelect)}>
                                {
                                    themeSelect.map((value,i)=>
                                      <option key={value.id} value={value.name}>{value.name}</option>
                                    )
                                }   
                            </select> 
                        </div>

                        <div className = {styles.zhinput}>
                            <p><span>影片类型<span>(必填)</span>:</span></p>
                            <select className={styles.inputItem} onChange={(e)=> this.onMovieSelect(e.target.value,movieSelect)}>
                                {
                                    movieSelect.map((value,i)=>
                                      <option key={i} value={value.name}>{value.name}</option>
                                    )
                                }   
                            </select> 
                        </div>
                        
                        <div className = {styles.zhinput}>
                            <p><span>播放平台<span>(必填)</span>:</span></p>
                            <select className={styles.inputItem} onChange={(e)=> this.onPlaySelect(e.target.value,playSelect)}>
                                {
                                    playSelect.map((value,i)=>
                                      <option key={i} value={value.name}>{value.name}</option>
                                    )
                                }   
                            </select> 
                        </div>

                        <div className = {styles.zhinput}>
                            <p><span>开机时间<span>(必填)</span>:</span></p>
                            <FormItem>
                                {getFieldDecorator('startTime')(  
                                    <Input 
                                        size="large" 
                                        placeholder="请输入" 
                                        className={styles.inputItem}
                                        onChange={this.handleChange}
                                        type="date" 
                                    />
                                )}
                            </FormItem>
                        </div>

                        <div className = {styles.zhinput}>
                            <p><span>招募开始时间<span>(必填)</span>:</span></p>
                            <FormItem>
                                {getFieldDecorator('stopTime')(  
                                    <Input 
                                        size="large" 
                                        placeholder="请输入" 
                                        className={styles.inputItem}
                                        onChange={this.handleChange}
                                        type="date" 
                                    />
                                )}
                            </FormItem>
                        </div>

                        <div className = {styles.zhinput}>
                            <p><span>招募结束时间<span>(必填)</span>:</span></p>
                            <FormItem>
                                {getFieldDecorator('bootTime')(  
                                    <Input 
                                        size="large" 
                                        placeholder="请输入" 
                                        className={styles.inputItem}
                                        onChange={this.handleChange}
                                        type="date" 
                                    />
                                )}
                            </FormItem>
                        </div>

                        {
                            inputArray.map((data,i)=>{
                                return(
                                    <div key={i} className = {styles.zhinput}>
                                        <p><span>{data.value + ':'}</span></p>
                                        <FormItem>
                                            {getFieldDecorator(data.key)(  
                                                <Input 
                                                    size="large" 
                                                    placeholder="请输入" 
                                                    className={styles.inputItem}
                                                    onChange={this.handleChange}
                                                />
                                            )}
                                        </FormItem>
                                    </div>
                                )
                            })
                        }

                        <div style = {{marginRight:20,marginLeft:20}}>
                            <p>剧情介绍<span style={{color:'red'}}>(必填)</span>：</p>
                            <FormItem>
                                {getFieldDecorator('synopsis')(  
                                    <textarea className={styles.textarea}  placeholder="请输入剧情介绍，限制200字以内"></textarea>
                                )}
                            </FormItem>
                        </div>
                        
                        <div className={styles.other}>
                            {
                                 addOtherkeys.map((i) => {
                                    return(
                                        
                                        <div className = {styles.zhinput} key={i}>
                                            <p onClick = {()=>this.onDelectOther(i)}>删除</p>
                                            <FormItem>
                                                {getFieldDecorator(`otherConfig${i}`,{validateTrigger: ['onChange', 'onBlur']})(
                                                    <Input size="large" placeholder="请输入" className={styles.item} />
                                                )}
                                            </FormItem>
                                        </div>
                                    )   
                                })
                            }
                            <Button type="ghost" className={styles.otherbtn} onClick ={()=>this.addOther()}>+添加其他</Button> 
                        </div>

                            {   
                                addRolekeys.map((i)=>{
                                    return(
                                        <div key = {i}>
                                            <div>
                                             <div className = {styles.zhinput}>
                                                <p><span>角色名<span>(必填)</span>:</span></p>
                                                <FormItem>
                                                    {getFieldDecorator(`name${i}`,{validateTrigger: ['onChange', 'onBlur']})( 
                                                        <Input  size="large" placeholder="请输入角色名" className={styles.inputItem}/>
                                                    )}
                                                </FormItem>
                                            </div>

                                            <div className = {styles.zhinput}>
                                                <p><span>线位<span>(必填)</span>:</span></p>
                                                <FormItem>
                                                    {getFieldDecorator(`levelName${i}`,{validateTrigger: ['onChange', 'onBlur']})( 
                                                    <Input size="large" placeholder="请填写角色线位" className={styles.inputItem}/>
                                                    )}
                                                </FormItem>
                                            </div>

                                            <div className = {styles.zhinput}>
                                                <p><span>年龄<span>(必填)</span>:</span></p>
                                                <FormItem>
                                                {getFieldDecorator(`ageGroup${i}`,{validateTrigger: ['onChange', 'onBlur']})( 
                                                    <Input  size="large" placeholder="请填写年龄" className={styles.inputItem}/>
                                                 )}
                                                </FormItem>

                                            </div>

                                            <div className = {styles.zhinput}>
                                                <p><span>性别<span>(必填)</span>:</span></p>
                                                <FormItem>
                                                    {getFieldDecorator(`sex${i}`,{validateTrigger: ['onChange', 'onBlur']})( 
                                                    <Input  size="large" placeholder="请填写性别" className={styles.inputItem}/>
                                                    )}
                                                </FormItem>
                                            </div>

                                             <div className = {styles.zhinput}>
                                                <p><span>角色标签<span>(必填)</span>:</span></p>
                                                <FormItem>
                                                    {getFieldDecorator(`tagNames${i}`,{validateTrigger: ['onChange', 'onBlur']})( 
                                                        <Input size="large" placeholder="请输入标签" className={styles.inputItem}/>
                                                    )}
                                                </FormItem>
                                            </div>

                                             <div className = {styles.zhinput}>
                                                <p><span>人物小传<span>(必填)</span>:</span></p>
                                                <FormItem>
                                                    {getFieldDecorator(`description${i}`,{validateTrigger: ['onChange', 'onBlur']})( 
                                                        <Input size="large" placeholder="请输入人物小传" className={styles.inputItem} />
                                                    )}
                                                </FormItem>
                                            </div>

                                            <div className = {styles.zhinput}>
                                                <p><span>其他<span>(必填)</span>:</span></p>
                                                <FormItem>
                                                    {getFieldDecorator(`other_desc${i}`,{validateTrigger: ['onChange', 'onBlur']})( 
                                                        <Input size="large" placeholder="请输入其他内容" className={styles.inputItem}/>
                                                    )}
                                                </FormItem>
                                            </div>
                                            <div className = {styles.imgBox}>
                                                <img alt='点击上传图片' src={this.state.roleCover[i]} style={{width:150 ,height:100}}/>
                                                <FileInput onChange = {(e)=>this.onRolePhoto(`cover${i}`,e,i)} className = {styles.bottomBoxFile} multiple={false}/>
                                            </div>

                                            </div>
                                            <div className={styles.deleteAdd}>
                                                <Button type="ghost" className={styles.btn} onClick = {()=>this.onDelectRole(i)}>删除此角色</Button> 
                                            </div>
                                        </div>
                                    )
                                })
                            }
                                  
                        <div className={styles.boxBtn}>
                            <Button type="ghost" className={styles.btn} onClick={()=>this.addRole()}>添加角色</Button>
                        </div>

                        <p className={styles.publicity}>关于“共同抵制虚假组讯”的公示</p>
                        <p className={styles.publicity}>平台所有组讯均由剧组提供，如您在浏览组讯时发现"虚假或诈骗"信息,请第一时间点击海报右下角的举报按钮,我们将及时及时处理,以保证演员同胞们的权利;</p>
                        
                        <Button type="primary" htmlType='submit' className={styles.releasebtn}>发布剧组</Button>
                    </Form>
                </div>
        );
    }
}));

function mapStateToProps({ creatTheatreGroup }) {
  return { creatTheatreGroup };
}

CreatTheatreGroup.propTypes = {
    creatTheatreGroup:PropTypes.object,
};

export default connect(mapStateToProps)(CreatTheatreGroup);