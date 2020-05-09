"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require("antd/lib/modal");

var _modal2 = _interopRequireDefault(_modal);

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

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require("../../../index");

var _roleListContent = require("./roleListContent");

var _roleListContent2 = _interopRequireDefault(_roleListContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RoleList = function RoleList(props) {
  var operation = {
    add: false,
    query: false,
    ok: function ok(selectedRows) {
      return _react2.default.createElement(_index.Button, {
        className: "operation-button",
        type: "primary",
        style: { marginLeft: 25 },
        title: "\u4FDD\u5B58",
        onClick: function onClick() {
          if (props.hideModal) {
            props.hideModal();
          }
          if (props.onSelectedRows) {
            props.onSelectedRows(selectedRows);
          }
        }
      });
    },
    close: function close() {
      return _react2.default.createElement(_index.Button, { title: "\u5173\u95ED", className: "operation-button", type: "primary", style: { marginLeft: 25 }, onClick: props.hideModal });
    }
  };
  return _react2.default.createElement(_roleListContent2.default, { roleSelectedRows: props.roleSelectedRows, operation: operation, type: props.type });
};
var operation = function operation(target) {
  return {
    add: false,
    query: false,
    ok: function ok(selectedRows) {
      target.setState({
        selectedRows: selectedRows
      });
      return _react2.default.createElement("div", null);
    }
  };
};
var RoleListModal = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(RoleListModal, _Component);

  function RoleListModal() {
    (0, _classCallCheck3.default)(this, RoleListModal);
    return (0, _possibleConstructorReturn3.default)(this, (RoleListModal.__proto__ || (0, _getPrototypeOf2.default)(RoleListModal)).apply(this, arguments));
  }

  (0, _createClass3.default)(RoleListModal, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          style = _props.style,
          visible = _props.visible,
          hideModal = _props.hideModal,
          onSelectedRows = _props.onSelectedRows,
          roleSelectedRows = _props.roleSelectedRows,
          type = _props.type;


      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _modal2.default,
          {
            visible: visible,
            footer: null,
            closable: false,
            style: style
          },
          visible && _react2.default.createElement(RoleList, {
            key: "role-modal",
            type: type,
            roleSelectedRows: roleSelectedRows,
            onSelectedRows: onSelectedRows,
            hideModal: hideModal
          })
        )
      );
    }
  }]);
  return RoleListModal;
}(_react.Component), _class.propTypes = {
  type: _propTypes2.default.oneOf(["normal", "radio", "checkbox"]),

  visible: _propTypes2.default.bool,

  roleSelectedRows: _propTypes2.default.array,

  hideModal: _propTypes2.default.func,

  onSelectedRows: _propTypes2.default.func,

  style: _propTypes2.default.object
}, _class.defaultProps = {
  visible: false,
  roleSelectedRows: [],
  type: "checkbox",
  style: {
    width: "550px",
    borderRadius: "5px",
    overflow: "hidden"
  }
}, _temp);
exports.default = RoleListModal;