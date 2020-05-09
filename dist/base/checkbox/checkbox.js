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

var _checkbox = require("antd/lib/checkbox");

var _checkbox2 = _interopRequireDefault(_checkbox);

require("antd/lib/checkbox/style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Checkbox, _React$Component);

  function Checkbox() {
    (0, _classCallCheck3.default)(this, Checkbox);
    return (0, _possibleConstructorReturn3.default)(this, (Checkbox.__proto__ || (0, _getPrototypeOf2.default)(Checkbox)).apply(this, arguments));
  }

  (0, _createClass3.default)(Checkbox, [{
    key: "render",
    value: function render() {
      var props = this.props;

      return _react2.default.createElement(
        _checkbox2.default,
        {
          defaultChecked: props.defaultChecked,
          onChange: props.onChange,
          style: props.style
        },
        props.children
      );
    }
  }]);
  return Checkbox;
}(_react2.default.Component), _class.propTypes = {
  checked: _propTypes2.default.bool,

  defaultChecked: _propTypes2.default.bool,

  onChange: _propTypes2.default.func
}, _class.defaultProps = {
  checked: false,
  defaultChecked: false,
  onChange: function onChange() {}
}, _temp);
exports.default = Checkbox;