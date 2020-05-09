import React from "react";
import PropTypes from "prop-types";
import { InputNumber as ATInputNumber } from "antd";
import "antd/lib/input-number/style";

/**
 * 数字输入框
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class InputNumber extends React.Component {
  static propTypes = {
    /**
     * 每次改变步数，可以为小数
     */
    step: PropTypes.number,
    /**
     * 最小值
     */
    min: PropTypes.number,
    /**
     * 最大值
     */
    max: PropTypes.number,
    /**
     * 默认值
     */
    defaultValue: PropTypes.number,
    /**
     * 当前值
     */
    value: PropTypes.number,
    /**
     * 变化回调
     */
    onChange: PropTypes.func
  };
  static defaultProps = {
    min: Infinity,
    max: Infinity,
    step: 1
  };
  render () {
    const { props } = this;
    return (
      <ATInputNumber {...props} />
    );
  }
}
