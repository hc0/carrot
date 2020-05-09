import React, { Component } from "react";
import { Form, Input, notification, TreeSelect } from "antd";
import "antd/lib/tree-select/style";
import Button from "../../../base/button/button";
import request from "../../../util/request/request.js";
import config from "../../../../getConfig.js";

const TNode = TreeSelect.TreeNode;
const FormItem = Form.Item;
class OrgSpecificModal extends Component {
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
        if (this.state.type !== "add") {
          values.id = this.props.dataSource.id;
        }
        request.POST(`${config.host}/sys/organization/save`, { body: values }).then((res) => {
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
            this.props.refresh(values);
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
        disabled={item.id === this.props.dataSource.id}
      >
        {item.children && renderTreeNodes(item.children)}
      </TNode>
    ));
    return (
      <div>
        <p >{type === "add" ? "新增角色" : "编辑角色"}</p>
        <Form>
          <div>
            <FormItem
              style={{ display: "flex", justifyContent: "center" }}
              {...formItemLayout}
              label="部门名称"
            >
              {getFieldDecorator("name", {
                rules: [
                  { required: true, message: "请填写角色名称!" },
                  { max: 10, message: "最多12个字符!" },
                ],
                initialValue: type !== "add" ? this.props.dataSource.name : null
              })(<Input placeholder="请填写角色名称" />)}
            </FormItem>
            <FormItem
              style={{ display: "flex", justifyContent: "center" }}
              {...formItemLayout}
              label="部门编号"
            >
              {getFieldDecorator("code", {
                rules: [{
                  required: true, type: "string", message: "请填写部门编号!",
                }, {
                  max: 20, message: "最大20个字符"
                }, {
                  min: 2, message: "最少2个字符"
                }, {
                  pattern: /^[0-9a-zA-Z_]{1,}$/, message: "只能输入数字、字母、下划线"
                }],
                initialValue: type !== "add" ? this.props.dataSource.code : null
              })(<Input placeholder="请填写编码" />)}
            </FormItem>
            <FormItem
              style={{ display: "flex", justifyContent: "center" }}
              {...formItemLayout}
              label="所属部门"
            >
              {
                getFieldDecorator("pid", {
                  rules: [{
                    required: true, type: "string", message: "请填写编码!",
                  }, {
                    max: 10, message: "最多10个字符"
                  }],
                  initialValue: type === "add" ? this.props.dataSource.id : this.props.dataSource.pid
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
            <FormItem
              style={{ display: "flex", justifyContent: "center" }}
              {...formItemLayout}
              label="备注"
            >
              {getFieldDecorator("description", {
                rules: [{
                  max: 50, message: "最多50个字符"
                }],
                initialValue: type !== "add" ? this.props.dataSource.description : null
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

export default Form.create()(OrgSpecificModal);
