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

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

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

var _treeSelect = require("antd/lib/tree-select");

var _treeSelect2 = _interopRequireDefault(_treeSelect);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("antd/lib/tree-select/style");

var _button = require("../../../base/button/button");

var _button2 = _interopRequireDefault(_button);

var _request = require("../../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _getConfig = require("../../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TNode = _treeSelect2.default.TreeNode;
var FormItem = _form2.default.Item;

var UserSpecificModal = function (_Component) {
  (0, _inherits3.default)(UserSpecificModal, _Component);

  function UserSpecificModal(props) {
    (0, _classCallCheck3.default)(this, UserSpecificModal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UserSpecificModal.__proto__ || (0, _getPrototypeOf2.default)(UserSpecificModal)).call(this, props));

    _this.loadOrg = function (treeNode) {
      return new _promise2.default(function (resolve) {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        _request2.default.GET(_getConfig2.default.host + "/sys/organization/list?id=" + treeNode.props.eventKey).then(function (res) {
          treeNode.props.dataRef.children = res;
          _this.setState({
            treeData: [].concat((0, _toConsumableArray3.default)(_this.state.treeData))
          });
          resolve();
        });
      });
    };

    var type = null;
    if (_this.props.dataSource) {
      type = _this.props.dataSource._type;
    }
    _this.state = {
      type: type,
      treeData: _this.props.treeData
    };

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(UserSpecificModal, [{
    key: "handleSubmit",
    value: function handleSubmit() {
      var _this2 = this;

      this.props.form.validateFieldsAndScroll(function (err, fields) {
        if (!err) {
          var values = JSON.parse((0, _stringify2.default)(fields));
          var url = _getConfig2.default.host + "/sys/employee/create";
          if (_this2.state.type !== "add") {
            values.id = _this2.props.dataSource.userId;
            url = _getConfig2.default.host + "/sys/user/update";
          }
          _request2.default.POST(url, { body: values }).then(function (res) {
            if (res.success) {
              _this2.props.hideModal();
              if (_this2.state.type !== "add") {
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
      var _this3 = this;

      var getFieldDecorator = this.props.form.getFieldDecorator;
      var type = this.state.type;

      var formItemLayout = {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 15
        }
      };
      var renderTreeNodes = function renderTreeNodes(data) {
        return data.map(function (item) {
          return _react2.default.createElement(
            TNode,
            {
              key: item.id,
              dataRef: item,
              title: item.name,
              value: item.id
            },
            item.children && renderTreeNodes(item.children)
          );
        });
      };
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "p",
          null,
          type === "add" ? "新增用户" : "编辑用户"
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
              getFieldDecorator("username", {
                rules: [{
                  required: true, type: "string", message: "请填写用户名!"
                }, {
                  max: 20, message: "最大20个字符"
                }, {
                  min: 2, message: "最少2个字符"
                }, {
                  pattern: /^[0-9a-zA-Z_]{1,}$/, message: "只能输入数字、字母、下划线"
                }],
                initialValue: type !== "add" ? this.props.dataSource.username : null
              })(_react2.default.createElement(_input2.default, { disabled: type !== "add", placeholder: "\u8BF7\u586B\u5199\u7528\u6237\u540D" }))
            ),
            _react2.default.createElement(
              FormItem,
              (0, _extends3.default)({
                style: { display: "flex", justifyContent: "center" }
              }, formItemLayout, {
                label: "\u59D3\u540D"
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
                initialValue: type !== "add" ? this.props.dataSource.name : null
              })(_react2.default.createElement(_input2.default, { placeholder: "\u8BF7\u586B\u5199\u59D3\u540D" }))
            ),
            _react2.default.createElement(
              FormItem,
              (0, _extends3.default)({
                style: { display: "flex", justifyContent: "center" }
              }, formItemLayout, {
                label: "\u90AE\u7BB1"
              }),
              getFieldDecorator("email", {
                rules: [{ type: "email", message: "请填写正确的邮箱地址!" }],
                initialValue: type !== "add" ? this.props.dataSource.email : null
              })(_react2.default.createElement(_input2.default, { placeholder: "\u8BF7\u586B\u5199\u90AE\u7BB1" }))
            ),
            _react2.default.createElement(
              FormItem,
              (0, _extends3.default)({
                style: { display: "flex", justifyContent: "center" }
              }, formItemLayout, {
                label: "\u624B\u673A\u53F7"
              }),
              getFieldDecorator("phoneNumber", {
                rules: [{ required: true, message: "请输入手机号!" }, { pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/, message: "请输入正确的手机号" }],
                initialValue: type !== "add" ? this.props.dataSource.phoneNumber : null
              })(_react2.default.createElement(_input2.default, { placeholder: "\u8BF7\u586B\u5199\u5907\u6CE8" }))
            ),
            _react2.default.createElement(
              FormItem,
              (0, _extends3.default)({
                style: { display: "flex", justifyContent: "center" }
              }, formItemLayout, {
                label: "\u6240\u5C5E\u90E8\u95E8"
              }),
              getFieldDecorator("orgId", {
                rules: [{
                  required: true, type: "string", message: "请填写编码!"
                }, {
                  max: 10, message: "最多10个字符"
                }],
                initialValue: type === "add" ? this.props.dataSource.orgId : this.props.dataSource.orgId
              })(_react2.default.createElement(
                _treeSelect2.default,
                {
                  ref: function ref(treeDom) {
                    _this3.tree = treeDom;
                  },
                  loadData: this.loadOrg,
                  dropdownStyle: { maxHeight: 400, overflow: "auto" },
                  placeholder: "Please select",
                  disabled: type === "add"
                },
                renderTreeNodes(this.state.treeData)
              ))
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
  return UserSpecificModal;
}(_react.Component);

exports.default = _form2.default.create()(UserSpecificModal);