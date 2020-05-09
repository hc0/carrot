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

var _breadcrumb = require("antd/lib/breadcrumb");

var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

require("antd/lib/breadcrumb/style");

var _polished = require("polished");

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = (0, _extends3.default)({}, (0, _polished.backgrounds)("" + _getConfig2.default["@primary-color"]));

var Breadcrumb = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Breadcrumb, _React$Component);

  function Breadcrumb() {
    (0, _classCallCheck3.default)(this, Breadcrumb);
    return (0, _possibleConstructorReturn3.default)(this, (Breadcrumb.__proto__ || (0, _getPrototypeOf2.default)(Breadcrumb)).apply(this, arguments));
  }

  (0, _createClass3.default)(Breadcrumb, [{
    key: "render",
    value: function render() {
      var props = this.props;

      return _react2.default.createElement(
        _breadcrumb2.default,
        { style: styles, separator: props.separator },
        props.items.map(function (v, k) {
          return _react2.default.createElement(
            _breadcrumb2.default.Item,
            {
              key: "AntdBreadcrumb-" + k,
              onClick: v.onClick
            },
            v.name
          );
        })
      );
    }
  }]);
  return Breadcrumb;
}(_react2.default.Component), _class.propTypes = {
  separator: _propTypes2.default.string,

  items: _propTypes2.default.array
}, _class.defaultProps = {
  separator: "/",
  items: [{}]
}, _temp);
exports.default = Breadcrumb;