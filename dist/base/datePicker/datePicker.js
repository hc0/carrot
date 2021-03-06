"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _datePicker = require("antd/lib/date-picker");

var _datePicker2 = _interopRequireDefault(_datePicker);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("antd/lib/date-picker/style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(DatePicker, _React$Component);

  function DatePicker() {
    (0, _classCallCheck3.default)(this, DatePicker);
    return (0, _possibleConstructorReturn3.default)(this, (DatePicker.__proto__ || (0, _getPrototypeOf2.default)(DatePicker)).apply(this, arguments));
  }

  (0, _createClass3.default)(DatePicker, [{
    key: "render",
    value: function render() {
      var props = this.props;

      return _react2.default.createElement(_datePicker2.default, props);
    }
  }]);
  return DatePicker;
}(_react2.default.Component), _class.propTypes = {
  defaultValue: _propTypes2.default.object,

  placeholder: _propTypes2.default.string,

  onChange: _propTypes2.default.func,

  value: _propTypes2.default.object,

  format: _propTypes2.default.string,

  showToday: _propTypes2.default.bool,

  showTime: _propTypes2.default.bool
}, _class.MonthPicker = _datePicker2.default.MonthPicker, _class.RangePicker = _datePicker2.default.RangePicker, _class.WeekPicker = _datePicker2.default.WeekPicker, _temp);
exports.default = DatePicker;