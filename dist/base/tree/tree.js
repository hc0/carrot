"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _tree = require("antd/lib/tree");

var _tree2 = _interopRequireDefault(_tree);

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("antd/lib/tree/style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ATTreeNode = _tree2.default.TreeNode;
var Tree = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Tree, _React$Component);

  function Tree() {
    (0, _classCallCheck3.default)(this, Tree);
    return (0, _possibleConstructorReturn3.default)(this, (Tree.__proto__ || (0, _getPrototypeOf2.default)(Tree)).apply(this, arguments));
  }

  (0, _createClass3.default)(Tree, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var children = props.children,
          options = props.options,
          others = (0, _objectWithoutProperties3.default)(props, ["children", "options"]);

      var renderTreeNodes = function renderTreeNodes(data) {
        return data.map(function (item) {
          if (item.children) {
            return _react2.default.createElement(
              ATTreeNode,
              { title: item.title, key: item.key, dataRef: item },
              renderTreeNodes(item.children)
            );
          }
          return _react2.default.createElement(ATTreeNode, item);
        });
      };
      return _react2.default.createElement(
        _tree2.default,
        others,
        children || renderTreeNodes(options)
      );
    }
  }]);
  return Tree;
}(_react2.default.Component), _class.propTypes = {
  autoExpandParent: _propTypes2.default.bool,

  multiple: _propTypes2.default.bool,

  checkable: _propTypes2.default.bool,

  selectedKeys: _propTypes2.default.array,

  defaultSelectedKeys: _propTypes2.default.arrayOf(_propTypes2.default.string),

  defaultExpandedKeys: _propTypes2.default.arrayOf(_propTypes2.default.string),

  defaultCheckedKeys: _propTypes2.default.array,

  onSelect: _propTypes2.default.func,

  onCheck: _propTypes2.default.func,

  options: _propTypes2.default.array
}, _class.defaultProps = {
  autoExpandParent: true,
  multiple: false,
  checkable: false,
  defaultExpandedKeys: [],
  defaultSelectedKeys: [],
  defaultCheckedKeys: [],
  options: []
}, _class.TreeNode = ATTreeNode, _temp);
exports.default = Tree;