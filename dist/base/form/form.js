"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Create = exports.FormItem = exports.Form = exports.default = undefined;

var _card = require("antd/lib/card");

var _card2 = _interopRequireDefault(_card);

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

var _class, _temp2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("antd/lib/form/style");

require("antd/lib/card/style");

var _button = require("../../base/button/button.js");

var _button2 = _interopRequireDefault(_button);

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormItem = _form2.default.Item;
var Create = _form2.default.create();

var styles = {
  width: "80%",
  margin: "auto",
  padding: _getConfig2.default["@padding-sm"]
};

var Form = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(Form, _React$Component);

  function Form() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).call.apply(_ref, [this].concat(args))), _this), _this.handleSubmit = function () {
      if (_this.props.handleSubmit && typeof _this.props.handleSubmit === "function") {
        _this.props.handleSubmit(_this);
      } else {
        console.log("需要传入handleSubmit属性或重写actionGroup属性");
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Form, [{
    key: "render",
    value: function render() {
      var props = this.props;

      return _react2.default.createElement(
        _card2.default,
        {
          title: _react2.default.createElement(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }
            },
            _react2.default.createElement(
              "h3",
              {
                style: {
                  margin: "0"
                }
              },
              props.title
            ),
            props.actionGroup && props.actionGroup(this) || _react2.default.createElement(_button2.default, { onClick: this.handleSubmit })
          ),
          style: styles
        },
        _react2.default.createElement(
          _form2.default,
          { style: props.style },
          props.children && props.children.map(function (item) {
            return item;
          })
        )
      );
    }
  }]);
  return Form;
}(_react2.default.Component), _class.propTypes = {
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func, _propTypes2.default.element]),

  handleSubmit: _propTypes2.default.func,

  actionGroup: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func])
}, _class.defaultProps = {
  title: "",
  handleSubmit: function handleSubmit() {}
}, _temp2);
exports.default = Form;
exports.Form = Form;
exports.FormItem = FormItem;
exports.Create = Create;