// import React from "react";
// import ReactDOM from "react-dom";
import fetch from "isomorphic-fetch";
import { notification, Modal } from "antd";
import "antd/lib/notification/style";
import store from "../../util/localData/storage.js";
// import LoginPage from "../../common/loginPage/loginPage.js";

/**
 * URL拼接字符串
 *
 * @param {any} url
 * @param {any} param
 * @returns {String} url
 */
export function urlAppendQuery (url, param) {
  if (!param) {
    return url;
  }
  let queryString = "";
  for (const key in param) {
    if ({}.hasOwnProperty.call(param, key)) {
      if (param[key] === false || param[key] === 0 || param[key]) {
        queryString += `&${key}=${param[key]}`;
      }
    }
  }
  if (queryString) {
    return `${url}?${queryString.substring(1)}`;
  }
  return url;
}

/**
 * 请求
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/


function checkStatus (response) {
  if (response.status >= 200 && response.status < 401) {
    if (response.headers && response.headers["X-New-Authentication"]) {
      store.set("Authentication", response.headers["X-New-Authentication"]);
    }
    return response;
  }
  if (response.status === 401) {
    if (!window.tokenErrorModal) {
      window.tokenErrorModal = Modal.confirm({
        title: "登录认证超时过期，重新登录吗？",
        content: "",
        destroyOnClose: true,
        okText: "确认",
        cancelText: "取消",
        onOk () {
          store.clear();
          window.location.reload();
          window.tokenErrorModal = null;
        },
        onCancel () {
          window.tokenErrorModal = null;
        }
      });
    }
    return [{}];
  }
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: response.statusText,
  });
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function send (url, options, autoTips) {
  const defaultOptions = {
    // credentials: "include",
    headers: {
      Authentication: store.get("Authentication"),
      token: store.get("token"),
    },
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === "POST" || newOptions.method === "PUT") {
    newOptions.headers = {
      Accept: "application/json",
      // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      "Content-Type": "application/json; charset=utf-8",
      ...newOptions.headers,
    };
    if (newOptions.body) {
      let data = new URLSearchParams();
      Object.keys(newOptions.body).map(v => data.set(v, newOptions.body[v]));
      if (/multipart/.test(newOptions.headers["Content-Type"])) {
        newOptions.headers["Content-Type"] = "multipart/form-data";
        data = new FormData();
        Object.keys(newOptions.body).map(v => data.append(v, newOptions.body[v]));
      }
      // newOptions.body = data;
      newOptions.body = JSON.stringify(newOptions.body);
    }
  }

  // 拼接路径参数
  let newUrl = url;
  if (options && options.params) {
    newUrl = urlAppendQuery(url, options.params);
  }

  const checkBiz = response => response.json().then((res) => {
    if (autoTips) {
      if (!res.success) {
        notification.error({
          message: res.msg,
        });
      } else if (res.msg) {
        notification.success({
          message: res.msg,
        });
      }
    }
    return res;
  });
  return fetch(newUrl, newOptions)
    .then(checkStatus)
    .then(checkBiz)
    .catch((error) => {
      if (error.code) {
        notification.error({
          message: error.name,
          description: error.message,
        });
      }
      if ("stack" in error && "message" in error) {
        notification.error({
          message: `请求错误: ${url}`,
          description: error.message,
        });
      }
      return error;
    });
}
const request = {
  GET (url, options, autoTips) {
    if (typeof options !== "object") {
      return send(url, { method: "GET" }, options);
    }
    return send(url, { ...options, method: "GET" }, autoTips);
  },
  POST (url, options, autoTips) {
    if (typeof options !== "object") {
      return send(url, { method: "POST" }, options);
    }
    return send(url, { ...options, method: "POST" }, autoTips);
  },
  PUT (url, options, autoTips) {
    if (typeof options !== "object") {
      return send(url, { method: "PUT" }, options);
    }
    return send(url, { ...options, method: "PUT" }, autoTips);
  },
  DELETE (url, options, autoTips) {
    if (typeof options !== "object") {
      return send(url, { method: "DELETE" }, options);
    }
    return send(url, { ...options, method: "DELETE" }, autoTips);
  },
};
export default request;
