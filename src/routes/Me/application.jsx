import React,{ Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import ApplicationItem from '../../components/my/Application';

class Application extends Component{
    
    render(){

        const { dataList } = this.props.application;

        return (
    	    <div>
            {
                 dataList.length > 0 ?(
                    dataList.map((value,key)=>{
                        return(
                            <ApplicationItem 
                                key = {key}
                                dramaName={value.groupName}
                                name = {value.roleName}
                                date = {value.applyDate}
                                count = {value.rankingCount}
                                sex = {value.roleSex}
                                votes = {value.voteCount}
                                roleId = { value.roleId }
                            />
                        )
                    })
                ):<div/>
            }
            </div>
        )
    }
}

function mapStateToProps({ application }) {
  return { application };
}

Application.propTypes = {
    application:PropTypes.object,
};

export default connect(mapStateToProps)(Application);

// <Application
// 				dramaName={'水浒传下传记'}
// 				name = {'张飞'}
// 				date = {'2016-10-1'}
// 				count = {5}
// 				sex = {'男'}
// 				votes = {1180}
// 			/>
// 			<Application
// 				dramaName={'水浒传下传记'}
// 				name = {'张飞'}
// 				date = {'2016-10-1'}
// 				count = {5}
// 				sex = {'男'}
// 				votes = {1180}
// 			/>