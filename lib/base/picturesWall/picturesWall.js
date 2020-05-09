import React from "react";
import PropTypes from "prop-types";
import { Upload as ATUpload, Modal, Icon } from "antd";
import "antd/lib/upload/style";

/**
 * 照片墙上传
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class PicturesWall extends React.Component {
  static propTypes = {
    /**
     * 初始数据
     */
    defaultFileList: PropTypes.array,
    /**
     * 最大文件数量
     */
    maxFile: PropTypes.number,
    /**
     * 变化回调
     */
    onChange: PropTypes.func,
    /**
     * 上传地址
     */
    url: PropTypes.string
  };
  static defaultProps = {
    maxFile: Infinity,
    defaultFileList: []
  };
  constructor (props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: "",
      fileList: props.defaultFileList
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    if (this.props.onChange) {
      this.props.onChange(fileList);
    }
    this.setState({ fileList });
  };

  render () {
    const { previewVisible, previewImage, fileList } = this.state;
    const { props } = this;
    const {
      maxFile,
      url
    } = props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <ATUpload
          action={url}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= maxFile ? null : uploadButton}
        </ATUpload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
