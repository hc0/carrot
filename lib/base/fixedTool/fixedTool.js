import React from "react";
import PropTypes from "prop-types";
// import AntdAvatar from "antd/lib/avatar";
// import "antd/lib/avatar/style";
import { backgrounds, padding, borderWidth, borderStyle, borderColor } from "polished";

import config from "../../../getConfig.js";

const styles = {
  display: "flex",
  justifyContent: "flex-end",
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,
  ...borderWidth(config["@border-width-base"], "0"),
  ...borderStyle(config["@border-style-base"]),
  ...borderColor(config["@border-color-split"]),
  ...backgrounds(`${config["@fixedTool-background"]}`),
  ...padding(`${config["@padding-sm"]}`)
};


/**
 * 固定位置工具条组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class FixedTool extends React.Component {
  static propTypes = {
    /** 设置头像的大小 */
    position: PropTypes.oneOf(["top", "bottom"]),
  };
  static defaultProps = {
    position: "top",
  };
  render () {
    const { props } = this;
    return (
      <div
        position={props.position}
        style={Object.assign({}, styles, props.style)}
      >
        {props.children}
      </div>
    );
  }
}
