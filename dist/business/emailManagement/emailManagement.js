"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = require("antd/lib/card");

var _card2 = _interopRequireDefault(_card);

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

var _input = require("antd/lib/input");

var _input2 = _interopRequireDefault(_input);

var _form = require("antd/lib/form");

var _form2 = _interopRequireDefault(_form);

var _class, _temp2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("antd/lib/form/style");

require("antd/lib/card/style");

var _input3 = require("../../base/input/input.js");

var _input4 = _interopRequireDefault(_input3);

var _button = require("../../base/button/button.js");

var _button2 = _interopRequireDefault(_button);

var _request = require("../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormItem = _form2.default.Item;

var TextArea = _input2.default.TextArea;


var styles = {
  width: "80%",
  margin: "auto",
  padding: _getConfig2.default["@padding-sm"]
};

var EmailManagement = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(EmailManagement, _React$Component);

  function EmailManagement() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, EmailManagement);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = EmailManagement.__proto__ || (0, _getPrototypeOf2.default)(EmailManagement)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmit = function () {
      var validateFields = _this.props.form.validateFields;

      validateFields(function (err, values) {
        if (!err) {
          console.info("success", values);
          _request2.default.POST(_getConfig2.default.host + "/demo/mail/send", {
            body: values
          }).then(function (res) {
            console.log(res);
          });
        }
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(EmailManagement, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var getFieldDecorator = props.form.getFieldDecorator;

      var formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      };
      return _react2.default.createElement(
        _card2.default,
        {
          title: _react2.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }
            },
            _react2.default.createElement(
              "h3",
              {
                style: {
                  margin: "0"
                }
              },
              "\u53D1\u9001\u90AE\u4EF6"
            ),
            _react2.default.createElement(_button2.default, { onClick: this.handleSubmit })
          ),
          style: styles
        },
        _react2.default.createElement(
          _form2.default,
          null,
          _react2.default.createElement(
            FormItem,
            (0, _extends3.default)({}, formItemLayout, {
              label: "\u6807\u9898"
            }),
            getFieldDecorator("title", {
              initialValue: "",
              rules: [{ required: true, message: "标题必填!" }]
            })(_react2.default.createElement(_input4.default, { placeholder: "\u90AE\u4EF6\u6807\u9898" }))
          ),
          _react2.default.createElement(
            FormItem,
            (0, _extends3.default)({}, formItemLayout, {
              label: "\u63A5\u6536\u4EBA"
            }),
            getFieldDecorator("mailTo", {
              initialValue: "",
              rules: [{ required: true, message: "接收人必填!" }]
            })(_react2.default.createElement(_input4.default, { placeholder: "\u90AE\u4EF6\u63A5\u6536\u4EBA\uFF0C\u591A\u4E2A\u90AE\u4EF6\u7528,\u8FDE\u63A5" }))
          ),
          _react2.default.createElement(
            FormItem,
            (0, _extends3.default)({}, formItemLayout, {
              label: "\u5185\u5BB9"
            }),
            getFieldDecorator("content", {
              initialValue: "",
              rules: [{ required: true, message: "内容必填!" }]
            })(_react2.default.createElement(TextArea, {
              autosize: {
                minRows: 2,
                maxRows: 6
              }
            }))
          )
        )
      );
    }
  }]);
  return EmailManagement;
}(_react2.default.Component), _class.propTypes = {
  separator: _propTypes2.default.string,

  items: _propTypes2.default.array
}, _class.defaultProps = {
  separator: "/",
  items: [{}]
}, _temp2);
exports.default = _form2.default.create()(EmailManagement);