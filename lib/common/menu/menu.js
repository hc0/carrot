import React from "react";
import {
  Router,
  Route,
  Link,
} from "react-router-dom";
import PropTypes from "prop-types";
import { backgrounds } from "polished";
import { Menu as ATMenu, Dropdown, Icon } from "antd";
import "antd/lib/dropdown/style";
import Sider from "./sider/sider";
import { History } from "../../index";
import Avatar from "../../base/avatar/avatar";
import store from "../../util/localData/storage.js";
import request from "../../util/request/request.js";

import config from "../../../getConfig.js";

const photo = "";

// const compHeaderStyles = {
//   ...backgrounds("#fff"),
//   height: "50px",
//   lineHeight: "50px",
//   paddingLeft: "30px",
//   width: "100%"
// };
const layoutBodyStyles = {
  position: "relative",
  width: "100%",
  overflow: "auto",
  ...backgrounds(`${config["@layout-body-background"]}`)
};
const modules = {};
const refrence = (routes) => {
  const mus = [];
  const ret = {};
  const deepLoop = (rts) => {
    rts.forEach((route) => {
      route.compMatch = route.component;
      if (route.component) {
        if (typeof route.component === "function") {
          // modules[route.component] = route.component;
        } else {
          modules[route.component] = require(`pages/${route.component}`).default;
          // import(`pages/${route.component}`).then((comp) => {
          //   modules[route.component] = comp.default;
          // });
        }
      }
      if (route.children) {
        deepLoop(route.children);
      }
      if (route.component) {
        mus.push(route);
      }
      if (route.path === "/") {
        ret.currentKey = route.id;
      }
    });
  };
  deepLoop(routes);
  ret.mus = mus;
  return ret;
};

const Ta = (props) => {
  const {
    route, multilevel, ...other
  } = props;
  const View = modules[route.component];
  return (
    <div style={layoutBodyStyles}>
      {/*
         page头部 暂时注释 后期优化之后启用
        <div style={compHeaderStyles}>{route.name}</div>
      */}
      <View {...other} />
      {multilevel && route.children && route.children.map((rt, i) => (
        <RouteWithSubRoutes key={i} {...rt} />
      ))}
    </div>
  );
};
const RouteWithSubRoutes = (props) => {
  const { route, multilevel } = props;
  return (
    <Route
      path={route.path}
      exact
      render={ps => (
        <Ta {...ps} route={route} multilevel={multilevel} />
      )}
    />
  );
};
const contentStyles = {
  display: "flex",
};
const avatarStyles = {
  width: "100%",
  height: "180px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  borderBottom: "1px solid #dfdfdf",
  borderRight: "1px solid #dfdfdf",
};

const logout = () => {
  request.POST(`${config.host}/logout`).then((res) => {
    if (res.success) {
      store.clear();
      window.location.reload();
    }
  });
};
/**
 * 菜单
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class Menu extends React.Component {
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
     * 头像
     */
    portrait: PropTypes.string,
    /**
     * 下拉菜单
     */
    dropdown: PropTypes.object,
    /**
     * 是否有退出登陆
     */
    hasLogout: PropTypes.bool,
  };
  static defaultProps = {
    menus: [],
    multilevel: false,
    hasLogout: true,
    dropdown: {
      title: "用户",
      options: [{
        key: "setUpMg",
        render: () => (<Link href to="/PersonalSetUpMg">个人设置</Link>)
      }, {
        key: "pwdMg",
        render: () => (<Link href to="/ChangePasswordMg">修改密码</Link>)
      }]
    }
  };
  constructor (props) {
    super(props);
    const transMenu = refrence(props.menus);
    this.state = {
      menus: props.multilevel ? props.menus : transMenu.mus,
      currentKey: transMenu.currentKey
    };
  }
  render () {
    const { props } = this;
    const { multilevel, portrait, dropdown, hasLogout } = props;
    const { selectedKey, ...sliderProps } = props;
    const { menus, currentKey } = this.state;
    const avatarMenu = (
      <ATMenu>
        {
          dropdown.options && dropdown.options.map(item => (
            <ATMenu.Item key={item.key}>
              {item.render()}
            </ATMenu.Item>
          ))
        }
        {
          hasLogout && (
            <ATMenu.Item>
              <span
                onClick={logout}
                onKeyPress={logout}
                role="button"
                tabIndex="0"
              >
              退出登录
              </span>
            </ATMenu.Item>
          )
        }
      </ATMenu>
    );
    return (
      <Router history={History} >
        <div style={contentStyles}>
          <div className="carrot-menu">
            <div style={avatarStyles}>
              <Avatar
                style={{
                  width: "100px",
                  height: "100px",
                  background: "transparent",
                  borderRadius: "50px",
                  marginBottom: "10px"
                }}
                shape="square"
                src={portrait || photo}
              />
              <Dropdown overlay={avatarMenu}>
                <span
                  className="ant-dropdown-link"
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {dropdown.title} <Icon type="down" />
                </span>
              </Dropdown>
            </div>
            <Sider {...sliderProps} selectedKey={selectedKey || currentKey} />
          </div>
          {menus.map((route, i) => (
            <RouteWithSubRoutes key={i} multilevel={multilevel} route={route} />
          ))}
        </div>
      </Router>
    );
  }
}

