import PropTypes from "prop-types";

const rules = {
  /** 手机号 */
  mobile: /^1(3|4|5|7|8)\d{9}$/,

  /** 车牌号 */
  plateumber: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,

  /** 身份证 */
  idCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,

  /** 匹配字母、数字、中文字符 */
  // bgColor: /^([A-Za-z0-9]|[\u4e00-\u9fa5])*$/,

  /** 邮箱 */
  email: /^\w+@([0-9a-zA-Z]+[.])+[a-z]{2,4}$/,

  /** URL */
  url: /^http:\/\/.+\./,

  /** 中文字符 */
  chinese: /[\u4e00-\u9fa5]/,

  /** 双字节字符(包括汉字在内) */
  DBCS: /[^\x00-\xff]/,

  /** 普通用户名(3-16个字符) */
  username: /^[a-z0-9_-]{3,16}$/,

  /** “yyyy-mm-dd” 格式的日期校验，已考虑平闰年。 */
  date: /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/,

  /** 密码强度(密码的强度必须是包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间) */
  password: /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/,

};

/**
 * 正则组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class RegUtil {
  static propTypes = {
    /** 手机号 */
    mobile: PropTypes.any,

    /** 车牌号 */
    plateumber: PropTypes.any,

    /** 身份证 */
    idCard: PropTypes.any,

    /** 匹配字母、数字、中文字符 */
    // bgColor: PropTypes.any,

    /** 邮箱 */
    email: PropTypes.any,

    /** URL */
    url: PropTypes.any,

    /** 中文字符 */
    chinese: PropTypes.any,

    /** 双字节字符(包括汉字在内) */
    DBCS: PropTypes.any,

    /** 普通用户名(3-16个字符) */
    username: PropTypes.any,

    /** “yyyy-mm-dd” 格式的日期校验，已考虑平闰年。 */
    date: PropTypes.any,

    /** 密码强度(密码的强度必须是包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间) */
    password: PropTypes.any,

  };

  static defaultProps = rules;

  /**
   * 获取验证规则
   * @param  {string} typeName 验证规则的名称，若不填则获取全部验证规则
   * @return {string}          返回名称对应的验证规则或全部验证规则
   * @public
   */
  getRule = (typeName) => {
    let result = rules;
    if (typeName) {
      result = rules[typeName];
    }
    return result;
  };
  /**
   * 设置验证规则
   * @param {array} options 设置的验证规则数组[{type: "email", value: /^\w+@([0-9a-zA-Z]+[.])+[a-z]{2,4}$/}]
   * @return {object} 返回RegUtil对象;
   * @public
   */
  setRule = (options = []) => {
    if (!(options instanceof Array)) {
      return this;
    }
    options.forEach((item) => {
      rules[item.type] = item.value;
    });
    return this;
  };
  /**
   * 验证传入的对象
   * @param  {array} options 需要验证的对象数组[{type: "mobile", value: "18600000000"}]
   * @return {array}         验证通过时返回true, 不通过则返回没有通过的数据数组[{mobile: "1777787455"}]
   * @public
   */
  checkRule = (options = []) => {
    // console.log(rules);
    if (!(options instanceof Array)) {
      return new Error("传入的参数必须是数组");
    }
    let result = [];
    options.map(item => (
      rules[item.type].test(item.value) || result.push(item)
    ));
    if (result.length === 0) {
      result = true;
    }
    return result;
  };
  render () {
    // const {
    //   props
    // } = this;
    return null;
  }
}
