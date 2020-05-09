"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _class, _temp2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _input = require("../../base/input/input.js");

var _input2 = _interopRequireDefault(_input);

var _notification = require("../../base/notification/notification.js");

var _notification2 = _interopRequireDefault(_notification);

var _form = require("../../base/form/form.js");

var _request = require("../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formItem = {
  input: function input(item) {
    return _react2.default.createElement(_input2.default, {
      key: item.key,
      placeholder: item.placeholder,
      disabled: item.readonly
    });
  },
  custom: function custom(item) {
    return item.content;
  }
};

var TableDetail = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(TableDetail, _React$Component);

  function TableDetail() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TableDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TableDetail.__proto__ || (0, _getPrototypeOf2.default)(TableDetail)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      detailData: {}
    }, _this.checkPassword = function (rule, value, callback) {
      var form = _this.props.form;

      if (value && value !== form.getFieldValue("password")) {
        callback("两次密码不一致!");
      } else {
        callback();
      }
    }, _this.handleSubmit = function () {
      var validateFields = _this.props.form.validateFields;

      validateFields(function (err, values) {
        if (!err) {
          var _this2 = _this,
              props = _this2.props;
          var addURL = props.addURL,
              updateURL = props.updateURL,
              detailId = props.detailId,
              parentThis = props.parentThis;


          var requestURL = {};

          if (!detailId) {
            requestURL = addURL;
          } else {
            requestURL = updateURL;
            values.id = detailId;
          }

          var _requestURL = requestURL,
              url = _requestURL.url,
              method = _requestURL.method;


          _request2.default[method && method.toUpperCase() || "POST"](_getConfig2.default.host + "/" + url, {
            body: values,
            params: values
          }).then(function (res) {
            if (res.success) {
              _notification2.default.success({
                message: !detailId ? "新增成功" : "编辑成功"
              });
              parentThis.toggleModal();
              parentThis.loadData();
            } else {
              _notification2.default.success({
                message: res.msg
              });
            }
          });
        }
      });
    }, _this.loadData = function () {
      var _this3 = _this,
          props = _this3.props;
      var getDetailURL = props.getDetailURL,
          detailId = props.detailId;

      if (detailId) {
        var _ref2 = getDetailURL || {},
            url = _ref2.url,
            method = _ref2.method;

        _request2.default[method && method.toUpperCase() || "GET"](_getConfig2.default.host + "/" + url + "/" + detailId, {}).then(function (res) {
          if (res.success) {
            _this.setState({
              detailData: res.data
            });
          } else {
            console.error(res.msg);
          }
        });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TableDetail, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props,
          state = this.state;
      var form = props.form,
          formItemGroup = props.formItemGroup,
          column = props.column,
          itemCol = props.itemCol,
          readonly = props.readonly,
          bordered = props.bordered;
      var getFieldDecorator = form.getFieldDecorator;

      var formItemLayout = {
        labelCol: { span: itemCol[0] },
        wrapperCol: { span: itemCol[1] }
      };

      var detailData = state.detailData;


      return _react2.default.createElement(
        _form.Form,
        {
          className: "222",
          title: this.props.title,
          actionGroup: readonly && function () {
            return _react2.default.createElement("div", null);
          },
          handleSubmit: this.handleSubmit,
          style: {
            display: "grid",
            gridTemplateColumns: Array(column).fill("1fr").join(" "),
            gridColumnGap: _getConfig2.default["@padding-sm"],
            gridRowGap: _getConfig2.default["@padding-sm"]
          }
        },
        formItemGroup.map(function (array, arrayIndex) {
          return _react2.default.createElement(
            "div",
            {
              key: "tableDetail-card-" + arrayIndex,
              style: {
                border: bordered && _getConfig2.default["@border-width-base"] + " " + _getConfig2.default["@border-style-base"] + " " + _getConfig2.default["@border-color-base"],
                borderRadius: _getConfig2.default["@border-radius-base"],
                padding: _getConfig2.default["@padding-sm"],
                paddingRight: 0,
                paddingBottom: 0
              }
            },
            array.map(function (item, itemIndex) {
              var title = item.title,
                  key = item.key,
                  placeholder = item.placeholder,
                  _item$rules = item.rules,
                  rules = _item$rules === undefined ? [] : _item$rules;

              item.readonly = readonly;
              return item.type !== "withoutFormItem" ? _react2.default.createElement(
                _form.FormItem,
                (0, _extends3.default)({
                  key: "tableDetail-card-formItem-" + itemIndex
                }, formItemLayout, {
                  label: title
                }),
                getFieldDecorator(key, {
                  initialValue: detailData[key],
                  rules: rules
                })(formItem[item.type] ? formItem[item.type](item) : _react2.default.createElement(
                  "div",
                  null,
                  placeholder
                ))
              ) : _react2.default.createElement(
                "div",
                {
                  key: "tableDetail-card-formItem-" + itemIndex
                },
                item.content
              );
            })
          );
        })
      );
    }
  }]);
  return TableDetail;
}(_react2.default.Component), _class.propTypes = {
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func, _propTypes2.default.element]),

  formItemGroup: _propTypes2.default.array,

  bordered: _propTypes2.default.bool,

  column: _propTypes2.default.number,

  itemCol: _propTypes2.default.array,

  getDetailURL: _propTypes2.default.object,

  detailId: _propTypes2.default.string,

  readonly: _propTypes2.default.bool,

  addURL: _propTypes2.default.object,

  updateURL: _propTypes2.default.object,

  parentThis: _propTypes2.default.object
}, _class.defaultProps = {
  title: "TableDetail",
  bordered: true,
  itemCol: [6, 16],
  getDetailURL: {
    url: "sys/user/updatePassword"
  },
  readonly: true
}, _temp2);
exports.default = (0, _form.Create)(TableDetail);