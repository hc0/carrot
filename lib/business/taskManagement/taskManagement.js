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
  getURL: "sys/schedule/job/list",
  postURL: "sys/schedule/job/create",
  updateURL: "sys/schedule/job/update",
  deleteURL: "sys/schedule/job/delete",
  pauseURL: "sys/schedule/job/pause",
  recoveryURL: "sys/schedule/job/resume",
  playURL: "sys/schedule/job/run",
  getDetailURL: "sys/schedule/job/get",
};

const statusCode = {
  0: "正常",
  1: "暂停"
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
      label="任务名称"
    >
      {getFieldDecorator("name", {
        initialValue: oneDetail.name,
        rules: [
          { required: true, message: "任务名称必填!" },
        ],
      })(<Input />)}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="bean名称"
    >
      {getFieldDecorator("bean", {
        initialValue: oneDetail.bean,
        rules: [
          { required: true, message: "bean名称必填!" },
        ],
      })(<Input />)}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="方法名称"
    >
      {getFieldDecorator("method", {
        initialValue: oneDetail.method,
        rules: [
          { required: true, message: "方法名称必填!" },
        ],
      })(<Input />)}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="参数"
    >
      {getFieldDecorator("params", {
        initialValue: oneDetail.params,
        rules: [
          { required: true, message: "参数必填!" },
        ],
      })(<Input />)}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="cron表达式"
    >
      {getFieldDecorator("expression", {
        initialValue: oneDetail.expression,
        rules: [
          { required: true, message: "cron表达式必填!" },
        ],
      })(<Input />)}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="备注"
    >
      {getFieldDecorator("remark", {
        initialValue: oneDetail.remark,
        rules: [
          { required: true, message: "备注必填!" },
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
      // closable={false}
      footer={null}
      destroyOnClose={!!1}
      // cancelText="返回"
      onCancel={() => {
        unmountComponentAtNode(bindNode);
      }}
      // okText=""
      // onOk={() => modalOK(this)}
      width="80%"
    >
      <Detail listThis={_this} type={type} oneDetail={oneDetail} />
    </Modal>,
    bindNode
  );
};

// 删除、暂停、恢复、立即执行
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
      _this.loadData();
    } else {
      Notification.error({
        message: res.msg
      });
    }
  });
};

/**
 * 定时任务管理组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
class TaskManagement extends Component {
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
    /**
     * 暂停提交URL
     */
    pauseURL: PropTypes.string,
    /**
     * 恢复提交URL
     */
    recoveryURL: PropTypes.string,
    /**
     * 立即执行提交URL
     */
    playURL: PropTypes.string,
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
          placeholder="bean名称"
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
          }}
        />
        <Button
          style={styles}
          title="删除"
          primary={!1}
          onClick={() => {
            const selectedId = getDataFormState(_this.state);
            multipleHandle(_this, "deleteURL", selectedId);
          }}
        />
        <Button
          style={styles}
          title="暂停"
          primary={!1}
          onClick={() => {
            const selectedId = getDataFormState(_this.state);
            multipleHandle(_this, "pauseURL", selectedId);
          }}
        />
        <Button
          style={styles}
          title="恢复"
          primary={!1}
          onClick={() => {
            const selectedId = getDataFormState(_this.state);
            multipleHandle(_this, "recoveryURL", selectedId);
          }}
        />
        <Button
          style={styles}
          title="立即执行"
          primary={!1}
          onClick={() => {
            const selectedId = getDataFormState(_this.state);
            multipleHandle(_this, "playURL", selectedId);
          }}
        />
      </div>
    ),
    columns: () => [{
      title: "任务ID",
      dataIndex: "id",
      key: "id",
    }, {
      title: "任务名称",
      dataIndex: "name",
      key: "name",
    }, {
      title: "bean名称",
      dataIndex: "bean",
      key: "bean",
    }, {
      title: "方法名称",
      dataIndex: "method",
      key: "method",
    }, {
      title: "参数",
      dataIndex: "params",
      key: "params",
    }, {
      title: "cron表达式",
      dataIndex: "expression",
      key: "expression",
    }, {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
    }, {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: value => statusCode[value]
    }],
    getURL: urls.getURL,
    getDetailURL: urls.getDetailURL,
    postURL: urls.postURL,
    updateURL: urls.updateURL,
    deleteURL: urls.deleteURL,
    pauseURL: urls.pauseURL,
    recoveryURL: urls.recoveryURL,
    playURL: urls.playURL,
  };

  render () {
    const {
      title,
      actionGroup,
      columns,
      getURL,
      postURL,
      updateURL,
      getDetailURL,
      deleteURL,
      pauseURL,
      recoveryURL,
      playURL,
    } = this.props;
    return (
      <div>
        <TableCRUD
          title={title}
          actionGroup={actionGroup}
          columns={columns}
          getURL={getURL}
          postURL={postURL}
          updateURL={updateURL}
          getDetailURL={getDetailURL}
          deleteURL={deleteURL}
          pauseURL={pauseURL}
          recoveryURL={recoveryURL}
          playURL={playURL}
        />
        <div id="detailRoot" />
      </div>
    );
  }
}

export default TaskManagement;
