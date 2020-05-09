import React from "react";
import PropTypes from "prop-types";
import { Card } from "antd";

import Input from "../../base/input/input.js";
import Notification from "../../base/notification/notification.js";
import { Form, FormItem, Create } from "../../base/form/form.js";
import request from "../../util/request/request.js";

import config from "../../../getConfig.js";


// 表单项类型
const formItem = {
  input (item) {
    return (
      <Input
        key={item.key}
        placeholder={item.placeholder}
        disabled={item.readonly}
        // onChange={(e) => {
        //   _this.setState({
        //     [item.key]: e.target.value
        //   });
        // }}
      />
    );
  },
  // select () {
  //   return (

  //   );
  // },
  // time () {
  //   return (
  //   );
  // },
  // cascader () {
  //   return (
  //   );
  // },
  custom (item) {
    return (
      item.content
    );
  },
};

/**
 *  table详情组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
class TableDetail extends React.Component {
  static propTypes = {
    /**
     * table名称，字符串或ReactNode
     */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
    /** 表单项 */
    formItemGroup: PropTypes.array,
    /** 是否有边框 */
    bordered: PropTypes.bool,
    /** 表单分栏数 */
    column: PropTypes.number,
    /** 表单项左右栅格大小 */
    itemCol: PropTypes.array,
    /** 获取详情方法对象 */
    getDetailURL: PropTypes.object,
    /** 获取详情ID，没有时判断为新增则不发送获取详情的请求 */
    detailId: PropTypes.string,
    /** 是否为只读查看 */
    readonly: PropTypes.bool,
    /** 新增方法对象 */
    addURL: PropTypes.object,
    /** 编辑方法对象 */
    updateURL: PropTypes.object,
    /** 传入父级This */
    parentThis: PropTypes.object,
  };
  static defaultProps = {
    title: "TableDetail",
    bordered: true,
    itemCol: [6, 16],
    getDetailURL: {
      url: "sys/user/updatePassword",
      // method: "POST"
    },
    readonly: true,
  };
  state = {
    detailData: {}
  };
  componentDidMount () {
    // const { getDetailUR } = this.props;
    this.loadData();
  }
  checkPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次密码不一致!");
    } else {
      callback();
    }
  };
  handleSubmit = () => {
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        const { props } = this;
        const {
          addURL,
          updateURL,
          detailId,
          parentThis
        } = props;

        let requestURL = {};
        // 存在detailId则为编辑，不存在则为新增
        if (!detailId) {
          requestURL = addURL;
        } else {
          requestURL = updateURL;
          values.id = detailId;
        }

        const {
          url,
          method,
        } = requestURL;

        request[(method && method.toUpperCase()) || "POST"](`${config.host}/${url}`, {
          body: values,
          params: values,
        }).then((res) => {
          // console.log("res", res);
          if (res.success) {
            Notification.success({
              message: !detailId ? "新增成功" : "编辑成功"
            });
            parentThis.toggleModal();
            parentThis.loadData();
          } else {
            Notification.success({
              message: res.msg
            });
          }
        });
      }
    });
  };
  loadData = () => {
    const { props } = this;
    const {
      getDetailURL,
      detailId,
    } = props;
    // const params = this.getSearchParams(searchCondition);
    // console.log(params);
    if (detailId) {
      const {
        url,
        method,
      } = getDetailURL || {};
      request[(method && method.toUpperCase()) || "GET"](`${config.host}/${url}/${detailId}`, {
        // body: { id: detailId, },
        // params: { id: detailId, },
      }).then((res) => {
        // console.log("res", res);
        // 将数据补全
        // const { size } = res.data;
        // if (size === 10 && res.data.records.length !== size) {
        //   const emptyArray = Array(size - res.data.records.length).fill({});
        //   res.data.records = res.data.records.concat(emptyArray);
        // }
        if (res.success) {
          this.setState({
            detailData: res.data,
          });
        } else {
          console.error(res.msg);
        }
      });
    }
  };
  render () {
    const { props, state } = this;
    const {
      form,
      formItemGroup,
      column,
      itemCol,
      readonly,
      bordered,
    } = props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: itemCol[0] },
      wrapperCol: { span: itemCol[1] },
    };

    const { detailData } = state;

    return (
      <Form
        className="222"
        title={this.props.title}
        actionGroup={readonly && (() => <div />)}
        handleSubmit={this.handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: Array(column).fill("1fr").join(" "),
          gridColumnGap: config["@padding-sm"],
          gridRowGap: config["@padding-sm"],
        }}
      >
        {
          formItemGroup.map((array, arrayIndex) => (
            <div
              key={`tableDetail-card-${arrayIndex}`}
              style={{
                border: bordered && `${config["@border-width-base"]} ${config["@border-style-base"]} ${config["@border-color-base"]}`,
                borderRadius: config["@border-radius-base"],
                padding: config["@padding-sm"],
                paddingRight: 0,
                paddingBottom: 0,
              }}
            >
              {
                array.map((item, itemIndex) => {
                  const {
                    title,
                    key,
                    // type = "input",
                    placeholder,
                    rules = []
                  } = item;
                  item.readonly = readonly;
                  return (
                    item.type !== "withoutFormItem" ?
                      <FormItem
                        key={`tableDetail-card-formItem-${itemIndex}`}
                        {...formItemLayout}
                        label={title}
                      >
                        {getFieldDecorator(key, {
                          initialValue: detailData[key],
                          rules,
                        })(formItem[item.type] ? formItem[item.type](item) : <div>{placeholder}</div>)}
                      </FormItem> :
                      <div
                        key={`tableDetail-card-formItem-${itemIndex}`}
                      >
                        {item.content}
                      </div>
                  );
                })
              }
            </div>
          ))
        }
        {
          /*
          <FormItem
            {...formItemLayout}
            label="新密码"
          >
            {getFieldDecorator("password", {
              initialValue: "",
              rules: [{ required: true, message: "新密码必填!" }],
            })(<Input type="password" placeholder="新密码" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码确认"
          >
            {getFieldDecorator("confirmPassword", {
              initialValue: "",
              rules: [
                { required: true, message: "必填!" },
                { validator: this.checkPassword }
              ],
            })(<Input type="password" placeholder="确认新密码" />)}
          </FormItem>
          */
        }
      </Form>
    );
  }
}
export default Create(TableDetail);
