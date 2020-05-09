"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _polished = require("polished");

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var shortcutsStyles = (0, _extends3.default)({
  color: "#fff",
  display: "inline-flex",
  backgroundColor: "blue",
  cursor: "pointer"
}, (0, _polished.backgrounds)("" + _getConfig2.default["@primary-color"]), {
  marginRight: "10px",
  width: "100px",
  height: "30px",
  justifyContent: "center",
  alignItems: "center",
  borderBottomRightRadius: "15px",
  borderTopRightRadius: "15px"
});
var homePageStyles = (0, _extends3.default)({
  backgroundColor: "#fff"
}, (0, _polished.margin)(20), (0, _polished.padding)(10));
var HomePage = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(HomePage, _Component);

  function HomePage() {
    (0, _classCallCheck3.default)(this, HomePage);
    return (0, _possibleConstructorReturn3.default)(this, (HomePage.__proto__ || (0, _getPrototypeOf2.default)(HomePage)).apply(this, arguments));
  }

  (0, _createClass3.default)(HomePage, [{
    key: "render",
    value: function render() {
      var shortcuts = this.props.shortcuts;

      var renderShortcut = function renderShortcut(data) {
        return data.map(function (item) {
          return _react2.default.createElement(
            "p",
            {
              key: item.id,
              style: (0, _extends3.default)({}, (0, _polished.margin)(10))
            },
            _react2.default.createElement(
              "span",
              { style: shortcutsStyles },
              item.name
            ),
            _react2.default.createElement(
              "span",
              null,
              item.desc
            )
          );
        });
      };
      return _react2.default.createElement(
        "div",
        { style: homePageStyles },
        _react2.default.createElement(
          "p",
          { style: (0, _extends3.default)({}, (0, _polished.padding)(10, 10))
          },
          "\u5FEB\u901F\u5BFC\u822A"
        ),
        renderShortcut(shortcuts)
      );
    }
  }]);
  return HomePage;
}(_react.Component), _class.propTypes = {
  shortcuts: _propTypes2.default.array
}, _class.defaultProps = {
  shortcuts: []
}, _temp);
exports.default = HomePage;