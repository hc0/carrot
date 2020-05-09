"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _class, _temp;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rules = {
  mobile: /^1(3|4|5|7|8)\d{9}$/,

  plateumber: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,

  idCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,

  email: /^\w+@([0-9a-zA-Z]+[.])+[a-z]{2,4}$/,

  url: /^http:\/\/.+\./,

  chinese: /[\u4e00-\u9fa5]/,

  DBCS: /[^\x00-\xff]/,

  username: /^[a-z0-9_-]{3,16}$/,

  date: /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/,

  password: /^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/

};

var RegUtil = (_temp = _class = function () {
  function RegUtil() {
    var _this = this;

    (0, _classCallCheck3.default)(this, RegUtil);

    this.getRule = function (typeName) {
      var result = rules;
      if (typeName) {
        result = rules[typeName];
      }
      return result;
    };

    this.setRule = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!(options instanceof Array)) {
        return _this;
      }
      options.forEach(function (item) {
        rules[item.type] = item.value;
      });
      return _this;
    };

    this.checkRule = function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!(options instanceof Array)) {
        return new Error("传入的参数必须是数组");
      }
      var result = [];
      options.map(function (item) {
        return rules[item.type].test(item.value) || result.push(item);
      });
      if (result.length === 0) {
        result = true;
      }
      return result;
    };
  }

  (0, _createClass3.default)(RegUtil, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return RegUtil;
}(), _class.propTypes = {
  mobile: _propTypes2.default.any,

  plateumber: _propTypes2.default.any,

  idCard: _propTypes2.default.any,

  email: _propTypes2.default.any,

  url: _propTypes2.default.any,

  chinese: _propTypes2.default.any,

  DBCS: _propTypes2.default.any,

  username: _propTypes2.default.any,

  date: _propTypes2.default.any,

  password: _propTypes2.default.any

}, _class.defaultProps = rules, _temp);
exports.default = RegUtil;