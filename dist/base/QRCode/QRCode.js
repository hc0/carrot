"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _qrcode = require("qrcode.react");

var _qrcode2 = _interopRequireDefault(_qrcode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QRCode = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(QRCode, _React$Component);

  function QRCode() {
    (0, _classCallCheck3.default)(this, QRCode);
    return (0, _possibleConstructorReturn3.default)(this, (QRCode.__proto__ || (0, _getPrototypeOf2.default)(QRCode)).apply(this, arguments));
  }

  (0, _createClass3.default)(QRCode, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          level = _props.level,
          size = _props.size,
          value = _props.value,
          bgColor = _props.bgColor,
          fgColor = _props.fgColor;

      return _react2.default.createElement(_qrcode2.default, {
        level: level,
        size: size,
        value: value,
        bgColor: bgColor,
        fgColor: fgColor
      });
    }
  }]);
  return QRCode;
}(_react2.default.Component), _class.propTypes = {
  level: _propTypes2.default.oneOf(["L", "M", "Q", "H"]),

  size: _propTypes2.default.number,

  value: _propTypes2.default.string,

  bgColor: _propTypes2.default.string,

  fgColor: _propTypes2.default.string
}, _class.defaultProps = {
  level: "L",
  size: 128,
  value: "http://www.iciyun.com/",
  bgColor: "#fff",
  fgColor: "#000"
}, _temp);
exports.default = QRCode;