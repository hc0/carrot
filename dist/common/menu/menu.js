"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dropdown = require("antd/lib/dropdown");

var _dropdown2 = _interopRequireDefault(_dropdown);

var _icon = require("antd/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

var _menu = require("antd/lib/menu");

var _menu2 = _interopRequireDefault(_menu);

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

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _polished = require("polished");

require("antd/lib/dropdown/style");

var _sider = require("./sider/sider");

var _sider2 = _interopRequireDefault(_sider);

var _index = require("../../index");

var _avatar = require("../../base/avatar/avatar");

var _avatar2 = _interopRequireDefault(_avatar);

var _storage = require("../../util/localData/storage.js");

var _storage2 = _interopRequireDefault(_storage);

var _request = require("../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var photo = "http://192.168.0.16/assets/avatar.png";

var layoutBodyStyles = (0, _extends3.default)({
  position: "relative",
  width: "100%",
  overflow: "auto"
}, (0, _polished.backgrounds)("" + _getConfig2.default["@layout-body-background"]));
var modules = {};
var refrence = function refrence(routes) {
  var mus = [];
  var ret = {};
  var deepLoop = function deepLoop(rts) {
    rts.forEach(function (route) {
      route.compMatch = route.component;
      if (route.component) {
        if (typeof route.component === "function") {} else {
          modules[route.component] = require("pages/" + route.component).default;
        }
      }
      if (route.children) {
        deepLoop(route.children);
      }
      if (route.component) {
        mus.push(route);
      }
      if (route.path === "/") {
        ret.currentKey = route.id;
      }
    });
  };
  deepLoop(routes);
  ret.mus = mus;
  return ret;
};

var Ta = function Ta(props) {
  var route = props.route,
      multilevel = props.multilevel,
      other = (0, _objectWithoutProperties3.default)(props, ["route", "multilevel"]);

  var View = modules[route.component];
  return _react2.default.createElement(
    "div",
    { style: layoutBodyStyles },
    _react2.default.createElement(View, other),
    multilevel && route.children && route.children.map(function (rt, i) {
      return _react2.default.createElement(RouteWithSubRoutes, (0, _extends3.default)({ key: i }, rt));
    })
  );
};
var RouteWithSubRoutes = function RouteWithSubRoutes(props) {
  var route = props.route,
      multilevel = props.multilevel;

  return _react2.default.createElement(_reactRouterDom.Route, {
    path: route.path,
    exact: true,
    render: function render(ps) {
      return _react2.default.createElement(Ta, (0, _extends3.default)({}, ps, { route: route, multilevel: multilevel }));
    }
  });
};
var contentStyles = {
  display: "flex"
};
var avatarStyles = {
  width: "100%",
  height: "180px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  borderBottom: "1px solid #dfdfdf",
  borderRight: "1px solid #dfdfdf"
};

var logout = function logout() {
  _request2.default.POST(_getConfig2.default.host + "/logout").then(function (res) {
    if (res.success) {
      _storage2.default.clear();
      window.location.reload();
    }
  });
};
var Menu = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Menu, _React$Component);

  function Menu(props) {
    (0, _classCallCheck3.default)(this, Menu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Menu.__proto__ || (0, _getPrototypeOf2.default)(Menu)).call(this, props));

    var transMenu = refrence(props.menus);
    _this.state = {
      menus: props.multilevel ? props.menus : transMenu.mus,
      currentKey: transMenu.currentKey
    };
    return _this;
  }

  (0, _createClass3.default)(Menu, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var multilevel = props.multilevel,
          portrait = props.portrait,
          dropdown = props.dropdown,
          hasLogout = props.hasLogout;
      var selectedKey = props.selectedKey,
          sliderProps = (0, _objectWithoutProperties3.default)(props, ["selectedKey"]);
      var _state = this.state,
          menus = _state.menus,
          currentKey = _state.currentKey;

      var avatarMenu = _react2.default.createElement(
        _menu2.default,
        null,
        dropdown.options && dropdown.options.map(function (item) {
          return _react2.default.createElement(
            _menu2.default.Item,
            { key: item.key },
            item.render()
          );
        }),
        hasLogout && _react2.default.createElement(
          _menu2.default.Item,
          null,
          _react2.default.createElement(
            "span",
            {
              onClick: logout,
              onKeyPress: logout,
              role: "button",
              tabIndex: "0"
            },
            "\u9000\u51FA\u767B\u5F55"
          )
        )
      );
      return _react2.default.createElement(
        _reactRouterDom.Router,
        { history: _index.History },
        _react2.default.createElement(
          "div",
          { style: contentStyles },
          _react2.default.createElement(
            "div",
            { className: "carrot-menu" },
            _react2.default.createElement(
              "div",
              { style: avatarStyles },
              _react2.default.createElement(_avatar2.default, {
                style: {
                  width: "100px",
                  height: "100px",
                  background: "transparent",
                  borderRadius: "50px",
                  marginBottom: "10px"
                },
                shape: "square",
                src: portrait || photo
              }),
              _react2.default.createElement(
                _dropdown2.default,
                { overlay: avatarMenu },
                _react2.default.createElement(
                  "span",
                  {
                    className: "ant-dropdown-link",
                    style: {
                      cursor: "pointer"
                    }
                  },
                  dropdown.title,
                  " ",
                  _react2.default.createElement(_icon2.default, { type: "down" })
                )
              )
            ),
            _react2.default.createElement(_sider2.default, (0, _extends3.default)({}, sliderProps, { selectedKey: selectedKey || currentKey }))
          ),
          menus.map(function (route, i) {
            return _react2.default.createElement(RouteWithSubRoutes, { key: i, multilevel: multilevel, route: route });
          })
        )
      );
    }
  }]);
  return Menu;
}(_react2.default.Component), _class.propTypes = {
  menus: _propTypes2.default.array,

  onChange: _propTypes2.default.func,

  defaultOpenKeys: _propTypes2.default.array,

  selectedKey: _propTypes2.default.string,

  multilevel: _propTypes2.default.bool,

  portrait: _propTypes2.default.string,

  dropdown: _propTypes2.default.object,

  hasLogout: _propTypes2.default.bool
}, _class.defaultProps = {
  menus: [],
  multilevel: false,
  hasLogout: true,
  dropdown: {
    title: "用户",
    options: [{
      key: "setUpMg",
      render: function render() {
        return _react2.default.createElement(
          _reactRouterDom.Link,
          { href: true, to: "/PersonalSetUpMg" },
          "\u4E2A\u4EBA\u8BBE\u7F6E"
        );
      }
    }, {
      key: "pwdMg",
      render: function render() {
        return _react2.default.createElement(
          _reactRouterDom.Link,
          { href: true, to: "/ChangePasswordMg" },
          "\u4FEE\u6539\u5BC6\u7801"
        );
      }
    }]
  }
}, _temp);
exports.default = Menu;