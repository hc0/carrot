import React from "react";
import PropTypes from "prop-types";
import AntdAvatar from "antd/lib/avatar";
import "antd/lib/avatar/style";
// import { backgrounds } from "polished";

// import config from "../../../getConfig.js";

// const styles = {
//   ...backgrounds(`${config["@primary-color"]}`)
// };


/**
 * 头像组件
 * 用来代表用户或事物，支持图片、图标或字符展示。
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class Avatar extends React.Component {
  static propTypes = {
    /** 设置头像的大小 */
    size: PropTypes.oneOf(["small", "default", "large"]),

    /** 设置头像的图标类型，参考 Icon 组件 */
    icon: PropTypes.string,

    /** 指定头像的形状 */
    shape: PropTypes.oneOf(["circle", "square"]),

    /** 图片类头像的资源地址 */
    src: PropTypes.string
  };
  static defaultProps = {
    size: "default",
    icon: "",
    shape: "circle",
    src: ""
  };
  render () {
    const { props } = this;
    return (
      <AntdAvatar
        size={props.size}
        icon={props.icon}
        shape={props.shape}
        src={props.src}
        style={props.style}
      >
        {props.children}
      </AntdAvatar>
    );
  }
}
