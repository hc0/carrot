import React, { Component } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import PropTypes from "prop-types";
import { Modal, Divider, Card } from "antd";
import { margin } from "polished";

import Input from "../../base/input/input.js";
import Button from "../../base/button/button.js";
import { Form, FormItem, Create } from "../../base/form/form.js";
import Notification from "../../base/notification/notification.js";

import TableClassicCRUD from "../../common/tableCRUD/tableClassicCRUD";
import request from "../../util/request/request.js";


import config from "../../../getConfig.js";


const styles = {
  ...margin(0, 0, 0, ` ${config["@padding-sm"]}`)
};

const urls = {
  // 数据字典目录URL
  getListURL: "dict/list",
  postListURL: "dict/add",
  updateListURL: "dict/update",
  deleteListURL: "dict/batchDelete",
  getDetailListURL: "dict/get",

  // 数据字典值URL
  getItemURL: "dict/item/list",
  postItemURL: "dict/item/add",
  updateItemURL: "dict/item/update",
  deleteItemURL: "dict/item/batchDelete",
  getDetailItemURL: "dict/item/get",
};

// 获取当前选中的项
const getDataFormState = (state) => {
  const { selectedRows } = state;
  const selectedId = [];
  if (selectedRows && selectedRows.length > 0) {
    selectedRows.forEach((v) => {
      selectedId.push(v.id);
    });
  }
  return selectedId;
};
// 新增、编辑目录modal内容
const listDetailComponent = (props) => {
  const {
    form,
    listThis,
    type,
    oneDetail = {}
  } = props;
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };
  const bindNode = document.getElementById("detailRoot");
  const handleSubmit = () => {
    const { validateFields } = form;
    validateFields((err, values) => {
      if (!err) {
        if (type === "updateURL") {
          values.id = oneDetail.id;
          values.status = oneDetail.status;
        }
        request.POST(`${config.host}/${listThis.props[type]}`, {
          body: values
        }).then((res) => {
          if (res.success) {
            Notification.success({
              message: res.msg
            });
            listThis.loadData();
            unmountComponentAtNode(bindNode);
          } else {
            Notification.error({
              message: res.msg
            });
          }
        });
      }
    });
  };
  const formTitle = {
    postURL: "新增",
    updateURL: "编辑"
  };
  return (<Form title={formTitle[type]} handleSubmit={handleSubmit}>
    <FormItem
      {...formItemLayout}
      label="名称"
    >
      {getFieldDecorator("name", {
        initialValue: oneDetail.name,
        rules: [
          { required: true, message: "名称必填!" },
        ],
      })(<Input />)}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="编号"
    >
      {getFieldDecorator("code", {
        initialValue: oneDetail.code,
        rules: [
          { required: true, message: "编号必填!" },
        ],
      })(<Input />)}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="备注"
    >
      {getFieldDecorator("description", {
        initialValue: oneDetail.description || "",
        rules: [
          // { required: true, message: "最大值必填!" },
        ],
      })(<Input />)}
    </FormItem>
  </Form>);
};

// 新增、编辑项modal内容
const itemDetailComponent = (props) => {
  const {
    form,
    listThis,
    type,
    oneDetail = {}
  } = props;
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };
  console.log("oneDetail", oneDetail);
  const bindNode = document.getElementById("detailRoot");
  const handleSubmit = () => {
    const { validateFields } = form;
    console.log("___________+++++++++++", listThis);
    validateFields((err, values) => {
      if (!err) {
        values.dictId = oneDetail.dictId * 1;
        if (type === "updateURL") {
          values.id = oneDetail.id;
          // values.status = oneDetail.status;
        }
        request.POST(`${config.host}/${listThis.props[type]}`, {
          body: values
        }).then((res) => {
          if (res.success) {
            Notification.success({
              message: res.msg
            });
            listThis.loadData();
            unmountComponentAtNode(bindNode);
          } else {
            Notification.error({
              message: res.msg
            });
          }
        });
      }
    });
  };
  const formTitle = {
    postURL: "新增",
    updateURL: "编辑"
  };
  return (<Form title={formTitle[type]} handleSubmit={handleSubmit}>
    <FormItem
      {...formItemLayout}
      label="名称"
    >
      {getFieldDecorator("name", {
        initialValue: oneDetail.name,
        rules: [
          { required: true, message: "名称必填!" },
        ],
      })(<Input />)}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="值"
    >
      {getFieldDecorator("value", {
        initialValue: oneDetail.value,
        rules: [
          { required: true, message: "编号必填!" },
        ],
      })(<Input />)}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="排序"
    >
      {getFieldDecorator("orderNo", {
        initialValue: oneDetail.orderNo || "",
        rules: [
          // { required: true, message: "编号必填!" },
          { pattern: /^\d*$/, message: "只能是数字!" },
        ],
      })(<Input />)}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="备注"
    >
      {getFieldDecorator("description", {
        initialValue: oneDetail.description || "",
        rules: [
          // { required: true, message: "最大值必填!" },
        ],
      })(<Input />)}
    </FormItem>
  </Form>);
};

// 新增、编辑modal
const showDetailComponent = (_this, type, oneDetail, detailComponent) => {
  // console.log(_this, type);
  const Detail = Create(detailComponent);
  // console.log(oneDetail);
  const bindNode = document.getElementById("detailRoot");
  render(
    <Modal
      visible={!!1}
      footer={null}
      destroyOnClose={!!1}
      onCancel={() => {
        unmountComponentAtNode(bindNode);
      }}
      width="80%"
    >
      <Detail listThis={_this} type={type} oneDetail={oneDetail} />
    </Modal>,
    bindNode
  );
};

// 删除
const multipleHandle = (_this, type, selectedId) => {
  console.log(selectedId);
  request.POST(`${config.host}/${_this.props[type]}`, {
    body: {
      ids: selectedId
    }
  }).then((res) => {
    if (res.success) {
      Notification.success({
        message: res.msg
      });
      _this.loadData();
    } else {
      Notification.error({
        message: res.msg
      });
    }
  });
};

/**
 * 数据字典管理组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
class DataDictionary extends Component {
  static propTypes = {
    /**
     * table名称
     */
    title: PropTypes.string,
    /** 操纵按钮，需返回ReactNode */
    actionGroup: PropTypes.func,
    /** 表头，[属性参见antd](https://ant.design/components/table-cn/#Column) */
    columns: PropTypes.func,
    /**
     * 获取数据字典目录数据URL
     */
    getListURL: PropTypes.string,
    /**
     * 新增数据字典目录提交URL
     */
    postListURL: PropTypes.string,
    /**
     * 编辑数据字典目录提交URL
     */
    updateListURL: PropTypes.string,
    /**
     * 删除数据字典目录提交URL
     */
    deleteListURL: PropTypes.string,
    /**
     * 获取数据字典目录单项详情URL
     */
    getDetailListURL: PropTypes.string,

    /**
     * 获取数据字典项数据URL
     */
    getItemURL: PropTypes.string,
    /**
     * 新增数据字典项提交URL
     */
    postItemURL: PropTypes.string,
    /**
     * 编辑数据字典项提交URL
     */
    updateItemURL: PropTypes.string,
    /**
     * 删除数据字典项提交URL
     */
    deleteItemURL: PropTypes.string,
    /**
     * 获取数据字典项单项详情URL
     */
    getDetailItemURL: PropTypes.string,
  };
  static defaultProps = {
    // title: "",
    getListURL: urls.getListURL,
    postListURL: urls.postListURL,
    updateListURL: urls.updateListURL,
    deleteListURL: urls.deleteListURL,
    getDetailListURL: urls.getDetailListURL,

    // 数据字典值URL
    getItemURL: urls.getItemURL,
    postItemURL: urls.postItemURL,
    updateItemURL: urls.updateItemURL,
    deleteItemURL: urls.deleteItemURL,
    getDetailItemURL: urls.getDetailItemURL,
  };
  state = {
    getItemURL: ""
  };

  render () {
    const {
      // title,
      // actionGroup,
      // columns,
      getListURL,
      postListURL,
      updateListURL,
      deleteListURL,
      getDetailListURL,

      // 数据字典值URL
      // getItemURL,
      postItemURL,
      updateItemURL,
      deleteItemURL,
      getDetailItemURL,
    } = this.props;
    const {
      getItemURL
    } = this.state;
    const DataDictionaryItemHOC = WrappedComponent => (
      class Inheritance extends WrappedComponent {
        componentDidMount () {
          // 可以方便地得到state，做一些更深入的修改。
          console.log("$$$$$$$$$$$");
          console.log(this);
        }
        render () {
          return super.render();
        }
      }
    );
    const DataDictionaryItem = DataDictionaryItemHOC(TableClassicCRUD);
    return (
      <div
        style={{
          display: "flex"
        }}
      >
        <Card title="数据字典目录">
          <TableClassicCRUD
            getURL={getListURL}
            postURL={postListURL}
            updateURL={updateListURL}
            deleteURL={deleteListURL}
            getDetailURL={getDetailListURL}
            actionGroup={_this => (
              <div
                style={{
                  display: "flex"
                }}
              >
                <Input
                  placeholder="名称"
                  onChange={(e) => {
                    const searchValue = e.target.value;
                    _this.setState({
                      name: searchValue,
                    });
                  }}
                />
                <Button
                  style={styles}
                  title="查询"
                  onClick={() => {
                    _this.loadData();
                  }}
                />
                <Button
                  style={styles}
                  title="编辑"
                  primary={!1}
                  onClick={async () => {
                    const { selectedId } = this.state;
                    console.log(this);
                    if (!selectedId || selectedId.length === 0) {
                      Notification.warn({
                        message: "请先选择下方的项"
                      });
                      return false;
                    }
                    const url = `${config.host}/${_this.props.getDetailURL}/${selectedId[0]}`;
                    const getOneDetail = await request.GET(url);
                    if (getOneDetail.success) {
                      showDetailComponent(_this, "updateURL", getOneDetail.data, listDetailComponent);
                    }
                  }}
                />
                <Button
                  style={styles}
                  title="新增"
                  primary={!1}
                  onClick={() => {
                    showDetailComponent(_this, "postURL", {}, listDetailComponent);
                  }}
                />
                <Button
                  style={styles}
                  title="删除"
                  primary={!1}
                  onClick={() => {
                    const { selectedId } = this.state;
                    if (!selectedId || selectedId.length === 0) {
                      Notification.warn({
                        message: "请先选择下方的项"
                      });
                      return false;
                    }
                    multipleHandle(_this, "deleteURL", selectedId);
                  }}
                />
              </div>
            )}
            DataDictionaryThis={this}
            rowSelection={{
              type: "radio",
              onChange: (selectedRowKeys, selectedRows) => {
                const selectedId = getDataFormState({ selectedRows, });
                console.log("rowSelection", this);
                return this.setState({
                  selectedId,
                  getItemURL: `${this.props.getItemURL}/${selectedId[0]}`
                });
              },
            }}
          />
        </Card>
        <Divider type="vertical" />
        <Card title="数据字典值">
          <DataDictionaryItem
            getURL={getItemURL}
            postURL={postItemURL}
            updateURL={updateItemURL}
            deleteURL={deleteItemURL}
            getDetailURL={getDetailItemURL}
            DataDictionaryThis={this}
            actionGroup={_this => (
              <div
                style={{
                  display: "flex"
                }}
              >
                <Input
                  placeholder="名称"
                  onChange={(e) => {
                    const searchValue = e.target.value;
                    _this.setState({
                      name: searchValue,
                    });
                  }}
                />
                <Button
                  style={styles}
                  title="查询"
                  onClick={() => {
                    const { selectedId } = this.state;
                    if (!selectedId || selectedId.length === 0) {
                      Notification.warn({
                        message: "请先选择左侧的目录"
                      });
                      return false;
                    }
                    _this.loadData();
                  }}
                />
                <Button
                  style={styles}
                  title="编辑"
                  primary={!1}
                  onClick={async () => {
                    let { selectedId } = this.state;
                    if (!selectedId || selectedId.length === 0) {
                      Notification.warn({
                        message: "请先选择左侧的目录"
                      });
                      return false;
                    }
                    const { selectedRows } = _this.state;
                    selectedId = getDataFormState({ selectedRows, });
                    console.log(selectedId);
                    if (!selectedId || selectedId.length === 0) {
                      Notification.warn({
                        message: "请先选择下方的项"
                      });
                      return false;
                    }
                    const url = `${config.host}/${_this.props.getDetailURL}/${selectedId[0]}`;
                    const getOneDetail = await request.GET(url);
                    if (getOneDetail.success) {
                      showDetailComponent(_this, "updateURL", Object.assign({
                        dictId: selectedId[0]
                      }, getOneDetail.data), itemDetailComponent);
                    }
                  }}
                />
                <Button
                  style={styles}
                  title="新增"
                  primary={!1}
                  onClick={() => {
                    const { selectedId } = this.state;
                    if (!selectedId || selectedId.length === 0) {
                      Notification.warn({
                        message: "请先选择左侧的目录"
                      });
                      return false;
                    }
                    showDetailComponent(_this, "postURL", { dictId: selectedId[0], }, itemDetailComponent);
                  }}
                />
                <Button
                  style={styles}
                  title="删除"
                  primary={!1}
                  onClick={() => {
                    let { selectedId } = this.state;
                    if (!selectedId || selectedId.length === 0) {
                      Notification.warn({
                        message: "请先选择左侧的目录"
                      });
                      return false;
                    }
                    const { selectedRows } = _this.state;
                    selectedId = getDataFormState({ selectedRows, });
                    console.log(selectedId);
                    if (!selectedId || selectedId.length === 0) {
                      Notification.warn({
                        message: "请先选择下方的项"
                      });
                      return false;
                    }
                    multipleHandle(_this, "deleteURL", selectedId);
                  }}
                />
              </div>
            )}
            columns={() => [{
              title: "名称",
              dataIndex: "name",
              key: "name",
            }, {
              title: "值",
              dataIndex: "value",
              key: "value",
            }, {
              title: "排序",
              dataIndex: "orderNo",
              key: "orderNo",
            }, {
              title: "备注",
              dataIndex: "description",
              key: "description",
            }]}
          />
        </Card>
      </div>
    );
  }
}

export default DataDictionary;
