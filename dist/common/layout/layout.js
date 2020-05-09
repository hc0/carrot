"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _polished = require("polished");

var _menu = require("../menu/menu");

var _menu2 = _interopRequireDefault(_menu);

var _avatar = require("../../base/avatar/avatar");

var _avatar2 = _interopRequireDefault(_avatar);

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logoPNG = _getConfig2.default.logo;

var headerStyles = (0, _extends3.default)({
  display: "flex",
  alignItems: "center",
  height: "" + _getConfig2.default["@layout-header-height"]
}, (0, _polished.backgrounds)("" + _getConfig2.default["@primary-color"]));
var Layout = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Layout, _Component);

  function Layout() {
    (0, _classCallCheck3.default)(this, Layout);
    return (0, _possibleConstructorReturn3.default)(this, (Layout.__proto__ || (0, _getPrototypeOf2.default)(Layout)).apply(this, arguments));
  }

  (0, _createClass3.default)(Layout, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var title = props.title;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "header",
          { style: headerStyles },
          _react2.default.createElement(_avatar2.default, {
            style: {
              width: "36px",
              height: "20px",
              background: "transparent",
              borderRadius: "0",
              marginLeft: "20px"
            },
            shape: "square",
            src: logoPNG
          }),
          _react2.default.createElement(
            "h2",
            { style: {
                margin: "0 0 0 10px",
                color: "#fff"
              }
            },
            title
          )
        ),
        _react2.default.createElement(_menu2.default, (0, _extends3.default)({ style: { width: 200 } }, props))
      );
    }
  }]);
  return Layout;
}(_react.Component), _class.propTypes = {
  menus: _propTypes2.default.array,

  onChange: _propTypes2.default.func,

  defaultOpenKeys: _propTypes2.default.array,

  selectedKey: _propTypes2.default.string,

  multilevel: _propTypes2.default.bool,

  title: _propTypes2.default.string,

  portrait: _propTypes2.default.string,

  dropdown: _propTypes2.default.object
}, _class.defaultProps = {
  menus: [],
  multilevel: false,
  title: _getConfig2.default["app-title"] || "磁云基础平台"
}, _temp);
exports.default = Layout;