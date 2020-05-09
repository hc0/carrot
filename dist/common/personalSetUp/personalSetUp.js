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

var _icon = require("../../base/icon/icon.js");

var _icon2 = _interopRequireDefault(_icon);

var _upload = require("../../base/upload/upload.js");

var _upload2 = _interopRequireDefault(_upload);

var _notification = require("../../base/notification/notification.js");

var _notification2 = _interopRequireDefault(_notification);

var _form = require("../../base/form/form.js");

var _request = require("../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _storage = require("../../util/localData/storage.js");

var _storage2 = _interopRequireDefault(_storage);

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function beforeUpload(file) {
  var isJPG = /image/.test(file.type);
  if (!isJPG) {
    _notification2.default.error({
      message: "只能上传图片!"
    });
  }
  var isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    _notification2.default.error({
      message: "大小不超过2MB!"
    });
  }
  return isJPG && isLt2M;
}

var PersonalSetUp = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(PersonalSetUp, _React$Component);

  function PersonalSetUp() {
    var _ref;

    var _temp, _this2, _ret;

    (0, _classCallCheck3.default)(this, PersonalSetUp);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref = PersonalSetUp.__proto__ || (0, _getPrototypeOf2.default)(PersonalSetUp)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
      loading: false
    }, _this2.handleChange = function (info) {
      if (info.file.status === "uploading") {
        _this2.setState({ loading: true });
        return;
      }
      if (info.file.status === "done") {
        _this2.setState({
          avatar: info.file.response.msg,
          loading: false
        });
      }
    }, _this2.handleSubmit = function () {
      var updateUrl = _this2.props.updateUrl;
      var validateFields = _this2.props.form.validateFields;
      var _this2$state = _this2.state,
          id = _this2$state.id,
          avatar = _this2$state.avatar;

      validateFields(function (err, values) {
        if (!err) {
          values.id = id;
          if (avatar && avatar !== "") {
            values.avatar = avatar;
          }
          _request2.default.POST(_getConfig2.default.host + "/" + updateUrl, {
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
    }, _temp), (0, _possibleConstructorReturn3.default)(_this2, _ret);
  }

  (0, _createClass3.default)(PersonalSetUp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;
      _request2.default.GET(_getConfig2.default.host + "/sys/user/info").then(function (res) {
        if (res.success) {
          _this.setState((0, _extends3.default)({}, res.data));
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props,
          state = this.state;
      var loading = state.loading,
          username = state.username,
          email = state.email,
          name = state.name,
          avatar = state.avatar;
      var form = props.form,
          uploadUrl = props.uploadUrl;
      var getFieldDecorator = form.getFieldDecorator;

      var formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      };
      var uploadButton = _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_icon2.default, { type: loading ? "loading" : "plus" }),
        _react2.default.createElement(
          "div",
          { className: "ant-upload-text" },
          "Upload"
        )
      );
      return _react2.default.createElement(
        _form.Form,
        { title: "\u4E2A\u4EBA\u8BBE\u7F6E", handleSubmit: this.handleSubmit },
        _react2.default.createElement(
          _form.FormItem,
          (0, _extends3.default)({}, formItemLayout, {
            label: "\u8D26\u53F7"
          }),
          getFieldDecorator("username", {
            initialValue: username
          })(_react2.default.createElement(_input2.default, { disabled: true }))
        ),
        _react2.default.createElement(
          _form.FormItem,
          (0, _extends3.default)({}, formItemLayout, {
            label: "\u90AE\u7BB1"
          }),
          getFieldDecorator("email", {
            initialValue: email,
            rules: [{ required: true, message: "邮箱必填!" }, { pattern: /^\w+@([0-9a-zA-Z]+[.])+[a-z]{2,4}$/, message: "邮箱不正确!" }]
          })(_react2.default.createElement(_input2.default, null))
        ),
        _react2.default.createElement(
          _form.FormItem,
          (0, _extends3.default)({}, formItemLayout, {
            label: "\u59D3\u540D"
          }),
          getFieldDecorator("name", {
            initialValue: name,
            rules: [{ required: true, message: "必填!" }, { validator: this.checkPassword }]
          })(_react2.default.createElement(_input2.default, null))
        ),
        _react2.default.createElement(
          _form.FormItem,
          (0, _extends3.default)({}, formItemLayout, {
            label: "\u5934\u50CF"
          }),
          getFieldDecorator("avatar", {
            initialValue: avatar,
            rules: [{ required: true, message: "必填!" }]
          })(_react2.default.createElement(
            _upload2.default,
            {
              listType: "picture-card",
              showUploadList: false,
              beforeUpload: beforeUpload,
              action: _getConfig2.default.host + "/" + uploadUrl,
              headers: {
                Authentication: _storage2.default.get("Authentication")
              },
              onChange: this.handleChange,
              name: "avatar"
            },
            avatar ? _react2.default.createElement("img", { src: _getConfig2.default.host + "/" + avatar, alt: "avatar" }) : uploadButton
          ))
        )
      );
    }
  }]);
  return PersonalSetUp;
}(_react2.default.Component), _class.propTypes = {
  updateUrl: _propTypes2.default.string,

  uploadUrl: _propTypes2.default.string
}, _class.defaultProps = {
  updateUrl: "sys/user/update",
  uploadUrl: "sys/user/upload/avatar"
}, _temp2);
exports.default = (0, _form.Create)(PersonalSetUp);