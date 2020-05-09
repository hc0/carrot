"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _inputNumber = require("antd/lib/input-number");

var _inputNumber2 = _interopRequireDefault(_inputNumber);

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

require("antd/lib/input-number/style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputNumber = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(InputNumber, _React$Component);

  function InputNumber() {
    (0, _classCallCheck3.default)(this, InputNumber);
    return (0, _possibleConstructorReturn3.default)(this, (InputNumber.__proto__ || (0, _getPrototypeOf2.default)(InputNumber)).apply(this, arguments));
  }

  (0, _createClass3.default)(InputNumber, [{
    key: "render",
    value: function render() {
      var props = this.props;

      return _react2.default.createElement(_inputNumber2.default, props);
    }
  }]);
  return InputNumber;
}(_react2.default.Component), _class.propTypes = {
  step: _propTypes2.default.number,

  min: _propTypes2.default.number,

  max: _propTypes2.default.number,

  defaultValue: _propTypes2.default.number,

  value: _propTypes2.default.number,

  onChange: _propTypes2.default.func
}, _class.defaultProps = {
  min: Infinity,
  max: Infinity,
  step: 1
}, _temp);
exports.default = InputNumber;