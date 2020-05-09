"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _table = require("antd/lib/table");

var _table2 = _interopRequireDefault(_table);

require("antd/lib/table/style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(Table, _React$Component);

  function Table() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Table);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      selectedRowKeys: [] }, _this.onSelectChange = function (selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      _this.setState({ selectedRowKeys: selectedRowKeys });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Table, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var selectedRowKeys = this.state.selectedRowKeys;

      var rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: this.onSelectChange,
        getCheckboxProps: function getCheckboxProps(record) {
          return {
            disabled: record.disabled };
        }
      };
      return _react2.default.createElement(_table2.default, (0, _extends3.default)({
        rowKey: props.rowKey,
        rowSelection: rowSelection
      }, props));
    }
  }]);
  return Table;
}(_react2.default.Component), _class.propTypes = {
  rowKey: _propTypes2.default.string
}, _class.defaultProps = {
  rowKey: "id"
}, _temp2);
exports.default = Table;