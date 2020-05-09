import React from "react";
import PropTypes from "prop-types";
import { Radio as ATRadio } from "antd";
import "antd/lib/radio/style";

/**
 * 单选框
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class Radio extends React.Component {
  static propTypes = {
    /**
     * 自动获取焦点
     */
    autoFocus: PropTypes.bool,
    /**
     * 指定当前是否选中
     */
    checked: PropTypes.bool,
    /**
     * 初始是否选中
     */
    defaultChecked: PropTypes.bool,
    /**
     * 选择完成后的回调
     */
    onChange: PropTypes.func,
    /**
     * 根据 value 进行比较，判断是否选中
     */
    value: PropTypes.object,

  };
  static name;
  render () {
    const { props } = this;
    return (
      <ATRadio {...props} />
    );
  }
}
