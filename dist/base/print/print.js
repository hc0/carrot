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

var _class, _temp2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rcPrint = require("rc-print");

var _rcPrint2 = _interopRequireDefault(_rcPrint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Print = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(Print, _React$Component);

  function Print() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Print);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Print.__proto__ || (0, _getPrototypeOf2.default)(Print)).call.apply(_ref, [this].concat(args))), _this), _this.print = function (printArea) {
      if (!printArea) {
        printArea = {};
      }
      _this.props.print(printArea.onPrint, printArea);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Print, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          beforePrint = _props.beforePrint,
          afterPrint = _props.afterPrint,
          children = _props.children;

      return _react2.default.createElement(
        _rcPrint2.default,
        {
          ref: this.print,
          onStart: beforePrint,
          onEnd: afterPrint
        },
        children
      );
    }
  }]);
  return Print;
}(_react2.default.Component), _class.propTypes = {
  print: _propTypes2.default.func,

  beforePrint: _propTypes2.default.func,

  afterPrint: _propTypes2.default.func
}, _class.defaultProps = {}, _temp2);
exports.default = Print;