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

var _jsbarcode = require("jsbarcode");

var _jsbarcode2 = _interopRequireDefault(_jsbarcode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Barcode = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Barcode, _React$Component);

  function Barcode() {
    (0, _classCallCheck3.default)(this, Barcode);
    return (0, _possibleConstructorReturn3.default)(this, (Barcode.__proto__ || (0, _getPrototypeOf2.default)(Barcode)).apply(this, arguments));
  }

  (0, _createClass3.default)(Barcode, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _jsbarcode2.default)(".barcode").init();
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          type = _props.type,
          value = _props.value,
          background = _props.background,
          lineColor = _props.lineColor;

      return _react2.default.createElement("svg", {
        className: "barcode",
        "jsbarcode-format": type,
        "jsbarcode-value": value,
        "jsbarcode-textmargin": "0",
        "jsbarcode-background": background,
        "jsbarcode-linecolor": lineColor
      });
    }
  }]);
  return Barcode;
}(_react2.default.Component), _class.propTypes = {
  type: _propTypes2.default.oneOf(["CODE128", "CODE39", "EAN-13", "EAN-8", "EAN-5", "EAN-2", "UPC", "ITF-14", "ITF", "MSI", "Pharmacode", "Codabar"]),

  value: _propTypes2.default.string,

  background: _propTypes2.default.string,

  lineColor: _propTypes2.default.string
}, _class.defaultProps = {
  type: "CODE128",
  value: "123456789012",
  background: "#fff",
  lineColor: "#000"
}, _temp);
exports.default = Barcode;