/**
 * File: /Users/fengchengpu/Project/carrot/carrot-package/carrot/lib/business/orgManagement/userCU/orgCU.js
 * Project: /Users/fengchengpu/Project/carrot/carrot-package/carrot
 * Created Date: Wednesday January 10th 2018 2:33:23 pm
 * Author: chengpu
 * -----
 * Last Modified:Wednesday January 10th 2018 2:33:23 pm
 * Modified By: chengpu
 * -----
 * Copyright (c) 2018 MagCloud
 */
import React, { Component } from "react";
import { Form, Input, notification, TreeSelect } from "antd";
import "antd/lib/tree-select/style";
import Button from "../../../base/button/button";
import request from "../../../util/request/request.js";
import config from "../../../../getConfig.js";

const TNode = TreeSelect.TreeNode;
const FormItem = Form.Item;
class UserSpecificModal extends Component {
  constructor (props) {
    super(props);
    let type = null;
    if (this.props.dataSource) {
      type = this.props.dataSource._type;
    }
    this.state = {
      type: type,
      treeData: this.props.treeData,
    };
    // console.log(JSON.parse(sessionStorage.city));
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  loadOrg = treeNode => new Promise((resolve) => {
    if (treeNode.props.children) {
      resolve();
      return;
    }
    request.GET(`${config.host}/sys/organization/list?id=${treeNode.props.eventKey}`).then((res) => {
      treeNode.props.dataRef.children = res;
      this.setState({
        treeData: [...this.state.treeData],
      });
      resolve();
    });
  });
  handleSubmit () {
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        const values = JSON.parse(JSON.stringify(fields));
        let url = `${config.host}/sys/employee/create`;
        if (this.state.type !== "add") {
          values.id = this.props.dataSource.userId;
          url = `${config.host}/sys/user/update`;
        }
        request.POST(url, { body: values }).then((res) => {
          if (res.success) {
            this.props.hideModal();
            if (this.state.type !== "add") {
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
    const { type } = this.state;
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 15,
      },
    };
    const renderTreeNodes = data => data.map(item => (
      <TNode
        key={item.id}
        dataRef={item}
        title={item.name}
        value={item.id}
      >
        {item.children && renderTreeNodes(item.children)}
      </TNode>
    ));
    return (
      <div>
        <p >{type === "add" ? "新增用户" : "编辑用户"}</p>
        <Form>
          <div>
            <FormItem
              style={{ display: "flex", justifyContent: "center" }}
              {...formItemLayout}
              label="用户名"
            >
              {getFieldDecorator("username", {
                rules: [{
                  required: true, type: "string", message: "请填写用户名!",
                }, {
                  max: 20, message: "最大20个字符"
                }, {
                  min: 2, message: "最少2个字符"
                }, {
                  pattern: /^[0-9a-zA-Z_]{1,}$/, message: "只能输入数字、字母、下划线"
                }],
                initialValue: type !== "add" ? this.props.dataSource.username : null
              })(<Input disabled={type !== "add"} placeholder="请填写用户名" />)}
            </FormItem>
            <FormItem
              style={{ display: "flex", justifyContent: "center" }}
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator("name", {
                rules: [{
                  required: true, type: "string", message: "请填写姓名!",
                }, {
                  max: 20, message: "最大20个字符"
                }, {
                  min: 2, message: "最少2个字符"
                }, {
                  pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: "只能输入汉字、数字、字母"
                }],
                initialValue: type !== "add" ? this.props.dataSource.name : null
              })(<Input placeholder="请填写姓名" />)}
            </FormItem>
            <FormItem
              style={{ display: "flex", justifyContent: "center" }}
              {...formItemLayout}
              label="邮箱"
            >
              {
                getFieldDecorator("email", {
                  rules: [{ type: "email", message: "请填写正确的邮箱地址!" }],
                  initialValue: type !== "add" ? this.props.dataSource.email : null
                })(<Input placeholder="请填写邮箱" />)}
            </FormItem>
            <FormItem
              style={{ display: "flex", justifyContent: "center" }}
              {...formItemLayout}
              label="手机号"
            >
              {getFieldDecorator("phoneNumber", {
                rules: [
                  { required: true, message: "请输入手机号!" },
                  { pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/, message: "请输入正确的手机号" }
                ],
                initialValue: type !== "add" ? this.props.dataSource.phoneNumber : null
              })(<Input placeholder="请填写备注" />)}
            </FormItem>
            <FormItem
              style={{ display: "flex", justifyContent: "center" }}
              {...formItemLayout}
              label="所属部门"
            >
              {
                getFieldDecorator("orgId", {
                  rules: [{
                    required: true, type: "string", message: "请填写编码!",
                  }, {
                    max: 10, message: "最多10个字符"
                  }],
                  initialValue: type === "add" ? this.props.dataSource.orgId : this.props.dataSource.orgId
                })(<TreeSelect
                  ref={(treeDom) => { this.tree = treeDom; }}
                  loadData={this.loadOrg}
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  placeholder="Please select"
                  disabled={type === "add"}
                >
                  { renderTreeNodes(this.state.treeData) }
                   </TreeSelect>)}
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

export default Form.create()(UserSpecificModal);
