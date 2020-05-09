"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _select = require("antd/lib/select");

var _select2 = _interopRequireDefault(_select);

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("antd/lib/select/style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ATOption = _select2.default.Option;
var Select = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Select, _React$Component);

  function Select() {
    (0, _classCallCheck3.default)(this, Select);
    return (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).apply(this, arguments));
  }

  (0, _createClass3.default)(Select, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          children = _props.children,
          options = _props.options,
          multiple = _props.multiple,
          others = (0, _objectWithoutProperties3.default)(_props, ["children", "options", "multiple"]);

      var opts = options.map(function (d) {
        return _react2.default.createElement(
          ATOption,
          {
            key: d.value.toString(),
            disabled: d.disabled
          },
          d.text
        );
      });
      return _react2.default.createElement(
        _select2.default,
        (0, _extends3.default)({ mode: multiple && "multiple" }, others),
        children || opts
      );
    }
  }]);
  return Select;
}(_react2.default.Component), _class.propTypes = {
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),

  options: _propTypes2.default.array,

  multiple: _propTypes2.default.bool,

  onChange: _propTypes2.default.func
}, _class.Option = ATOption, _class.defaultProps = {
  options: []
}, _temp);
exports.default = Select;