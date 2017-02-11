import React,{ Component, PropTypes } from 'react';
import { Upload, Icon, message } from 'antd';
import styles from './UpdateVideo.less';
import FileInput from '../../utils/fileInput';

function UpdateVideo({
    location,
    updateVide_30,
    updateVide_40,
    trailersUrl,
    introduceMyselfMoveUrl
}){

    console.log(introduceMyselfMoveUrl);
    console.log(trailersUrl);

  return (
    <div style = {{paddingBottom:50}}>
        <div className={styles.prompt}>
          <video  src='http://www.w3school.com.cn/i/movie.ogg' className={styles.video} controls="controls">
          </video>
          <p>示例视频提示用户</p>
        </div>
        <div className={styles.box}>
            <video controls="controls"  className={styles.upVideo} src={introduceMyselfMoveUrl}>
                 <source type="video/mp4"/>
            </video>
            <p>请上传30秒的自我介绍</p>
            <FileInput 
                onChange={updateVide_30} 
                multiple={false} 
                className={styles.modalBtn}
                btnValue = {'请上传'}
            />
        </div>
        <div className={styles.box}>
            <video controls="controls" className={styles.upVideo} src={trailersUrl} >
                 <source type="video/mp4"/>
            </video>
            <p>请上传45秒的片花</p>
            <FileInput 
                onChange={updateVide_40} 
                multiple={false} 
                className={styles.modalBtn}
                btnValue = {'请上传'}
            />
        </div>
    </div>
  );
};

UpdateVideo.propTypes = {
    location:PropTypes.object,
    updateVide_30:PropTypes.func,
    updateVide_40:PropTypes.func,
    trailersUrl:PropTypes.string,
    introduceMyselfMoveUrl:PropTypes.string,
};

export default UpdateVideo;