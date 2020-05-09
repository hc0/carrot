"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _switch = require("antd/lib/switch");

var _switch2 = _interopRequireDefault(_switch);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _steps = require("antd/lib/steps");

var _steps2 = _interopRequireDefault(_steps);

var _class, _temp2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("antd/lib/steps/style");

var _input = require("../../base/input/input.js");

var _input2 = _interopRequireDefault(_input);

var _select = require("../../base/select/select.js");

var _select2 = _interopRequireDefault(_select);

var _button = require("../../base/button/button.js");

var _button2 = _interopRequireDefault(_button);

var _notification = require("../../base/notification/notification.js");

var _notification2 = _interopRequireDefault(_notification);

var _form = require("../../base/form/form.js");

var _request = require("../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Step = _steps2.default.Step;
var Option = _select2.default.Option;


var stepsContent = {
  marginTop: _getConfig2.default["@padding-sm"],
  border: "1px dashed #e9e9e9",
  borderTadius: "6px",
  backgroundColor: "#fafafa",
  minHeight: "200px",
  textAlign: "center",
  padding: "50px"
};

var stepsAction = {
  marginTop: "24px"
};

var CodeBuilder = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(CodeBuilder, _React$Component);

  function CodeBuilder() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CodeBuilder);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CodeBuilder.__proto__ || (0, _getPrototypeOf2.default)(CodeBuilder)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      current: 0
    }, _this.checkPassword = function (rule, value, callback) {
      var form = _this.props.form;

      if (value && value !== form.getFieldValue("password")) {
        callback("两次密码不一致!");
      } else {
        callback();
      }
    }, _this.inputChange = function (_ref2) {
      var name = _ref2.name,
          value = _ref2.value;

      _this.setState((0, _defineProperty3.default)({}, name, value));
    }, _this.handleSubmit = function () {
      var generateUrl = _this.props.generateUrl;
      var getFieldsValue = _this.props.form.getFieldsValue;

      var fieldsValue = getFieldsValue();
      var _this$state = _this.state,
          _this$state$entityNam = _this$state.entityName,
          entityName = _this$state$entityNam === undefined ? fieldsValue.entityName || "" : _this$state$entityNam,
          _this$state$projectPa = _this$state.projectPackage,
          projectPackage = _this$state$projectPa === undefined ? fieldsValue.projectPackage || "" : _this$state$projectPa,
          _this$state$model = _this$state.model,
          model = _this$state$model === undefined ? fieldsValue.model || "" : _this$state$model,
          _this$state$tableName = _this$state.tableName,
          tableName = _this$state$tableName === undefined ? fieldsValue.tableName || "" : _this$state$tableName,
          _this$state$tablePref = _this$state.tablePrefix,
          tablePrefix = _this$state$tablePref === undefined ? fieldsValue.tablePrefix || "" : _this$state$tablePref,
          _this$state$projectLo = _this$state.projectLocation,
          projectLocation = _this$state$projectLo === undefined ? fieldsValue.projectLocation || "" : _this$state$projectLo,
          _this$state$developer = _this$state.developer,
          developer = _this$state$developer === undefined ? fieldsValue.developer || "" : _this$state$developer,
          _this$state$onlyGener = _this$state.onlyGenerateEntity,
          onlyGenerateEntity = _this$state$onlyGener === undefined ? fieldsValue.onlyGenerateEntity || false : _this$state$onlyGener;

      var values = {
        projectLocation: projectLocation,
        developer: developer,
        tablePrefix: tablePrefix,
        projectPackage: projectPackage,
        model: model,
        entityName: entityName,
        tableName: tableName,
        onlyGenerateEntity: onlyGenerateEntity
      };
      if ((0, _keys2.default)(values).every(function (key) {
        return values[key] !== "";
      })) {
        _request2.default.POST(_getConfig2.default.host + "/" + generateUrl, {
          body: values
        }).then(function (res) {
          if (res.success) {
            _notification2.default.success({
              message: "生成成功"
            });
          } else {
            _notification2.default.error({
              message: res.msg
            });
          }
        });
      } else {
        _notification2.default.warn({
          message: "有选项没有填哦"
        });
      }
    }, _this.next = function () {
      var current = _this.state.current + 1;
      _this.setState({ current: current });
    }, _this.prev = function () {
      var current = _this.state.current - 1;
      _this.setState({ current: current });
    }, _this.selectChange = function (value) {
      var obj = _this.state.tables.find(function (v) {
        return v.tableName === value;
      }) || {};
      _this.setState({
        entityName: obj.tableComment,
        tableName: value
      });
    }, _this.selectOption = function () {
      return _this.state.tables && _this.state.tables.map(function (d) {
        return _react2.default.createElement(
          Option,
          { key: d.tableName },
          d.tableName,
          " - ",
          d.tableComment
        );
      });
    }, _this.renderForm = function (step) {
      var _this2 = _this,
          props = _this2.props,
          state = _this2.state;
      var _props$form = props.form,
          getFieldDecorator = _props$form.getFieldDecorator,
          getFieldsValue = _props$form.getFieldsValue;

      var fieldsValue = getFieldsValue();
      var _state$params = state.params,
          params = _state$params === undefined ? {} : _state$params,
          _state$entityName = state.entityName,
          entityName = _state$entityName === undefined ? fieldsValue.entityName || "" : _state$entityName,
          _state$projectPackage = state.projectPackage,
          projectPackage = _state$projectPackage === undefined ? fieldsValue.projectPackage || "" : _state$projectPackage,
          _state$model = state.model,
          model = _state$model === undefined ? fieldsValue.model || "" : _state$model,
          _state$tableName = state.tableName,
          tableName = _state$tableName === undefined ? fieldsValue.tableName || "" : _state$tableName,
          _state$tablePrefix = state.tablePrefix,
          tablePrefix = _state$tablePrefix === undefined ? fieldsValue.tablePrefix || "" : _state$tablePrefix;

      var formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      };
      var projectPackageModel = projectPackage + "." + model;
      var newTableName = tableName.replace(tablePrefix, "").split("_").map(function (v) {
        return v.replace(v.charAt(0), v.charAt(0).toUpperCase());
      }).join("");
      var entityClassName = projectPackage + "." + model + ".entity." + newTableName;
      return _react2.default.createElement(
        _form.Form,
        { title: "\u4EE3\u7801\u751F\u6210\u5668", actionGroup: function actionGroup() {
            return _react2.default.createElement("div", null);
          } },
        step === 1 && _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            null,
            "\u751F\u6210\u4EE3\u7801\u7684\u9879\u76EE\u8DEF\u5F84\uFF0C\u914D\u7F6E\u5230\u9879\u76EE\u6839\u76EE\u5F55\u5373\u53EF"
          ),
          _react2.default.createElement(
            _form.FormItem,
            (0, _extends3.default)({}, formItemLayout, {
              label: "\u9879\u76EE\u8DEF\u5F84"
            }),
            getFieldDecorator("projectLocation", {
              initialValue: params.projectLocation,
              rules: [{ required: true, message: "项目路径必填!" }]
            })(_react2.default.createElement(_input2.default, { onChange: function onChange(e) {
                return _this.inputChange({ name: "projectLocation", value: e.target.value });
              } }))
          ),
          _react2.default.createElement(
            "div",
            null,
            "\u5F00\u53D1\u4EBA\u5458\u540D\u79F0"
          ),
          _react2.default.createElement(
            _form.FormItem,
            (0, _extends3.default)({}, formItemLayout, {
              label: "\u5F00\u53D1\u8005"
            }),
            getFieldDecorator("developer", {
              initialValue: params.developer,
              rules: [{ required: true, message: "开发者必填!" }]
            })(_react2.default.createElement(_input2.default, { onChange: function onChange(e) {
                return _this.inputChange({ name: "developer", value: e.target.value });
              } }))
          ),
          _react2.default.createElement(
            "div",
            null,
            "\u5FFD\u7565\u7684\u8868\u524D\u7F00\uFF0C\u751F\u6210\u540E\u7684\u5B9E\u4F53\u7C7B\u540D\u4F1A\u5FFD\u7565\u524D\u7F00"
          ),
          _react2.default.createElement(
            _form.FormItem,
            (0, _extends3.default)({}, formItemLayout, {
              label: "\u6570\u636E\u8868\u524D\u7F00"
            }),
            getFieldDecorator("tablePrefix", {
              initialValue: params.tablePrefix,
              rules: [{ required: true, message: "数据表前缀必填!" }]
            })(_react2.default.createElement(_input2.default, { onChange: function onChange(e) {
                return _this.inputChange({ name: "tablePrefix", value: e.target.value });
              } }))
          )
        ),
        step === 2 && _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            null,
            "\u6A21\u5757Java\u5305\u8DEF\u5F84\uFF0C\u4F8B\u5982\uFF1Acom.iciyun.adi.base"
          ),
          _react2.default.createElement(
            _form.FormItem,
            (0, _extends3.default)({}, formItemLayout, {
              label: "\u6A21\u5757\u5305\u8DEF\u5F84"
            }),
            getFieldDecorator("projectPackage", {
              initialValue: "",
              rules: [{ required: true, message: "新密码必填!" }]
            })(_react2.default.createElement(_input2.default, { onChange: function onChange(e) {
                return _this.inputChange({ name: "projectPackage", value: e.target.value });
              } }))
          ),
          _react2.default.createElement(
            "div",
            null,
            "\u4EE3\u7801\u6240\u5C5E\u5B50\u6A21\u5757"
          ),
          _react2.default.createElement(
            _form.FormItem,
            (0, _extends3.default)({}, formItemLayout, {
              label: "\u6240\u5C5E\u5B50\u6A21\u5757"
            }),
            getFieldDecorator("model", {
              initialValue: "platform",
              rules: [{ required: true, message: "新密码必填!" }]
            })(_react2.default.createElement(_input2.default, { onChange: function onChange(e) {
                return _this.inputChange({ name: "model", value: e.target.value });
              } }))
          )
        ),
        step === 3 && _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            null,
            "\u5B9E\u4F53\u540D\u79F0\uFF0C\u4F8B\u5982\uFF1A\u751F\u4EA7\u8BA2\u5355\u3002\u6CE8\u610F\u5B9E\u4F53\u540D\u79F0\u540E\u4E0D\u8981\u5E26XX\u8868"
          ),
          _react2.default.createElement(
            _form.FormItem,
            (0, _extends3.default)({}, formItemLayout, {
              label: "\u5B9E\u4F53\u540D\u79F0"
            }),
            _react2.default.createElement(_input2.default, { disabled: true, value: entityName, placeholder: "\u8BF7\u9009\u62E9\u4E0B\u65B9\u6570\u636E\u8868" })
          ),
          _react2.default.createElement(
            _form.FormItem,
            (0, _extends3.default)({}, formItemLayout, {
              label: "\u9009\u62E9\u6570\u636E\u8868"
            }),
            getFieldDecorator("tableName", {
              initialValue: "",
              rules: [{ required: true, message: "必填!" }]
            })(_react2.default.createElement(
              _select2.default,
              {
                mode: "combobox",
                defaultActiveFirstOption: !1,
                onChange: _this.selectChange
              },
              _this.selectOption()
            ))
          )
        ),
        step === 4 && _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            null,
            "\u5B9E\u4F53\u540D\u79F0\uFF0C\u4F8B\u5982\uFF1A\u751F\u4EA7\u8BA2\u5355\u3002\u6CE8\u610F\u5B9E\u4F53\u540D\u79F0\u540E\u4E0D\u8981\u5E26XX\u8868"
          ),
          _react2.default.createElement(
            _form.FormItem,
            (0, _extends3.default)({}, formItemLayout, {
              label: "\u5B9E\u4F53\u540D\u79F0"
            }),
            _react2.default.createElement(_input2.default, { disabled: true, value: entityName })
          ),
          _react2.default.createElement(
            _form.FormItem,
            (0, _extends3.default)({}, formItemLayout, {
              label: "\u4EE3\u7801\u5305\u8DEF\u5F84"
            }),
            _react2.default.createElement(_input2.default, { disabled: true, value: projectPackageModel })
          ),
          _react2.default.createElement(
            _form.FormItem,
            (0, _extends3.default)({}, formItemLayout, {
              label: "\u5B9E\u4F53\u7C7B\u540D"
            }),
            _react2.default.createElement(_input2.default, { disabled: true, value: entityClassName })
          ),
          _react2.default.createElement(
            _form.FormItem,
            (0, _extends3.default)({}, formItemLayout, {
              label: "\u53EA\u751F\u6210\u5B9E\u4F53\u7C7B"
            }),
            getFieldDecorator("onlyGenerateEntity", {
              initialValue: "",
              rules: []
            })(_react2.default.createElement(_switch2.default, { style: { textAlign: "left", marginLeft: "2px" } }))
          )
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CodeBuilder, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      var envUrl = this.props.envUrl;

      _request2.default.GET(_getConfig2.default.host + "/" + envUrl).then(function (res) {
        _this3.setState((0, _extends3.default)({}, res.data));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var state = this.state;
      var current = state.current;


      var steps = [{
        title: "第一步：项目配置",
        content: this.renderForm(1)
      }, {
        title: "第二步：模块配置",
        content: this.renderForm(2)
      }, {
        title: "第三步：选择数据表",
        content: this.renderForm(3)
      }, {
        title: "第四步：生成代码",
        content: this.renderForm(4)
      }];
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _steps2.default,
          { current: current },
          steps.map(function (item) {
            return _react2.default.createElement(Step, { key: item.title, title: item.title });
          })
        ),
        _react2.default.createElement(
          "div",
          { style: stepsContent },
          steps[this.state.current].content,
          _react2.default.createElement(
            "div",
            { style: stepsAction },
            this.state.current > 0 && _react2.default.createElement(_button2.default, { title: "\u4E0A\u4E00\u6B65", primary: !1, style: { marginRight: 8 }, onClick: function onClick() {
                return _this4.prev();
              } }),
            this.state.current < steps.length - 1 && _react2.default.createElement(_button2.default, { title: "\u4E0B\u4E00\u6B65", primary: !1, onClick: function onClick() {
                return _this4.next();
              } }),
            this.state.current === steps.length - 1 && _react2.default.createElement(_button2.default, { title: "\u751F\u6210\u4EE3\u7801", onClick: this.handleSubmit })
          )
        )
      );
    }
  }]);
  return CodeBuilder;
}(_react2.default.Component), _class.propTypes = {
  envUrl: _propTypes2.default.string,

  generateUrl: _propTypes2.default.string
}, _class.defaultProps = {
  envUrl: "generator/env",
  generateUrl: "generator/generate"
}, _temp2);
exports.default = (0, _form.Create)(CodeBuilder);