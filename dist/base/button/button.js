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

var _button = require("antd/lib/button");

var _button2 = _interopRequireDefault(_button);

require("antd/lib/button/style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Button, _React$Component);

  function Button() {
    (0, _classCallCheck3.default)(this, Button);
    return (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).apply(this, arguments));
  }

  (0, _createClass3.default)(Button, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var primary = props.primary,
          size = props.size,
          onClick = props.onClick,
          style = props.style,
          disabled = props.disabled,
          icon = props.icon;

      return _react2.default.createElement(
        _button2.default,
        {
          type: primary ? "primary" : null,
          size: size,
          style: style,
          onClick: onClick,
          disabled: disabled,
          icon: icon
        },
        props.title
      );
    }
  }]);
  return Button;
}(_react2.default.Component), _class.propTypes = {
  title: _propTypes2.default.string,

  size: _propTypes2.default.oneOf(["small", "normal", "large"]),

  primary: _propTypes2.default.bool,

  disabled: _propTypes2.default.bool,

  icon: _propTypes2.default.string,

  onClick: _propTypes2.default.func
}, _class.defaultProps = {
  size: null,
  primary: true,
  disabled: false,
  onClick: function onClick() {},
  title: "确定"
}, _temp);
exports.default = Button;