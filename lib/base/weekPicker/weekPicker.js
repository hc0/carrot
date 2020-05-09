import React from "react";
import PropTypes from "prop-types";
import { DatePicker as ATDatePicker } from "antd";
import "antd/lib/date-picker/style";

/**
 * 星期选择框
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class WeekPicker extends React.Component {
  static propTypes = {
    /**
     * 默认值([moment](http://momentjs.com/)类型)
     */
    defaultValue: PropTypes.object,
    /**
     * 输入框占位文本
     */
    placeholder: PropTypes.string,
    /**
     * 选择完成后的回调
     */
    onChange: PropTypes.func,
    /**
     * 日期([moment](http://momentjs.com/)类型)
     */
    value: PropTypes.object,
    /**
     * 展示的日期格式，配置参考 [moment.js](http://momentjs.com/)
     */
    format: PropTypes.string,
  };
  static name;
  render () {
    const { props } = this;
    return (
      <ATDatePicker.WeekPicker {...props} />
    );
  }
}
