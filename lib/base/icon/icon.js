import React from "react";
import PropTypes from "prop-types";
import AntdIcon from "antd/lib/icon";
import "antd/lib/icon/style";
// import { backgrounds } from "polished";

// import config from "../../../getConfig.js";

// const styles = {
//   ...backgrounds(`${config["@primary-color"]}`)
// };


/**
 * 图标组件
 * 语义化的矢量图形。
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
 * [antd库icon详细文档](https://ant.design/components/icon-cn/)
*/
export default class Icon extends React.Component {
  static propTypes = {
    /** 是否有旋转动画 */
    spin: PropTypes.bool,

    /** 设置图标的样式，例如 fontSize 和 color */
    style: PropTypes.object,

    /** 图标类型 */
    type: PropTypes.string,

  };
  static defaultProps = {
    spin: false,
    style: {},
    type: "",
  };
  render () {
    const { props } = this;
    return (
      <AntdIcon
        {...props}
      />
    );
  }
}
