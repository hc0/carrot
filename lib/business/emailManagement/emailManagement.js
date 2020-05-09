import React from "react";
import PropTypes from "prop-types";
import { Form, Card, Input as AntInput } from "antd";
import "antd/lib/form/style";
import "antd/lib/card/style";

import Input from "../../base/input/input.js";
import Button from "../../base/button/button.js";
import request from "../../util/request/request.js";

import config from "../../../getConfig.js";

const FormItem = Form.Item;

const { TextArea } = AntInput;

const styles = {
  width: "80%",
  margin: "auto",
  padding: config["@padding-sm"]
};

/**
 * email组件-暂时停止
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
class EmailManagement extends React.Component {
  static propTypes = {
    /** 分隔符自定义 */
    separator: PropTypes.string,
    /** 面包屑导航的文字内容
      [
        {
          name: string,
          onClick: function
        }
      ]
     */
    items: PropTypes.array,
    /**
     * Gets called when the user clicks on the breadcrumb
     *
     * @param {SyntheticEvent} event The react `SyntheticEvent`
     * @param {Object} allProps All props of this Breadcrumb
     */
    // onClick: PropTypes.func
  };
  static defaultProps = {
    separator: "/",
    items: [{}]
  };
  handleSubmit = () => {
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (!err) {
        console.info("success", values);
        request.POST(`${config.host}/demo/mail/send`, {
          body: values
        }).then((res) => {
          console.log(res);
        });
      }
    });
  };
  render () {
    const { props } = this;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    return (
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                margin: "0"
              }}
            >
            发送邮件
            </h3>
            <Button onClick={this.handleSubmit} />
          </div>
        }
        style={styles}
      >
        <Form>
          <FormItem
            {...formItemLayout}
            label="标题"
          >
            {getFieldDecorator("title", {
              initialValue: "",
              rules: [{ required: true, message: "标题必填!" }],
            })(<Input placeholder="邮件标题" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="接收人"
          >
            {getFieldDecorator("mailTo", {
              initialValue: "",
              rules: [{ required: true, message: "接收人必填!" }],
            })(<Input placeholder="邮件接收人，多个邮件用,连接" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="内容"
          >
            {getFieldDecorator("content", {
              initialValue: "",
              rules: [{ required: true, message: "内容必填!" }],
            })(<TextArea
              autosize={{
                minRows: 2,
                maxRows: 6
              }}
            />)}
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(EmailManagement);
