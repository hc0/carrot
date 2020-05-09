import React, { Component } from "react";
import { Form, Input, notification } from "antd";
import Button from "../../../base/button/button";
import request from "../../../util/request/request.js";
import config from "../../../../getConfig.js";

const FormItem = Form.Item;
class TenantModal extends Component {
  constructor (props) {
    super(props);
    let type = null;
    let isEdit = false;
    if (this.props.dataSource) {
      type = this.props.dataSource._type;
      if (type === "edit") {
        isEdit = true;
      }
    } else {
      isEdit = false;
      type = "normal";
    }
    this.state = {
      type: type,
      isEdit: isEdit
    };
    // console.log(JSON.parse(sessionStorage.city));
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit () {
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        const values = JSON.parse(JSON.stringify(fields));
        let url = null;
        if (this.state.isEdit) {
          values.id = this.props.dataSource.id;
          url = `${config.host}/sys/tenant/update`;
        } else {
          url = `${config.host}/sys/tenant/save`;
        }
        request.POST(url, { body: values }).then((res) => {
          if (res.success) {
            this.props.hideModal();
            if (this.state.isEdit) {
              notification.success({
                message: "修改成功",
              });
            } else {
              notification.success({
                message: "创建成功",
              });
            }
            this.props.refresh();
          } else {
            notification.error({
              message: res.msg,
            });
          }
        });
      }
    });
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    const { type, isEdit } = this.state;
    const formItemLayout = {
      labelCol: {
        span: 3,
      },
      wrapperCol: {
        span: 14,
      },
    };
    return (
      <div>
        <p >{type === "add" ? "新增租户" : "编辑租户"}</p>
        <Form>
          <div>
            <FormItem
              style={{ display: "flex", justifyContent: "center" }}
              {...formItemLayout}
              label="用户名"
            >
              {getFieldDecorator("administrator", {
                rules: [
                  {
                    required: true, type: "string", message: "请填写用户名!",
                  }, {
                    max: 20, message: "最大20个字符"
                  }, {
                    min: 2, message: "最少2个字符"
                  }, {
                    pattern: /^[0-9a-zA-Z_]{1,}$/, message: "只能输入数字、字母、下划线"
                  }],
                initialValue: type === "edit" ? this.props.dataSource.administrator : null
              })(<Input placeholder="请填写用户名" disabled={isEdit} />)}
            </FormItem>
            <FormItem
              style={{ display: "flex", justifyContent: "center" }}
              {...formItemLayout}
              label="名称"
            >
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true, type: "string", message: "请填写姓名!",
                  }, {
                    max: 20, message: "最大20个字符"
                  }, {
                    min: 2, message: "最少2个字符"
                  }, {
                    pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: "只能输入汉字、数字、字母"
                  }],
                initialValue: type === "edit" ? this.props.dataSource.name : null
              })(<Input placeholder="请填写角色名称" />)}
            </FormItem>
            <FormItem
              style={{ display: "flex", justifyContent: "center" }}
              {...formItemLayout}
              label="编码"
            >
              {getFieldDecorator("code", {
                rules: [{
                  required: true, type: "string", message: "请填写编码!",
                }, {
                  max: 20, message: "最大20个字符"
                }, {
                  min: 2, message: "最少2个字符"
                }, {
                  pattern: /^[0-9a-zA-Z_]{1,}$/, message: "只能输入数字、字母、下划线"
                }],
                initialValue: type === "edit" ? this.props.dataSource.code : null
              })(<Input placeholder="请填写编码" />)}
            </FormItem>
            <FormItem
              style={{ display: "flex", justifyContent: "center" }}
              {...formItemLayout}
              label="备注"
            >
              {getFieldDecorator("description", {
                rules: [{
                  max: 50, message: "最多50个字符"
                }],
                initialValue: type === "edit" ? this.props.dataSource.description : null
              })(<Input.TextArea placeholder="请填写备注" />)}
            </FormItem>
          </div>
          <div style={{
            paddingTop: "10px",
            textAlign: "center",
          }}
          >
            <Button
              title="取消"
              primary={false}
              onClick={this.props.hideModal}
            />
            <Button
              title="确定"
              style={{
                marginLeft: "20px"
              }}
              onClick={this.handleSubmit}
            />
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(TenantModal);
