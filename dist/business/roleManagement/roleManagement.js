"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require("antd/lib/modal");

var _modal2 = _interopRequireDefault(_modal);

var _row = require("antd/lib/row");

var _row2 = _interopRequireDefault(_row);

var _col = require("antd/lib/col");

var _col2 = _interopRequireDefault(_col);

var _input = require("antd/lib/input");

var _input2 = _interopRequireDefault(_input);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _button = require("antd/lib/button");

var _button2 = _interopRequireDefault(_button);

var _divider = require("antd/lib/divider");

var _divider2 = _interopRequireDefault(_divider);

var _popconfirm = require("antd/lib/popconfirm");

var _popconfirm2 = _interopRequireDefault(_popconfirm);

var _icon = require("antd/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

var _notification2 = require("antd/lib/notification");

var _notification3 = _interopRequireDefault(_notification2);

var _form = require("antd/lib/form");

var _form2 = _interopRequireDefault(_form);

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("antd/lib/col/style");

require("antd/lib/row/style");

require("antd/lib/divider/style");

require("antd/lib/modal/style");

require("antd/lib/popconfirm/style");

var _polished = require("polished");

var _fixedTool = require("../../base/fixedTool/fixedTool");

var _fixedTool2 = _interopRequireDefault(_fixedTool);

var _table = require("../../base/table/table.js");

var _table2 = _interopRequireDefault(_table);

var _request = require("../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _roleCU = require("./roleCU/roleCU");

var _roleCU2 = _interopRequireDefault(_roleCU);

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormItem = _form2.default.Item;
var pageHeaderStyle = {
  position: "absolute",
  top: 0,
  width: "100%",
  marginBottom: 20,
  backgroundColor: "#fff",
  height: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

var options = {
  add: function add(record, target) {
    target.setState({
      modalVisiable: true,
      record: {
        _type: "add"
      }
    });
  },
  edit: function edit(record, target) {
    record._type = "edit";
    target.setState({
      modalVisiable: true,
      record: record
    });
  },
  del: function del(record, target) {
    _request2.default.POST(_getConfig2.default.host + "/sys/role/delete?id=" + record.id).then(function (res) {
      if (res.success) {
        _notification3.default.success({
          message: "删除成功"
        });
        target.loadData();
      } else {
        _notification3.default.success({
          message: res.msg
        });
      }
    });
  }
};

var columns = function columns(target) {
  return [{
    title: "名称",
    dataIndex: "name",
    key: "name"
  }, {
    title: "编码",
    dataIndex: "code",
    key: "code"
  }, {
    title: "描述",
    dataIndex: "description",
    key: "description"
  }, {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    render: function render(text, record) {
      return _react2.default.createElement(
        "span",
        { className: "table-operation" },
        _react2.default.createElement(
          _popconfirm2.default,
          { title: "\u786E\u8BA4\u5220\u9664\uFF1F", okText: "\u786E\u8BA4", cancelText: "\u53D6\u6D88", onConfirm: function onConfirm() {
              return options.del(record, target);
            } },
          _react2.default.createElement(_icon2.default, { type: "delete" })
        ),
        _react2.default.createElement(_divider2.default, { type: "vertical" }),
        _react2.default.createElement(_icon2.default, { type: "edit", onClick: function onClick() {
            return options.edit(record, target);
          } })
      );
    }
  }];
};
var operationDefault = {
  add: function add(selectedRows, refresh, target) {
    return _react2.default.createElement(
      _button2.default,
      { className: "operation-button", type: "primary", style: { marginLeft: 25 }, onClick: function onClick() {
          return options.add({}, target);
        } },
      "\u65B0\u589E"
    );
  },
  query: function query(selectedRows, refresh, target) {
    return _react2.default.createElement(
      _button2.default,
      { className: "operation-button", type: "primary", style: { marginLeft: 25 }, onClick: target.onSearch },
      "\u67E5\u8BE2"
    );
  }
};
var modalStyle = {
  width: "358px",
  borderRadius: "5px",
  overflow: "hidden"
};
var RoleManagement = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(RoleManagement, _Component);

  function RoleManagement(props) {
    (0, _classCallCheck3.default)(this, RoleManagement);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RoleManagement.__proto__ || (0, _getPrototypeOf2.default)(RoleManagement)).call(this, props));

    _this.onSearch = function () {
      _this.props.form.validateFieldsAndScroll(function (err, fields) {
        if (!err) {
          _this.loadData(fields);
        }
      });
    };

    _this.state = {
      columns: columns(_this),
      data: [],
      selectedRows: [],
      params: { current: 1, pageSize: 10 }
    };
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.changeParams = _this.changeParams.bind(_this);
    _this.loadData = _this.loadData.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(RoleManagement, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData(params) {
      var _this2 = this;

      this.changeParams(params);
      _request2.default.GET(_getConfig2.default.host + "/sys/role/list", { params: this.state.params }).then(function (res) {
        _this2.setState({
          data: res.data.records,
          total: res.data.total
        });
      });
    }
  }, {
    key: "changeParams",
    value: function changeParams(params) {
      var _this3 = this;

      if ((typeof params === "undefined" ? "undefined" : (0, _typeof3.default)(params)) === "object") {
        (0, _keys2.default)(params).every(function (k) {
          var element = params[k];
          _this3.state.params[k] = element;
          return true;
        });
      }
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      this.onSearch();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var formItemLayout = {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 14
        }
      };
      var getFieldDecorator = this.props.form.getFieldDecorator;
      var _props = this.props,
          operation = _props.operation,
          style = _props.style;

      var customRender = function customRender(op) {
        return (0, _keys2.default)(op).map(function (k) {
          if (op[k]) {
            return _react2.default.createElement(
              "div",
              { key: k },
              op[k](_this4.state.selectedRows, function (params) {
                _this4.loadData(params);
              }, _this4)
            );
          }
          return "";
        });
      };
      var rowSelection = {
        type: this.props.type,
        onChange: function onChange(selectedRowKeys, selectedRows) {
          _this4.setState({
            selectedRows: selectedRows
          });
        }
      };
      return _react2.default.createElement(
        "div",
        { style: style },
        _react2.default.createElement(
          _fixedTool2.default,
          { style: pageHeaderStyle },
          _react2.default.createElement(
            "span",
            { style: { marginLeft: 20 } },
            "\u89D2\u8272\u7BA1\u7406"
          ),
          _react2.default.createElement(
            "div",
            { style: { textAlign: "center", marginRight: 20, display: "flex" } },
            customRender((0, _extends3.default)({}, operationDefault, operation))
          )
        ),
        _react2.default.createElement(
          "div",
          { style: (0, _extends3.default)({}, (0, _polished.margin)(60, 10, 10), (0, _polished.padding)(10), { backgroundColor: "#fff" }) },
          _react2.default.createElement(
            "div",
            { className: "view-operation-bar" },
            _react2.default.createElement(
              _form2.default,
              {
                className: "ant-advanced-search-form",
                onSubmit: this.handleSearch
              },
              _react2.default.createElement(
                _row2.default,
                null,
                _react2.default.createElement(
                  _col2.default,
                  { span: 10 },
                  _react2.default.createElement(
                    FormItem,
                    (0, _extends3.default)({
                      style: { display: "flex", alignItems: "center" }
                    }, formItemLayout, {
                      label: "\u540D\u79F0"
                    }),
                    getFieldDecorator("name", {
                      initialValue: ""
                    })(_react2.default.createElement(_input2.default, null))
                  )
                ),
                _react2.default.createElement(
                  _col2.default,
                  { span: 10 },
                  _react2.default.createElement(
                    FormItem,
                    (0, _extends3.default)({
                      style: { display: "flex", alignItems: "center" }
                    }, formItemLayout, {
                      label: "\u7F16\u7801"
                    }),
                    getFieldDecorator("code", {
                      initialValue: ""
                    })(_react2.default.createElement(_input2.default, null))
                  )
                )
              )
            )
          ),
          _react2.default.createElement(_table2.default, {
            rowKey: "id",
            dataSource: this.state.data,
            columns: this.state.columns,
            rowSelection: this.props.type !== "normal" ? rowSelection : null,
            pagination: {
              total: this.state.total,
              current: this.state.params.current,
              showSizeChanger: true,
              pageSize: this.state.params.pageSize,
              onChange: function onChange(current) {
                _this4.loadData({ current: current });
              },
              onShowSizeChange: function onShowSizeChange(current, pageSize) {
                _this4.loadData({ current: current, pageSize: pageSize });
              }
            }
          })
        ),
        _react2.default.createElement(
          _modal2.default,
          {
            visible: this.state.modalVisiable,
            footer: null,
            closable: false,
            style: modalStyle
          },
          this.state.modalVisiable && _react2.default.createElement(_roleCU2.default, {
            dataSource: this.state.record,
            hideModal: function hideModal() {
              return _this4.setState({ modalVisiable: false });
            },
            refresh: this.loadData
          })
        )
      );
    }
  }]);
  return RoleManagement;
}(_react.Component), _class.propTypes = {
  operation: _propTypes2.default.object,

  type: _propTypes2.default.oneOf(["normal", "radio", "checkbox"]),

  style: _propTypes2.default.object
}, _class.defaultProps = {
  operation: {},
  type: "normal",
  style: {}
}, _temp);
exports.default = _form2.default.create()(RoleManagement);