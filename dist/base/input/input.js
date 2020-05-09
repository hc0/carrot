"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _input = require("antd/lib/input");

var _input2 = _interopRequireDefault(_input);

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

require("antd/lib/input/style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Input, _React$Component);

  function Input(props) {
    (0, _classCallCheck3.default)(this, Input);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Input.__proto__ || (0, _getPrototypeOf2.default)(Input)).call(this, props));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Input, [{
    key: "render",
    value: function render() {
      var props = this.props;

      return _react2.default.createElement(_input2.default, props);
    }
  }]);
  return Input;
}(_react2.default.Component), _class.propTypes = {
  defaultValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.symbol]),
  placeholder: _propTypes2.default.string,

  value: _propTypes2.default.string,

  onChange: _propTypes2.default.func
}, _class.TextArea = _input2.default.TextArea, _temp);
exports.default = Input;