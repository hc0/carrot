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

var OrgSpecificModal = function (_Component) {
  (0, _inherits3.default)(OrgSpecificModal, _Component);

  function OrgSpecificModal(props) {
    (0, _classCallCheck3.default)(this, OrgSpecificModal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (OrgSpecificModal.__proto__ || (0, _getPrototypeOf2.default)(OrgSpecificModal)).call(this, props));

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

  (0, _createClass3.default)(OrgSpecificModal, [{
    key: "handleSubmit",
    value: function handleSubmit() {
      var _this2 = this;

      this.props.form.validateFieldsAndScroll(function (err, fields) {
        if (!err) {
          var values = JSON.parse((0, _stringify2.default)(fields));
          if (_this2.state.type !== "add") {
            values.id = _this2.props.dataSource.id;
          }
          _request2.default.POST(_getConfig2.default.host + "/sys/organization/save", { body: values }).then(function (res) {
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
              _this2.props.refresh(values);
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
              value: item.id,
              disabled: item.id === _this3.props.dataSource.id
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
          type === "add" ? "新增角色" : "编辑角色"
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
                label: "\u90E8\u95E8\u540D\u79F0"
              }),
              getFieldDecorator("name", {
                rules: [{ required: true, message: "请填写角色名称!" }, { max: 10, message: "最多12个字符!" }],
                initialValue: type !== "add" ? this.props.dataSource.name : null
              })(_react2.default.createElement(_input2.default, { placeholder: "\u8BF7\u586B\u5199\u89D2\u8272\u540D\u79F0" }))
            ),
            _react2.default.createElement(
              FormItem,
              (0, _extends3.default)({
                style: { display: "flex", justifyContent: "center" }
              }, formItemLayout, {
                label: "\u90E8\u95E8\u7F16\u53F7"
              }),
              getFieldDecorator("code", {
                rules: [{
                  required: true, type: "string", message: "请填写部门编号!"
                }, {
                  max: 20, message: "最大20个字符"
                }, {
                  min: 2, message: "最少2个字符"
                }, {
                  pattern: /^[0-9a-zA-Z_]{1,}$/, message: "只能输入数字、字母、下划线"
                }],
                initialValue: type !== "add" ? this.props.dataSource.code : null
              })(_react2.default.createElement(_input2.default, { placeholder: "\u8BF7\u586B\u5199\u7F16\u7801" }))
            ),
            _react2.default.createElement(
              FormItem,
              (0, _extends3.default)({
                style: { display: "flex", justifyContent: "center" }
              }, formItemLayout, {
                label: "\u6240\u5C5E\u90E8\u95E8"
              }),
              getFieldDecorator("pid", {
                rules: [{
                  required: true, type: "string", message: "请填写编码!"
                }, {
                  max: 10, message: "最多10个字符"
                }],
                initialValue: type === "add" ? this.props.dataSource.id : this.props.dataSource.pid
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
                initialValue: type !== "add" ? this.props.dataSource.description : null
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
  return OrgSpecificModal;
}(_react.Component);

exports.default = _form2.default.create()(OrgSpecificModal);