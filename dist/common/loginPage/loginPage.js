"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _avatar = require("../../base/avatar/avatar.js");

var _avatar2 = _interopRequireDefault(_avatar);

var _input = require("../../base/input/input.js");

var _input2 = _interopRequireDefault(_input);

var _button = require("../../base/button/button.js");

var _button2 = _interopRequireDefault(_button);

var _icon = require("../../base/icon/icon.js");

var _icon2 = _interopRequireDefault(_icon);

var _checkbox = require("../../base/checkbox/checkbox.js");

var _checkbox2 = _interopRequireDefault(_checkbox);

var _storage = require("../../util/localData/storage.js");

var _storage2 = _interopRequireDefault(_storage);

var _request = require("../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logoPNG = _getConfig2.default.logo;

var iconStyles = {
  color: "rgba(0,0,0,.25)"
};

var headerStyles = (0, _extends3.default)({
  display: "flex",
  alignItems: "center"
}, (0, _polished.backgrounds)("" + _getConfig2.default["@primary-color"]), (0, _polished.padding)("" + _getConfig2.default["@login-header-padding"]));

var contentStyle = (0, _extends3.default)({
  maxWidth: "320px"
}, (0, _polished.margin)("80px", "auto"));

var LoginPage = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(LoginPage, _React$Component);

  function LoginPage(props) {
    (0, _classCallCheck3.default)(this, LoginPage);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (LoginPage.__proto__ || (0, _getPrototypeOf2.default)(LoginPage)).call(this, props));

    _this2.state = {
      username: _storage2.default.get("username"),
      remembered: _storage2.default.get("remembered"),
      vid: null,
      buttonReady: false,
      password: "",
      vcode: ""
    };

    _this2.loginHandle = _this2.loginHandle.bind(_this2);
    return _this2;
  }

  (0, _createClass3.default)(LoginPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getCode(this);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.checkInputValue();
    }
  }, {
    key: "getCode",
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_this) {
        var vid;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _request2.default.GET(_getConfig2.default.host + "/" + _this.props.codeVidURL);

              case 2:
                vid = _context.sent;

                if (vid.success && vid.data !== "") {
                  _this.setState({
                    vid: vid.data,
                    useCode: true
                  });
                } else {
                  _this.setState({
                    useCode: false
                  });
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getCode(_x) {
        return _ref.apply(this, arguments);
      }

      return getCode;
    }()
  }, {
    key: "checkInputValue",
    value: function checkInputValue() {
      var _state = this.state,
          username = _state.username,
          password = _state.password,
          buttonReady = _state.buttonReady,
          useCode = _state.useCode;
      var vcode = this.state.vcode;

      if (!useCode) {
        vcode = "code";
      }
      if (username !== "" && password !== "" && vcode !== "" && buttonReady === false) {
        this.setState({
          buttonReady: true
        });
      } else if ((username === "" || password === "" || vcode === "") && buttonReady === true) {
        this.setState({
          buttonReady: false
        });
      }
    }
  }, {
    key: "inputChange",
    value: function inputChange(_ref2) {
      var inputValue = _ref2.inputValue,
          stateName = _ref2.stateName;

      var _this = this;
      var changeState = function changeState() {
        _this.setState((0, _defineProperty3.default)({}, stateName, inputValue));
      };
      var handle = {
        username: function username() {
          var remembered = _storage2.default.get("remembered");
          if (remembered) {
            _storage2.default.set("username", inputValue);
          }
          changeState();
        },
        password: function password() {
          changeState();
        },
        vcode: function vcode() {
          changeState();
        }
      };
      handle[stateName]();
    }
  }, {
    key: "loginHandle",
    value: function loginHandle() {
      var _this = this;
      var _state2 = this.state,
          username = _state2.username,
          password = _state2.password,
          vcode = _state2.vcode,
          vid = _state2.vid;

      var data = {
        username: username,
        password: password,
        vcode: vcode,
        vid: vid
      };
      _request2.default.POST(_getConfig2.default.host + "/" + this.props.loginURL, {
        body: data
      }, true).then(function (res) {
        var token = res.data;
        _storage2.default.set("Authentication", token);
        var callback = _this.props.afterLogin;
        if (res.success && callback && typeof callback === "function") {
          callback();
          window.location.reload();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this = this;
      return _react2.default.createElement(
        "article",
        null,
        _react2.default.createElement(
          "header",
          { style: headerStyles },
          _react2.default.createElement(_avatar2.default, {
            style: {
              width: "54px",
              height: "30px",
              background: "transparent",
              borderRadius: "0"
            },
            shape: "square",
            src: this.props.logo
          }),
          _react2.default.createElement(
            "h1",
            { style: {
                margin: "0 0 0 10px",
                fontSize: "28px",
                color: "#fff"
              }
            },
            this.props.title
          )
        ),
        _react2.default.createElement(
          "div",
          { style: contentStyle },
          _react2.default.createElement(_input2.default, {
            key: "1",
            defaultValue: this.state.username,
            style: { marginBottom: "" + _getConfig2.default["@padding-sm"] },
            placeholder: "\u7528\u6237\u540D/\u90AE\u7BB1/\u624B\u673A\u53F7\u7801",
            prefix: _react2.default.createElement(_icon2.default, { type: "user", style: iconStyles }),
            onChange: function onChange(e) {
              _this3.inputChange({
                inputValue: e.target.value,
                stateName: "username"
              });
            }
          }),
          _react2.default.createElement(_input2.default, {
            key: "2",
            id: "carrot-password",
            style: { marginBottom: "" + _getConfig2.default["@padding-sm"] },
            placeholder: "\u5BC6\u7801",
            prefix: _react2.default.createElement(_icon2.default, { type: "lock", style: iconStyles }),
            type: "password",
            onChange: function onChange(e) {
              _this3.inputChange({
                inputValue: e.target.value,
                stateName: "password"
              });
            }
          }),
          this.state.vid && _react2.default.createElement(_input2.default, {
            key: "3",
            style: { marginBottom: "" + _getConfig2.default["@padding-sm"] },
            placeholder: "\u8F93\u5165\u9A8C\u8BC1\u7801",
            addonAfter: _react2.default.createElement(
              "div",
              {
                style: { outline: "none", cursor: "pointer" },
                onClick: function onClick() {
                  return _this3.getCode(_this3);
                },
                onKeyPress: function onKeyPress() {
                  return _this3.getCode(_this3);
                },
                role: "button",
                tabIndex: "0"
              },
              _react2.default.createElement("img", {
                src: _getConfig2.default.host + "/" + this.props.codeURL + "/" + this.state.vid,
                style: { height: "22px" },
                alt: "code"
              })
            ),
            onChange: function onChange(e) {
              _this3.inputChange({
                inputValue: e.target.value,
                stateName: "vcode"
              });
            }
          }),
          _react2.default.createElement(
            _checkbox2.default,
            {
              style: { marginBottom: "" + _getConfig2.default["@padding-sm"] },
              defaultChecked: this.state.remembered,
              onChange: function onChange(e) {
                if (e.target.checked) {
                  _storage2.default.set("username", _this.state.username);
                  _storage2.default.set("remembered", true);
                } else {
                  _storage2.default.remove("username");
                  _storage2.default.set("remembered", false);
                }
              }
            },
            "\u8BB0\u4F4F\u6211"
          ),
          _react2.default.createElement(_button2.default, {
            disabled: !this.state.buttonReady,
            style: { width: "100%" },
            title: "\u767B\u5F55",
            onClick: this.loginHandle
          })
        )
      );
    }
  }]);
  return LoginPage;
}(_react2.default.Component), _class.propTypes = {
  title: _propTypes2.default.string,

  logo: _propTypes2.default.string,

  codeVidURL: _propTypes2.default.string,

  codeURL: _propTypes2.default.string,

  loginURL: _propTypes2.default.string,

  afterLogin: _propTypes2.default.func
}, _class.defaultProps = {
  title: _getConfig2.default["app-title"] || "磁云ADI平台 - 登录",
  logo: logoPNG,
  codeVidURL: "vid",
  codeURL: "vcode",
  loginURL: "login",
  afterLogin: function afterLogin() {}
}, _temp);
exports.default = LoginPage;