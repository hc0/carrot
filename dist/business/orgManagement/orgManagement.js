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

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _popover = require("antd/lib/popover");

var _popover2 = _interopRequireDefault(_popover);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _popconfirm = require("antd/lib/popconfirm");

var _popconfirm2 = _interopRequireDefault(_popconfirm);

var _divider = require("antd/lib/divider");

var _divider2 = _interopRequireDefault(_divider);

var _tooltip = require("antd/lib/tooltip");

var _tooltip2 = _interopRequireDefault(_tooltip);

var _switch = require("antd/lib/switch");

var _switch2 = _interopRequireDefault(_switch);

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

require("antd/lib/modal/style");

require("antd/lib/popover/style");

require("antd/lib/switch/style");

require("antd/lib/tooltip/style");

require("antd/lib/popconfirm/style");

var _polished = require("polished");

var _fixedTool = require("../../base/fixedTool/fixedTool");

var _fixedTool2 = _interopRequireDefault(_fixedTool);

var _table = require("../../base/table/table.js");

var _table2 = _interopRequireDefault(_table);

var _request = require("../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _index = require("../../index");

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _orgCU = require("./orgCU/orgCU");

var _orgCU2 = _interopRequireDefault(_orgCU);

var _userCU = require("./userCU/userCU");

var _userCU2 = _interopRequireDefault(_userCU);

require("./orgManagement.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TNode = _index.Tree.TreeNode;
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

var refreshTreeData = function refreshTreeData(treeData, id, newData) {
  function loopNode(nodes) {
    nodes.some(function (nd) {
      if (nd.id === id) {
        nd.children = newData;
        return true;
      }
      if (nd.children && nd.children.length) {
        loopNode(nd.children);
      }
      return false;
    });
  }
  loopNode(treeData);
};

var options = {
  add: function add(record, target) {
    record._type = "add";
    target.setState({
      orgModalVisiable: true,
      record: record
    });
  },
  edit: function edit(record, target) {
    record._type = "edit";
    target.setState({
      orgModalVisiable: true,
      record: record
    });
  },
  del: function del(record, target) {
    _request2.default.POST(_getConfig2.default.host + "/sys/organization/delete?id=" + record.id).then(function (res) {
      if (res.success) {
        _notification3.default.success({
          message: "删除成功"
        });
        target.refreshOrgListByOrgId(record.pid);
        target.treeNodeSelect([target.state.treeData[0].id], { selected: true });
      } else {
        _notification3.default.success({
          message: res.msg
        });
      }
    });
  }
};

var userOptions = {
  add: function add(userRecord, target) {
    userRecord._type = "add";
    var orgId = target.state.selectedKeys[0];
    userRecord.orgId = orgId;
    target.setState({
      userModalVisiable: true,
      userRecord: userRecord
    });
  },
  edit: function edit(userRecord, target) {
    userRecord._type = "edit";
    target.setState({
      userModalVisiable: true,
      userRecord: userRecord
    });
  },
  disable: function disable(record, target) {
    var url = _getConfig2.default.host + "/sys/user/disable";
    if (record.status === "0") {
      url = _getConfig2.default.host + "/sys/user/enable";
    }
    if (record.status === "0") {
      record.status = "1";
      target.forceUpdate();
    } else {
      record.status = "0";
      target.forceUpdate();
    }
    _request2.default.POST(url, { body: { id: record.userId } }).then(function (res) {
      if (res.success) {
        _notification3.default.success({
          message: "操作成功"
        });
      } else {
        _notification3.default.success({
          message: res.msg
        });
      }
    });
  },
  lock: function lock(record, target) {
    var url = _getConfig2.default.host + "/sys/user/lock";
    if (record.status === "-1") {
      url = _getConfig2.default.host + "/sys/user/unlock";
    }
    if (record.status === "-1") {
      record.status = "1";
      target.forceUpdate();
    } else {
      record.status = "-1";
      target.forceUpdate();
    }
    _request2.default.POST(url, { body: { id: record.userId } }).then(function (res) {
      if (res.success) {
        _notification3.default.success({
          message: "操作成功"
        });
      } else {
        _notification3.default.success({
          message: res.msg
        });
      }
    });
  },
  rollback: function rollback(record) {
    _request2.default.POST(_getConfig2.default.host + "/sys/user/resetPassword", { params: { id: record.userId } }).then(function (res) {
      if (res.success) {
        _notification3.default.success({
          message: "操作成功"
        });
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
    title: "用户名",
    dataIndex: "username",
    key: "username"
  }, {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  }, {
    title: "邮箱",
    dataIndex: "email",
    key: "email"
  }, {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: function render(text) {
      if (text === "1") {
        return _react2.default.createElement(
          "span",
          null,
          "\u6B63\u5E38"
        );
      }
      return _react2.default.createElement(
        "span",
        null,
        text === "0" ? "禁用" : "锁定"
      );
    }
  }, {
    title: "禁用",
    dataIndex: "disable",
    key: "disable",
    render: function render(text, record) {
      return _react2.default.createElement(
        "span",
        null,
        _react2.default.createElement(_switch2.default, { disabled: record.status === "-1", checked: record.status === "0", onChange: function onChange() {
            return userOptions.disable(record, target);
          } })
      );
    }
  }, {
    title: "锁定",
    dataIndex: "lock",
    key: "lock",
    render: function render(text, record) {
      return _react2.default.createElement(
        "span",
        null,
        _react2.default.createElement(_switch2.default, { disabled: record.status === "0", checked: record.status === "-1", onChange: function onChange() {
            return userOptions.lock(record, target);
          } })
      );
    }
  }, {
    title: "操作",
    dataIndex: "operaion",
    key: "operaion",
    render: function render(text, record) {
      return _react2.default.createElement(
        "span",
        { className: "table-operation" },
        _react2.default.createElement(
          _tooltip2.default,
          { placement: "top", title: "\u7F16\u8F91" },
          _react2.default.createElement(
            "span",
            { role: "presentation", onClick: function onClick() {
                return userOptions.edit(record, target);
              } },
            _react2.default.createElement(_index.Icon, { type: "edit" })
          )
        ),
        _react2.default.createElement(_divider2.default, { type: "vertical" }),
        _react2.default.createElement(
          _tooltip2.default,
          { placement: "top", title: "\u8BBE\u7F6E\u89D2\u8272" },
          _react2.default.createElement(
            "span",
            {
              role: "presentation",
              onClick: function onClick() {
                target.getRoleListByUserId(record).then(function () {
                  target.setState({
                    record: record,
                    roleListVisible: true
                  });
                });
              }
            },
            _react2.default.createElement(_index.Icon, { type: "setting" })
          )
        ),
        _react2.default.createElement(_divider2.default, { type: "vertical" }),
        _react2.default.createElement(
          _tooltip2.default,
          { placement: "top", title: "\u91CD\u7F6E" },
          _react2.default.createElement(
            _popconfirm2.default,
            { title: "\u786E\u8BA4\u91CD\u7F6E\u5BC6\u7801\uFF1F", okText: "\u786E\u8BA4", cancelText: "\u53D6\u6D88", onConfirm: function onConfirm() {
                return userOptions.rollback(record, target);
              } },
            _react2.default.createElement(
              "span",
              null,
              _react2.default.createElement(_index.Icon, { type: "rollback" })
            )
          )
        )
      );
    }
  }];
};

var operationDefault = {
  add: function add(selectedRows, refresh, target) {
    return _react2.default.createElement(_index.Button, { title: "\u65B0\u589E\u7528\u6237", type: "primary", style: { marginLeft: 25 }, onClick: function onClick() {
        return userOptions.add({}, target);
      } });
  },
  query: function query(selectedRows, refresh, target) {
    return _react2.default.createElement(_index.Button, { title: "\u67E5\u8BE2", className: "operation-button", type: "primary", style: { marginLeft: 25 }, onClick: target.onSearch });
  }
};
var OrgManagement = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(OrgManagement, _Component);

  function OrgManagement(props) {
    (0, _classCallCheck3.default)(this, OrgManagement);

    var _this = (0, _possibleConstructorReturn3.default)(this, (OrgManagement.__proto__ || (0, _getPrototypeOf2.default)(OrgManagement)).call(this, props));

    _this.onSearch = function () {
      _this.props.form.validateFieldsAndScroll(function (err, fields) {
        if (!err) {
          _this.loadData(fields);
        }
      });
    };

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

    _this.state = {
      columns: columns(_this),
      data: [],
      selectedRows: [],
      roleSelectedRows: [],
      treeData: [],
      params: { current: 1, pageSize: 10 }
    };
    _this.loadData = _this.loadData.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.tNodeOnMouseOver = _this.tNodeOnMouseOver.bind(_this);
    _this.treeNodeSelect = _this.treeNodeSelect.bind(_this);
    _this.loadRootOrg = _this.loadRootOrg.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(OrgManagement, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadRootOrg();
    }
  }, {
    key: "getRoleListByUserId",
    value: function getRoleListByUserId(record) {
      var _this2 = this;

      return _request2.default.GET(_getConfig2.default.host + "/sys/authorize/listRole", { params: { target: record.id, type: "0" } }).then(function (res) {
        _this2.setState({
          roleSelectedRows: res.data
        });
      });
    }
  }, {
    key: "loadRootOrg",
    value: function loadRootOrg() {
      var _this3 = this;

      _request2.default.GET(_getConfig2.default.host + "/sys/organization/list").then(function (res) {
        _this3.setState({
          treeData: res
        });
        _this3.treeNodeSelect([res[0].id], { selected: true });
      });
    }
  }, {
    key: "refreshOrgListByOrgId",
    value: function refreshOrgListByOrgId(id) {
      var _this4 = this;

      _request2.default.GET(_getConfig2.default.host + "/sys/organization/list?id=" + id).then(function (res) {
        refreshTreeData(_this4.state.treeData, id, res);
        _this4.setState({
          treeData: [].concat((0, _toConsumableArray3.default)(_this4.state.treeData))
        });
      });
    }
  }, {
    key: "loadData",
    value: function loadData(params) {
      var _this5 = this;

      this.changeParams(params);
      _request2.default.GET(_getConfig2.default.host + "/sys/employee/list", { params: this.state.params }).then(function (res) {
        _this5.setState({
          data: res.data.records,
          total: res.data.total
        });
      });
    }
  }, {
    key: "changeParams",
    value: function changeParams(params) {
      var _this6 = this;

      if ((typeof params === "undefined" ? "undefined" : (0, _typeof3.default)(params)) === "object") {
        (0, _keys2.default)(params).every(function (k) {
          var element = params[k];
          _this6.state.params[k] = element;
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
    key: "tNodeOnMouseOver",
    value: function tNodeOnMouseOver(item) {
      item._visible = "visible";
      this.forceUpdate();
    }
  }, {
    key: "tNodeOnMouseOut",
    value: function tNodeOnMouseOut(item) {
      item._visible = "hidden";
      this.forceUpdate();
    }
  }, {
    key: "treeNodeSelect",
    value: function treeNodeSelect(selectedKeys, e) {
      if (e.selected) {
        this.setState({
          selectedKeys: selectedKeys
        });
        this.loadData({ orgId: selectedKeys[0] });
      }
    }
  }, {
    key: "authorityAdd",
    value: function authorityAdd(roleSelectedRows) {
      var _this7 = this;

      var roleIds = roleSelectedRows.map(function (item) {
        return item.id;
      }).join(",");
      _request2.default.POST(_getConfig2.default.host + "/sys/authorize/batch/target", {
        body: {
          roleIds: roleIds,
          target: this.state.record.id,
          type: "0"
        }
      }).then(function (res) {
        if (res.success) {
          _notification3.default.success({
            message: "操作成功"
          });
          _this7.loadData();
        } else {
          _notification3.default.error({
            message: res.msg
          });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;

      var formItemLayout = {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 18
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
              op[k](_this8.state.selectedRows, function () {
                _this8.loadData();
              }, _this8)
            );
          }
          return "";
        });
      };
      var rowSelection = {
        type: this.props.type,
        onChange: function onChange(selectedRowKeys, selectedRows) {
          _this8.setState({
            selectedRows: selectedRows
          });
        }
      };
      var content = function content(item) {
        if (item.pid) {
          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "p",
              {
                onClick: function onClick() {
                  options.add(item, _this8);
                },
                role: "presentation"
              },
              "\u6DFB\u52A0\u5B50\u83DC\u5355"
            ),
            _react2.default.createElement(
              "p",
              {
                onClick: function onClick() {
                  options.edit(item, _this8);
                },
                role: "presentation"
              },
              "\u7F16\u8F91\u90E8\u95E8"
            ),
            _react2.default.createElement(
              "p",
              {
                onClick: function onClick() {
                  options.del(item, _this8);
                },
                role: "presentation"
              },
              "\u5220\u9664\u90E8\u95E8"
            )
          );
        }
        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "p",
            {
              onClick: function onClick() {
                options.add(item, _this8);
              },
              role: "presentation"
            },
            "\u6DFB\u52A0\u5B50\u83DC\u5355"
          ),
          _react2.default.createElement(
            "p",
            {
              onClick: function onClick() {
                options.edit(item, _this8);
              },
              role: "presentation"
            },
            "\u7F16\u8F91\u90E8\u95E8"
          )
        );
      };
      var renderTreeNodes = function renderTreeNodes(data) {
        return data.length ? data.map(function (item) {
          return _react2.default.createElement(
            TNode,
            {
              key: item.id,
              dataRef: item,
              title: _react2.default.createElement(
                "div",
                {
                  onFocus: function onFocus() {
                    return _this8.tNodeOnMouseOver(item);
                  },
                  onMouseOver: function onMouseOver() {
                    return _this8.tNodeOnMouseOver(item);
                  },
                  onMouseOut: function onMouseOut() {
                    return _this8.tNodeOnMouseOut(item);
                  },
                  onBlur: function onBlur() {
                    return _this8.tNodeOnMouseOut(item);
                  },
                  style: {
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }
                },
                _react2.default.createElement(
                  "span",
                  null,
                  item.name
                ),
                _react2.default.createElement(
                  _popover2.default,
                  { content: content(item), trigger: "focus" },
                  _react2.default.createElement(
                    "button",
                    {
                      style: {
                        border: "none",
                        outline: "none",
                        backgroundColor: "transparent"
                      }
                    },
                    _react2.default.createElement(_index.Icon, { className: "org-more-opeartion", type: "ellipsis", style: { fontSize: "20px", visibility: item._visible ? item._visible : "hidden" } })
                  )
                )
              )
            },
            item.children && renderTreeNodes(item.children)
          );
        }) : "";
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
            "\u7EC4\u7EC7\u7BA1\u7406"
          ),
          _react2.default.createElement(
            "div",
            { style: { textAlign: "center", marginRight: 20, display: "flex" } },
            customRender((0, _extends3.default)({}, operationDefault, operation))
          )
        ),
        _react2.default.createElement(
          "div",
          { style: (0, _extends3.default)({}, (0, _polished.margin)(60, 10, 10), (0, _polished.padding)(10), { backgroundColor: "#fff", display: "flex"
            })
          },
          _react2.default.createElement(
            "div",
            { style: {
                flex: "0 1 200px"
              }
            },
            _react2.default.createElement(
              _index.Tree,
              {
                loadData: this.loadOrg,
                className: "business-org-tree",
                selectedKeys: this.state.selectedKeys,

                onSelect: this.treeNodeSelect
              },
              renderTreeNodes(this.state.treeData)
            )
          ),
          _react2.default.createElement(
            "div",
            { style: {
                flex: "1 1 auto"
              }
            },
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
                    { span: 7 },
                    _react2.default.createElement(
                      FormItem,
                      (0, _extends3.default)({}, formItemLayout, {
                        label: "\u7528\u6237\u540D"
                      }),
                      getFieldDecorator("username", {
                        initialValue: ""
                      })(_react2.default.createElement(_index.Input, null))
                    )
                  ),
                  _react2.default.createElement(
                    _col2.default,
                    { span: 7 },
                    _react2.default.createElement(
                      FormItem,
                      (0, _extends3.default)({
                        style: { display: "flex", alignItems: "center" }
                      }, formItemLayout, {
                        label: "\u59D3\u540D"
                      }),
                      getFieldDecorator("name", {
                        initialValue: ""
                      })(_react2.default.createElement(_index.Input, null))
                    )
                  ),
                  _react2.default.createElement(
                    _col2.default,
                    { span: 7 },
                    _react2.default.createElement(
                      FormItem,
                      (0, _extends3.default)({
                        style: { display: "flex", alignItems: "center" }
                      }, formItemLayout, {
                        label: "\u90AE\u7BB1"
                      }),
                      getFieldDecorator("email", {
                        initialValue: ""
                      })(_react2.default.createElement(_index.Input, null))
                    )
                  )
                ),
                _react2.default.createElement(
                  _row2.default,
                  null,
                  _react2.default.createElement(
                    _col2.default,
                    { span: 7 },
                    _react2.default.createElement(
                      FormItem,
                      (0, _extends3.default)({
                        style: { display: "flex", alignItems: "center" }
                      }, formItemLayout, {
                        label: "\u72B6\u6001"
                      }),
                      getFieldDecorator("status", {
                        initialValue: ""
                      })(_react2.default.createElement(
                        _index.Select,
                        null,
                        _react2.default.createElement(
                          _index.Select.Option,
                          { value: "" },
                          "\u4E0D\u9650"
                        ),
                        _react2.default.createElement(
                          _index.Select.Option,
                          { value: "1" },
                          "\u6B63\u5E38"
                        ),
                        _react2.default.createElement(
                          _index.Select.Option,
                          { value: "0" },
                          "\u7981\u7528"
                        ),
                        _react2.default.createElement(
                          _index.Select.Option,
                          { value: "-1" },
                          "\u9501\u5B9A"
                        )
                      ))
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
                  _this8.loadData({ current: current });
                },
                onShowSizeChange: function onShowSizeChange(current, pageSize) {
                  _this8.loadData({ current: current, pageSize: pageSize });
                }
              }
            })
          ),
          _react2.default.createElement(
            _modal2.default,
            {
              visible: this.state.orgModalVisiable,
              footer: null,
              closable: false,
              style: {
                width: "358px",
                borderRadius: "5px",
                overflow: "hidden"
              }
            },
            this.state.orgModalVisiable && _react2.default.createElement(_orgCU2.default, {
              key: "org",
              dataSource: this.state.record,
              treeData: this.state.treeData,
              hideModal: function hideModal() {
                return _this8.setState({ orgModalVisiable: false });
              },
              refresh: function refresh(node) {
                if (_this8.state.record._type === "edit") {
                  _this8.refreshOrgListByOrgId(_this8.state.record.pid);
                  _this8.refreshOrgListByOrgId(node.pid);
                } else {
                  _this8.refreshOrgListByOrgId(node.pid);
                }
              }
            })
          ),
          _react2.default.createElement(
            _modal2.default,
            {
              visible: this.state.userModalVisiable,
              footer: null,
              closable: false,
              style: {
                width: "358px",
                borderRadius: "5px",
                overflow: "hidden"
              }
            },
            this.state.userModalVisiable && _react2.default.createElement(_userCU2.default, {
              key: "user",
              dataSource: this.state.userRecord,
              treeData: this.state.treeData,
              hideModal: function hideModal() {
                return _this8.setState({ userModalVisiable: false });
              },
              refresh: this.loadData
            })
          ),
          _react2.default.createElement(_index.RoleListModal, {
            visible: this.state.roleListVisible,
            key: "role-modal",
            type: "checkbox",
            roleSelectedRows: this.state.roleSelectedRows,
            onSelectedRows: function onSelectedRows(roleSelectedRows) {
              _this8.setState({
                roleSelectedRows: roleSelectedRows
              });
              _this8.authorityAdd(roleSelectedRows);
            },
            hideModal: function hideModal() {
              return _this8.setState({ roleListVisible: false });
            }
          })
        )
      );
    }
  }]);
  return OrgManagement;
}(_react.Component), _class.propTypes = {
  operation: _propTypes2.default.object,

  type: _propTypes2.default.oneOf(["normal", "radio", "checkbox"]),

  style: _propTypes2.default.object
}, _class.defaultProps = {
  operation: {},
  type: "normal",
  style: {}
}, _temp);
exports.default = _form2.default.create()(OrgManagement);