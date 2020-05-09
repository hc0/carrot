import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Row, Form, Popover, Modal, notification, Divider, Switch, Tooltip, Popconfirm } from "antd";
import "antd/lib/col/style";
import "antd/lib/row/style";
import "antd/lib/modal/style";
import "antd/lib/popover/style";
import "antd/lib/switch/style";
import "antd/lib/tooltip/style";
import "antd/lib/popconfirm/style";
import { margin, padding } from "polished";
import FixedTool from "../../base/fixedTool/fixedTool";
import Table from "../../base/table/table.js";
import request from "../../util/request/request.js";
import { Input, Button, Tree, Icon, Select, RoleListModal } from "../../index";
import config from "../../../getConfig.js";
import OrgSpecificModal from "./orgCU/orgCU";
import UserSpecificModal from "./userCU/userCU";

import "./orgManagement.less";

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
const refreshTreeData = (treeData, id, newData) => {
  function loopNode (nodes) {
    nodes.some((nd) => {
      if (nd.id === id) {
        nd.children = newData;
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
 * 气泡卡片操作
 */
const options = {
  add (record, target) {
    record._type = "add";
    target.setState({
      orgModalVisiable: true,
      record
    });
  },
  edit (record, target) {
    record._type = "edit";
    target.setState({
      orgModalVisiable: true,
      record
    });
  },
  del (record, target) {
    request.POST(`${config.host}/sys/organization/delete?id=${record.id}`).then((res) => {
      if (res.success) {
        notification.success({
          message: "删除成功",
        });
        target.refreshOrgListByOrgId(record.pid);
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
 * 用户列表行操作
 */
const userOptions = {
  add (userRecord, target) {
    userRecord._type = "add";
    const orgId = target.state.selectedKeys[0];
    userRecord.orgId = orgId;
    target.setState({
      userModalVisiable: true,
      userRecord
    });
  },
  edit (userRecord, target) {
    userRecord._type = "edit";
    target.setState({
      userModalVisiable: true,
      userRecord
    });
  },
  disable (record, target) {
    let url = `${config.host}/sys/user/disable`;
    if (record.status === "0") {
      url = `${config.host}/sys/user/enable`;
    }
    if (record.status === "0") {
      record.status = "1";
      target.forceUpdate();
    } else {
      record.status = "0";
      target.forceUpdate();
    }
    request.POST(url, { body: { id: record.userId } }).then((res) => {
      if (res.success) {
        notification.success({
          message: "操作成功",
        });
      } else {
        notification.success({
          message: res.msg,
        });
      }
    });
  },
  lock (record, target) {
    let url = `${config.host}/sys/user/lock`;
    if (record.status === "-1") {
      url = `${config.host}/sys/user/unlock`;
    }
    if (record.status === "-1") {
      record.status = "1";
      target.forceUpdate();
    } else {
      record.status = "-1";
      target.forceUpdate();
    }
    request.POST(url, { body: { id: record.userId } }).then((res) => {
      if (res.success) {
        notification.success({
          message: "操作成功",
        });
      } else {
        notification.success({
          message: res.msg,
        });
      }
    });
  },
  rollback (record) {
    request.POST(`${config.host}/sys/user/resetPassword`, { params: { id: record.userId } }).then((res) => {
      if (res.success) {
        notification.success({
          message: "操作成功",
        });
      } else {
        notification.success({
          message: res.msg,
        });
      }
    });
  }
};
/**
 * 表格列信息
 */
const columns = target => [
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
  }, {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  }, {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
  }, {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render (text) {
      if (text === "1") {
        return (
          <span>
            正常
          </span>
        );
      }
      return (
        <span>
          {text === "0" ? "禁用" : "锁定" }
        </span>
      );
    }
  }, {
    title: "禁用",
    dataIndex: "disable",
    key: "disable",
    render (text, record) {
      return (
        <span>
          <Switch disabled={record.status === "-1"} checked={record.status === "0"} onChange={() => userOptions.disable(record, target)} />
        </span>
      );
    }
  }, {
    title: "锁定",
    dataIndex: "lock",
    key: "lock",
    render (text, record) {
      return (
        <span>
          <Switch disabled={record.status === "0"} checked={record.status === "-1"} onChange={() => userOptions.lock(record, target)} />
        </span>
      );
    }
  }, {
    title: "操作",
    dataIndex: "operaion",
    key: "operaion",
    render (text, record) {
      return (
        <span className="table-operation" >
          <Tooltip placement="top" title="编辑">
            <span role="presentation" onClick={() => userOptions.edit(record, target)}>
              <Icon type="edit" />
            </span>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip placement="top" title="设置角色">
            <span
              role="presentation"
              onClick={() => {
                target.getRoleListByUserId(record).then(() => {
                  target.setState({
                    record,
                    roleListVisible: true
                  });
                });
              }}
            >
              <Icon type="setting" />
            </span>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip placement="top" title="重置">
            <Popconfirm title="确认重置密码？" okText="确认" cancelText="取消" onConfirm={() => userOptions.rollback(record, target)}>
              <span>
                <Icon type="rollback" />
              </span>
            </Popconfirm>
          </Tooltip>
        </span>
      );
    }
  }
];
/**
 * 顶部操作栏
 */
const operationDefault = {
  /**
   *
   * @param {array} selectedRows 选中项
   * @param {func} refresh 列表刷新方法
   * @param {object} target 被加载的组件
   */
  add (selectedRows, refresh, target) {
    return <Button title="新增用户" type="primary" style={{ marginLeft: 25 }} onClick={() => userOptions.add({}, target)} />;
  },
  query (selectedRows, refresh, target) {
    return <Button title="查询" className="operation-button" type="primary" style={{ marginLeft: 25 }} onClick={target.onSearch} />;
  },
};
/**
 * 角色管理
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
class OrgManagement extends Component {
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
      columns: columns(this),
      data: [],
      selectedRows: [],
      roleSelectedRows: [],
      treeData: [],
      params: { current: 1, pageSize: 10 }
    };
    this.loadData = this.loadData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.tNodeOnMouseOver = this.tNodeOnMouseOver.bind(this);
    this.treeNodeSelect = this.treeNodeSelect.bind(this);
    this.loadRootOrg = this.loadRootOrg.bind(this);
  }

  componentDidMount () {
    this.loadRootOrg();
  }

  onSearch = () => {
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        this.loadData(fields);
      }
    });
  };
  // GET /sys/authorize/listRole
  getRoleListByUserId (record) {
    return request.GET(`${config.host}/sys/authorize/listRole`, { params: { target: record.id, type: "0" } }).then((res) => {
      this.setState({
        roleSelectedRows: res.data,
      });
    });
  }
  loadRootOrg () {
    request.GET(`${config.host}/sys/organization/list`).then((res) => {
      this.setState({
        treeData: res,
      });
      this.treeNodeSelect([res[0].id], { selected: true });
    });
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
  refreshOrgListByOrgId (id) {
    request.GET(`${config.host}/sys/organization/list?id=${id}`).then((res) => {
      refreshTreeData(this.state.treeData, id, res);
      this.setState({
        treeData: [...this.state.treeData],
      });
    });
  }
  loadData (params) {
    this.changeParams(params);
    request.GET(`${config.host}/sys/employee/list`, { params: this.state.params }).then((res) => {
      this.setState({
        data: res.data.records,
        total: res.data.total
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
    this.onSearch();
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
      this.setState({
        selectedKeys,
      });
      this.loadData({ orgId: selectedKeys[0] });
    }
  }
  authorityAdd (roleSelectedRows) {
    const roleIds = roleSelectedRows.map(item => item.id).join(",");
    request.POST(`${config.host}/sys/authorize/batch/target`, {
      body: {
        roleIds,
        target: this.state.record.id,
        type: "0"
      }
    }).then((res) => {
      if (res.success) {
        notification.success({
          message: "操作成功",
        });
        this.loadData();
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
        span: 6,
      },
      wrapperCol: {
        span: 18,
      },
    };
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
    const rowSelection = {
      type: this.props.type,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRows
        });
      },
    };
    const content = (item) => {
      if (item.pid) {
        return (
          <div>
            <p
              onClick={() => {
                options.add(item, this);
              }}
              role="presentation"
            >添加子菜单
            </p>
            <p
              onClick={() => {
                options.edit(item, this);
              }}
              role="presentation"
            >编辑部门
            </p>
            <p
              onClick={() => {
                options.del(item, this);
              }}
              role="presentation"
            >删除部门
            </p>
          </div>);
      }
      return (
        <div>
          <p
            onClick={() => {
              options.add(item, this);
            }}
            role="presentation"
          >添加子菜单
          </p>
          <p
            onClick={() => {
              options.edit(item, this);
            }}
            role="presentation"
          >编辑部门
          </p>
        </div>);
    };
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
          </div>
        }
      >
        {item.children && renderTreeNodes(item.children)}
      </TNode>
    )) : "");
    return (
      <div style={style}>
        <FixedTool style={pageHeaderStyle}>
          <span style={{ marginLeft: 20 }}>组织管理</span>
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
              loadData={this.loadOrg}
              className="business-org-tree"
              selectedKeys={this.state.selectedKeys}
              // defaultExpandedKeys={["0-0"]}
              onSelect={this.treeNodeSelect}
            >
              {renderTreeNodes(this.state.treeData)}
            </Tree>
          </div>
          <div style={{
            flex: "1 1 auto"
          }}
          >
            <div className="view-operation-bar">
              <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
              >
                <Row>
                  <Col span={7}>
                    <FormItem
                      {...formItemLayout}
                      label="用户名"
                    >
                      {getFieldDecorator("username", {
                        initialValue: "",
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={7}>
                    <FormItem
                      style={{ display: "flex", alignItems: "center" }}
                      {...formItemLayout}
                      label="姓名"
                    >
                      {getFieldDecorator("name", {
                        initialValue: "",
                      })(<Input />)}
                    </FormItem>
                  </Col>
                  <Col span={7}>
                    <FormItem
                      style={{ display: "flex", alignItems: "center" }}
                      {...formItemLayout}
                      label="邮箱"
                    >
                      {getFieldDecorator("email", {
                        initialValue: "",
                      })(<Input />)}
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={7}>
                    <FormItem
                      style={{ display: "flex", alignItems: "center" }}
                      {...formItemLayout}
                      label="状态"
                    >
                      {getFieldDecorator("status", {
                        initialValue: "",
                      })(<Select>
                        <Select.Option value="">不限</Select.Option>
                        <Select.Option value="1">正常</Select.Option>
                        <Select.Option value="0">禁用</Select.Option>
                        <Select.Option value="-1">锁定</Select.Option>
                         </Select>)}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
            <Table
              rowKey="id"
              dataSource={this.state.data}
              columns={this.state.columns}
              rowSelection={this.props.type !== "normal" ? rowSelection : null}
              pagination={{
                total: this.state.total,
                current: this.state.params.current,
                showSizeChanger: true,
                pageSize: this.state.params.pageSize,
                onChange: (current) => {
                  this.loadData({ current });
                },
                onShowSizeChange: (current, pageSize) => {
                  this.loadData({ current, pageSize });
                },
              }}
            />
          </div>
          <Modal
            visible={this.state.orgModalVisiable}
            footer={null}
            closable={false}
            style={{
              width: "358px",
              borderRadius: "5px",
              overflow: "hidden"
            }}
          >
            {
              this.state.orgModalVisiable && <OrgSpecificModal
                key="org"
                dataSource={this.state.record}
                treeData={this.state.treeData}
                hideModal={() => this.setState({ orgModalVisiable: false, })}
                refresh={(node) => {
                  if (this.state.record._type === "edit") {
                    this.refreshOrgListByOrgId(this.state.record.pid);
                    this.refreshOrgListByOrgId(node.pid);
                  } else {
                    this.refreshOrgListByOrgId(node.pid);
                  }
                }}
              />
            }
          </Modal>
          <Modal
            visible={this.state.userModalVisiable}
            footer={null}
            closable={false}
            style={{
              width: "358px",
              borderRadius: "5px",
              overflow: "hidden"
            }}
          >
            {
              this.state.userModalVisiable && <UserSpecificModal
                key="user"
                dataSource={this.state.userRecord}
                treeData={this.state.treeData}
                hideModal={() => this.setState({ userModalVisiable: false, })}
                refresh={this.loadData}
              />
            }
          </Modal>
          <RoleListModal
            visible={this.state.roleListVisible}
            key="role-modal"
            type="checkbox"
            roleSelectedRows={this.state.roleSelectedRows}
            onSelectedRows={(roleSelectedRows) => {
              this.setState({
                roleSelectedRows
              });
              this.authorityAdd(roleSelectedRows);
            }}
            hideModal={() => this.setState({ roleListVisible: false, })}
          />
        </div>
      </div>
    );
  }
}

export default Form.create()(OrgManagement);
