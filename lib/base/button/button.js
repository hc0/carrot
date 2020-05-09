import React from "react";
import PropTypes from "prop-types";
import AntdButton from "antd/lib/button";
import "antd/lib/button/style";

/**
 * 按钮组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class Button extends React.Component {
  static propTypes = {
    /**
     * 按钮名称
     */
    title: PropTypes.string,
    /**
     * 设置按钮大小，可选值为 small large 或者不设
     */
    size: PropTypes.oneOf(["small", "normal", "large"]),
    /**
     * 是否显示为主色，默认显示，false时不显示
     */
    primary: PropTypes.bool,
    /**
     * 是否禁用
     */
    disabled: PropTypes.bool,
    /**
     * 图标
     */
    icon: PropTypes.string,
    /**
     * click 事件的 handler
     */
    onClick: PropTypes.func
  };
  static defaultProps = {
    size: null,
    primary: true,
    disabled: false,
    onClick: () => {},
    title: "确定"
  };
  render () {
    const { props } = this;
    const {
      primary,
      size,
      onClick,
      style,
      disabled,
      icon
    } = props;
    return (
      <AntdButton
        type={primary ? "primary" : null}
        size={size}
        style={style}
        onClick={onClick}
        disabled={disabled}
        icon={icon}
      >
        {
          props.title
        }
      </AntdButton>
    );
  }
}
