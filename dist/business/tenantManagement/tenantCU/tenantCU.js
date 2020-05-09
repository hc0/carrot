"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _input = require("antd/lib/input");

var _input2 = _interopRequireDefault(_input);

var _notification2 = require("antd/lib/notification");

var _notification3 = _interopRequireDefault(_notification2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

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

var _form = require("antd/lib/form");

var _form2 = _interopRequireDefault(_form);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _button = require("../../../base/button/button");

var _button2 = _interopRequireDefault(_button);

var _request = require("../../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _getConfig = require("../../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormItem = _form2.default.Item;

var TenantModal = function (_Component) {
  (0, _inherits3.default)(TenantModal, _Component);

  function TenantModal(props) {
    (0, _classCallCheck3.default)(this, TenantModal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TenantModal.__proto__ || (0, _getPrototypeOf2.default)(TenantModal)).call(this, props));

    var type = null;
    var isEdit = false;
    if (_this.props.dataSource) {
      type = _this.props.dataSource._type;
      if (type === "edit") {
        isEdit = true;
      }
    } else {
      isEdit = false;
      type = "normal";
    }
    _this.state = {
      type: type,
      isEdit: isEdit
    };

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(TenantModal, [{
    key: "handleSubmit",
    value: function handleSubmit() {
      var _this2 = this;

      this.props.form.validateFieldsAndScroll(function (err, fields) {
        if (!err) {
          var values = JSON.parse((0, _stringify2.default)(fields));
          var url = null;
          if (_this2.state.isEdit) {
            values.id = _this2.props.dataSource.id;
            url = _getConfig2.default.host + "/sys/tenant/update";
          } else {
            url = _getConfig2.default.host + "/sys/tenant/save";
          }
          _request2.default.POST(url, { body: values }).then(function (res) {
            if (res.success) {
              _this2.props.hideModal();
              if (_this2.state.isEdit) {
                _notification3.default.success({
                  message: "修改成功"
                });
              } else {
                _notification3.default.success({
                  message: "创建成功"
                });
              }
              _this2.props.refresh();
            } else {
              _notification3.default.error({
                message: res.msg
              });
            }
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var getFieldDecorator = this.props.form.getFieldDecorator;
      var _state = this.state,
          type = _state.type,
          isEdit = _state.isEdit;

      var formItemLayout = {
        labelCol: {
          span: 3
        },
        wrapperCol: {
          span: 14
        }
      };
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "p",
          null,
          type === "add" ? "新增租户" : "编辑租户"
        ),
        _react2.default.createElement(
          _form2.default,
          null,
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              FormItem,
              (0, _extends3.default)({
                style: { display: "flex", justifyContent: "center" }
              }, formItemLayout, {
                label: "\u7528\u6237\u540D"
              }),
              getFieldDecorator("administrator", {
                rules: [{
                  required: true, type: "string", message: "请填写用户名!"
                }, {
                  max: 20, message: "最大20个字符"
                }, {
                  min: 2, message: "最少2个字符"
                }, {
                  pattern: /^[0-9a-zA-Z_]{1,}$/, message: "只能输入数字、字母、下划线"
                }],
                initialValue: type === "edit" ? this.props.dataSource.administrator : null
              })(_react2.default.createElement(_input2.default, { placeholder: "\u8BF7\u586B\u5199\u7528\u6237\u540D", disabled: isEdit }))
            ),
            _react2.default.createElement(
              FormItem,
              (0, _extends3.default)({
                style: { display: "flex", justifyContent: "center" }
              }, formItemLayout, {
                label: "\u540D\u79F0"
              }),
              getFieldDecorator("name", {
                rules: [{
                  required: true, type: "string", message: "请填写姓名!"
                }, {
                  max: 20, message: "最大20个字符"
                }, {
                  min: 2, message: "最少2个字符"
                }, {
                  pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/, message: "只能输入汉字、数字、字母"
                }],
                initialValue: type === "edit" ? this.props.dataSource.name : null
              })(_react2.default.createElement(_input2.default, { placeholder: "\u8BF7\u586B\u5199\u89D2\u8272\u540D\u79F0" }))
            ),
            _react2.default.createElement(
              FormItem,
              (0, _extends3.default)({
                style: { display: "flex", justifyContent: "center" }
              }, formItemLayout, {
                label: "\u7F16\u7801"
              }),
              getFieldDecorator("code", {
                rules: [{
                  required: true, type: "string", message: "请填写编码!"
                }, {
                  max: 20, message: "最大20个字符"
                }, {
                  min: 2, message: "最少2个字符"
                }, {
                  pattern: /^[0-9a-zA-Z_]{1,}$/, message: "只能输入数字、字母、下划线"
                }],
                initialValue: type === "edit" ? this.props.dataSource.code : null
              })(_react2.default.createElement(_input2.default, { placeholder: "\u8BF7\u586B\u5199\u7F16\u7801" }))
            ),
            _react2.default.createElement(
              FormItem,
              (0, _extends3.default)({
                style: { display: "flex", justifyContent: "center" }
              }, formItemLayout, {
                label: "\u5907\u6CE8"
              }),
              getFieldDecorator("description", {
                rules: [{
                  max: 50, message: "最多50个字符"
                }],
                initialValue: type === "edit" ? this.props.dataSource.description : null
              })(_react2.default.createElement(_input2.default.TextArea, { placeholder: "\u8BF7\u586B\u5199\u5907\u6CE8" }))
            )
          ),
          _react2.default.createElement(
            "div",
            { style: {
                paddingTop: "10px",
                textAlign: "center"
              }
            },
            _react2.default.createElement(_button2.default, {
              title: "\u53D6\u6D88",
              primary: false,
              onClick: this.props.hideModal
            }),
            _react2.default.createElement(_button2.default, {
              title: "\u786E\u5B9A",
              style: {
                marginLeft: "20px"
              },
              onClick: this.handleSubmit
            })
          )
        )
      );
    }
  }]);
  return TenantModal;
}(_react.Component);

exports.default = _form2.default.create()(TenantModal);