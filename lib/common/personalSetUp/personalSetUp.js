import React from "react";
import PropTypes from "prop-types";

import Input from "../../base/input/input.js";
import Icon from "../../base/icon/icon.js";
import Upload from "../../base/upload/upload.js";
import Notification from "../../base/notification/notification.js";
import { Form, FormItem, Create } from "../../base/form/form.js";
import request from "../../util/request/request.js";
import store from "../../util/localData/storage.js";

import config from "../../../getConfig.js";

function beforeUpload (file) {
  const isJPG = /image/.test(file.type);
  if (!isJPG) {
    Notification.error({
      message: "只能上传图片!"
    });
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    Notification.error({
      message: "大小不超过2MB!"
    });
  }
  return isJPG && isLt2M;
}

/**
 *  个人设置组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
class PersonalSetUp extends React.Component {
  static propTypes = {
    /** 个人设置提交地址 */
    updateUrl: PropTypes.string,
    /** 头像上传地址 */
    uploadUrl: PropTypes.string,
  };
  static defaultProps = {
    updateUrl: "sys/user/update",
    uploadUrl: "sys/user/upload/avatar",
  };
  state = {
    loading: false,
  };
  componentDidMount () {
    const _this = this;
    request.GET(`${config.host}/sys/user/info`).then((res) => {
      if (res.success) {
        _this.setState({
          ...res.data
        });
      }
    });
  }
  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      this.setState({
        avatar: info.file.response.msg,
        loading: false,
      });
    }
  };
  handleSubmit = () => {
    const { updateUrl } = this.props;
    const { validateFields } = this.props.form;
    const {
      id,
      avatar
    } = this.state;
    validateFields((err, values) => {
      if (!err) {
        values.id = id;
        if (avatar && avatar !== "") {
          values.avatar = avatar;
        }
        request.POST(`${config.host}/${updateUrl}`, {
          body: values
        }).then((res) => {
          if (res.success) {
            Notification.success({
              message: "修改成功"
            });
          } else {
            Notification.error({
              message: res.msg
            });
          }
        });
      }
    });
  };
  render () {
    const { props, state } = this;
    const {
      loading,
      username,
      email,
      name,
      avatar,
    } = state;
    const { form, uploadUrl } = props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    const uploadButton = (
      <div>
        <Icon type={loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Form title="个人设置" handleSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="账号"
        >
          {getFieldDecorator("username", {
            initialValue: username,
          })(<Input disabled />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          {getFieldDecorator("email", {
            initialValue: email,
            rules: [
              { required: true, message: "邮箱必填!" },
              { pattern: /^\w+@([0-9a-zA-Z]+[.])+[a-z]{2,4}$/, message: "邮箱不正确!" },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="姓名"
        >
          {getFieldDecorator("name", {
            initialValue: name,
            rules: [
              { required: true, message: "必填!" },
              { validator: this.checkPassword }
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="头像"
        >
          {getFieldDecorator("avatar", {
            initialValue: avatar,
            rules: [
              { required: true, message: "必填!" },
            ],
          })(<Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={beforeUpload}
            action={`${config.host}/${uploadUrl}`}
            headers={{
              Authentication: store.get("Authentication"),
            }}
            onChange={this.handleChange}
            name="avatar"
          >
            {
              avatar ? <img src={`${config.host}/${avatar}`} alt="avatar" /> : uploadButton
            }
          </Upload>)}
        </FormItem>
      </Form>
    );
  }
}
export default Create(PersonalSetUp);
