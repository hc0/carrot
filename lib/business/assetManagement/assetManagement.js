import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Row, Form, Popover, Modal, notification, TreeSelect, Card } from "antd";
import "antd/lib/col/style";
import "antd/lib/row/style";
import "antd/lib/modal/style";
import "antd/lib/popover/style";
import "antd/lib/tree-select/style";
import "antd/lib/card/style";
import { margin, padding } from "polished";
import FixedTool from "../../base/fixedTool/fixedTool";
import request from "../../util/request/request.js";
import { Input, Button, Tree, Icon, RadioGroup, InputNumber } from "../../index";
import config from "../../../getConfig.js";
import AssetMove from "./assetMove/assetMove";

import "./assetManagement.less";
import RoleListModal from "./roleListModal/roleListModal";

const TNode = Tree.TreeNode;
const FormItem = Form.Item;
const pageHeaderStyle = {
  position: "absolute",
  top: 0,
  width: "100%",
  marginBottom: 20,
  backgroundColor: "#fff",
  height: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};
/**
 * 更新节点数据
 */
const refreshTreeData = (treeData, id, newData, type, target) => {
  function loopNode (nodes) {
    nodes.some((nd, i) => {
      if (nd.id === id) {
        if (type === "insert") {
          if (nd.children) {
            nd.children.push(newData);
          } else {
            nd.children = [newData];
          }
        } else if (type === "del") {
          nodes.splice(i, 1);
          target.setState({
            currentAssetId: "_root_id"
          });
        } else {
          nd.children = newData;
        }
        return true;
      }
      if (nd.children && nd.children.length) {
        loopNode(nd.children);
      }
      return false;
    });
  }
  loopNode(treeData);
};
/**
 * 资源类型
 */
const assetOptions = [
  {
    value: "0",
    text: "目录"
  }, {
    value: "1",
    text: "菜单",
    disabled: true
  }, {
    value: "2",
    text: "功能"
  }
];
/**
 * 加载方式
 */
const loadTypeOptions = [
  {
    value: "2",
    text: "IFRAME",
    disabled: true
  }, {
    value: "3",
    text: "TEMPLATE"
  }
];
/**
 * 气泡卡片操作
 */
const options = {
  add (assetRecord, target) {
    refreshTreeData(target.state.treeData, assetRecord.id, { id: "_temp_id", name: "新增资源" }, "insert");
    target.setState({
      currentAssetId: "",
      selectedKeys: ["_temp_id"],
      treeData: [...target.state.treeData],
      roleSelectedRows: [],
      assetRecord: {
        pid: assetRecord.id,
      }
    });
  },
  move (assetRecord, target) {
    if (!assetRecord.pid) {
      assetRecord.pid = "_root_id";
    }
    target.setState({
      assetMoveVisible: true,
      assetRecord
    });
  },
  del (record, target) {
    request.POST(`${config.host}/sys/resource/delete?id=${record.id}`).then((res) => {
      if (res.success) {
        notification.success({
          message: "删除成功",
        });
        target.refreshAssetListByAssetId(record.pid);
        target.treeNodeSelect([target.state.treeData[0].id], { selected: true });
      } else {
        notification.success({
          message: res.msg,
        });
      }
    });
  }
};
/**
 * 顶部操作栏
 */
const operationDefault = {
};
/**
 * 角色管理
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
class AssetManagement extends Component {
  static propTypes = {
    /**
     * 顶部操作按钮（目前提供的默认属性包括：add）注：传入值会覆盖同名默认属性。
     * 具体使用规则请见实例代码
     */
    operation: PropTypes.object,
    /**
     * 单选/多选
     */
    type: PropTypes.oneOf(["normal", "radio", "checkbox"]),
    /**
     * 整体样式
     */
    style: PropTypes.object
  };
  static defaultProps = {
    operation: {},
    type: "normal",
    style: {}
  };
  constructor (props) {
    super(props);
    this.state = {
      selectedRows: [],
      assetRecord: {},
      roleSelectedRows: [],
      currentAssetId: "_root_id",
      treeData: [{
        id: "_root_id",
        name: "系统资源",
        children: []
      }],
      params: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.tNodeOnMouseOver = this.tNodeOnMouseOver.bind(this);
    this.treeNodeSelect = this.treeNodeSelect.bind(this);
    this.loadRootAsset = this.loadRootAsset.bind(this);
  }

  componentDidMount () {
    this.loadRootAsset();
  }

  loadRootAsset () {
    request.GET(`${config.host}/sys/resource/list`).then((res) => {
      this.state.treeData[0].children = res;
      this.setState({
        treeData: [...this.state.treeData],
      });
    });
  }
  loadAsset = treeNode => new Promise((resolve) => {
    if (treeNode.props.eventKey === "_temp_id") {
      refreshTreeData(this.state.treeData, "_temp_id", {}, "del", this);
      this.setState({
        treeData: [...this.state.treeData],
      });
      resolve();
      return;
    }
    if (treeNode.props.children) {
      resolve();
      return;
    }
    let url = `${config.host}/sys/resource/list`;
    if (treeNode.props.eventKey !== "_root_id") {
      url = `${config.host}/sys/resource/list?id=${treeNode.props.eventKey}`;
    }
    request.GET(url).then((res) => {
      treeNode.props.dataRef.children = res;
      this.setState({
        treeData: [...this.state.treeData],
      });
      resolve();
    });
  });
  refreshAssetListByAssetId (id) {
    request.GET(`${config.host}/sys/resource/list?id=${id}`).then((res) => {
      refreshTreeData(this.state.treeData, id, res);
      this.setState({
        treeData: [...this.state.treeData],
      });
    });
  }
  loadData (params) {
    this.changeParams(params);
    request.GET(`${config.host}/sys/authority/listRole?resourceId=${this.state.params.id}`).then((rs) => {
      this.setState({
        roleSelectedRows: rs.data,
      });
    });
  }
  changeParams (params) {
    if (typeof (params) === "object") {
      Object.keys(params).every((k) => {
        const element = params[k];
        this.state.params[k] = element;
        return true;
      });
    }
  }
  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        const values = JSON.parse(JSON.stringify(fields));
        const { currentAssetId } = this.state;
        if (currentAssetId) {
          values.id = this.state.currentAssetId !== "_root_id" ? this.state.currentAssetId : "";
        }
        if (values.pid === "_root_id") {
          values.pid = "";
        }
        request.POST(`${config.host}/sys/resource/save`, { body: values }).then((res) => {
          if (res.success) {
            if (currentAssetId) {
              notification.success({
                message: "修改成功",
              });
            } else {
              notification.success({
                message: "创建成功",
              });
            }
            // 判断父节点是不是根据点 调用不同接口进行刷新
            if (this.state.assetRecord.pid !== "_root_id") {
              this.refreshAssetListByAssetId(this.state.assetRecord.pid);
            } else {
              this.loadRootAsset();
            }
            this.setState({
              selectedKeys: [res.data],
              assetRecord: { ...this.state.assetRecord, ...fields, id: res.data },
              currentAssetId: res.data
            });
            this.props.form.resetFields();
          } else {
            notification.error({
              message: res.msg,
            });
          }
        });
      }
    });
  }
  tNodeOnMouseOver (item) {
    item._visible = "visible";
    this.forceUpdate();
  }
  tNodeOnMouseOut (item) {
    item._visible = "hidden";
    this.forceUpdate();
  }
  treeNodeSelect (selectedKeys, e) {
    if (e.selected) {
      refreshTreeData(this.state.treeData, "_temp_id", {}, "del", this);
      const assetRecord = e.node ? e.node.props.dataRef : { id: "_root_id" };
      if (!assetRecord.pid && assetRecord.id !== "_root_id") {
        assetRecord.pid = "_root_id";
      }
      this.setState({
        currentAssetId: assetRecord.id,
        selectedKeys,
        assetRecord: assetRecord
      });
      if (assetRecord.id !== "_root_id" && assetRecord.id !== "_temp_id") {
        this.loadData({ id: selectedKeys[0] });
      } else {
        this.setState({
          roleSelectedRows: []
        });
      }
    }
  }
  authorityAdd (roleSelectedRows) {
    const roleIds = roleSelectedRows.map(item => item.id).join(",");
    const { currentAssetId } = this.state;
    request.POST(`${config.host}/sys/authority/batchAddRole`, {
      body: {
        roleIds,
        resourceId: currentAssetId
      }
    }).then((res) => {
      if (res.success) {
        notification.success({
          message: "操作成功",
        });
        this.setState({
          roleSelectedRows
        });
      } else {
        notification.error({
          message: res.msg,
        });
      }
    });
  }
  authorityDel (roleId) {
    const { currentAssetId } = this.state;
    request.POST(`${config.host}/sys/authority/delete`, {
      body: {
        roleId,
        resourceId: currentAssetId
      }
    }).then((res) => {
      if (res.success) {
        notification.success({
          message: "操作成功",
        });
      } else {
        notification.error({
          message: res.msg,
        });
      }
    });
  }
  render () {
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 19,
      },
    };
    const { assetRecord } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { operation, style } = this.props;
    const customRender = op => Object.keys(op).map((k) => {
      if (op[k]) {
        return (
          <div key={k}>{op[k](this.state.selectedRows, () => {
            this.loadData();
          }, this)}
          </div>);
      }
      return "";
    });
    const content = (item) => {
      if (item.id !== "_root_id") {
        return (
          <div
            style={{
              cursor: "pointer"
            }}
          >
            <p
              onClick={() => {
                options.add(item, this);
              }}
              role="presentation"
            >添加资源
            </p>
            <p
              onClick={() => {
                options.move(item, this);
              }}
              role="presentation"
            >移动到
            </p>
            <p
              onClick={() => {
                options.del(item, this);
              }}
              role="presentation"
            >删除
            </p>
          </div>);
      }
      return (
        <div
          style={{
            cursor: "pointer"
          }}
        >
          <p
            onClick={() => {
              options.add(item, this);
            }}
            role="presentation"
          >添加资源
          </p>
        </div>);
    };
    const renderSelectTreeNodes = data => data.map(item => (
      <TNode
        key={item.id}
        dataRef={item}
        title={item.name}
        value={item.id}
      >
        {item.children && renderSelectTreeNodes(item.children)}
      </TNode>
    ));
    const renderTreeNodes = data => (data.length ? data.map(item => (
      <TNode
        key={item.id}
        dataRef={item}
        title={
          <div
            onFocus={() => this.tNodeOnMouseOver(item)}
            onMouseOver={() => this.tNodeOnMouseOver(item)}
            onMouseOut={() => this.tNodeOnMouseOut(item)}
            onBlur={() => this.tNodeOnMouseOut(item)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <span>{item.name}</span>
            {
              item.id !== "_temp_id" &&
              <Popover content={content(item)} trigger="focus">
                <button
                  style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent"
                  }}
                >
                  <Icon className="org-more-opeartion" type="ellipsis" style={{ fontSize: "20px", visibility: item._visible ? item._visible : "hidden" }} />
                </button>
              </Popover>

            }

          </div>
        }
      >
        {item.children && renderTreeNodes(item.children)}
      </TNode>
    )) : "");
    const renderSelectedRoles = (data) => {
      if (data.length > 0) {
        return data.map((item, i) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #dfdfdf",
              borderRadius: "5px",
              padding: "5px 10px",
              margin: "5px"
            }}
          >
            <span>
              {item.name}
            </span>
            <span
              role="presentation"
              style={{
                cursor: "pointer"
              }}
              onClick={() => {
                this.state.roleSelectedRows.splice(i, 1);
                this.setState({
                  roleSelectedRows: [...this.state.roleSelectedRows]
                });
                this.authorityDel(item.id);
              }}
            >
              <Icon type="close" />
            </span>
          </div>));
      }
      return (
        <div
          style={{
            color: "#dfdfdf"
          }}
        >
            暂未授权任何角色
        </div>
      );
    };
    return (
      <div style={style}>
        <FixedTool style={pageHeaderStyle}>
          <span style={{ marginLeft: 20 }}>资源管理</span>
          <div style={{ textAlign: "center", marginRight: 20, display: "flex" }}>
            {
              customRender({ ...operationDefault, ...operation })
            }
          </div>
        </FixedTool>
        <div style={{
          ...margin(60, 10, 10), ...padding(10), backgroundColor: "#fff", display: "flex"
        }}
        >
          <div style={{
            flex: "0 1 200px"
          }}
          >
            <Tree
              loadData={this.loadAsset}
              className="business-org-tree"
              selectedKeys={this.state.selectedKeys}
              onSelect={this.treeNodeSelect}
              defaultExpandedKeys={["_root_id"]}
            >
              {renderTreeNodes(this.state.treeData || [])}
            </Tree>
          </div>
          {
            this.state.currentAssetId !== "_root_id" ?
              <div style={{
                flex: "1 1 auto",
              }}
              >
                <Row type="flex" justify="space-around" style={{ marginBottom: 20 }}>
                  <Col
                    span={12}
                    style={{
                      fontSize: "16px", paddingLeft: "20px", display: "flex", alignItems: "center"
                    }}
                  >
                    <Icon style={{ fontSize: "20px" }} type="file-text" />
                    资源详情
                  </Col>
                  <Col span={12} style={{ fontSize: "16px", textAlign: "right" }}>
                    <Button title="保存" type="primary" style={{ marginLeft: 25 }} onClick={this.handleSubmit} />
                    <Button title="重置" type="primary" style={{ marginLeft: 25 }} onClick={() => this.props.form.resetFields()} />
                  </Col>
                </Row>
                <Form>
                  <div>
                    <FormItem
                      style={{ display: "flex", justifyContent: "center" }}
                      {...formItemLayout}
                      label="编号"
                    >
                      {getFieldDecorator("code", {
                        rules: [
                          { required: true, message: "请填写编号!" },
                          { max: 10, message: "最多12个字符!" },
                        ],
                        initialValue: assetRecord.code
                      })(<Input placeholder="请填写编号" />)}
                    </FormItem>
                    <FormItem
                      style={{ display: "flex", justifyContent: "center" }}
                      {...formItemLayout}
                      label="名称"
                    >
                      {getFieldDecorator("name", {
                        rules: [{
                          required: true, type: "string", message: "请填写名称",
                        }, {
                          max: 10, message: "最多10个字符"
                        }],
                        initialValue: assetRecord.name
                      })(<Input placeholder="请填写编码" />)}
                    </FormItem>
                    <FormItem
                      style={{ display: "flex", justifyContent: "center" }}
                      {...formItemLayout}
                      label="图标"
                    >
                      {getFieldDecorator("icon", {
                        rules: [{
                          max: 50, message: "最多50个字符"
                        }],
                        initialValue: assetRecord.icon
                      })(<Input placeholder="请填写图标" />)}
                    </FormItem>
                    <FormItem
                      style={{ display: "flex", justifyContent: "center" }}
                      {...formItemLayout}
                      label="路径"
                    >
                      {getFieldDecorator("url", {
                        rules: [{
                          max: 100, message: "最多100个字符"
                        }],
                        initialValue: assetRecord.url
                      })(<Input placeholder="请填写路径" />)}
                    </FormItem>
                    <FormItem
                      style={{ display: "flex", justifyContent: "center" }}
                      {...formItemLayout}
                      label="排序"
                    >
                      {getFieldDecorator("sort", {
                        initialValue: assetRecord.sort || 0
                      })(<InputNumber min={0} />)}
                    </FormItem>
                    <FormItem
                      style={{ display: "flex", justifyContent: "center" }}
                      {...formItemLayout}
                      label="资源类型"
                    >
                      {getFieldDecorator("type", {
                        initialValue: assetRecord.type ? assetRecord.type.toString() : ""
                      })(<RadioGroup options={assetOptions} />)}
                    </FormItem>
                    <FormItem
                      style={{ display: "flex", justifyContent: "center" }}
                      {...formItemLayout}
                      label="加载方式"
                    >
                      {getFieldDecorator("loadType", {
                        initialValue: assetRecord.loadType ? assetRecord.loadType : ""
                      })(<RadioGroup options={loadTypeOptions} />)}
                    </FormItem>
                    <FormItem
                      style={{ display: "flex", justifyContent: "center" }}
                      {...formItemLayout}
                      label="上级"
                    >
                      {
                        getFieldDecorator("pid", {
                          rules: [{
                            required: true, message: "请选择上级!",
                          }],
                          initialValue: assetRecord.pid
                        })(<TreeSelect
                          placeholder="请选择上级"
                          disabled
                        >
                          { renderSelectTreeNodes(this.state.treeData) }
                           </TreeSelect>)}
                    </FormItem>
                    <FormItem
                      style={{ display: "flex", justifyContent: "center" }}
                      {...formItemLayout}
                      label="备注"
                    >
                      {getFieldDecorator("description", {
                        rules: [{
                          max: 150, message: "最多150个字符"
                        }],
                        initialValue: assetRecord.icon
                      })(<Input.TextArea placeholder="请填写备注" />)}
                    </FormItem>
                  </div>
                </Form>
                <Row type="flex" justify="space-around">
                  <Col
                    span={12}
                    style={{
                      fontSize: "16px", paddingLeft: "20px", display: "flex", alignItems: "center"
                    }}
                  >
                    <Icon style={{ fontSize: "20px" }} type="safety" />
                    角色授权
                  </Col>
                  <Col span={12} style={{ fontSize: "16px", textAlign: "right" }}>
                    <Button title="角色授权" disabled={!this.state.assetRecord.id} type="primary" onClick={() => { this.setState({ roleListVisible: true }); }} />
                  </Col>
                </Row>
                <Row>
                  <Card
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >

                      {renderSelectedRoles(this.state.roleSelectedRows)}
                    </div>
                  </Card>
                </Row>
              </div> :
              <div
                style={{
                  flex: "1 1 auto",
                  color: "#eeeeee",
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"

                }}
              >
                <Icon type="exclamation-circle" style={{ fontSize: "20px", marginRight: 10 }} />
              请选择选择一个资源
              </div>

          }

          <div>
            <RoleListModal
              visible={this.state.roleListVisible}
              key="role-modal"
              type="checkbox"
              roleSelectedRows={this.state.roleSelectedRows}
              onSelectedRows={(roleSelectedRows) => {
                this.authorityAdd(roleSelectedRows);
              }}
              hideModal={() => this.setState({ roleListVisible: false, })}
            />
          </div>
          <Modal
            visible={this.state.assetMoveVisible}
            footer={null}
            closable={false}
            style={{
              width: "358px",
              borderRadius: "5px",
              overflow: "hidden"
            }}
          >
            {
              this.state.assetMoveVisible && <AssetMove
                key="asset"
                dataSource={this.state.assetRecord}
                treeData={this.state.treeData}
                hideModal={() => this.setState({ assetMoveVisible: false, })}
                refresh={(node) => {
                  console.log(this.state.assetRecord);

                  if (node.pid !== "_root_id") {
                    this.refreshAssetListByAssetId(node.pid);
                  } else {
                    this.loadRootAsset();
                  }
                  if (this.state.assetRecord.pid !== "_root_id") {
                    this.refreshAssetListByAssetId(this.state.assetRecord.pid);
                  } else {
                    this.loadRootAsset();
                  }
                }}
              />
            }
          </Modal>
        </div>
      </div>
    );
  }
}

export default Form.create()(AssetManagement);
