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

var _avatar = require("antd/lib/avatar");

var _avatar2 = _interopRequireDefault(_avatar);

require("antd/lib/avatar/style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Avatar = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Avatar, _React$Component);

  function Avatar() {
    (0, _classCallCheck3.default)(this, Avatar);
    return (0, _possibleConstructorReturn3.default)(this, (Avatar.__proto__ || (0, _getPrototypeOf2.default)(Avatar)).apply(this, arguments));
  }

  (0, _createClass3.default)(Avatar, [{
    key: "render",
    value: function render() {
      var props = this.props;

      return _react2.default.createElement(
        _avatar2.default,
        {
          size: props.size,
          icon: props.icon,
          shape: props.shape,
          src: props.src,
          style: props.style
        },
        props.children
      );
    }
  }]);
  return Avatar;
}(_react2.default.Component), _class.propTypes = {
  size: _propTypes2.default.oneOf(["small", "default", "large"]),

  icon: _propTypes2.default.string,

  shape: _propTypes2.default.oneOf(["circle", "square"]),

  src: _propTypes2.default.string
}, _class.defaultProps = {
  size: "default",
  icon: "",
  shape: "circle",
  src: ""
}, _temp);
exports.default = Avatar;