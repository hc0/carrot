import React from "react";
import PropTypes from "prop-types";
import QrCode from "qrcode.react";

/**
 * 二维码组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class QRCode extends React.Component {
  static propTypes = {
    /** 设置二维码纠错等级(即使编码变脏或破损，也可自动恢复数据，调高级别，纠错能力也相应提高，但由于数据量会随之增加，编码尺寸也也会变大。) L-7% M-15% Q-28% H-30% 可被恢复 */
    level: PropTypes.oneOf([
      "L", "M", "Q", "H"
    ]),

    /** 设置二维码大小 */
    size: PropTypes.number,

    /** 设置二维码的值 */
    value: PropTypes.string,

    /** 设置二维码的背景色（需注意有些背景色不能被识别） */
    bgColor: PropTypes.string,

    /** 设置二维码线的颜色 */
    fgColor: PropTypes.string
  };
  static defaultProps = {
    level: "L",
    size: 128,
    value: "http://www.iciyun.com/",
    bgColor: "#fff",
    fgColor: "#000"
  };
  render () {
    const {
      level,
      size,
      value,
      bgColor,
      fgColor
    } = this.props;
    return (
      <QrCode
        level={level}
        size={size}
        value={value}
        bgColor={bgColor}
        fgColor={fgColor}
      />
    );
  }
}
