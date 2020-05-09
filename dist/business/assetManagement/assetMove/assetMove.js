"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var AMSpecificModal = function (_Component) {
  (0, _inherits3.default)(AMSpecificModal, _Component);

  function AMSpecificModal(props) {
    (0, _classCallCheck3.default)(this, AMSpecificModal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AMSpecificModal.__proto__ || (0, _getPrototypeOf2.default)(AMSpecificModal)).call(this, props));

    _this.loadOrg = function (treeNode) {
      return new _promise2.default(function (resolve) {
        if (treeNode.props.children) {
          resolve();
          return;
        }
        _request2.default.GET(_getConfig2.default.host + "/sys/resource/list?id=" + treeNode.props.eventKey).then(function (res) {
          treeNode.props.dataRef.children = res;
          _this.setState({
            treeData: [].concat((0, _toConsumableArray3.default)(_this.state.treeData))
          });
          resolve();
        });
      });
    };

    _this.state = {
      treeData: _this.props.treeData
    };
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(AMSpecificModal, [{
    key: "handleSubmit",
    value: function handleSubmit() {
      var _this2 = this;

      this.props.form.validateFieldsAndScroll(function (err, fields) {
        if (!err) {
          var values = JSON.parse((0, _stringify2.default)(fields));
          values.id = _this2.props.dataSource.id;
          if (values.pid === "_root_id") {
            values.pid = "";
          }
          _request2.default.POST(_getConfig2.default.host + "/sys/resource/move", { body: values }).then(function (res) {
            if (res.success) {
              _this2.props.hideModal();
              _notification3.default.success({
                message: "修改成功"
              });
              _this2.props.refresh(fields);
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
                label: "\u4E0A\u7EA7"
              }),
              getFieldDecorator("pid", {
                rules: [{
                  required: true, message: "请选择上级资源目录!"
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
                  placeholder: "\u8BF7\u9009\u62E9"
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
  return AMSpecificModal;
}(_react.Component);

exports.default = _form2.default.create()(AMSpecificModal);