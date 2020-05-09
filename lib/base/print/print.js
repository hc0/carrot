import React from "react";
import PropTypes from "prop-types";
import PrintArea from "rc-print";

/**
 * 打印组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/

export default class Print extends React.Component {
  static propTypes = {
    /** 打印操作
     *
     * @param {function} print 打印操作方法，执行print()即打印；
     * @param {object} context 打印组件的实例化对象；
     */
    print: PropTypes.func,

    /** 设置打印前的回调操作 */
    beforePrint: PropTypes.func,

    /** 设置打印后的回调操作，无论是否成功 */
    afterPrint: PropTypes.func,
  };
  static defaultProps = {
  };
  print = (printArea) => {
    if (!printArea) {
      printArea = {};
    }
    this.props.print(printArea.onPrint, printArea);
  };
  render () {
    const {
      beforePrint,
      afterPrint,
      children,
    } = this.props;
    return (
      <PrintArea
        ref={this.print}
        onStart={beforePrint}
        onEnd={afterPrint}
      >
        {
          children
        }
      </PrintArea>
    );
  }
}
