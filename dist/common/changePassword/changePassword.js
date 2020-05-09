"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _input = require("../../base/input/input.js");

var _input2 = _interopRequireDefault(_input);

var _notification = require("../../base/notification/notification.js");

var _notification2 = _interopRequireDefault(_notification);

var _form = require("../../base/form/form.js");

var _request = require("../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChangePassword = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(ChangePassword, _React$Component);

  function ChangePassword() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ChangePassword);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ChangePassword.__proto__ || (0, _getPrototypeOf2.default)(ChangePassword)).call.apply(_ref, [this].concat(args))), _this), _this.checkPassword = function (rule, value, callback) {
      var form = _this.props.form;

      if (value && value !== form.getFieldValue("password")) {
        callback("两次密码不一致!");
      } else {
        callback();
      }
    }, _this.handleSubmit = function () {
      var url = _this.props.url;
      var validateFields = _this.props.form.validateFields;

      validateFields(function (err, values) {
        if (!err) {
          _request2.default.POST(_getConfig2.default.host + "/" + url, {
            body: values
          }).then(function (res) {
            if (res.success) {
              _notification2.default.success({
                message: "修改成功"
              });
            } else {
              _notification2.default.error({
                message: res.msg
              });
            }
          });
        }
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ChangePassword, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var getFieldDecorator = props.form.getFieldDecorator;

      var formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      };
      return _react2.default.createElement(
        _form.Form,
        { title: "\u4FEE\u6539\u5BC6\u7801", handleSubmit: this.handleSubmit },
        _react2.default.createElement(
          _form.FormItem,
          (0, _extends3.default)({}, formItemLayout, {
            label: "\u65E7\u5BC6\u7801"
          }),
          getFieldDecorator("oldPassword", {
            initialValue: "",
            rules: [{ required: true, message: "旧密码必填!" }]
          })(_react2.default.createElement(_input2.default, { type: "password", placeholder: "\u65E7\u5BC6\u7801" }))
        ),
        _react2.default.createElement(
          _form.FormItem,
          (0, _extends3.default)({}, formItemLayout, {
            label: "\u65B0\u5BC6\u7801"
          }),
          getFieldDecorator("password", {
            initialValue: "",
            rules: [{ required: true, message: "新密码必填!" }]
          })(_react2.default.createElement(_input2.default, { type: "password", placeholder: "\u65B0\u5BC6\u7801" }))
        ),
        _react2.default.createElement(
          _form.FormItem,
          (0, _extends3.default)({}, formItemLayout, {
            label: "\u5BC6\u7801\u786E\u8BA4"
          }),
          getFieldDecorator("confirmPassword", {
            initialValue: "",
            rules: [{ required: true, message: "必填!" }, { validator: this.checkPassword }]
          })(_react2.default.createElement(_input2.default, { type: "password", placeholder: "\u786E\u8BA4\u65B0\u5BC6\u7801" }))
        )
      );
    }
  }]);
  return ChangePassword;
}(_react2.default.Component), _class.propTypes = {
  url: _propTypes2.default.string
}, _class.defaultProps = {
  url: "sys/user/updatePassword"
}, _temp2);
exports.default = (0, _form.Create)(ChangePassword);