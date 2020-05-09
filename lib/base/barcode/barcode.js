import React from "react";
import PropTypes from "prop-types";
import JsBarcode from "jsbarcode";

/**
 * 条形码组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class Barcode extends React.Component {
  static propTypes = {
    /** 设置条形码类型 */
    type: PropTypes.oneOf([
      "CODE128", "CODE39", "EAN-13", "EAN-8", "EAN-5", "EAN-2", "UPC", "ITF-14", "ITF", "MSI", "Pharmacode", "Codabar"
    ]),

    /** 设置条形码的数值 */
    value: PropTypes.string,

    /** 设置条形码的背景色 */
    background: PropTypes.string,

    /** 设置条形码线和数字的颜色 */
    lineColor: PropTypes.string
  };
  static defaultProps = {
    type: "CODE128",
    value: "123456789012",
    background: "#fff",
    lineColor: "#000"
  };
  componentDidMount () {
    JsBarcode(".barcode").init();
  }
  render () {
    const {
      type,
      value,
      background,
      lineColor
    } = this.props;
    return (
      <svg
        className="barcode"
        jsbarcode-format={type}
        jsbarcode-value={value}
        jsbarcode-textmargin="0"
        jsbarcode-background={background}
        jsbarcode-linecolor={lineColor}
      />
    );
  }
}
