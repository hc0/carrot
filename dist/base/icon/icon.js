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

var _icon = require("antd/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

require("antd/lib/icon/style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Icon, _React$Component);

  function Icon() {
    (0, _classCallCheck3.default)(this, Icon);
    return (0, _possibleConstructorReturn3.default)(this, (Icon.__proto__ || (0, _getPrototypeOf2.default)(Icon)).apply(this, arguments));
  }

  (0, _createClass3.default)(Icon, [{
    key: "render",
    value: function render() {
      var props = this.props;

      return _react2.default.createElement(_icon2.default, props);
    }
  }]);
  return Icon;
}(_react2.default.Component), _class.propTypes = {
  spin: _propTypes2.default.bool,

  style: _propTypes2.default.object,

  type: _propTypes2.default.string

}, _class.defaultProps = {
  spin: false,
  style: {},
  type: ""
}, _temp);
exports.default = Icon;