"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _modal = require("antd/lib/modal");

var _modal2 = _interopRequireDefault(_modal);

var _upload = require("antd/lib/upload");

var _upload2 = _interopRequireDefault(_upload);

var _icon = require("antd/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

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

require("antd/lib/upload/style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PicturesWall = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(PicturesWall, _React$Component);

  function PicturesWall(props) {
    (0, _classCallCheck3.default)(this, PicturesWall);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PicturesWall.__proto__ || (0, _getPrototypeOf2.default)(PicturesWall)).call(this, props));

    _this.handleCancel = function () {
      return _this.setState({ previewVisible: false });
    };

    _this.handlePreview = function (file) {
      _this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true
      });
    };

    _this.handleChange = function (_ref) {
      var fileList = _ref.fileList;

      if (_this.props.onChange) {
        _this.props.onChange(fileList);
      }
      _this.setState({ fileList: fileList });
    };

    _this.state = {
      previewVisible: false,
      previewImage: "",
      fileList: props.defaultFileList
    };
    return _this;
  }

  (0, _createClass3.default)(PicturesWall, [{
    key: "render",
    value: function render() {
      var _state = this.state,
          previewVisible = _state.previewVisible,
          previewImage = _state.previewImage,
          fileList = _state.fileList;
      var props = this.props;
      var maxFile = props.maxFile,
          url = props.url;

      var uploadButton = _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_icon2.default, { type: "plus" }),
        _react2.default.createElement(
          "div",
          { className: "ant-upload-text" },
          "Upload"
        )
      );
      return _react2.default.createElement(
        "div",
        { className: "clearfix" },
        _react2.default.createElement(
          _upload2.default,
          {
            action: url,
            listType: "picture-card",
            fileList: fileList,
            onPreview: this.handlePreview,
            onChange: this.handleChange
          },
          fileList.length >= maxFile ? null : uploadButton
        ),
        _react2.default.createElement(
          _modal2.default,
          { visible: previewVisible, footer: null, onCancel: this.handleCancel },
          _react2.default.createElement("img", { alt: "example", style: { width: "100%" }, src: previewImage })
        )
      );
    }
  }]);
  return PicturesWall;
}(_react2.default.Component), _class.propTypes = {
  defaultFileList: _propTypes2.default.array,

  maxFile: _propTypes2.default.number,

  onChange: _propTypes2.default.func,

  url: _propTypes2.default.string
}, _class.defaultProps = {
  maxFile: Infinity,
  defaultFileList: []
}, _temp);
exports.default = PicturesWall;