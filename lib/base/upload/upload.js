import React from "react";
import PropTypes from "prop-types";
import { Upload as ATUpload } from "antd";
import "antd/lib/upload/style";

/**
 * 上传
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class Upload extends React.Component {
  static propTypes = {
    /**
     * 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)
     */
    accept: PropTypes.string,
    /**
     * 必选参数, 上传的地址
     */
    action: PropTypes.string.isRequired,
    /**
     * 初始是否选中
     */
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    /**
     * 默认已经上传的文件列表
     */
    defaultFileList: PropTypes.arrayOf(PropTypes.object),
    /**
     * 是否禁用
     */
    disabled: PropTypes.bool,
    /**
     * 设置上传的请求头部，IE10 以上有效
     */
    headers: PropTypes.object,
    /**
     * 是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件。
     */
    multiple: PropTypes.bool,
    /**
     * 发到后台的文件参数名。
     */
    name: PropTypes.string,
  };
  static name;
  render () {
    const { props } = this;
    return (
      <ATUpload {...props} />
    );
  }
}
