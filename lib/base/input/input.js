import React from "react";
import PropTypes from "prop-types";
import { Input as ATInput } from "antd";
import "antd/lib/input/style";

/**
 * 输入框
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class Input extends React.Component {
  static propTypes = {
    /**
     * 默认值
     */
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.symbol
    ]),
    placeholder: PropTypes.string,
    /**
     * 当前值
     */
    value: PropTypes.string,
    /**
     * 变化回调
     */
    onChange: PropTypes.func
  };
  static TextArea = ATInput.TextArea;
  constructor (props) {
    super(props);
    this.state = {
    };
  }
  render () {
    const { props } = this;
    return (
      <ATInput {...props} />
    );
  }
}
