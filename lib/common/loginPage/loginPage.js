import React from "react";
import PropTypes from "prop-types";

import { backgrounds, padding, margin } from "polished";

import Avatar from "../../base/avatar/avatar.js";
import Input from "../../base/input/input.js";
import Button from "../../base/button/button.js";
import Icon from "../../base/icon/icon.js";
import Checkbox from "../../base/checkbox/checkbox.js";

import store from "../../util/localData/storage.js";
import request from "../../util/request/request.js";


import config from "../../../getConfig.js";

const logoPNG = config.logo;

const iconStyles = {
  color: "rgba(0,0,0,.25)"
};


const headerStyles = {
  display: "flex",
  alignItems: "center",
  ...backgrounds(`${config["@primary-color"]}`),
  ...padding(`${config["@login-header-padding"]}`)
};

const contentStyle = {
  maxWidth: "320px",
  ...margin("80px", "auto")
};


/**
 * 登录页面
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class LoginPage extends React.Component {
  static propTypes = {
    /** 标题 */
    title: PropTypes.string,
    /** logo图片src地址或base64，默认为磁云logo */
    logo: PropTypes.string,
    /** 获取验证码vid的接口地址 */
    codeVidURL: PropTypes.string,
    /** 通过vid获取验证码code的接口地址 */
    codeURL: PropTypes.string,
    /** 登录接口地址 */
    loginURL: PropTypes.string,
    /** 登录后回调函数 */
    afterLogin: PropTypes.func,
  };
  static defaultProps = {
    title: config["app-title"] || "磁云ADI平台 - 登录",
    logo: logoPNG,
    codeVidURL: "vid",
    codeURL: "vcode",
    loginURL: "login",
    afterLogin: () => {}
  };
  constructor (props) {
    super(props);
    this.loginHandle = this.loginHandle.bind(this);
  }
  state={
    username: store.get("username"),
    remembered: store.get("remembered"),
    vid: null,
    buttonReady: false,
    password: "",
    vcode: "",
  };
  componentDidMount () {
    this.getCode(this);
  }
  componentDidUpdate () {
    this.checkInputValue();
  }
  async getCode (_this) {
    const vid = await request.GET(`${config.host}/${_this.props.codeVidURL}`);
    if (vid.success && vid.data !== "") {
      _this.setState({
        vid: vid.data,
        useCode: true,
      });
    } else {
      _this.setState({
        useCode: false,
      });
    }
  }
  checkInputValue () {
    const {
      username,
      password,
      buttonReady,
      useCode
    } = this.state;
    let { vcode } = this.state;
    if (!useCode) {
      vcode = "code";
    }
    if (username !== "" && password !== "" && vcode !== "" && buttonReady === false) {
      this.setState({
        buttonReady: true
      });
    } else if ((username === "" || password === "" || vcode === "") && buttonReady === true) {
      this.setState({
        buttonReady: false
      });
    }
  }
  inputChange ({ inputValue, stateName }) {
    const _this = this;
    const changeState = () => {
      _this.setState({
        [stateName]: inputValue
      });
    };
    const handle = {
      username () {
        const remembered = store.get("remembered");
        if (remembered) {
          store.set("username", inputValue);
        }
        changeState();
      },
      password () {
        changeState();
      },
      vcode () {
        changeState();
      }
    };
    handle[stateName]();
  }
  loginHandle () {
    const _this = this;
    const {
      username,
      password,
      vcode,
      vid,
    } = this.state;
    const data = {
      username,
      password,
      vcode,
      vid,
    };
    request.POST(`${config.host}/${this.props.loginURL}`, {
      // headers: {
      //   "Content-Type": "multipart/form-data"
      // },
      body: data
    }, true).then((res) => {
      const token = res.data;
      store.set("Authentication", token);
      const callback = _this.props.afterLogin;
      if (res.success && callback && typeof callback === "function") {
        callback();
        window.location.reload();
      }
    });
  }
  render () {
    const _this = this;
    return (
      <article>
        <header style={headerStyles}>
          <Avatar
            style={{
              width: "54px",
              height: "30px",
              background: "transparent",
              borderRadius: "0"
            }}
            shape="square"
            src={this.props.logo}
          />
          <h1 style={{
            margin: "0 0 0 10px",
            fontSize: "28px",
            color: "#fff"
          }}
          >
            {this.props.title}
          </h1>
        </header>
        <div style={contentStyle}>
          <Input
            key="1"
            defaultValue={this.state.username}
            style={{ marginBottom: `${config["@padding-sm"]}` }}
            placeholder="用户名/邮箱/手机号码"
            prefix={<Icon type="user" style={iconStyles} />}
            onChange={(e) => {
              this.inputChange({
                inputValue: e.target.value,
                stateName: "username"
              });
            }}
          />
          <Input
            key="2"
            id="carrot-password"
            style={{ marginBottom: `${config["@padding-sm"]}` }}
            placeholder="密码"
            prefix={<Icon type="lock" style={iconStyles} />}
            type="password"
            onChange={(e) => {
              this.inputChange({
                inputValue: e.target.value,
                stateName: "password"
              });
            }}
          />
          {
            this.state.vid && <Input
              key="3"
              style={{ marginBottom: `${config["@padding-sm"]}` }}
              placeholder="输入验证码"
              addonAfter={
                <div
                  style={{ outline: "none", cursor: "pointer" }}
                  onClick={() => this.getCode(this)}
                  onKeyPress={() => this.getCode(this)}
                  role="button"
                  tabIndex="0"
                >
                  <img
                    src={`${config.host}/${this.props.codeURL}/${this.state.vid}`}
                    style={{ height: "22px" }}
                    alt="code"
                  />
                </div>
              }
              onChange={(e) => {
                this.inputChange({
                  inputValue: e.target.value,
                  stateName: "vcode"
                });
              }}
            />
          }
          <Checkbox
            style={{ marginBottom: `${config["@padding-sm"]}` }}
            defaultChecked={this.state.remembered}
            onChange={(e) => {
              if (e.target.checked) {
                store.set("username", _this.state.username);
                store.set("remembered", true);
              } else {
                store.remove("username");
                store.set("remembered", false);
              }
            }}
          >
          记住我
          </Checkbox>
          <Button
            disabled={!this.state.buttonReady}
            style={{ width: "100%" }}
            title="登录"
            onClick={this.loginHandle}
          />
        </div>
      </article>
    );
  }
}
