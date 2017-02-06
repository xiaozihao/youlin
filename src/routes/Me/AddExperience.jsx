import React,{PropTypes,Component} from 'react';
import { message,Button,Input,Form } from 'antd';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import styles from './AddExperience.less';

const FormItem = Form.Item;

const level = ['主角','配角','次配','新人'];

const AddExperience = Form.create()(React.createClass({

   getInitialState() {
       return{
            data:[],
            startYear:'1967',
            endYear:'',
            movieClass:'其他',
            level:level[0],
            id:null,
        }
    },

    componentWillMount() {

        var myDate= new Date(); 
        var startYear=myDate.getFullYear()-50;//起始年份 
        var endYear=myDate.getFullYear()+50;//结束年份 
        var data = [];
        for (var i=startYear;i<=endYear;i++) { 
            data.push(i);
        } 
        this.setState({data});
        const match = pathToRegexp('/me/addExperience/:addExperienceId').exec(this.props.location.pathname);
        if (match) {
          const userId = match[1];
          this.setState({id:userId});
        } 
    },   

    componentDidMount() {
        
    },

    onMovieClass(e){
        this.setState({movieClass:e});
    },

    onActorLevel(e){
        this.setState({level:e});
    },

    firstYear(e){
        this.setState({startYear:e});
    },

    onSubtime(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if (values.movieName &&values.roleName && this.state.startYear && this.state.movieClass && this.state.level) {
                    this.props.dispatch({
                        type:'experience/submitExperience',
                        payload:{
                            type:this.state.movieClass,
                            year:this.state.startYear,
                            level:this.state.level,
                            description:values.description,
                            cooperationDirector:values.cooperationDirector,
                            cooperationPerformer:values.cooperationPerformer,
                            roleName:values.roleName,
                            movieName:values.movieName,
                            id:this.state.id,
                        }
                    })
                }else{
                    message.error('输入的内容有误');
                }
            }
        });
    },

    render(){

        const { movieTag,queryExperienceData } = this.props.experience;
        const { getFieldDecorator } = this.props.form;
        const defaultTag = JSON.stringify(movieTag);
        let type;
        if (queryExperienceData.type) {
            type = queryExperienceData.type;
        }

        return (
            <div>
                <Form onSubmit={this.onSubtime}>
                    <div className={styles.title}>
                        <Button type="primary" htmlType="submit">发布</Button>
                    </div>
                    <div className={styles.release}>
                        <div><p>年份</p></div>
                        <div style = {{textAlign:'center'}}>
                            <select defaultValue = { queryExperienceData.year } className={styles.btn} onChange={(e)=> this.firstYear(e.target.value)}>
                                {
                                    this.state.data.map((value,i)=>
                                      <option key={value} value={value}>{value}</option>
                                    )
                                }   
                            </select> 
                        </div>

                        <div><p>影片类型</p></div>
                        <select defaultValue={ type ? type : defaultTag.name}  onChange={(e)=> this.onMovieClass(e.target.value)} className={styles.btn}>
                            {
                                movieTag.map((value,i)=>
                                  <option key={value.name} value={value.name}>{value.name}</option>
                                )
                            }
                        </select>

                        <FormItem>
                            <p>
                            {getFieldDecorator('movieName',{
                                initialValue: queryExperienceData.movieName,
                            })(  
                               <Input size="large" placeholder="影片名称(必填)" className={styles.item}/>
                            )}
                            </p>
                        </FormItem>

                        <FormItem>
                            <p>
                            {getFieldDecorator('roleName',{
                                initialValue: queryExperienceData.roleName,
                            })(  
                               <Input size="large" placeholder="角色名(必填)" className={styles.item}/>
                            )}
                            </p>
                        </FormItem>
                        
                        <div><p>角色线位</p></div>

                        <select defaultValue={queryExperienceData.level}  className={styles.btn} onChange={(e)=> this.onActorLevel(e.target.value)}>
                            {
                                level.map((value,i)=>
                                    <option key={value} value={value}>{value}</option>
                                )
                            }
                        </select>
                       
                        <FormItem>
                            <p>
                            {getFieldDecorator('cooperationDirector',{
                                initialValue: queryExperienceData.cooperationDirector,
                            })(  
                               <Input size="large" placeholder="合作导演" className={styles.item}/>
                            )}
                            </p>
                        </FormItem>
                   
                        <div style={{border:'none',paddingBottom:32}}>
                            <FormItem>
                                <p>
                                {getFieldDecorator('cooperationPerformer',{
                                    initialValue: queryExperienceData.cooperationPerformer,
                                })(  
                                   <Input size="large" placeholder="合作演员" className={styles.item}/>
                                )}
                                </p>
                            </FormItem>
                        </div>
                        <FormItem>
                            {getFieldDecorator('description',{
                                initialValue: queryExperienceData.description,
                            })(  
                               <textarea className={styles.textarea} placeholder="请输入100字以内的说明" />
                            )}
                        </FormItem>
                    </div>
                    </Form>
            </div>
    
        );
    }
}));

function mapStateToProps({ experience }) {
  return { experience };
}


AddExperience.propTypes = {
    experience:PropTypes.object,
};

export default connect(mapStateToProps)(AddExperience);


