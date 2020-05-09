"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _row = require("antd/lib/row");

var _row2 = _interopRequireDefault(_row);

var _input = require("antd/lib/input");

var _input2 = _interopRequireDefault(_input);

var _col = require("antd/lib/col");

var _col2 = _interopRequireDefault(_col);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _tooltip = require("antd/lib/tooltip");

var _tooltip2 = _interopRequireDefault(_tooltip);

var _popconfirm = require("antd/lib/popconfirm");

var _popconfirm2 = _interopRequireDefault(_popconfirm);

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

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _class, _temp2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _polished = require("polished");

var _tableAbstract = require("../../abstract/tableAbstract/tableAbstract.js");

var _tableAbstract2 = _interopRequireDefault(_tableAbstract);

var _button = require("../../base/button/button.js");

var _button2 = _interopRequireDefault(_button);

var _icon = require("../../base/icon/icon.js");

var _icon2 = _interopRequireDefault(_icon);

var _input3 = require("../../base/input/input.js");

var _input4 = _interopRequireDefault(_input3);

var _print2 = require("../../base/print/print.js");

var _print3 = _interopRequireDefault(_print2);

var _notification = require("../../base/notification/notification.js");

var _notification2 = _interopRequireDefault(_notification);

var _tableDetail = require("./tableDetail.js");

var _tableDetail2 = _interopRequireDefault(_tableDetail);

var _storage = require("../../util/localData/storage.js");

var _storage2 = _interopRequireDefault(_storage);

var _request = require("../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = (0, _extends3.default)({}, (0, _polished.margin)(0, 0, 0, " " + _getConfig2.default["@padding-sm"]));

var clearAdvancedSearchValue = function clearAdvancedSearchValue(_this) {
  var _this$advancedSearchG = _this.advancedSearchGroupPropsArray,
      advancedSearchGroupPropsArray = _this$advancedSearchG === undefined ? [] : _this$advancedSearchG;

  var newState = {};
  advancedSearchGroupPropsArray.forEach(function (item) {
    newState[item.key] = "";
  });
  _this.setState(newState);
};

var TableCRUD = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(TableCRUD, _Component);

  function TableCRUD() {
    var _ref;

    var _temp, _this2, _ret;

    (0, _classCallCheck3.default)(this, TableCRUD);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref = TableCRUD.__proto__ || (0, _getPrototypeOf2.default)(TableCRUD)).call.apply(_ref, [this].concat(args))), _this2), _this2.composeActionGroup = function (actionGroup) {
      return function (_this) {
        return _react2.default.createElement(
          "div",
          null,
          _this2.props.hasAdd && _react2.default.createElement(_button2.default, {
            style: styles,
            icon: "plus",
            title: "\u65B0\u589E",
            onClick: function onClick() {
              _this.setState({
                modalContent: _this2.composeDetail({
                  readonly: false,
                  detailId: "",
                  parentThis: _this
                })
              });
              _this.toggleModal();
            }
          }),
          _this2.props.hasDelete && _react2.default.createElement(
            _popconfirm2.default,
            {
              title: "\u786E\u8BA4\u5220\u9664\u9009\u4E2D\u9879\uFF1F",
              placement: "bottom",
              okText: "\u786E\u8BA4",
              cancelText: "\u53D6\u6D88",
              onConfirm: function onConfirm() {
                if (!_this.state.selectedRows || !_this.state.selectedRows.length) {
                  _notification2.default.warn({ message: "请选择删除项" });
                  return false;
                }

                var _ref2 = _this2.props.customURL || {
                  deleteURL: {
                    url: _this2.props.restURL,
                    method: "DELETE"
                  }
                },
                    deleteURL = _ref2.deleteURL;

                return _this2.delete(deleteURL, _this.state.selectedRowKeys, _this);
              }
            },
            _react2.default.createElement(_button2.default, {
              style: styles,
              icon: "delete",
              title: "\u5220\u9664\u9009\u4E2D",
              primary: !1
            })
          ),
          _this2.props.hasExport && _react2.default.createElement(_button2.default, {
            style: styles,
            icon: "download",
            title: "\u5168\u90E8\u5BFC\u51FA",
            primary: !1,
            onClick: function onClick() {
              var url = _this2.props.customURL && _this2.props.customURL.exportAllURL;
              _this2.exportAll(url, _this.getSearchParams());
            }
          }),
          _this2.props.hasExport && _react2.default.createElement(_button2.default, {
            style: styles,
            icon: "download",
            title: "\u5BFC\u51FA\u9009\u4E2D",
            primary: !1,
            onClick: function onClick() {
              if (!_this.state.selectedRows || !_this.state.selectedRows.length) {
                _notification2.default.warn({ message: "请选择导出项" });
                return false;
              }
              var url = _this2.props.customURL && _this2.props.customURL.exportPartURL;
              _this2.exportPart(url, { orderIds: _this.state.selectedRowKeys });
            }
          }),
          _this2.props.hasPrint && _react2.default.createElement(_button2.default, {
            style: styles,
            icon: "print",
            title: "\u6253\u5370",
            primary: !1,
            onClick: function onClick() {
              _this2.printTable();
            }
          }),
          actionGroup && actionGroup.map(function (item) {
            return _react2.default.createElement(_button2.default, {
              style: (0, _extends3.default)({}, styles, item.style),
              icon: item.icon,
              title: item.title,
              primary: item.primary ? true : !1,
              onClick: function onClick() {
                if (item.onClick && typeof item.onClick === "function") {
                  item.onClick(_this);
                }
              }
            });
          })
        );
      };
    }, _this2.composeColumns = function () {
      var columns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!(columns instanceof Array) && typeof columns === "function") {
        return columns;
      }
      columns.map(function (item) {
        item.dataIndex = item.key;
        return item;
      });
      return function (_this) {
        return _this2.props.hasOperation ? columns.concat([{
          title: "操作",
          dataIndex: "operationHandle",
          key: "operationHandle",
          render: function render(text, record) {
            return _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(
                _tooltip2.default,
                { placement: "top", title: "\u67E5\u770B" },
                _react2.default.createElement(_icon2.default, {
                  type: "profile",
                  onClick: function onClick() {
                    _this.setState({
                      modalContent: _this2.composeDetail({
                        readonly: true,
                        detailId: record.id,
                        parentThis: _this
                      })
                    });
                    _this.toggleModal();
                  }
                })
              ),
              _this2.props.hasUpdate && _react2.default.createElement(
                _tooltip2.default,
                { placement: "top", title: "\u7F16\u8F91" },
                _react2.default.createElement(_icon2.default, {
                  style: styles,
                  type: "edit",
                  onClick: function onClick() {
                    _this.setState({
                      modalContent: _this2.composeDetail({
                        readonly: false,
                        detailId: record.id,
                        parentThis: _this
                      })
                    });
                    _this.toggleModal();
                  }
                })
              ),
              _this2.props.hasDelete && _react2.default.createElement(
                _popconfirm2.default,
                {
                  title: "\u786E\u8BA4\u5220\u9664\uFF1F",
                  okText: "\u786E\u8BA4",
                  cancelText: "\u53D6\u6D88",
                  onConfirm: function onConfirm() {
                    var _ref3 = _this2.props.customURL || {
                      deleteURL: {
                        url: _this2.props.restURL,
                        method: "DELETE"
                      }
                    },
                        deleteURL = _ref3.deleteURL;

                    return _this2.delete(deleteURL, [record.id], _this);
                  }
                },
                _react2.default.createElement(
                  _tooltip2.default,
                  { placement: "top", title: "\u5220\u9664" },
                  _react2.default.createElement(_icon2.default, {
                    style: styles,
                    type: "delete"
                  })
                )
              )
            );
          }
        }]) : columns;
      };
    }, _this2.composeAdvancedSearchGroup = function () {
      var advancedSearchGroup = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!(advancedSearchGroup instanceof Array)) {
        return false;
      }

      var searchFormItem = {
        input: function input(item, _this) {
          return _react2.default.createElement(_input4.default, {
            key: item.key,
            placeholder: item.placeholder,
            value: _this.state[item.key],
            onChange: function onChange(e) {
              _this.setState((0, _defineProperty3.default)({}, item.key, e.target.value));
            }
          });
        }
      };
      var advancedSearchGroupLength = advancedSearchGroup.length;
      if (!advancedSearchGroupLength) {
        return function () {};
      }
      console.log("advancedSearchGroupLength", advancedSearchGroupLength);
      var newAdvancedSearchGroup = function newAdvancedSearchGroup(_this) {
        _this.advancedSearchGroupPropsArray = advancedSearchGroup;

        return advancedSearchGroup.map(function (item) {
          return _react2.default.createElement(
            _col2.default,
            { key: item.key, span: advancedSearchGroupLength > 4 ? 6 : 24 / advancedSearchGroupLength },
            _react2.default.createElement(
              _col2.default,
              { span: 10, style: { textAlign: "right", lineHeight: _getConfig2.default["@input-height-base"] } },
              item.title,
              "\uFF1A"
            ),
            _react2.default.createElement(
              _col2.default,
              { span: 14 },
              searchFormItem[item.type] && searchFormItem[item.type](item, _this)
            )
          );
        });
      };

      return function (_this) {
        return _react2.default.createElement(
          "div",
          { style: { width: "100%" } },
          newAdvancedSearchGroup(_this),
          _react2.default.createElement(
            _col2.default,
            { span: 20, push: 2 },
            _react2.default.createElement(_button2.default, {
              style: styles,

              title: "\u67E5\u8BE2",
              onClick: function onClick() {
                _this.loadData();

                _this2.forceUpdate();
              }
            }),
            _react2.default.createElement(_button2.default, {
              style: styles,

              primary: !1,
              title: "\u6E05\u9664",
              onClick: function onClick() {
                return clearAdvancedSearchValue(_this);
              }
            })
          )
        );
      };
    }, _this2.composeDetail = function (_ref4) {
      var readonly = _ref4.readonly,
          detailId = _ref4.detailId,
          parentThis = _ref4.parentThis;
      var _this2$props = _this2.props,
          detailTitle = _this2$props.detailTitle,
          detailForm = _this2$props.detailForm,
          detailColumn = _this2$props.detailColumn,
          detailItemCol = _this2$props.detailItemCol,
          detailBordered = _this2$props.detailBordered,
          customURL = _this2$props.customURL,
          restURL = _this2$props.restURL;

      var _ref5 = customURL || {
        getDetailURL: { url: restURL, method: "GET" },
        addURL: { url: restURL, method: "POST" },
        updateURL: { url: restURL, method: "PUT" }
      },
          getDetailURL = _ref5.getDetailURL,
          addURL = _ref5.addURL,
          updateURL = _ref5.updateURL;

      return _react2.default.createElement(_tableDetail2.default, {
        title: detailTitle,
        formItemGroup: detailForm,
        column: detailColumn,
        itemCol: detailItemCol,
        getDetailURL: getDetailURL,
        addURL: addURL,
        updateURL: updateURL,
        detailId: detailId,
        readonly: readonly,
        parentThis: parentThis,
        bordered: detailBordered
      });
    }, _this2.composeFilterGroup = function (advancedSearchGroup) {
      return function (_this) {
        return _react2.default.createElement(
          _row2.default,
          { style: { minWidth: "450px" } },
          _react2.default.createElement(
            _col2.default,
            { span: advancedSearchGroup ? 18 : 24 },
            _react2.default.createElement(_input2.default.Search, {
              id: "ATInputSearch",
              placeholder: "\u5185\u5BB9\u5173\u952E\u5B57",
              enterButton: true,
              onChange: function onChange(e) {
                _this.setState({
                  search: e.target.value
                });
              },
              onSearch: function onSearch() {
                return _this.loadData();
              }
            })
          ),
          advancedSearchGroup && _react2.default.createElement(
            _col2.default,
            { span: 6 },
            _react2.default.createElement(_button2.default, {
              style: styles,
              icon: "filter",
              primary: !1,
              title: "\u9AD8\u7EA7\u67E5\u8BE2",
              onClick: function onClick() {
                clearAdvancedSearchValue(_this);
                _this.setState(function (prevSate) {
                  return {
                    advancedSearchShowed: !prevSate.advancedSearchShowed
                  };
                });

                _this2.forceUpdate();
              }
            })
          )
        );
      };
    }, _this2.delete = function () {
      var deleteURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var params = arguments[1];
      var _this = arguments[2];
      var method = deleteURL.method;
      var url = deleteURL.url;

      if (params.length > 1) {
        url = _getConfig2.default.host + "/" + url;
      } else {
        url = _getConfig2.default.host + "/" + url + "/" + params[0];
      }
      _request2.default[method && method.toUpperCase() || "DELETE"](url, {
        body: { ids: params },
        params: { ids: params }
      }).then(function (res) {
        if (res.success) {
          Notification.success({
            message: "删除成功"
          });
          _this.loadData();
        } else {
          Notification.success({
            message: res.msg
          });
        }
      });
    }, _this2.export = function (url, params) {
      var Authentication = _storage2.default.get("Authentication").replace("\"", "").replace("\"", "");
      window.location.href = (0, _request.urlAppendQuery)(_getConfig2.default.host + "/" + url, (0, _extends3.default)({}, params, { Authentication: Authentication }));
    }, _this2.exportAll = function (url, params) {
      if (!url) {
        console.error("请设置Table导出接口的地址customURL.exportAllURL");
        return false;
      }
      _this2.export(url, params);
    }, _this2.exportPart = function (url, params) {
      if (!url) {
        console.error("请设置Table导出接口的地址customURL.exportPartURL");
        return false;
      }
      _this2.export(url, params);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this2, _ret);
  }

  (0, _createClass3.default)(TableCRUD, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var props = this.props,
          state = this.state;
      var bordered = props.bordered,
          rowKey = props.rowKey,
          title = props.title,
          type = props.type,
          columns = props.columns,
          pagination = props.pagination,
          filterGroup = props.filterGroup,
          advancedSearchGroup = props.advancedSearchGroup,
          actionGroup = props.actionGroup,
          dataSourceKey = props.dataSourceKey,
          hasAdd = props.hasAdd,
          hasUpdate = props.hasUpdate,
          hasDelete = props.hasDelete,
          hasExport = props.hasExport,
          hasPrint = props.hasPrint,
          restURL = props.restURL,
          customURL = props.customURL;

      var _ref6 = customURL || {
        getURL: { url: restURL }
      },
          getURL = _ref6.getURL;

      return _react2.default.createElement(
        _print3.default,
        {
          print: function print(_print) {
            _this3.printTable = _print;
          },
          beforePrint: function beforePrint() {
            var ATInputSearch = document.getElementById("ATInputSearch");
            if (ATInputSearch) {
              ATInputSearch.style.minHeight = 0;

              _this3.forceUpdate();
            }
          }
        },
        _react2.default.createElement(_tableAbstract2.default, {
          bordered: bordered,
          rowKey: rowKey,
          title: title,
          type: type,
          getURL: getURL,
          dataSourceKey: dataSourceKey,
          pagination: pagination,
          columns: this.composeColumns(columns),
          filterGroup: filterGroup ? this.composeFilterGroup(advancedSearchGroup) : function () {
            return _react2.default.createElement("div", null);
          },
          advancedSearchGroup: this.composeAdvancedSearchGroup(advancedSearchGroup),
          actionGroup: this.composeActionGroup(actionGroup),
          hasAdd: hasAdd,
          hasUpdate: hasUpdate,
          hasDelete: hasDelete,
          hasExport: hasExport,
          hasPrint: hasPrint
        })
      );
    }
  }]);
  return TableCRUD;
}(_react.Component), _class.propTypes = {
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),

  filterGroup: _propTypes2.default.bool,

  advancedSearchGroup: _propTypes2.default.array,

  actionGroup: _propTypes2.default.array,

  pagination: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),

  columns: _propTypes2.default.array,

  type: _propTypes2.default.oneOf(["normal", "radio", "checkbox"]),

  hasOperation: _propTypes2.default.bool,

  hasAdd: _propTypes2.default.bool,

  hasUpdate: _propTypes2.default.bool,

  hasDelete: _propTypes2.default.bool,

  hasExport: _propTypes2.default.bool,

  hasPrint: _propTypes2.default.bool,

  dataSourceKey: _propTypes2.default.string,

  restURL: _propTypes2.default.string,

  customURL: _propTypes2.default.object,

  detailForm: _propTypes2.default.array,

  detailColumn: _propTypes2.default.number,

  detailItemCol: _propTypes2.default.array,

  detailBordered: _propTypes2.default.bool
}, _class.defaultProps = {
  columns: [{
    title: "名称12",
    key: "name"
  }, {
    title: "编码33",
    key: "code"
  }, {
    title: "描述44",
    key: "description"
  }],

  filterGroup: true,
  hasOperation: true,
  hasAdd: true,
  hasUpdate: true,
  hasDelete: true,
  hasExport: false,
  hasPrint: false

}, _temp2);
exports.default = TableCRUD;