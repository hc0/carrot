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

var _class, _temp2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _braftEditor = require("braft-editor");

var _braftEditor2 = _interopRequireDefault(_braftEditor);

require("braft-editor/dist/braft.css");

var _notification = require("../../base/notification/notification.js");

var _notification2 = _interopRequireDefault(_notification);

var _request = require("../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Editor = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(Editor, _React$Component);

  function Editor() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Editor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Editor.__proto__ || (0, _getPrototypeOf2.default)(Editor)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      htmlContent: ""
    }, _this.initialInstance = function (instance) {
      _this.instance = instance;
    }, _this.initialState = function () {
      var content = _this.props.content;


      _this.setState({
        htmlContent: content
      });
    }, _this.handleHTMLChange = function (htmlContent) {
      _this.setState({
        htmlContent: htmlContent
      });
    }, _this.preview = function () {
      if (window.previewWindow) {
        window.previewWindow.close();
      }
      window.previewWindow = window.open();
      window.previewWindow.document.write(_this.buildPreviewHtml());
    }, _this.buildPreviewHtml = function () {
      var htmlContent = _this.state.htmlContent;


      return "\n      <!Doctype html>\n      <html>\n        <head>\n          <title>\u5185\u5BB9\u9884\u89C8</title>\n          <style>\n            html,body{\n              height: 100%;\n              margin: 0;\n              padding: 0;\n              overflow: auto;\n              background-color: #f1f2f3;\n            }\n            .container{\n              box-sizing: border-box;\n              width: 1000px;\n              max-width: 100%;\n              min-height: 100%;\n              margin: 0 auto;\n              padding: 30px 20px;\n              overflow: hidden;\n              background-color: #fff;\n              border-right: solid 1px #eee;\n              border-left: solid 1px #eee;\n            }\n            .container img,\n            .container audio,\n            .container video{\n              max-width: 100%;\n              height: auto;\n            }\n          </style>\n        </head>\n        <body>\n            <div class=\"container\">" + htmlContent + "</div>\n        </body>\n      </html>\n    ";
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Editor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var instance = this.instance,
          props = this.props;
      var content = props.content;


      instance.setContent(content, "html");
      this.initialState();
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          height = _props.height,
          content = _props.content,
          hasMediaUpload = _props.hasMediaUpload,
          mediaLimit = _props.mediaLimit,
          isUpload = _props.isUpload,
          uploadURL = _props.uploadURL,
          beforeUpload = _props.beforeUpload,
          afterUpload = _props.afterUpload;

      var controls = ["undo", "redo", "split", "font-size", "text-color", "bold", "italic", "underline", "superscript", "subscript", "text-align", "split", "list_ul", "list_ol", "blockquote", "media", "split", "link", "split"];
      var extendControls = [{
        type: "button",
        text: "预览",
        className: "preview-button",
        onClick: this.preview
      }];
      var media = {
        image: hasMediaUpload,
        video: hasMediaUpload,
        audio: hasMediaUpload, validateFn: function validateFn(file) {
          var returnValue = true;
          if (file.size > 1024 * mediaLimit * 1000) {
            _notification2.default.warn({
              message: "\u6587\u4EF6\u4E0D\u80FD\u5927\u4E8E" + mediaLimit + "M"
            });
            returnValue = false;
          }
          return returnValue;
        },
        uploadFn: function uploadFn(param) {
          var file = param.file;

          if (beforeUpload && typeof beforeUpload === "function") {
            beforeUpload(param);
          }
          var runAfterUpload = function runAfterUpload() {
            if (afterUpload && typeof afterUpload === "function") {
              afterUpload(param);
            }
          };
          if (isUpload) {
            _request2.default.POST(_getConfig2.default.host + "/" + uploadURL, {
              headers: {
                "Content-Type": "multipart/form-data"
              },
              body: {
                file: file
              }
            }).then(function (res) {
              if (res.success) {
                _notification2.default.success({
                  message: "上传成功"
                });
                runAfterUpload();
              } else {
                _notification2.default.error({
                  message: res.msg
                });
                param.error();
              }
            });
          } else {
            if (!/image\/\w+/.test(file.type)) {
              return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
              var base64Code = this.result;
              param.success({
                url: base64Code
              });
              runAfterUpload();
            };
          }
        }
      };
      return _react2.default.createElement(_braftEditor2.default, {
        height: height,
        content: content,

        onHTMLChange: this.handleHTMLChange,
        pasteMode: "text",
        initialContent: "",
        controls: controls,
        extendControls: extendControls,
        ref: this.initialInstance,
        media: media
      });
    }
  }]);
  return Editor;
}(_react2.default.Component), _class.propTypes = {
  height: _propTypes2.default.number,

  content: _propTypes2.default.string,

  hasMediaUpload: _propTypes2.default.bool,

  mediaLimit: _propTypes2.default.string,

  isUpload: _propTypes2.default.bool,

  uploadURL: _propTypes2.default.string,

  beforeUpload: _propTypes2.default.func,

  afterUpload: _propTypes2.default.func
}, _class.defaultProps = {
  height: 380,
  content: "这是默认内容",
  hasMediaUpload: true,
  mediaLimit: 1,
  isUpload: true,
  uploadURL: "upload"
}, _temp2);
exports.default = Editor;