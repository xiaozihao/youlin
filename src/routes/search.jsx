import React,{ Component, PropTypes } from 'react';
import { Input, Icon, Button,Card,Tag,Form } from 'antd';
import { connect } from 'dva';
import styles from './search.less';
import TheatreGroupItem from '../components/theatreGroup/theatreGroupItem';
import DefaultMessage from '../components/defaultMessage';

let decodeDta = JSON.parse(localStorage.getItem('searchData'));

const SearchInput = Input.Search;

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      tags:[],
      isSearch:false,
    };
  }

  componentWillMount(){
  	 
  }

  componentDidMount(){
    if (decodeDta !== null) {
        return this.setState({tags:decodeDta});
    }else{
        decodeDta = [];
    }
  }

    onSearchClick(value){
        if (value) {
             this.setState({isSearch:true});

            this.props.dispatch({
                type: 'search/search',
                payload:{ 
                    likeName:value, 
                    tagIds:[], 
                    pageNo:0, 
                    pageSize:10
                } 
            });
            
            decodeDta.push(value);  
            var uq = {};  
            var rq = [];  
              
            for(var i=0; i<decodeDta.length; i++){  
                  if(!uq[decodeDta[i]]){  
                      uq[decodeDta[i]] = true;  
                      rq.push(decodeDta[i]);  
                  }  
            }  
              
           console.log(rq); 
           localStorage.setItem('searchData',JSON.stringify(rq));
           this.setState({tags:rq});
       }
    }

  ontagSearch(value){
    this.props.dispatch({
        type: 'search/search',
        payload:{ 
            likeName:value, 
            tagIds:[], 
            pageNo:0, 
            pageSize:10
        } 
    });
  }

  onClean(){
    console.log('asd');
        decodeDta = [];
        localStorage.setItem('searchData',JSON.stringify(decodeDta));
        this.setState({tags:decodeDta});
  }

  render() {

    const { resultData,nextPage } = this.props.search;
    let searchComponent;

    var vNextPage;
    if (nextPage) {
      vNextPage = (<button onClick={()=>this.onNextPage()}>点击加载更多</button>);
    } else {
      vNextPage = (<p>没有更多数据...</p>);
    }   

    if (this.state.isSearch || this.state.tags) {
        searchComponent = (
            <div>
            <div className={styles.history} id='history' >
                
                    {
                        this.state.tags.length>0?( 
                            <div className ={styles.clean}>
                                <span>历史纪录</span>
                                <span onClick = {()=>this.onClean()}>清除历史纪录</span>
                            </div>):<div/>
                    }
                   
                    {
                       this.state.tags.length>0?(this.state.tags.map((tag)=> { return<Button onClick={()=>{this.ontagSearch(tag)}} className={styles.tag}>{tag}</Button>})

                       ):<div/>
                    }
            </div>
                {resultData.length >0 ?
                    <div>
                        {   
                            resultData.map((value,i)=>{
                                return(
                                    <TheatreGroupItem
                                        key = {i} 
                                        status = {value.status}
                                        id = {value.id}
                                        cover = {value.cover}
                                        title = {value.title}
                                        startTime = {value.startTime}
                                        stopTime = {value.stopTime}
                                    />
                                )
                            })
                        }
                    <div style = {{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom:20}} className = {styles.loadMoreButton}>{vNextPage}</div> 
                    </div>
                    :<DefaultMessage message = {'没有搜索到相关的信息'}/>
                }
            </div>
        )
    }else{
        searchComponent = (<div/>)
    }


    return (
        <div>
            <div className={styles.searchBar}>
                <SearchInput className = {styles.search} placeholder="搜索标签" onSearch={(value)=> this.onSearchClick(value)} />
            </div>
            {searchComponent}
        </div>
    );

    
  }
}

function mapStateToProps({ search }) {
  return { search };
}


Search.propTypes = {
    dispatch:PropTypes.func,
};

export default connect(mapStateToProps)(Search);