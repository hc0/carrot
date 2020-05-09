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

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _polished = require("polished");

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = (0, _extends3.default)({
  display: "flex",
  justifyContent: "flex-end",
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0
}, (0, _polished.borderWidth)(_getConfig2.default["@border-width-base"], "0"), (0, _polished.borderStyle)(_getConfig2.default["@border-style-base"]), (0, _polished.borderColor)(_getConfig2.default["@border-color-split"]), (0, _polished.backgrounds)("" + _getConfig2.default["@fixedTool-background"]), (0, _polished.padding)("" + _getConfig2.default["@padding-sm"]));

var FixedTool = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(FixedTool, _React$Component);

  function FixedTool() {
    (0, _classCallCheck3.default)(this, FixedTool);
    return (0, _possibleConstructorReturn3.default)(this, (FixedTool.__proto__ || (0, _getPrototypeOf2.default)(FixedTool)).apply(this, arguments));
  }

  (0, _createClass3.default)(FixedTool, [{
    key: "render",
    value: function render() {
      var props = this.props;

      return _react2.default.createElement(
        "div",
        {
          position: props.position,
          style: (0, _extends3.default)({}, styles, props.style)
        },
        props.children
      );
    }
  }]);
  return FixedTool;
}(_react2.default.Component), _class.propTypes = {
  position: _propTypes2.default.oneOf(["top", "bottom"])
}, _class.defaultProps = {
  position: "top"
}, _temp);
exports.default = FixedTool;