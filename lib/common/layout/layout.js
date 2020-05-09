import React, { Component } from "react";
import PropTypes from "prop-types";
import { backgrounds } from "polished";
import Menus from "../menu/menu";
import Avatar from "../../base/avatar/avatar";

import config from "../../../getConfig.js";

const logoPNG = config.logo;

const headerStyles = {
  display: "flex",
  alignItems: "center",
  height: `${config["@layout-header-height"]}`,
  ...backgrounds(`${config["@primary-color"]}`),
};
/**
 * 布局
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
class Layout extends Component {
  static propTypes = {
    /**
     * 菜单数据
     */
    menus: PropTypes.array,
    /**
     * 选择完成后的回调
     */
    onChange: PropTypes.func,
    /**
     * 默认展开的菜单
     */
    defaultOpenKeys: PropTypes.array,
    /**
     * 默认选中
     */
    selectedKey: PropTypes.string,
    /**
     * 是否支持多级路由
     */
    multilevel: PropTypes.bool,
    /**
     * 顶部标题
     */
    title: PropTypes.string,
    /**
     * 头像
     */
    portrait: PropTypes.string,
    /**
     * 下拉菜单
     */
    dropdown: PropTypes.object,
  };
  static defaultProps = {
    menus: [],
    multilevel: false,
    title: config["app-title"] || "磁云基础平台"
  };
  render () {
    const { props } = this;
    const { title } = props;
    return (
      <div>
        <header style={headerStyles}>
          <Avatar
            style={{
              width: "36px",
              height: "20px",
              background: "transparent",
              borderRadius: "0",
              marginLeft: "20px"
            }}
            shape="square"
            src={logoPNG}
          />
          <h2 style={{
            margin: "0 0 0 10px",
            color: "#fff"
          }}
          >
            {title}
          </h2>
        </header>
        <Menus style={{ width: 200 }} {...props} />
      </div>
    );
  }
}

export default Layout;
