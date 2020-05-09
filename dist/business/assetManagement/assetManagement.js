"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require("antd/lib/modal");

var _modal2 = _interopRequireDefault(_modal);

var _card = require("antd/lib/card");

var _card2 = _interopRequireDefault(_card);

var _treeSelect = require("antd/lib/tree-select");

var _treeSelect2 = _interopRequireDefault(_treeSelect);

var _row = require("antd/lib/row");

var _row2 = _interopRequireDefault(_row);

var _col = require("antd/lib/col");

var _col2 = _interopRequireDefault(_col);

var _popover = require("antd/lib/popover");

var _popover2 = _interopRequireDefault(_popover);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _notification2 = require("antd/lib/notification");

var _notification3 = _interopRequireDefault(_notification2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

require("antd/lib/tree-select/style");

require("antd/lib/card/style");

var _polished = require("polished");

var _fixedTool = require("../../base/fixedTool/fixedTool");

var _fixedTool2 = _interopRequireDefault(_fixedTool);

var _request = require("../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _index = require("../../index");

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

var _assetMove = require("./assetMove/assetMove");

var _assetMove2 = _interopRequireDefault(_assetMove);

require("./assetManagement.less");

var _roleListModal = require("./roleListModal/roleListModal");

var _roleListModal2 = _interopRequireDefault(_roleListModal);

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

var refreshTreeData = function refreshTreeData(treeData, id, newData, type, target) {
  function loopNode(nodes) {
    nodes.some(function (nd, i) {
      if (nd.id === id) {
        if (type === "insert") {
          if (nd.children) {
            nd.children.push(newData);
          } else {
            nd.children = [newData];
          }
        } else if (type === "del") {
          nodes.splice(i, 1);
          target.setState({
            currentAssetId: "_root_id"
          });
        } else {
          nd.children = newData;
        }
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

var assetOptions = [{
  value: "0",
  text: "目录"
}, {
  value: "1",
  text: "菜单",
  disabled: true
}, {
  value: "2",
  text: "功能"
}];

var loadTypeOptions = [{
  value: "2",
  text: "IFRAME",
  disabled: true
}, {
  value: "3",
  text: "TEMPLATE"
}];

var options = {
  add: function add(assetRecord, target) {
    refreshTreeData(target.state.treeData, assetRecord.id, { id: "_temp_id", name: "新增资源" }, "insert");
    target.setState({
      currentAssetId: "",
      selectedKeys: ["_temp_id"],
      treeData: [].concat((0, _toConsumableArray3.default)(target.state.treeData)),
      roleSelectedRows: [],
      assetRecord: {
        pid: assetRecord.id
      }
    });
  },
  move: function move(assetRecord, target) {
    if (!assetRecord.pid) {
      assetRecord.pid = "_root_id";
    }
    target.setState({
      assetMoveVisible: true,
      assetRecord: assetRecord
    });
  },
  del: function del(record, target) {
    _request2.default.POST(_getConfig2.default.host + "/sys/resource/delete?id=" + record.id).then(function (res) {
      if (res.success) {
        _notification3.default.success({
          message: "删除成功"
        });
        target.refreshAssetListByAssetId(record.pid);
        target.treeNodeSelect([target.state.treeData[0].id], { selected: true });
      } else {
        _notification3.default.success({
          message: res.msg
        });
      }
    });
  }
};

var operationDefault = {};
var AssetManagement = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(AssetManagement, _Component);

  function AssetManagement(props) {
    (0, _classCallCheck3.default)(this, AssetManagement);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AssetManagement.__proto__ || (0, _getPrototypeOf2.default)(AssetManagement)).call(this, props));

    _this.loadAsset = function (treeNode) {
      return new _promise2.default(function (resolve) {
        if (treeNode.props.eventKey === "_temp_id") {
          refreshTreeData(_this.state.treeData, "_temp_id", {}, "del", _this);
          _this.setState({
            treeData: [].concat((0, _toConsumableArray3.default)(_this.state.treeData))
          });
          resolve();
          return;
        }
        if (treeNode.props.children) {
          resolve();
          return;
        }
        var url = _getConfig2.default.host + "/sys/resource/list";
        if (treeNode.props.eventKey !== "_root_id") {
          url = _getConfig2.default.host + "/sys/resource/list?id=" + treeNode.props.eventKey;
        }
        _request2.default.GET(url).then(function (res) {
          treeNode.props.dataRef.children = res;
          _this.setState({
            treeData: [].concat((0, _toConsumableArray3.default)(_this.state.treeData))
          });
          resolve();
        });
      });
    };

    _this.state = {
      selectedRows: [],
      assetRecord: {},
      roleSelectedRows: [],
      currentAssetId: "_root_id",
      treeData: [{
        id: "_root_id",
        name: "系统资源",
        children: []
      }],
      params: {}
    };
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.tNodeOnMouseOver = _this.tNodeOnMouseOver.bind(_this);
    _this.treeNodeSelect = _this.treeNodeSelect.bind(_this);
    _this.loadRootAsset = _this.loadRootAsset.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(AssetManagement, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadRootAsset();
    }
  }, {
    key: "loadRootAsset",
    value: function loadRootAsset() {
      var _this2 = this;

      _request2.default.GET(_getConfig2.default.host + "/sys/resource/list").then(function (res) {
        _this2.state.treeData[0].children = res;
        _this2.setState({
          treeData: [].concat((0, _toConsumableArray3.default)(_this2.state.treeData))
        });
      });
    }
  }, {
    key: "refreshAssetListByAssetId",
    value: function refreshAssetListByAssetId(id) {
      var _this3 = this;

      _request2.default.GET(_getConfig2.default.host + "/sys/resource/list?id=" + id).then(function (res) {
        refreshTreeData(_this3.state.treeData, id, res);
        _this3.setState({
          treeData: [].concat((0, _toConsumableArray3.default)(_this3.state.treeData))
        });
      });
    }
  }, {
    key: "loadData",
    value: function loadData(params) {
      var _this4 = this;

      this.changeParams(params);
      _request2.default.GET(_getConfig2.default.host + "/sys/authority/listRole?resourceId=" + this.state.params.id).then(function (rs) {
        _this4.setState({
          roleSelectedRows: rs.data
        });
      });
    }
  }, {
    key: "changeParams",
    value: function changeParams(params) {
      var _this5 = this;

      if ((typeof params === "undefined" ? "undefined" : (0, _typeof3.default)(params)) === "object") {
        (0, _keys2.default)(params).every(function (k) {
          var element = params[k];
          _this5.state.params[k] = element;
          return true;
        });
      }
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      var _this6 = this;

      e.preventDefault();
      this.props.form.validateFieldsAndScroll(function (err, fields) {
        if (!err) {
          var values = JSON.parse((0, _stringify2.default)(fields));
          var currentAssetId = _this6.state.currentAssetId;

          if (currentAssetId) {
            values.id = _this6.state.currentAssetId !== "_root_id" ? _this6.state.currentAssetId : "";
          }
          if (values.pid === "_root_id") {
            values.pid = "";
          }
          _request2.default.POST(_getConfig2.default.host + "/sys/resource/save", { body: values }).then(function (res) {
            if (res.success) {
              if (currentAssetId) {
                _notification3.default.success({
                  message: "修改成功"
                });
              } else {
                _notification3.default.success({
                  message: "创建成功"
                });
              }

              if (_this6.state.assetRecord.pid !== "_root_id") {
                _this6.refreshAssetListByAssetId(_this6.state.assetRecord.pid);
              } else {
                _this6.loadRootAsset();
              }
              _this6.setState({
                selectedKeys: [res.data],
                assetRecord: (0, _extends3.default)({}, _this6.state.assetRecord, fields, { id: res.data }),
                currentAssetId: res.data
              });
              _this6.props.form.resetFields();
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
        refreshTreeData(this.state.treeData, "_temp_id", {}, "del", this);
        var assetRecord = e.node ? e.node.props.dataRef : { id: "_root_id" };
        if (!assetRecord.pid && assetRecord.id !== "_root_id") {
          assetRecord.pid = "_root_id";
        }
        this.setState({
          currentAssetId: assetRecord.id,
          selectedKeys: selectedKeys,
          assetRecord: assetRecord
        });
        if (assetRecord.id !== "_root_id" && assetRecord.id !== "_temp_id") {
          this.loadData({ id: selectedKeys[0] });
        } else {
          this.setState({
            roleSelectedRows: []
          });
        }
      }
    }
  }, {
    key: "authorityAdd",
    value: function authorityAdd(roleSelectedRows) {
      var _this7 = this;

      var roleIds = roleSelectedRows.map(function (item) {
        return item.id;
      }).join(",");
      var currentAssetId = this.state.currentAssetId;

      _request2.default.POST(_getConfig2.default.host + "/sys/authority/batchAddRole", {
        body: {
          roleIds: roleIds,
          resourceId: currentAssetId
        }
      }).then(function (res) {
        if (res.success) {
          _notification3.default.success({
            message: "操作成功"
          });
          _this7.setState({
            roleSelectedRows: roleSelectedRows
          });
        } else {
          _notification3.default.error({
            message: res.msg
          });
        }
      });
    }
  }, {
    key: "authorityDel",
    value: function authorityDel(roleId) {
      var currentAssetId = this.state.currentAssetId;

      _request2.default.POST(_getConfig2.default.host + "/sys/authority/delete", {
        body: {
          roleId: roleId,
          resourceId: currentAssetId
        }
      }).then(function (res) {
        if (res.success) {
          _notification3.default.success({
            message: "操作成功"
          });
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
          span: 5
        },
        wrapperCol: {
          span: 19
        }
      };
      var assetRecord = this.state.assetRecord;
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
      var content = function content(item) {
        if (item.id !== "_root_id") {
          return _react2.default.createElement(
            "div",
            {
              style: {
                cursor: "pointer"
              }
            },
            _react2.default.createElement(
              "p",
              {
                onClick: function onClick() {
                  options.add(item, _this8);
                },
                role: "presentation"
              },
              "\u6DFB\u52A0\u8D44\u6E90"
            ),
            _react2.default.createElement(
              "p",
              {
                onClick: function onClick() {
                  options.move(item, _this8);
                },
                role: "presentation"
              },
              "\u79FB\u52A8\u5230"
            ),
            _react2.default.createElement(
              "p",
              {
                onClick: function onClick() {
                  options.del(item, _this8);
                },
                role: "presentation"
              },
              "\u5220\u9664"
            )
          );
        }
        return _react2.default.createElement(
          "div",
          {
            style: {
              cursor: "pointer"
            }
          },
          _react2.default.createElement(
            "p",
            {
              onClick: function onClick() {
                options.add(item, _this8);
              },
              role: "presentation"
            },
            "\u6DFB\u52A0\u8D44\u6E90"
          )
        );
      };
      var renderSelectTreeNodes = function renderSelectTreeNodes(data) {
        return data.map(function (item) {
          return _react2.default.createElement(
            TNode,
            {
              key: item.id,
              dataRef: item,
              title: item.name,
              value: item.id
            },
            item.children && renderSelectTreeNodes(item.children)
          );
        });
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
                item.id !== "_temp_id" && _react2.default.createElement(
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
      var renderSelectedRoles = function renderSelectedRoles(data) {
        if (data.length > 0) {
          return data.map(function (item, i) {
            return _react2.default.createElement(
              "div",
              {
                key: item.id,
                style: {
                  border: "1px solid #dfdfdf",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  margin: "5px"
                }
              },
              _react2.default.createElement(
                "span",
                null,
                item.name
              ),
              _react2.default.createElement(
                "span",
                {
                  role: "presentation",
                  style: {
                    cursor: "pointer"
                  },
                  onClick: function onClick() {
                    _this8.state.roleSelectedRows.splice(i, 1);
                    _this8.setState({
                      roleSelectedRows: [].concat((0, _toConsumableArray3.default)(_this8.state.roleSelectedRows))
                    });
                    _this8.authorityDel(item.id);
                  }
                },
                _react2.default.createElement(_index.Icon, { type: "close" })
              )
            );
          });
        }
        return _react2.default.createElement(
          "div",
          {
            style: {
              color: "#dfdfdf"
            }
          },
          "\u6682\u672A\u6388\u6743\u4EFB\u4F55\u89D2\u8272"
        );
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
            "\u8D44\u6E90\u7BA1\u7406"
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
                loadData: this.loadAsset,
                className: "business-org-tree",
                selectedKeys: this.state.selectedKeys,
                onSelect: this.treeNodeSelect,
                defaultExpandedKeys: ["_root_id"]
              },
              renderTreeNodes(this.state.treeData || [])
            )
          ),
          this.state.currentAssetId !== "_root_id" ? _react2.default.createElement(
            "div",
            { style: {
                flex: "1 1 auto"
              }
            },
            _react2.default.createElement(
              _row2.default,
              { type: "flex", justify: "space-around", style: { marginBottom: 20 } },
              _react2.default.createElement(
                _col2.default,
                {
                  span: 12,
                  style: {
                    fontSize: "16px", paddingLeft: "20px", display: "flex", alignItems: "center"
                  }
                },
                _react2.default.createElement(_index.Icon, { style: { fontSize: "20px" }, type: "file-text" }),
                "\u8D44\u6E90\u8BE6\u60C5"
              ),
              _react2.default.createElement(
                _col2.default,
                { span: 12, style: { fontSize: "16px", textAlign: "right" } },
                _react2.default.createElement(_index.Button, { title: "\u4FDD\u5B58", type: "primary", style: { marginLeft: 25 }, onClick: this.handleSubmit }),
                _react2.default.createElement(_index.Button, { title: "\u91CD\u7F6E", type: "primary", style: { marginLeft: 25 }, onClick: function onClick() {
                    return _this8.props.form.resetFields();
                  } })
              )
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
                    label: "\u7F16\u53F7"
                  }),
                  getFieldDecorator("code", {
                    rules: [{ required: true, message: "请填写编号!" }, { max: 10, message: "最多12个字符!" }],
                    initialValue: assetRecord.code
                  })(_react2.default.createElement(_index.Input, { placeholder: "\u8BF7\u586B\u5199\u7F16\u53F7" }))
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
                      required: true, type: "string", message: "请填写名称"
                    }, {
                      max: 10, message: "最多10个字符"
                    }],
                    initialValue: assetRecord.name
                  })(_react2.default.createElement(_index.Input, { placeholder: "\u8BF7\u586B\u5199\u7F16\u7801" }))
                ),
                _react2.default.createElement(
                  FormItem,
                  (0, _extends3.default)({
                    style: { display: "flex", justifyContent: "center" }
                  }, formItemLayout, {
                    label: "\u56FE\u6807"
                  }),
                  getFieldDecorator("icon", {
                    rules: [{
                      max: 50, message: "最多50个字符"
                    }],
                    initialValue: assetRecord.icon
                  })(_react2.default.createElement(_index.Input, { placeholder: "\u8BF7\u586B\u5199\u56FE\u6807" }))
                ),
                _react2.default.createElement(
                  FormItem,
                  (0, _extends3.default)({
                    style: { display: "flex", justifyContent: "center" }
                  }, formItemLayout, {
                    label: "\u8DEF\u5F84"
                  }),
                  getFieldDecorator("url", {
                    rules: [{
                      max: 100, message: "最多100个字符"
                    }],
                    initialValue: assetRecord.url
                  })(_react2.default.createElement(_index.Input, { placeholder: "\u8BF7\u586B\u5199\u8DEF\u5F84" }))
                ),
                _react2.default.createElement(
                  FormItem,
                  (0, _extends3.default)({
                    style: { display: "flex", justifyContent: "center" }
                  }, formItemLayout, {
                    label: "\u6392\u5E8F"
                  }),
                  getFieldDecorator("sort", {
                    initialValue: assetRecord.sort || 0
                  })(_react2.default.createElement(_index.InputNumber, { min: 0 }))
                ),
                _react2.default.createElement(
                  FormItem,
                  (0, _extends3.default)({
                    style: { display: "flex", justifyContent: "center" }
                  }, formItemLayout, {
                    label: "\u8D44\u6E90\u7C7B\u578B"
                  }),
                  getFieldDecorator("type", {
                    initialValue: assetRecord.type ? assetRecord.type.toString() : ""
                  })(_react2.default.createElement(_index.RadioGroup, { options: assetOptions }))
                ),
                _react2.default.createElement(
                  FormItem,
                  (0, _extends3.default)({
                    style: { display: "flex", justifyContent: "center" }
                  }, formItemLayout, {
                    label: "\u52A0\u8F7D\u65B9\u5F0F"
                  }),
                  getFieldDecorator("loadType", {
                    initialValue: assetRecord.loadType ? assetRecord.loadType : ""
                  })(_react2.default.createElement(_index.RadioGroup, { options: loadTypeOptions }))
                ),
                _react2.default.createElement(
                  FormItem,
                  (0, _extends3.default)({
                    style: { display: "flex", justifyContent: "center" }
                  }, formItemLayout, {
                    label: "\u4E0A\u7EA7"
                  }),
                  getFieldDecorator("pid", {
                    rules: [{
                      required: true, message: "请选择上级!"
                    }],
                    initialValue: assetRecord.pid
                  })(_react2.default.createElement(
                    _treeSelect2.default,
                    {
                      placeholder: "\u8BF7\u9009\u62E9\u4E0A\u7EA7",
                      disabled: true
                    },
                    renderSelectTreeNodes(this.state.treeData)
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
                      max: 150, message: "最多150个字符"
                    }],
                    initialValue: assetRecord.icon
                  })(_react2.default.createElement(_index.Input.TextArea, { placeholder: "\u8BF7\u586B\u5199\u5907\u6CE8" }))
                )
              )
            ),
            _react2.default.createElement(
              _row2.default,
              { type: "flex", justify: "space-around" },
              _react2.default.createElement(
                _col2.default,
                {
                  span: 12,
                  style: {
                    fontSize: "16px", paddingLeft: "20px", display: "flex", alignItems: "center"
                  }
                },
                _react2.default.createElement(_index.Icon, { style: { fontSize: "20px" }, type: "safety" }),
                "\u89D2\u8272\u6388\u6743"
              ),
              _react2.default.createElement(
                _col2.default,
                { span: 12, style: { fontSize: "16px", textAlign: "right" } },
                _react2.default.createElement(_index.Button, { title: "\u89D2\u8272\u6388\u6743", disabled: !this.state.assetRecord.id, type: "primary", onClick: function onClick() {
                    _this8.setState({ roleListVisible: true });
                  } })
              )
            ),
            _react2.default.createElement(
              _row2.default,
              null,
              _react2.default.createElement(
                _card2.default,
                {
                  style: {
                    marginTop: "20px"
                  }
                },
                _react2.default.createElement(
                  "div",
                  {
                    style: {
                      marginTop: "20px",
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center"
                    }
                  },
                  renderSelectedRoles(this.state.roleSelectedRows)
                )
              )
            )
          ) : _react2.default.createElement(
            "div",
            {
              style: {
                flex: "1 1 auto",
                color: "#eeeeee",
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"

              }
            },
            _react2.default.createElement(_index.Icon, { type: "exclamation-circle", style: { fontSize: "20px", marginRight: 10 } }),
            "\u8BF7\u9009\u62E9\u9009\u62E9\u4E00\u4E2A\u8D44\u6E90"
          ),
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_roleListModal2.default, {
              visible: this.state.roleListVisible,
              key: "role-modal",
              type: "checkbox",
              roleSelectedRows: this.state.roleSelectedRows,
              onSelectedRows: function onSelectedRows(roleSelectedRows) {
                _this8.authorityAdd(roleSelectedRows);
              },
              hideModal: function hideModal() {
                return _this8.setState({ roleListVisible: false });
              }
            })
          ),
          _react2.default.createElement(
            _modal2.default,
            {
              visible: this.state.assetMoveVisible,
              footer: null,
              closable: false,
              style: {
                width: "358px",
                borderRadius: "5px",
                overflow: "hidden"
              }
            },
            this.state.assetMoveVisible && _react2.default.createElement(_assetMove2.default, {
              key: "asset",
              dataSource: this.state.assetRecord,
              treeData: this.state.treeData,
              hideModal: function hideModal() {
                return _this8.setState({ assetMoveVisible: false });
              },
              refresh: function refresh(node) {
                console.log(_this8.state.assetRecord);

                if (node.pid !== "_root_id") {
                  _this8.refreshAssetListByAssetId(node.pid);
                } else {
                  _this8.loadRootAsset();
                }
                if (_this8.state.assetRecord.pid !== "_root_id") {
                  _this8.refreshAssetListByAssetId(_this8.state.assetRecord.pid);
                } else {
                  _this8.loadRootAsset();
                }
              }
            })
          )
        )
      );
    }
  }]);
  return AssetManagement;
}(_react.Component), _class.propTypes = {
  operation: _propTypes2.default.object,

  type: _propTypes2.default.oneOf(["normal", "radio", "checkbox"]),

  style: _propTypes2.default.object
}, _class.defaultProps = {
  operation: {},
  type: "normal",
  style: {}
}, _temp);
exports.default = _form2.default.create()(AssetManagement);