import React from "react";
import PropTypes from "prop-types";

import Input from "../../base/input/input.js";
import Notification from "../../base/notification/notification.js";
import { Form, FormItem, Create } from "../../base/form/form.js";
import request from "../../util/request/request.js";

import config from "../../../getConfig.js";

/**
 *  个人修改密码组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
class ChangePassword extends React.Component {
  static propTypes = {
    /** 修改密码提交地址 */
    url: PropTypes.string,
  };
  static defaultProps = {
    url: "sys/user/updatePassword",
  };
  checkPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次密码不一致!");
    } else {
      callback();
    }
  };
  handleSubmit = () => {
    const { url } = this.props;
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        request.POST(`${config.host}/${url}`, {
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
    const { props } = this;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    return (
      <Form title="修改密码" handleSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="旧密码"
        >
          {getFieldDecorator("oldPassword", {
            initialValue: "",
            rules: [{ required: true, message: "旧密码必填!" }],
          })(<Input type="password" placeholder="旧密码" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新密码"
        >
          {getFieldDecorator("password", {
            initialValue: "",
            rules: [{ required: true, message: "新密码必填!" }],
          })(<Input type="password" placeholder="新密码" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码确认"
        >
          {getFieldDecorator("confirmPassword", {
            initialValue: "",
            rules: [
              { required: true, message: "必填!" },
              { validator: this.checkPassword }
            ],
          })(<Input type="password" placeholder="确认新密码" />)}
        </FormItem>
      </Form>
    );
  }
}
export default Create(ChangePassword);
