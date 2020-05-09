import React from "react";
import PropTypes from "prop-types";
import { Tree as ATTree } from "antd";
import "antd/lib/tree/style";

const ATTreeNode = ATTree.TreeNode;
/**
 * 树形控件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class Tree extends React.Component {
  static propTypes = {
    /**
     * 是否自动展开父节点
     */
    autoExpandParent: PropTypes.bool,
    /**
     * 支持点选多个节点（节点本身）
     */
    multiple: PropTypes.bool,
    /**
     * 节点前添加 Checkbox 复选框
     */
    checkable: PropTypes.bool,
    /**
     * （受控）设置选中的树节点
     */
    selectedKeys: PropTypes.array,
    /**
     * 默认展开指定的树节点
     */
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
    /**
     * 默认选中的树节点
     */
    defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
    /**
     * 默认选中复选框的树节点
     */
    defaultCheckedKeys: PropTypes.array,
    /**
     * 点击树节点触发
     */
    onSelect: PropTypes.func,
    /**
     * 点击复选框触发
     */
    onCheck: PropTypes.func,
    /**
     * 选择域数据
     */
    options: PropTypes.array
  };
  static defaultProps = {
    autoExpandParent: true,
    multiple: false,
    checkable: false,
    defaultExpandedKeys: [],
    defaultSelectedKeys: [],
    defaultCheckedKeys: [],
    options: []
  };
  static TreeNode = ATTreeNode;
  render () {
    const { props } = this;
    const {
      children,
      options,
      ...others
    } = props;
    const renderTreeNodes = data => data.map((item) => {
      if (item.children) {
        return (
          <ATTreeNode title={item.title} key={item.key} dataRef={item}>
            {renderTreeNodes(item.children)}
          </ATTreeNode>
        );
      }
      return <ATTreeNode {...item} />;
    });
    return (
      <ATTree {...others}>
        {children || renderTreeNodes(options)}
      </ATTree>
    );
  }
}
