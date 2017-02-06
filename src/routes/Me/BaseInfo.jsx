import React,{ Component, PropTypes } from 'react';
import { Form, Tooltip,Icon,Input,Tag,Button,} from 'antd';
import styles from './BaseInfo.less';

const CheckableTag = Tag.CheckableTag;
const FormItem = Form.Item;

const BaseInfo = Form.create()(React.createClass({
  getInitialState() {
    return {
      passwordDirty: false,
      selectedPersionTag: [],
      selectedPersionTagId:[],
      selectedSpecialtyTag:[],
      selectedSpecialtyTagId:[],
      userInfo:{},
    };
  },

  componentWillMount() {
      var userInfo = JSON.parse(localStorage.getItem('MY_USER_INFO'));
      

      if (userInfo && userInfo.userAtom) {
        //获取已选标签
        var selectedPersionTagId = [];
        var selectedPersionTag = [];
        var selectedSpecialtyTagId = [];
        var selectedSpecialtyTag = [];
        if (userInfo.userAtom.tags && userInfo.userAtom.specialtys) {
          selectedPersionTagId = JSON.parse(userInfo.userAtom.tags);
          selectedPersionTag = selectedPersionTagId.map(function(tag) {
            return tag.tagsname;
          });
          selectedSpecialtyTagId = JSON.parse(userInfo.userAtom.specialtys);
          selectedSpecialtyTag = selectedSpecialtyTagId.map(function(tag) {
            return tag.tagsname;
          });
        }
          
        userInfo.userAtom = userInfo.userAtom || {};
        userInfo.userAtom.nickName = userInfo.userAtom.nickName || userInfo.userAtom.username;

        this.setState({
            userInfo:userInfo.userAtom,
            selectedPersionTag: selectedPersionTag,
            selectedPersionTagId: selectedPersionTagId,
            selectedSpecialtyTag: selectedSpecialtyTag,
            selectedSpecialtyTagId: selectedSpecialtyTagId
            });      
      }
  },

    handlePersionTag(tag,id, checked) {
        const { selectedPersionTag,selectedPersionTagId } = this.state;
        if (checked && selectedPersionTag.length > 1) {
            alert('标签最多选择两个');
            return;
        }
        const nextSelectedTags = checked ? [...selectedPersionTag, tag] : selectedPersionTag.filter(t => t !== tag);
        const nextselectedPersionTagId = checked ? [...selectedPersionTagId,{tagsname:tag,tagsId:id}] : selectedPersionTagId.filter(t => t !== id);
        console.log('You are interested in: ', nextselectedPersionTagId);
        this.setState({
            selectedPersionTag: nextSelectedTags,
            selectedPersionTagId:nextselectedPersionTagId,
        });
    },

    handleSpecialtyTag(tag,id, checked) {
        const { selectedSpecialtyTag,selectedSpecialtyTagId } = this.state;
        if (checked && selectedSpecialtyTag.length > 2) {
            alert('特长最多选择三个');
            return;
        }
        const nextSelectedTags = checked ? [...selectedSpecialtyTag, tag] : selectedSpecialtyTag.filter(t => t !== tag);
        const nextSelectedSpecialtyTagId = checked ? [...selectedSpecialtyTagId, {tagsname:tag,tagsId:id}] : selectedSpecialtyTagId.filter(t => t !== id);
        console.log('You are interested in: ', nextSelectedSpecialtyTagId);

        this.setState({ 
            selectedSpecialtyTag: nextSelectedTags,
            selectedSpecialtyTagId:nextSelectedSpecialtyTagId,
        });
    },

  handleSubmit(e) {
    e.preventDefault();
    var submitData;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        submitData = {
            nickName:values.nickName,
            cover:'',
            sex:values.sex,
            birthDate:values.birthDate,
            constellation:values.constellation,
            weight:values.weight,
            height:values.height,
            ageGroup:values.ageGroup,
            residentCity:values.residentCity,
            mobile:values.mobile,
            isShowMobile:1,
            school:values.school,
            professional:values.professional,
            tags:JSON.stringify(this.state.selectedPersionTagId),
            specialtys:JSON.stringify(this.state.selectedSpecialtyTagId),
            description:values.description,
        }
      }
      if ( this.props.submitData) {
            this.props.submitData(submitData);
        }
    });

    
  },

  render(){

    const { getFieldDecorator } = this.props.form;
    const { selectedPersionTag,selectedSpecialtyTag } = this.state;
    const formItemLayout = {
      labelCol: { span: 7},
      wrapperCol: { span: 17},
    };

    return (
        <div>
            <div className={styles.essential}>
                <Form onSubmit={this.handleSubmit} horizontal className = {styles.exampleInput} >
                    <FormItem
                        {...formItemLayout}
                        label ='姓名(必填)'
                        hasFeedback
                    >
                        {getFieldDecorator('nickName',{initialValue:this.state.userInfo.nickName})(  
                            <Input 
                                size="large" 
                                placeholder="请输入姓名" 
                                className={styles.item}
                                onChange={this.handleChange}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label ='性别(必填)'
                        hasFeedback
                    >
                        {getFieldDecorator('sex',{initialValue:this.state.userInfo.sex})(  
                            <select className={styles.item} size="large">
                                <option value={0}>未知</option>
                                <option value={1}>女</option>
                                <option value={2}>男</option>
                            </select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label ='年龄(必填)'
                        hasFeedback
                    >
                        {getFieldDecorator('birthDate',{initialValue:this.state.userInfo.birthDate})(  
                            <Input 
                                size="large" 
                                placeholder="请选择出生日期" 
                                className={styles.item} 
                                type='date'
                              />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label ='星座'
                        hasFeedback
                    >
                        {getFieldDecorator('constellation',{initialValue:this.state.userInfo.constellation})(  
                            <Input 
                              size="large" 
                              placeholder="请输入星座" 
                              className={styles.item}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label ='身高(必填)'
                        hasFeedback
                    >
                        {getFieldDecorator('height',{initialValue:this.state.userInfo.height})(  
                            <Input 
                              size="large" 
                              placeholder="请输入身高CM" 
                              className={styles.item} 
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label ='体重(必填)'
                        hasFeedback
                    >
                        {getFieldDecorator('weight',{initialValue:this.state.userInfo.weight})(  
                            <Input 
                              size="large" 
                              placeholder="请输入体重KG" 
                              className={styles.item} 
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label ='年龄段(必填)'
                        hasFeedback
                    >
                        {getFieldDecorator('ageGroup',{initialValue:this.state.userInfo.ageGroup})(  
                            <Input 
                                size="large" 
                                placeholder="请选择年龄段" 
                                className={styles.item} 
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label ='常住城市'
                        hasFeedback
                    >
                        {getFieldDecorator('residentCity',{initialValue:this.state.userInfo.residentCity})(  
                            <Input 
                              size="large" 
                              placeholder="请输入城市" 
                              className={styles.item}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label ='手机号(必填)'
                        hasFeedback
                    >
                        {getFieldDecorator('mobile',{initialValue:this.state.userInfo.mobile})(  
                           <Input 
                                size="large" 
                                placeholder="请输入手机号" 
                                className={styles.item} 
                                type='tel' 
                            />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label ='毕业学校'
                        hasFeedback
                    >
                        {getFieldDecorator('school',{initialValue:this.state.userInfo.school})(  
                           <Input 
                            size="large" 
                            placeholder="请输入毕业院校" 
                            className={styles.item}
                          />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label ='毕业学校'
                        hasFeedback
                    >
                        {getFieldDecorator('professional',{initialValue:this.state.userInfo.professional})(  
                           <Input 
                            size="large" 
                            placeholder="请输入所学专业" 
                            className={styles.item}
                          />
                        )}
                    </FormItem>
           
                    <div className={styles.label}>
                        <p>个人标签(最多可选2个)<span>(必填)</span>：</p>
                        <div>
                        {
                            this.props.persionTag.map((tag,i) => (
                              <CheckableTag
                                key={i}
                                className={styles.tag}
                                checked={selectedPersionTag.indexOf(tag.name) > -1}
                                onChange={checked => this.handlePersionTag(tag.name, tag.id,checked)}
                              >
                                {tag.name}
                              </CheckableTag>
                        ))
                        }
                        </div>
                    </div>
                    <div className={styles.speciality}>
                        <p>特长(最多可选3个)<span>(必填)</span>：</p>
                        <div >
                        {
                            this.props.specialtyTag.map((tag,i) => (
                              <CheckableTag
                                key={i}
                                className={styles.tag}
                                checked={selectedSpecialtyTag.indexOf(tag.name) > -1}
                                onChange={checked => this.handleSpecialtyTag(tag.name,tag.id, checked)}
                              >
                                {tag.name}
                              </CheckableTag>
                        ))
                        }
                        </div>
                    </div>

                    <FormItem>
                        <div className={styles.profiles}>
                            <p>个人简介</p>
                        {getFieldDecorator('description',{initialValue:this.state.userInfo.description})(  
                            
                                <input size="large" 
                                        type="textarea" 
                                        placeholder="请输入2000字以内的个人简介~" 
                                        className={styles.item}
                                />
                        )}
                        </div>

                    </FormItem>

                    <div className={styles.recommend}>
                        <Button type="primary" htmlType="submit" className={styles.conservation}>保存</Button>
                    </div>
                </Form>
            </div>
        </div>

        );
    },
}));

BaseInfo.propTypes = {
  persionTag:PropTypes.array,
  specialtyTag:PropTypes.array,
};

export default BaseInfo;
