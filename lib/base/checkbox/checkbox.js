import React from "react";
import PropTypes from "prop-types";
import AntdCheckbox from "antd/lib/checkbox";
import "antd/lib/checkbox/style";

/**
 * 多选框组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class Checkbox extends React.Component {
  static propTypes = {
    /**
     * 指定当前是否选中
     */
    checked: PropTypes.bool,
    /**
     * 初始是否选中
     */
    defaultChecked: PropTypes.bool,
    /**
     * 变化时回调函数
     */
    onChange: PropTypes.func
  };
  static defaultProps = {
    checked: false,
    defaultChecked: false,
    onChange: () => {},
  };
  render () {
    const { props } = this;
    return (
      <AntdCheckbox
        defaultChecked={props.defaultChecked}
        onChange={props.onChange}
        style={props.style}
      >
        {props.children}
      </AntdCheckbox>
    );
  }
}
