import React from "react";
import PropTypes from "prop-types";
import { Radio as ATRadio } from "antd";
import "antd/lib/radio/style";

/**
 * 组合单选框
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class RadioGroup extends React.Component {
  static propTypes = {
    /**
     * RadioGroup 下所有 input[type="radio"] 的 name 属性
     */
    name: PropTypes.string,
    /**
     * 以配置形式设置子元素
     */
    options: PropTypes.array,
    /**
     * 默认选中的值
     */
    defaultValue: PropTypes.any,
    /**
     * 选择完成后的回调
     */
    onChange: PropTypes.func,
    /**
     * 根据 value 进行比较，判断是否选中
     */
    value: PropTypes.any,

  };
  static name;
  render () {
    const { props } = this;
    const {
      children,
      options,
      ...others
    } = props;
    const renderRadioNodes = data => data.map(item => (
      <ATRadio value={item.value} key={item.value}>
        {item.text}
      </ATRadio>
    ));
    return (
      <ATRadio.Group {...others} >
        {children || renderRadioNodes(options)}
      </ATRadio.Group>
    );
  }
}
