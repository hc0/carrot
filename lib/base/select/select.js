import React from "react";
import PropTypes from "prop-types";
import { Select as ATSelect } from "antd";
import "antd/lib/select/style";

const ATOption = ATSelect.Option;
/**
 * 选择器
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class Select extends React.Component {
  static propTypes = {
    /**
     * 默认值
     */
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * 当前值
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * 选择域数据
     */
    options: PropTypes.array,
    /**
     * 支持多选
     */
    multiple: PropTypes.bool,
    /**
     * 变化回调
     */
    onChange: PropTypes.func
  };
  static Option = ATOption;

  static defaultProps = {
    options: []
  };
  render () {
    const {
      children,
      options,
      multiple,
      ...others
    } = this.props;
    const opts = options.map(d =>
      (
        <ATOption
          key={d.value.toString()}
          disabled={d.disabled}
        >{d.text}
        </ATOption>));
    return (
      <ATSelect mode={multiple && "multiple"} {...others} >
        {children || opts}
      </ATSelect>
    );
  }
}
