"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _menu = require("antd/lib/menu");

var _menu2 = _interopRequireDefault(_menu);

var _icon = require("antd/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

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

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("antd/lib/menu/style");

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sider = function (_Component) {
  (0, _inherits3.default)(Sider, _Component);

  function Sider(props) {
    (0, _classCallCheck3.default)(this, Sider);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Sider.__proto__ || (0, _getPrototypeOf2.default)(Sider)).call(this, props));

    _this.onOpenChange = function (e) {
      _this.setState({
        openKeys: [e.pop()]
      });
    };

    _this.handleClick = function (e) {
      _this.setState({
        current: e.key
      });
    };

    _this.state = {
      current: props.selectedKey
    };
    return _this;
  }

  (0, _createClass3.default)(Sider, [{
    key: "render",
    value: function render() {
      var renderMenu = function renderMenu(data) {
        return data.map(function (item) {
          if (item.children) {
            return item.name && _react2.default.createElement(
              _menu2.default.SubMenu,
              { key: item.id, title: _react2.default.createElement(
                  "span",
                  null,
                  _react2.default.createElement(_icon2.default, { type: item.icon || "appstore" }),
                  _react2.default.createElement(
                    "span",
                    null,
                    item.name
                  )
                ) },
              renderMenu(item.children)
            );
          }
          return item.name && _react2.default.createElement(
            _menu2.default.Item,
            { key: item.id },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { href: true, to: item.path },
              item.icon && _react2.default.createElement(_icon2.default, { type: item.icon || "appstore" }),
              item.name
            )
          );
        });
      };
      var _props = this.props,
          menus = _props.menus,
          style = _props.style;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _menu2.default,
          {
            style: style,
            theme: "light",
            onClick: this.handleClick,
            defaultOpenKeys: this.props.defaultOpenKeys,
            onOpenChange: this.onOpenChange,
            openKeys: this.state.openKeys,
            selectedKeys: [this.state.current],
            mode: "inline"
          },
          menus && renderMenu(menus)
        )
      );
    }
  }]);
  return Sider;
}(_react.Component);

exports.default = Sider;