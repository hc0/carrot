import React, { Component } from "react";
import PropTypes from "prop-types";
import { padding, margin, backgrounds } from "polished";

import config from "../../../getConfig.js";

const shortcutsStyles = {
  color: "#fff",
  display: "inline-flex",
  backgroundColor: "blue",
  cursor: "pointer",
  ...backgrounds(`${config["@primary-color"]}`),
  marginRight: "10px",
  width: "100px",
  height: "30px",
  justifyContent: "center",
  alignItems: "center",
  borderBottomRightRadius: "15px",
  borderTopRightRadius: "15px",
};
const homePageStyles = {
  backgroundColor: "#fff",
  ...margin(20),
  ...padding(10)
};
export default class HomePage extends Component {
  static propTypes = {
    /**
     * 当前值
     */
    shortcuts: PropTypes.array,
  };
  static defaultProps = {
    shortcuts: [],
  };
  render () {
    const { shortcuts } = this.props;
    const renderShortcut = data => data.map(item => (
      <p
        key={item.id}
        style={{
          ...margin(10)
        }}
      >
        <span style={shortcutsStyles}>{item.name}</span>
        <span>{item.desc}</span>
      </p>
    ));
    return (
      <div style={homePageStyles}>
        <p style={{
          ...padding(10, 10)
        }}
        >快速导航
        </p>
        {renderShortcut(shortcuts)}
      </div>
    );
  }
}
