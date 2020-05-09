"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _divider = require("antd/lib/divider");

var _divider2 = _interopRequireDefault(_divider);

var _card = require("antd/lib/card");

var _card2 = _interopRequireDefault(_card);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

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

var _modal = require("antd/lib/modal");

var _modal2 = _interopRequireDefault(_modal);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _class, _temp2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _polished = require("polished");

var _input = require("../../base/input/input.js");

var _input2 = _interopRequireDefault(_input);

var _button = require("../../base/button/button.js");

var _button2 = _interopRequireDefault(_button);

var _form = require("../../base/form/form.js");

var _notification = require("../../base/notification/notification.js");

var _notification2 = _interopRequireDefault(_notification);

var _tableClassicCRUD = require("../../common/tableCRUD/tableClassicCRUD");

var _tableClassicCRUD2 = _interopRequireDefault(_tableClassicCRUD);

var _request = require("../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = (0, _extends3.default)({}, (0, _polished.margin)(0, 0, 0, " " + _getConfig2.default["@padding-sm"]));

var urls = {
  getListURL: "dict/list",
  postListURL: "dict/add",
  updateListURL: "dict/update",
  deleteListURL: "dict/batchDelete",
  getDetailListURL: "dict/get",

  getItemURL: "dict/item/list",
  postItemURL: "dict/item/add",
  updateItemURL: "dict/item/update",
  deleteItemURL: "dict/item/batchDelete",
  getDetailItemURL: "dict/item/get"
};

var getDataFormState = function getDataFormState(state) {
  var selectedRows = state.selectedRows;

  var selectedId = [];
  if (selectedRows && selectedRows.length > 0) {
    selectedRows.forEach(function (v) {
      selectedId.push(v.id);
    });
  }
  return selectedId;
};

var listDetailComponent = function listDetailComponent(props) {
  var form = props.form,
      listThis = props.listThis,
      type = props.type,
      _props$oneDetail = props.oneDetail,
      oneDetail = _props$oneDetail === undefined ? {} : _props$oneDetail;
  var getFieldDecorator = form.getFieldDecorator;

  var formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 }
  };
  var bindNode = document.getElementById("detailRoot");
  var handleSubmit = function handleSubmit() {
    var validateFields = form.validateFields;

    validateFields(function (err, values) {
      if (!err) {
        if (type === "updateURL") {
          values.id = oneDetail.id;
          values.status = oneDetail.status;
        }
        _request2.default.POST(_getConfig2.default.host + "/" + listThis.props[type], {
          body: values
        }).then(function (res) {
          if (res.success) {
            _notification2.default.success({
              message: res.msg
            });
            listThis.loadData();
            (0, _reactDom.unmountComponentAtNode)(bindNode);
          } else {
            _notification2.default.error({
              message: res.msg
            });
          }
        });
      }
    });
  };
  var formTitle = {
    postURL: "新增",
    updateURL: "编辑"
  };
  return _react2.default.createElement(
    _form.Form,
    { title: formTitle[type], handleSubmit: handleSubmit },
    _react2.default.createElement(
      _form.FormItem,
      (0, _extends3.default)({}, formItemLayout, {
        label: "\u540D\u79F0"
      }),
      getFieldDecorator("name", {
        initialValue: oneDetail.name,
        rules: [{ required: true, message: "名称必填!" }]
      })(_react2.default.createElement(_input2.default, null))
    ),
    _react2.default.createElement(
      _form.FormItem,
      (0, _extends3.default)({}, formItemLayout, {
        label: "\u7F16\u53F7"
      }),
      getFieldDecorator("code", {
        initialValue: oneDetail.code,
        rules: [{ required: true, message: "编号必填!" }]
      })(_react2.default.createElement(_input2.default, null))
    ),
    _react2.default.createElement(
      _form.FormItem,
      (0, _extends3.default)({}, formItemLayout, {
        label: "\u5907\u6CE8"
      }),
      getFieldDecorator("description", {
        initialValue: oneDetail.description || "",
        rules: []
      })(_react2.default.createElement(_input2.default, null))
    )
  );
};

var itemDetailComponent = function itemDetailComponent(props) {
  var form = props.form,
      listThis = props.listThis,
      type = props.type,
      _props$oneDetail2 = props.oneDetail,
      oneDetail = _props$oneDetail2 === undefined ? {} : _props$oneDetail2;
  var getFieldDecorator = form.getFieldDecorator;

  var formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 }
  };
  console.log("oneDetail", oneDetail);
  var bindNode = document.getElementById("detailRoot");
  var handleSubmit = function handleSubmit() {
    var validateFields = form.validateFields;

    console.log("___________+++++++++++", listThis);
    validateFields(function (err, values) {
      if (!err) {
        values.dictId = oneDetail.dictId * 1;
        if (type === "updateURL") {
          values.id = oneDetail.id;
        }
        _request2.default.POST(_getConfig2.default.host + "/" + listThis.props[type], {
          body: values
        }).then(function (res) {
          if (res.success) {
            _notification2.default.success({
              message: res.msg
            });
            listThis.loadData();
            (0, _reactDom.unmountComponentAtNode)(bindNode);
          } else {
            _notification2.default.error({
              message: res.msg
            });
          }
        });
      }
    });
  };
  var formTitle = {
    postURL: "新增",
    updateURL: "编辑"
  };
  return _react2.default.createElement(
    _form.Form,
    { title: formTitle[type], handleSubmit: handleSubmit },
    _react2.default.createElement(
      _form.FormItem,
      (0, _extends3.default)({}, formItemLayout, {
        label: "\u540D\u79F0"
      }),
      getFieldDecorator("name", {
        initialValue: oneDetail.name,
        rules: [{ required: true, message: "名称必填!" }]
      })(_react2.default.createElement(_input2.default, null))
    ),
    _react2.default.createElement(
      _form.FormItem,
      (0, _extends3.default)({}, formItemLayout, {
        label: "\u503C"
      }),
      getFieldDecorator("value", {
        initialValue: oneDetail.value,
        rules: [{ required: true, message: "编号必填!" }]
      })(_react2.default.createElement(_input2.default, null))
    ),
    _react2.default.createElement(
      _form.FormItem,
      (0, _extends3.default)({}, formItemLayout, {
        label: "\u6392\u5E8F"
      }),
      getFieldDecorator("orderNo", {
        initialValue: oneDetail.orderNo || "",
        rules: [{ pattern: /^\d*$/, message: "只能是数字!" }]
      })(_react2.default.createElement(_input2.default, null))
    ),
    _react2.default.createElement(
      _form.FormItem,
      (0, _extends3.default)({}, formItemLayout, {
        label: "\u5907\u6CE8"
      }),
      getFieldDecorator("description", {
        initialValue: oneDetail.description || "",
        rules: []
      })(_react2.default.createElement(_input2.default, null))
    )
  );
};

var showDetailComponent = function showDetailComponent(_this, type, oneDetail, detailComponent) {
  var Detail = (0, _form.Create)(detailComponent);

  var bindNode = document.getElementById("detailRoot");
  (0, _reactDom.render)(_react2.default.createElement(
    _modal2.default,
    {
      visible: !!1,
      footer: null,
      destroyOnClose: !!1,
      onCancel: function onCancel() {
        (0, _reactDom.unmountComponentAtNode)(bindNode);
      },
      width: "80%"
    },
    _react2.default.createElement(Detail, { listThis: _this, type: type, oneDetail: oneDetail })
  ), bindNode);
};

var multipleHandle = function multipleHandle(_this, type, selectedId) {
  console.log(selectedId);
  _request2.default.POST(_getConfig2.default.host + "/" + _this.props[type], {
    body: {
      ids: selectedId
    }
  }).then(function (res) {
    if (res.success) {
      _notification2.default.success({
        message: res.msg
      });
      _this.loadData();
    } else {
      _notification2.default.error({
        message: res.msg
      });
    }
  });
};

var DataDictionary = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(DataDictionary, _Component);

  function DataDictionary() {
    var _ref;

    var _temp, _this2, _ret;

    (0, _classCallCheck3.default)(this, DataDictionary);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref = DataDictionary.__proto__ || (0, _getPrototypeOf2.default)(DataDictionary)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
      getItemURL: ""
    }, _temp), (0, _possibleConstructorReturn3.default)(_this2, _ret);
  }

  (0, _createClass3.default)(DataDictionary, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          getListURL = _props.getListURL,
          postListURL = _props.postListURL,
          updateListURL = _props.updateListURL,
          deleteListURL = _props.deleteListURL,
          getDetailListURL = _props.getDetailListURL,
          postItemURL = _props.postItemURL,
          updateItemURL = _props.updateItemURL,
          deleteItemURL = _props.deleteItemURL,
          getDetailItemURL = _props.getDetailItemURL;
      var getItemURL = this.state.getItemURL;

      var DataDictionaryItemHOC = function DataDictionaryItemHOC(WrappedComponent) {
        return function (_WrappedComponent) {
          (0, _inherits3.default)(Inheritance, _WrappedComponent);

          function Inheritance() {
            (0, _classCallCheck3.default)(this, Inheritance);
            return (0, _possibleConstructorReturn3.default)(this, (Inheritance.__proto__ || (0, _getPrototypeOf2.default)(Inheritance)).apply(this, arguments));
          }

          (0, _createClass3.default)(Inheritance, [{
            key: "componentDidMount",
            value: function componentDidMount() {
              console.log("$$$$$$$$$$$");
              console.log(this);
            }
          }, {
            key: "render",
            value: function render() {
              return (0, _get3.default)(Inheritance.prototype.__proto__ || (0, _getPrototypeOf2.default)(Inheritance.prototype), "render", this).call(this);
            }
          }]);
          return Inheritance;
        }(WrappedComponent);
      };
      var DataDictionaryItem = DataDictionaryItemHOC(_tableClassicCRUD2.default);
      return _react2.default.createElement(
        "div",
        {
          style: {
            display: "flex"
          }
        },
        _react2.default.createElement(
          _card2.default,
          { title: "\u6570\u636E\u5B57\u5178\u76EE\u5F55" },
          _react2.default.createElement(_tableClassicCRUD2.default, {
            getURL: getListURL,
            postURL: postListURL,
            updateURL: updateListURL,
            deleteURL: deleteListURL,
            getDetailURL: getDetailListURL,
            actionGroup: function actionGroup(_this) {
              return _react2.default.createElement(
                "div",
                {
                  style: {
                    display: "flex"
                  }
                },
                _react2.default.createElement(_input2.default, {
                  placeholder: "\u540D\u79F0",
                  onChange: function onChange(e) {
                    var searchValue = e.target.value;
                    _this.setState({
                      name: searchValue
                    });
                  }
                }),
                _react2.default.createElement(_button2.default, {
                  style: styles,
                  title: "\u67E5\u8BE2",
                  onClick: function onClick() {
                    _this.loadData();
                  }
                }),
                _react2.default.createElement(_button2.default, {
                  style: styles,
                  title: "\u7F16\u8F91",
                  primary: !1,
                  onClick: (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                    var selectedId, url, getOneDetail;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            selectedId = _this4.state.selectedId;

                            console.log(_this4);

                            if (!(!selectedId || selectedId.length === 0)) {
                              _context.next = 5;
                              break;
                            }

                            _notification2.default.warn({
                              message: "请先选择下方的项"
                            });
                            return _context.abrupt("return", false);

                          case 5:
                            url = _getConfig2.default.host + "/" + _this.props.getDetailURL + "/" + selectedId[0];
                            _context.next = 8;
                            return _request2.default.GET(url);

                          case 8:
                            getOneDetail = _context.sent;

                            if (getOneDetail.success) {
                              showDetailComponent(_this, "updateURL", getOneDetail.data, listDetailComponent);
                            }

                          case 10:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, _this4);
                  }))
                }),
                _react2.default.createElement(_button2.default, {
                  style: styles,
                  title: "\u65B0\u589E",
                  primary: !1,
                  onClick: function onClick() {
                    showDetailComponent(_this, "postURL", {}, listDetailComponent);
                  }
                }),
                _react2.default.createElement(_button2.default, {
                  style: styles,
                  title: "\u5220\u9664",
                  primary: !1,
                  onClick: function onClick() {
                    var selectedId = _this4.state.selectedId;

                    if (!selectedId || selectedId.length === 0) {
                      _notification2.default.warn({
                        message: "请先选择下方的项"
                      });
                      return false;
                    }
                    multipleHandle(_this, "deleteURL", selectedId);
                  }
                })
              );
            },
            DataDictionaryThis: this,
            rowSelection: {
              type: "radio",
              onChange: function onChange(selectedRowKeys, selectedRows) {
                var selectedId = getDataFormState({ selectedRows: selectedRows });
                console.log("rowSelection", _this4);
                return _this4.setState({
                  selectedId: selectedId,
                  getItemURL: _this4.props.getItemURL + "/" + selectedId[0]
                });
              }
            }
          })
        ),
        _react2.default.createElement(_divider2.default, { type: "vertical" }),
        _react2.default.createElement(
          _card2.default,
          { title: "\u6570\u636E\u5B57\u5178\u503C" },
          _react2.default.createElement(DataDictionaryItem, {
            getURL: getItemURL,
            postURL: postItemURL,
            updateURL: updateItemURL,
            deleteURL: deleteItemURL,
            getDetailURL: getDetailItemURL,
            DataDictionaryThis: this,
            actionGroup: function actionGroup(_this) {
              return _react2.default.createElement(
                "div",
                {
                  style: {
                    display: "flex"
                  }
                },
                _react2.default.createElement(_input2.default, {
                  placeholder: "\u540D\u79F0",
                  onChange: function onChange(e) {
                    var searchValue = e.target.value;
                    _this.setState({
                      name: searchValue
                    });
                  }
                }),
                _react2.default.createElement(_button2.default, {
                  style: styles,
                  title: "\u67E5\u8BE2",
                  onClick: function onClick() {
                    var selectedId = _this4.state.selectedId;

                    if (!selectedId || selectedId.length === 0) {
                      _notification2.default.warn({
                        message: "请先选择左侧的目录"
                      });
                      return false;
                    }
                    _this.loadData();
                  }
                }),
                _react2.default.createElement(_button2.default, {
                  style: styles,
                  title: "\u7F16\u8F91",
                  primary: !1,
                  onClick: (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                    var selectedId, selectedRows, url, getOneDetail;
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            selectedId = _this4.state.selectedId;

                            if (!(!selectedId || selectedId.length === 0)) {
                              _context2.next = 4;
                              break;
                            }

                            _notification2.default.warn({
                              message: "请先选择左侧的目录"
                            });
                            return _context2.abrupt("return", false);

                          case 4:
                            selectedRows = _this.state.selectedRows;

                            selectedId = getDataFormState({ selectedRows: selectedRows });
                            console.log(selectedId);

                            if (!(!selectedId || selectedId.length === 0)) {
                              _context2.next = 10;
                              break;
                            }

                            _notification2.default.warn({
                              message: "请先选择下方的项"
                            });
                            return _context2.abrupt("return", false);

                          case 10:
                            url = _getConfig2.default.host + "/" + _this.props.getDetailURL + "/" + selectedId[0];
                            _context2.next = 13;
                            return _request2.default.GET(url);

                          case 13:
                            getOneDetail = _context2.sent;

                            if (getOneDetail.success) {
                              showDetailComponent(_this, "updateURL", (0, _extends3.default)({
                                dictId: selectedId[0]
                              }, getOneDetail.data), itemDetailComponent);
                            }

                          case 15:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this4);
                  }))
                }),
                _react2.default.createElement(_button2.default, {
                  style: styles,
                  title: "\u65B0\u589E",
                  primary: !1,
                  onClick: function onClick() {
                    var selectedId = _this4.state.selectedId;

                    if (!selectedId || selectedId.length === 0) {
                      _notification2.default.warn({
                        message: "请先选择左侧的目录"
                      });
                      return false;
                    }
                    showDetailComponent(_this, "postURL", { dictId: selectedId[0] }, itemDetailComponent);
                  }
                }),
                _react2.default.createElement(_button2.default, {
                  style: styles,
                  title: "\u5220\u9664",
                  primary: !1,
                  onClick: function onClick() {
                    var selectedId = _this4.state.selectedId;

                    if (!selectedId || selectedId.length === 0) {
                      _notification2.default.warn({
                        message: "请先选择左侧的目录"
                      });
                      return false;
                    }
                    var selectedRows = _this.state.selectedRows;

                    selectedId = getDataFormState({ selectedRows: selectedRows });
                    console.log(selectedId);
                    if (!selectedId || selectedId.length === 0) {
                      _notification2.default.warn({
                        message: "请先选择下方的项"
                      });
                      return false;
                    }
                    multipleHandle(_this, "deleteURL", selectedId);
                  }
                })
              );
            },
            columns: function columns() {
              return [{
                title: "名称",
                dataIndex: "name",
                key: "name"
              }, {
                title: "值",
                dataIndex: "value",
                key: "value"
              }, {
                title: "排序",
                dataIndex: "orderNo",
                key: "orderNo"
              }, {
                title: "备注",
                dataIndex: "description",
                key: "description"
              }];
            }
          })
        )
      );
    }
  }]);
  return DataDictionary;
}(_react.Component), _class.propTypes = {
  title: _propTypes2.default.string,

  actionGroup: _propTypes2.default.func,

  columns: _propTypes2.default.func,

  getListURL: _propTypes2.default.string,

  postListURL: _propTypes2.default.string,

  updateListURL: _propTypes2.default.string,

  deleteListURL: _propTypes2.default.string,

  getDetailListURL: _propTypes2.default.string,

  getItemURL: _propTypes2.default.string,

  postItemURL: _propTypes2.default.string,

  updateItemURL: _propTypes2.default.string,

  deleteItemURL: _propTypes2.default.string,

  getDetailItemURL: _propTypes2.default.string
}, _class.defaultProps = {
  getListURL: urls.getListURL,
  postListURL: urls.postListURL,
  updateListURL: urls.updateListURL,
  deleteListURL: urls.deleteListURL,
  getDetailListURL: urls.getDetailListURL,

  getItemURL: urls.getItemURL,
  postItemURL: urls.postItemURL,
  updateItemURL: urls.updateItemURL,
  deleteItemURL: urls.deleteItemURL,
  getDetailItemURL: urls.getDetailItemURL
}, _temp2);
exports.default = DataDictionary;