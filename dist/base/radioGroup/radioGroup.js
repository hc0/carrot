"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _radio = require("antd/lib/radio");

var _radio2 = _interopRequireDefault(_radio);

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

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("antd/lib/radio/style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioGroup = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(RadioGroup, _React$Component);

  function RadioGroup() {
    (0, _classCallCheck3.default)(this, RadioGroup);
    return (0, _possibleConstructorReturn3.default)(this, (RadioGroup.__proto__ || (0, _getPrototypeOf2.default)(RadioGroup)).apply(this, arguments));
  }

  (0, _createClass3.default)(RadioGroup, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var children = props.children,
          options = props.options,
          others = (0, _objectWithoutProperties3.default)(props, ["children", "options"]);

      var renderRadioNodes = function renderRadioNodes(data) {
        return data.map(function (item) {
          return _react2.default.createElement(
            _radio2.default,
            { value: item.value, key: item.value },
            item.text
          );
        });
      };
      return _react2.default.createElement(
        _radio2.default.Group,
        others,
        children || renderRadioNodes(options)
      );
    }
  }]);
  return RadioGroup;
}(_react2.default.Component), _class.propTypes = {
  name: _propTypes2.default.string,

  options: _propTypes2.default.array,

  defaultValue: _propTypes2.default.any,

  onChange: _propTypes2.default.func,

  value: _propTypes2.default.any

}, _temp);
exports.default = RadioGroup;