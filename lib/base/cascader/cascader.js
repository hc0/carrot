import React from "react";
import PropTypes from "prop-types";
import { Cascader as ATCascader } from "antd";
import "antd/lib/cascader/style";

/**
 * 级联选择
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class Cascader extends React.Component {
  static propTypes = {
    /**
     * 可选项数据源
     */
    options: PropTypes.array,
    /**
     * 默认的选中项
     */
    defaultValue: PropTypes.arrayOf(PropTypes.string),
    /**
     * 输入框占位文本
     */
    placeholder: PropTypes.string,
    /**
     * 选择完成后的回调
     */
    onChange: PropTypes.func,
    /**
     * 指定选中项
     */
    value: PropTypes.arrayOf(PropTypes.string)
  };
  static defaultProps = {
    options: [],
    defaultValue: []
  };
  render () {
    const { props } = this;
    return (
      <ATCascader {...props} />
    );
  }
}
