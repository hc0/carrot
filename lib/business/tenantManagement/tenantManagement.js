import React, { Component } from "react";
import { Row, Col, Form, Input, Icon, Divider, Button, Popconfirm, Modal, notification, Switch } from "antd";
import PropTypes from "prop-types";
import "antd/lib/col/style";
import "antd/lib/row/style";
import "antd/lib/divider/style";
import "antd/lib/modal/style";
import "antd/lib/switch/style";
import "antd/lib/popconfirm/style";
import { margin, padding } from "polished";
import FixedTool from "../../base/fixedTool/fixedTool";
import Table from "../../base/table/table.js";
import request from "../../util/request/request.js";
import TenantModal from "./tenantCU/tenantCU";


import config from "../../../getConfig.js";

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
 * 行操作
 */
const options = {
  add (record, target) {
    target.setState({
      modalVisiable: true,
      record: {
        _type: "add"
      }
    });
  },
  edit (record, target) {
    record._type = "edit";
    target.setState({
      modalVisiable: true,
      record
    });
  },
  del (record, target) {
    request.POST(`${config.host}/sys/tenant/delete/${record.id}`).then((res) => {
      if (res.success) {
        notification.success({
          message: "删除成功",
        });
        target.loadData();
      } else {
        notification.success({
          message: res.msg,
        });
      }
    });
  },
  disable (record, target) {
    let url = `${config.host}/sys/tenant/disable`;
    if (record.status === "0") {
      url = `${config.host}/sys/tenant/enable`;
    }
    if (record.status === "0") {
      record.status = "1";
    } else {
      record.status = "0";
    }
    target.forceUpdate();
    request.POST(url, { body: { id: record.id } }).then((res) => {
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
  },
};
/**
 * 表格列信息
 */
const columns = target => [
  {
    title: "用户名",
    dataIndex: "administrator",
    key: "administrator",
  }, {
    title: "名称",
    dataIndex: "name",
    key: "name",
  }, {
    title: "编码",
    dataIndex: "code",
    key: "code",
  }, {
    title: "描述",
    dataIndex: "description",
    key: "description",
  }, {
    title: "启用",
    dataIndex: "status",
    key: "status",
    render (text, record) {
      return (
        <span>
          <Switch checked={record.status === "1"} onChange={() => options.disable(record, target)} />
        </span>
      );
    }
  }, {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    render: (text, record) => (
      <span className="table-operation" >
        <Popconfirm title="确认删除？" okText="确认" cancelText="取消" onConfirm={() => options.del(record, target)}>
          <Icon type="delete" />
        </Popconfirm>
        <Divider type="vertical" />
        <Icon type="edit" onClick={() => options.edit(record, target)} />
      </span>
    ),
  }];
const operationDefault = {
  /**
   *
   * @param {array} selectedRows 选中项
   * @param {func} refresh 列表刷新方法
   * @param {object} target 被加载的组件
   */
  add (selectedRows, refresh, target) {
    return <Button className="operation-button" type="primary" style={{ marginLeft: 25 }} onClick={() => options.add({}, target)} >新增</Button>;
  },
  query (selectedRows, refresh, target) {
    return <Button className="operation-button" type="primary" style={{ marginLeft: 25 }} onClick={target.onSearch}>查询</Button>;
  },
};
const modalStyle = {
  width: "358px",
  borderRadius: "5px",
  overflow: "hidden"
};
/**
 * 角色管理
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
class TenantManagement extends Component {
  static propTypes = {
    /**
     * 顶部操作按钮（目前提供的默认属性包括：add，query）注：传入值会覆盖同名默认属性。
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
      params: { current: 1, pageSize: 10 }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeParams = this.changeParams.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount () {
    this.loadData();
  }
  onSearch = () => {
    this.props.form.validateFieldsAndScroll((err, fields) => {
      if (!err) {
        this.loadData(fields);
        // this.setState({
        //   data: this.state.dataSource.filter(record =>
        //     record.name.indexOf(fields.condition1) >= 0 && record.code.indexOf(fields.condition2) >= 0),
        // });
      }
    });
  };
  loadData (params) {
    this.changeParams(params);
    request.POST(`${config.host}/sys/tenant/list`, { params: this.state.params }).then((res) => {
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
  render () {
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 14,
      },
    };
    const { getFieldDecorator } = this.props.form;
    const { operation, style } = this.props;
    const customRender = op => Object.keys(op).map((k) => {
      if (op[k]) {
        return (
          <div key={k}>{op[k](this.state.selectedRows, (params) => {
            this.loadData(params);
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
    return (
      <div style={style}>
        <FixedTool style={pageHeaderStyle}>
          <span style={{ marginLeft: 20 }}>租户管理</span>
          <div style={{ textAlign: "center", marginRight: 20, display: "flex" }}>
            {
              customRender({ ...operationDefault, ...operation })
            }
          </div>
        </FixedTool>
        <div style={{ ...margin(60, 10, 10), ...padding(10), backgroundColor: "#fff", }}>
          <div className="view-operation-bar">
            <Form
              className="ant-advanced-search-form"
              onSubmit={this.handleSearch}
            >
              <Row>
                <Col span={10}>
                  <FormItem
                    style={{ display: "flex", alignItems: "center" }}
                    {...formItemLayout}
                    label="名称"
                  >
                    {getFieldDecorator("name", {
                      initialValue: "",
                    })(<Input />)}
                  </FormItem>
                </Col>
                <Col span={10}>
                  <FormItem
                    style={{ display: "flex", alignItems: "center" }}
                    {...formItemLayout}
                    label="编码"
                  >
                    {getFieldDecorator("code", {
                      initialValue: "",
                    })(<Input />)}
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
          visible={this.state.modalVisiable}
          footer={null}
          closable={false}
          style={modalStyle}
        >
          {
            this.state.modalVisiable && <TenantModal
              dataSource={this.state.record}
              hideModal={() => this.setState({ modalVisiable: false, })}
              refresh={this.loadData}
            />
          }
        </Modal>
      </div>
    );
  }
}

export default Form.create()(TenantManagement);
