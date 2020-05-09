import React from "react";
import PropTypes from "prop-types";
import AntdBreadcrumb from "antd/lib/breadcrumb";
import "antd/lib/breadcrumb/style";
import { backgrounds } from "polished";

import config from "../../../getConfig.js";

const styles = {
  ...backgrounds(`${config["@primary-color"]}`)
};


/**
 * 面包屑组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class Breadcrumb extends React.Component {
  static propTypes = {
    /** 分隔符自定义 */
    separator: PropTypes.string,
    /** 面包屑导航的文字内容
      [
        {
          name: string,
          onClick: function
        }
      ]
     */
    items: PropTypes.array,
    /**
     * Gets called when the user clicks on the breadcrumb
     *
     * @param {SyntheticEvent} event The react `SyntheticEvent`
     * @param {Object} allProps All props of this Breadcrumb
     */
    // onClick: PropTypes.func
  };
  static defaultProps = {
    separator: "/",
    items: [{}]
  };
  render () {
    const { props } = this;
    return (
      <AntdBreadcrumb style={styles} separator={props.separator}>
        {
          props.items.map((v, k) => (
            <AntdBreadcrumb.Item
              key={`AntdBreadcrumb-${k}`}
              onClick={v.onClick}
            >
              {v.name}
            </AntdBreadcrumb.Item>))
        }
      </AntdBreadcrumb>
    );
  }
}
