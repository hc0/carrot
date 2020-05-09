import React, { Component } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { margin } from "polished";
import Input from "../../base/input/input.js";
import Button from "../../base/button/button.js";
import { Form, FormItem, Create } from "../../base/form/form.js";
import TableCRUD from "../../common/tableCRUD/tableCRUD.js";
import Notification from "../../base/notification/notification.js";
import request from "../../util/request/request.js";


import config from "../../../getConfig.js";


const styles = {
  ...margin(0, 0, 0, ` ${config["@padding-sm"]}`)
};

const urls = {
  getURL: "dict/list",
  postURL: "dict/add",
  updateURL: "dict/update",
  deleteURL: "dict/batchDelete",
  getDetailURL: "dict/get",
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

// 新增、编辑modal内容
const detailComponent = (props) => {
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
        initialValue: oneDetail.description,
        rules: [
          { required: true, message: "最大值必填!" },
        ],
      })(<Input />)}
    </FormItem>
  </Form>);
};

// 新增、编辑modal
const showDetailComponent = (_this, type, oneDetail) => {
  // console.log(_this, type);
  const Detail = Create(detailComponent);
  // console.log(Detail);
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
  request.POST(`${config.host}/${_this.props[type]}`, {
    body: {
      ids: selectedId
    }
  }).then((res) => {
    if (res.success) {
      Notification.success({
        message: res.msg
      });
      const { props, loadData } = _this;
      const { DataDictionaryThis } = props;
      DataDictionaryThis.setState({
        selectedId: []
      });
      loadData();
    } else {
      Notification.error({
        message: res.msg
      });
    }
  });
};

/**
 * 标准表格组件 - 通用表格CRUD抽象的扩展
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
class TableClassicCRUD extends Component {
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
     * 获取数据URL
     */
    getURL: PropTypes.string,
    /**
     * 新增提交URL
     */
    postURL: PropTypes.string,
    /**
     * 获取单项详情URL
     */
    getDetailURL: PropTypes.string,
    /**
     * 编辑提交URL
     */
    updateURL: PropTypes.string,
    /**
     * 删除提交URL
     */
    deleteURL: PropTypes.string,
  };
  static defaultProps = {
    title: "",
    actionGroup: _this => (
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
            const selectedId = getDataFormState(_this.state);
            if (selectedId.length > 1) {
              Notification.warn({
                message: "不能同时编辑多项"
              });
              return false;
            }
            if (selectedId.length < 1) {
              Notification.warn({
                message: "请选择要编辑的项"
              });
              return false;
            }
            const url = `${config.host}/${_this.props.getDetailURL}/${selectedId[0]}`;
            const getOneDetail = await request.GET(url);
            if (getOneDetail.success) {
              showDetailComponent(_this, "updateURL", getOneDetail.data);
            }
          }}
        />
        <Button
          style={styles}
          title="新增"
          primary={!1}
          onClick={() => {
            showDetailComponent(_this, "postURL");
            console.log(_this);
          }}
        />
        <Button
          style={styles}
          title="删除"
          primary={!1}
          onClick={() => {
            const selectedId = getDataFormState(_this.state);
            if (!selectedId || selectedId.length === 0) {
              Notification.warn({
                message: "请选择要删除的项"
              });
              return false;
            }
            multipleHandle(_this, "deleteURL", selectedId);
          }}
        />
      </div>
    ),
    columns: () => [{
      title: "名称",
      dataIndex: "name",
      key: "name",
    }, {
      title: "编号",
      dataIndex: "code",
      key: "code",
    }, {
      title: "备注",
      dataIndex: "description",
      key: "description",
    }],
    getURL: urls.getURL,
    getDetailURL: urls.getDetailURL,
    postURL: urls.postURL,
    updateURL: urls.updateURL,
    deleteURL: urls.deleteURL,
  };

  render () {
    // const {
    //   title,
    //   actionGroup,
    //   columns,
    //   getURL,
    //   postURL,
    //   updateURL,
    //   getDetailURL,
    //   deleteURL,
    //   type
    // } = this.props;
    const { props } = this;
    return (
      <div>
        <TableCRUD
          {...props}
          // title={title}
          // actionGroup={actionGroup}
          // columns={columns}
          // getURL={getURL}
          // postURL={postURL}
          // updateURL={updateURL}
          // getDetailURL={getDetailURL}
          // deleteURL={deleteURL}
          // type={type}
        />
        <div id="detailRoot" />
      </div>
    );
  }
}

export default TableClassicCRUD;
