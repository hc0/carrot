import React from "react";
import PropTypes from "prop-types";
import { Form as AntForm, Card } from "antd";
import "antd/lib/form/style";
import "antd/lib/card/style";

import Button from "../../base/button/button.js";

import config from "../../../getConfig.js";

const FormItem = AntForm.Item;
const Create = AntForm.create();

const styles = {
  width: "80%",
  margin: "auto",
  padding: config["@padding-sm"]
};

/**
 *  表单组件
 *
 *  export {
 *
 *    Form as default,
 *
 *    Form, // 表单组件
 *
 *    FormItem, // 表单项
 *
 *    Create, // 构建带有验证的表单[API文档](https://ant.design/components/form-cn/#components-form-demo-validate-other)
 *
 *  };
 *
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
class Form extends React.Component {
  static propTypes = {
    /** 表单名 */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
    /** 按钮回调函数 */
    handleSubmit: PropTypes.func,
    /** 多按钮时的入口，需返回ReactNode */
    actionGroup: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    /**
     * Gets called when the user clicks on the breadcrumb
     *
     * @param {SyntheticEvent} event The react `SyntheticEvent`
     * @param {Object} allProps All props of this Breadcrumb
     */
    // onClick: PropTypes.func
  };
  static defaultProps = {
    title: "",
    handleSubmit: () => {},
  };
  handleSubmit = () => {
    if (this.props.handleSubmit && typeof this.props.handleSubmit === "function") {
      this.props.handleSubmit(this);
    } else {
      console.log("需要传入handleSubmit属性或重写actionGroup属性");
    }
  };
  render () {
    const { props } = this;
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
              {props.title}
            </h3>
            {
              (props.actionGroup && props.actionGroup(this)) || <Button onClick={this.handleSubmit} />
            }
          </div>
        }
        style={styles}
      >
        <AntForm style={props.style}>
          {
            props.children && props.children.map(item => item)
          }
        </AntForm>
      </Card>
    );
  }
}

export {
  Form as default,
  Form,
  FormItem,
  Create,
};

