import React,{ PropTypes } from 'react';
import { Upload, Icon, message,Form, Input , Modal,Button} from 'antd';
import styles from './addItsRole.less';

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList:'',
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <div className="ant-uploadtext">上传角色头像</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/upload.do"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

const AddItsRole = (props) => {
  return (
  	<div>
    	<div className = {styles.roleInput}>
            <Form horizontal >
              <p><span>角色名<span>(必填)</span>：</span><Input size="large" placeholder="请输入角色名" className={styles.item}/></p>
              <p><span>线位<span>(必填)</span>：</span><Input size="large" placeholder="请输入角色线位" className={styles.item}/></p>
              <p><span>年龄<span>(必填)</span>：</span><Input size="large" placeholder="请选择年龄段" className={styles.item}/></p>
              <p><span>性别<span>(必填)</span>：</span><Input size="large" placeholder="请选择性别" className={styles.item}/></p>
              <p><span>角色标签<span>(必填)</span>：</span><Input size="large" placeholder="请选择角色标签" className={styles.item}/></p>
              <p className={styles.item1}><span style={{display:'block'}}>人物小传<span>(必填)</span>：</span><Input size="large" placeholder="请输入人物小传" className={styles.item}/></p>
              <p className={styles.item1}><span style={{display:'block'}}>其他<span>(必填)</span>：</span><Input size="large" placeholder="请输入其他内容" className={styles.item}/></p>
            </Form>
            <div className = {styles.imgBox}>
                <PicturesWall />
            </div>
        </div>
        <div className={styles.deleteAdd}>
            <Button type="ghost" className={styles.rolebtn}>删除此角色</Button> 
        </div>
    </div>
  );
};

AddItsRole.propTypes = {
    
};
export default AddItsRole;
