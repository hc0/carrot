import React, { Component } from "react";
import { Menu, Icon } from "antd";
import "antd/lib/menu/style";
import { Link } from "react-router-dom";

export default class Sider extends Component {
  constructor (props) {
    super(props);
    this.state = {
      current: props.selectedKey,
    };
  }
  onOpenChange = (e) => {
    this.setState({
      openKeys: [e.pop()]
    });
  };
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };
  render () {
    const renderMenu = data => data.map((item) => {
      if (item.children) {
        return (
          item.name &&
          <Menu.SubMenu key={item.id} title={<span><Icon type={item.icon || "appstore"} /><span>{item.name}</span></span>}>
            {renderMenu(item.children)}
          </Menu.SubMenu>);
      }
      return item.name && <Menu.Item key={item.id}><Link href to={item.path}>{item.icon && <Icon type={item.icon || "appstore"} />}{item.name}</Link></Menu.Item>;
    });
    const { menus, style } = this.props;
    return (
      <div>
        <Menu
          style={style}
          theme="light"
          onClick={this.handleClick}
          defaultOpenKeys={this.props.defaultOpenKeys}
          onOpenChange={this.onOpenChange}
          openKeys={this.state.openKeys}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          {menus && renderMenu(menus)}
        </Menu>
      </div>
    );
  }
}

