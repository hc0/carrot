import React, { Component } from "react";
import { Form, notification, TreeSelect } from "antd";
import "antd/lib/tree-select/style";
import Button from "../../../base/button/button";
import request from "../../../util/request/request.js";
import config from "../../../../getConfig.js";

const TNode = TreeSelect.TreeNode;
const FormItem = Form.Item;
class AMSpecificModal extends Component {
  constructor (props) {
    super(props);
    this.state = {
      treeData: this.props.treeData,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  loadOrg = treeNode => new Promise((resolve) => {
    if (treeNode.props.children) {
      resolve();
      return;
    }
    request.GET(`${config.host}/sys/resource/list?id=${treeNode.props.eventKey}`).then((res) => {
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
        values.id = this.props.dataSource.id;
        if (values.pid === "_root_id") {
          values.pid = "";
        }
        request.POST(`${config.host}/sys/resource/move`, { body: values }).then((res) => {
          if (res.success) {
            this.props.hideModal();
            notification.success({
              message: "修改成功",
            });
            this.props.refresh(fields);
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
              label="上级"
            >
              {
                getFieldDecorator("pid", {
                  rules: [{
                    required: true, message: "请选择上级资源目录!",
                  }],
                  initialValue: type === "add" ? this.props.dataSource.id : this.props.dataSource.pid
                })(<TreeSelect
                  ref={(treeDom) => { this.tree = treeDom; }}
                  loadData={this.loadOrg}
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  placeholder="请选择"
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

export default Form.create()(AMSpecificModal);
