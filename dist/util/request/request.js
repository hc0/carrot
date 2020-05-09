"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _notification2 = require("antd/lib/notification");

var _notification3 = _interopRequireDefault(_notification2);

var _modal = require("antd/lib/modal");

var _modal2 = _interopRequireDefault(_modal);

exports.urlAppendQuery = urlAppendQuery;

var _isomorphicFetch = require("isomorphic-fetch");

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

require("antd/lib/notification/style");

var _storage = require("../../util/localData/storage.js");

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function urlAppendQuery(url, param) {
  if (!param) {
    return url;
  }
  var queryString = "";
  for (var key in param) {
    if ({}.hasOwnProperty.call(param, key)) {
      if (param[key] === false || param[key] === 0 || param[key]) {
        queryString += "&" + key + "=" + param[key];
      }
    }
  }
  if (queryString) {
    return url + "?" + queryString.substring(1);
  }
  return url;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 401) {
    if (response.headers && response.headers["X-New-Authentication"]) {
      _storage2.default.set("Authentication", response.headers["X-New-Authentication"]);
    }
    return response;
  }
  if (response.status === 401) {
    if (!window.tokenErrorModal) {
      window.tokenErrorModal = _modal2.default.confirm({
        title: "登录认证超时过期，重新登录吗？",
        content: "",
        destroyOnClose: true,
        okText: "确认",
        cancelText: "取消",
        onOk: function onOk() {
          _storage2.default.clear();
          window.location.reload();
          window.tokenErrorModal = null;
        },
        onCancel: function onCancel() {
          window.tokenErrorModal = null;
        }
      });
    }
    return [{}];
  }
  _notification3.default.error({
    message: "\u8BF7\u6C42\u9519\u8BEF " + response.status + ": " + response.url,
    description: response.statusText
  });
  var error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function send(url, options, autoTips) {
  var defaultOptions = {
    headers: {
      Authentication: _storage2.default.get("Authentication"),
      token: _storage2.default.get("token")
    }
  };
  var newOptions = (0, _extends3.default)({}, defaultOptions, options);
  if (newOptions.method === "POST" || newOptions.method === "PUT") {
    newOptions.headers = (0, _extends3.default)({
      Accept: "application/json",

      "Content-Type": "application/json; charset=utf-8"
    }, newOptions.headers);
    if (newOptions.body) {
      var data = new URLSearchParams();
      (0, _keys2.default)(newOptions.body).map(function (v) {
        return data.set(v, newOptions.body[v]);
      });
      if (/multipart/.test(newOptions.headers["Content-Type"])) {
        newOptions.headers["Content-Type"] = "multipart/form-data";
        data = new FormData();
        (0, _keys2.default)(newOptions.body).map(function (v) {
          return data.append(v, newOptions.body[v]);
        });
      }

      newOptions.body = (0, _stringify2.default)(newOptions.body);
    }
  }

  var newUrl = url;
  if (options && options.params) {
    newUrl = urlAppendQuery(url, options.params);
  }

  var checkBiz = function checkBiz(response) {
    return response.json().then(function (res) {
      if (autoTips) {
        if (!res.success) {
          _notification3.default.error({
            message: res.msg
          });
        } else if (res.msg) {
          _notification3.default.success({
            message: res.msg
          });
        }
      }
      return res;
    });
  };
  return (0, _isomorphicFetch2.default)(newUrl, newOptions).then(checkStatus).then(checkBiz).catch(function (error) {
    if (error.code) {
      _notification3.default.error({
        message: error.name,
        description: error.message
      });
    }
    if ("stack" in error && "message" in error) {
      _notification3.default.error({
        message: "\u8BF7\u6C42\u9519\u8BEF: " + url,
        description: error.message
      });
    }
    return error;
  });
}
var request = {
  GET: function GET(url, options, autoTips) {
    if ((typeof options === "undefined" ? "undefined" : (0, _typeof3.default)(options)) !== "object") {
      return send(url, { method: "GET" }, options);
    }
    return send(url, (0, _extends3.default)({}, options, { method: "GET" }), autoTips);
  },
  POST: function POST(url, options, autoTips) {
    if ((typeof options === "undefined" ? "undefined" : (0, _typeof3.default)(options)) !== "object") {
      return send(url, { method: "POST" }, options);
    }
    return send(url, (0, _extends3.default)({}, options, { method: "POST" }), autoTips);
  },
  PUT: function PUT(url, options, autoTips) {
    if ((typeof options === "undefined" ? "undefined" : (0, _typeof3.default)(options)) !== "object") {
      return send(url, { method: "PUT" }, options);
    }
    return send(url, (0, _extends3.default)({}, options, { method: "PUT" }), autoTips);
  },
  DELETE: function DELETE(url, options, autoTips) {
    if ((typeof options === "undefined" ? "undefined" : (0, _typeof3.default)(options)) !== "object") {
      return send(url, { method: "DELETE" }, options);
    }
    return send(url, (0, _extends3.default)({}, options, { method: "DELETE" }), autoTips);
  }
};
exports.default = request;