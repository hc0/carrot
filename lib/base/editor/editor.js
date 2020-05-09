import React from "react";
import PropTypes from "prop-types";
import BraftEditor from "braft-editor";
import "braft-editor/dist/braft.css";
import Notification from "../../base/notification/notification.js";
import request from "../../util/request/request.js";

import config from "../../../getConfig.js";

/**
 * 编辑器组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class Editor extends React.Component {
  static propTypes = {
    /** 设置编辑器高 */
    height: PropTypes.number,

    /** 设置编辑器内容 */
    content: PropTypes.string,

    /** 设置是否允许上传图片等多媒体 */
    hasMediaUpload: PropTypes.bool,

    /** 设置上传文件最大限制 */
    mediaLimit: PropTypes.string,

    /** 设置是否上传文件，若为false，则不会上传而将图片转为base64格式 */
    isUpload: PropTypes.bool,

    /** 设置上传文件地址 */
    uploadURL: PropTypes.string,

    /** 设置上传前的操作回调 */
    beforeUpload: PropTypes.func,

    /** 设置上传成功后的操作回调 */
    afterUpload: PropTypes.func,
  };
  static defaultProps = {
    height: 380,
    content: "这是默认内容",
    hasMediaUpload: true,
    mediaLimit: 1,
    isUpload: true,
    uploadURL: "upload",
  };
  state = {
    htmlContent: ""
  };
  componentDidMount () {
    const {
      instance,
      props,
    } = this;

    const {
      content,
    } = props;

    instance.setContent(content, "html");
    this.initialState();
  }
  initialInstance = (instance) => {
    this.instance = instance;
  };
  initialState = () => {
    const {
      content,
    } = this.props;

    this.setState({
      htmlContent: content
    });
  };
  handleHTMLChange = (htmlContent) => {
    this.setState({
      htmlContent,
    });
  };
  preview = () => {
    if (window.previewWindow) {
      window.previewWindow.close();
    }
    window.previewWindow = window.open();
    window.previewWindow.document.write(this.buildPreviewHtml());
  };
  buildPreviewHtml = () => {
    const {
      htmlContent
    } = this.state;

    return `
      <!Doctype html>
      <html>
        <head>
          <title>内容预览</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
            <div class="container">${htmlContent}</div>
        </body>
      </html>
    `;
  };
  render () {
    const {
      height,
      content,
      hasMediaUpload,
      mediaLimit,
      isUpload,
      uploadURL,
      beforeUpload,
      afterUpload,
    } = this.props;
    const controls = [
      "undo", "redo", "split", "font-size", "text-color",
      "bold", "italic", "underline",
      // "strike-through",
      "superscript",
      "subscript", "text-align", "split", "list_ul", "list_ol",
      "blockquote", "media",
      // "code",
      "split", "link", "split"
    ];
    const extendControls = [
      {
        type: "button",
        text: "预览",
        className: "preview-button",
        onClick: this.preview
      }
    ];
    const media = {
      image: hasMediaUpload, // 开启图片插入功能
      video: hasMediaUpload, // 开启视频插入功能
      audio: hasMediaUpload, // 开启音频插入功能
      validateFn (file) {
        let returnValue = true;
        if (file.size > 1024 * mediaLimit * 1000) {
          Notification.warn({
            message: `文件不能大于${mediaLimit}M`
          });
          returnValue = false;
        }
        return returnValue;
      },
      uploadFn (param) {
        const {
          file
        } = param;
        if (beforeUpload && typeof beforeUpload === "function") {
          beforeUpload(param);
        }
        const runAfterUpload = () => {
          if (afterUpload && typeof afterUpload === "function") {
            afterUpload(param);
          }
        };
        if (isUpload) {
          request.POST(`${config.host}/${uploadURL}`, {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            body: {
              file,
            }
          }).then((res) => {
            if (res.success) {
              Notification.success({
                message: "上传成功"
              });
              runAfterUpload();
            } else {
              Notification.error({
                message: res.msg
              });
              param.error();
            }
          });
        } else {
          if (!/image\/\w+/.test(file.type)) {
            return false;
          }
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            const base64Code = this.result;
            param.success({
              url: base64Code
            });
            runAfterUpload();
          };
        }
      }
    };
    return (
      <BraftEditor
        height={height}
        content={content}

        onHTMLChange={this.handleHTMLChange}
        pasteMode="text"
        initialContent=""
        controls={controls}
        extendControls={extendControls}
        ref={this.initialInstance}
        media={media}
      />
    );
  }
}
