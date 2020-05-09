"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _radio = require("antd/lib/radio");

var _radio2 = _interopRequireDefault(_radio);

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

require("antd/lib/radio/style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Radio, _React$Component);

  function Radio() {
    (0, _classCallCheck3.default)(this, Radio);
    return (0, _possibleConstructorReturn3.default)(this, (Radio.__proto__ || (0, _getPrototypeOf2.default)(Radio)).apply(this, arguments));
  }

  (0, _createClass3.default)(Radio, [{
    key: "render",
    value: function render() {
      var props = this.props;

      return _react2.default.createElement(_radio2.default, props);
    }
  }]);
  return Radio;
}(_react2.default.Component), _class.propTypes = {
  autoFocus: _propTypes2.default.bool,

  checked: _propTypes2.default.bool,

  defaultChecked: _propTypes2.default.bool,

  onChange: _propTypes2.default.func,

  value: _propTypes2.default.object

}, _temp);
exports.default = Radio;