"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _class, _temp;

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

var _tableCRUD = require("../../common/tableCRUD/tableCRUD.js");

var _tableCRUD2 = _interopRequireDefault(_tableCRUD);

var _notification = require("../../base/notification/notification.js");

var _notification2 = _interopRequireDefault(_notification);

var _request = require("../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = (0, _extends3.default)({}, (0, _polished.margin)(0, 0, 0, " " + _getConfig2.default["@padding-sm"]));

var urls = {
  getURL: "sys/schedule/job/list",
  postURL: "sys/schedule/job/create",
  updateURL: "sys/schedule/job/update",
  deleteURL: "sys/schedule/job/delete",
  pauseURL: "sys/schedule/job/pause",
  recoveryURL: "sys/schedule/job/resume",
  playURL: "sys/schedule/job/run",
  getDetailURL: "sys/schedule/job/get"
};

var statusCode = {
  0: "正常",
  1: "暂停"
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

var detailComponent = function detailComponent(props) {
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
        label: "\u4EFB\u52A1\u540D\u79F0"
      }),
      getFieldDecorator("name", {
        initialValue: oneDetail.name,
        rules: [{ required: true, message: "任务名称必填!" }]
      })(_react2.default.createElement(_input2.default, null))
    ),
    _react2.default.createElement(
      _form.FormItem,
      (0, _extends3.default)({}, formItemLayout, {
        label: "bean\u540D\u79F0"
      }),
      getFieldDecorator("bean", {
        initialValue: oneDetail.bean,
        rules: [{ required: true, message: "bean名称必填!" }]
      })(_react2.default.createElement(_input2.default, null))
    ),
    _react2.default.createElement(
      _form.FormItem,
      (0, _extends3.default)({}, formItemLayout, {
        label: "\u65B9\u6CD5\u540D\u79F0"
      }),
      getFieldDecorator("method", {
        initialValue: oneDetail.method,
        rules: [{ required: true, message: "方法名称必填!" }]
      })(_react2.default.createElement(_input2.default, null))
    ),
    _react2.default.createElement(
      _form.FormItem,
      (0, _extends3.default)({}, formItemLayout, {
        label: "\u53C2\u6570"
      }),
      getFieldDecorator("params", {
        initialValue: oneDetail.params,
        rules: [{ required: true, message: "参数必填!" }]
      })(_react2.default.createElement(_input2.default, null))
    ),
    _react2.default.createElement(
      _form.FormItem,
      (0, _extends3.default)({}, formItemLayout, {
        label: "cron\u8868\u8FBE\u5F0F"
      }),
      getFieldDecorator("expression", {
        initialValue: oneDetail.expression,
        rules: [{ required: true, message: "cron表达式必填!" }]
      })(_react2.default.createElement(_input2.default, null))
    ),
    _react2.default.createElement(
      _form.FormItem,
      (0, _extends3.default)({}, formItemLayout, {
        label: "\u5907\u6CE8"
      }),
      getFieldDecorator("remark", {
        initialValue: oneDetail.remark,
        rules: [{ required: true, message: "备注必填!" }]
      })(_react2.default.createElement(_input2.default, null))
    )
  );
};

var showDetailComponent = function showDetailComponent(_this, type, oneDetail) {
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

var TaskManagement = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(TaskManagement, _Component);

  function TaskManagement() {
    (0, _classCallCheck3.default)(this, TaskManagement);
    return (0, _possibleConstructorReturn3.default)(this, (TaskManagement.__proto__ || (0, _getPrototypeOf2.default)(TaskManagement)).apply(this, arguments));
  }

  (0, _createClass3.default)(TaskManagement, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          title = _props.title,
          actionGroup = _props.actionGroup,
          columns = _props.columns,
          getURL = _props.getURL,
          postURL = _props.postURL,
          updateURL = _props.updateURL,
          getDetailURL = _props.getDetailURL,
          deleteURL = _props.deleteURL,
          pauseURL = _props.pauseURL,
          recoveryURL = _props.recoveryURL,
          playURL = _props.playURL;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_tableCRUD2.default, {
          title: title,
          actionGroup: actionGroup,
          columns: columns,
          getURL: getURL,
          postURL: postURL,
          updateURL: updateURL,
          getDetailURL: getDetailURL,
          deleteURL: deleteURL,
          pauseURL: pauseURL,
          recoveryURL: recoveryURL,
          playURL: playURL
        }),
        _react2.default.createElement("div", { id: "detailRoot" })
      );
    }
  }]);
  return TaskManagement;
}(_react.Component), _class.propTypes = {
  title: _propTypes2.default.string,

  actionGroup: _propTypes2.default.func,

  columns: _propTypes2.default.func,

  getURL: _propTypes2.default.string,

  postURL: _propTypes2.default.string,

  getDetailURL: _propTypes2.default.string,

  updateURL: _propTypes2.default.string,

  deleteURL: _propTypes2.default.string,

  pauseURL: _propTypes2.default.string,

  recoveryURL: _propTypes2.default.string,

  playURL: _propTypes2.default.string
}, _class.defaultProps = {
  title: "",
  actionGroup: function actionGroup(_this) {
    return _react2.default.createElement(
      "div",
      {
        style: {
          display: "flex"
        }
      },
      _react2.default.createElement(_input2.default, {
        placeholder: "bean\u540D\u79F0",
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
                  selectedId = getDataFormState(_this.state);

                  if (!(selectedId.length > 1)) {
                    _context.next = 4;
                    break;
                  }

                  _notification2.default.warn({
                    message: "不能同时编辑多项"
                  });
                  return _context.abrupt("return", false);

                case 4:
                  if (!(selectedId.length < 1)) {
                    _context.next = 7;
                    break;
                  }

                  _notification2.default.warn({
                    message: "请选择要编辑的项"
                  });
                  return _context.abrupt("return", false);

                case 7:
                  url = _getConfig2.default.host + "/" + _this.props.getDetailURL + "/" + selectedId[0];
                  _context.next = 10;
                  return _request2.default.GET(url);

                case 10:
                  getOneDetail = _context.sent;

                  if (getOneDetail.success) {
                    showDetailComponent(_this, "updateURL", getOneDetail.data);
                  }

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }))
      }),
      _react2.default.createElement(_button2.default, {
        style: styles,
        title: "\u65B0\u589E",
        primary: !1,
        onClick: function onClick() {
          showDetailComponent(_this, "postURL");
        }
      }),
      _react2.default.createElement(_button2.default, {
        style: styles,
        title: "\u5220\u9664",
        primary: !1,
        onClick: function onClick() {
          var selectedId = getDataFormState(_this.state);
          multipleHandle(_this, "deleteURL", selectedId);
        }
      }),
      _react2.default.createElement(_button2.default, {
        style: styles,
        title: "\u6682\u505C",
        primary: !1,
        onClick: function onClick() {
          var selectedId = getDataFormState(_this.state);
          multipleHandle(_this, "pauseURL", selectedId);
        }
      }),
      _react2.default.createElement(_button2.default, {
        style: styles,
        title: "\u6062\u590D",
        primary: !1,
        onClick: function onClick() {
          var selectedId = getDataFormState(_this.state);
          multipleHandle(_this, "recoveryURL", selectedId);
        }
      }),
      _react2.default.createElement(_button2.default, {
        style: styles,
        title: "\u7ACB\u5373\u6267\u884C",
        primary: !1,
        onClick: function onClick() {
          var selectedId = getDataFormState(_this.state);
          multipleHandle(_this, "playURL", selectedId);
        }
      })
    );
  },
  columns: function columns() {
    return [{
      title: "任务ID",
      dataIndex: "id",
      key: "id"
    }, {
      title: "任务名称",
      dataIndex: "name",
      key: "name"
    }, {
      title: "bean名称",
      dataIndex: "bean",
      key: "bean"
    }, {
      title: "方法名称",
      dataIndex: "method",
      key: "method"
    }, {
      title: "参数",
      dataIndex: "params",
      key: "params"
    }, {
      title: "cron表达式",
      dataIndex: "expression",
      key: "expression"
    }, {
      title: "备注",
      dataIndex: "remark",
      key: "remark"
    }, {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: function render(value) {
        return statusCode[value];
      }
    }];
  },
  getURL: urls.getURL,
  getDetailURL: urls.getDetailURL,
  postURL: urls.postURL,
  updateURL: urls.updateURL,
  deleteURL: urls.deleteURL,
  pauseURL: urls.pauseURL,
  recoveryURL: urls.recoveryURL,
  playURL: urls.playURL
}, _temp);
exports.default = TaskManagement;