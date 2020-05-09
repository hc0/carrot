import React from "react";
import PropTypes from "prop-types";
import { Steps, Switch } from "antd";
import "antd/lib/steps/style";

import Input from "../../base/input/input.js";
import Select from "../../base/select/select.js";
import Button from "../../base/button/button.js";
import Notification from "../../base/notification/notification.js";
import { Form, FormItem, Create } from "../../base/form/form.js";
import request from "../../util/request/request.js";

import config from "../../../getConfig.js";

const { Step } = Steps;
const { Option } = Select;


const stepsContent = {
  marginTop: config["@padding-sm"],
  border: "1px dashed #e9e9e9",
  borderTadius: "6px",
  backgroundColor: "#fafafa",
  minHeight: "200px",
  textAlign: "center",
  padding: "50px"
};

const stepsAction = {
  marginTop: "24px"
};

/**
 *  代码生成器组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
class CodeBuilder extends React.Component {
  static propTypes = {
    /** 获取代码生成器配置项地址 */
    envUrl: PropTypes.string,
    /** 生成代码提交地址 */
    generateUrl: PropTypes.string,
  };
  static defaultProps = {
    envUrl: "generator/env",
    generateUrl: "generator/generate",
  };
  state = {
    current: 0,
  };
  componentDidMount () {
    const { envUrl } = this.props;
    request.GET(`${config.host}/${envUrl}`).then((res) => {
      this.setState({ ...res.data });
    });
  }
  checkPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("两次密码不一致!");
    } else {
      callback();
    }
  };
  inputChange =({ name, value }) => {
    this.setState({
      [name]: value
    });
  };
  handleSubmit = () => {
    const { generateUrl } = this.props;
    const { getFieldsValue } = this.props.form;
    const fieldsValue = getFieldsValue();
    const {
      entityName = fieldsValue.entityName || "",
      projectPackage = fieldsValue.projectPackage || "",
      model = fieldsValue.model || "",
      tableName = fieldsValue.tableName || "",
      tablePrefix = fieldsValue.tablePrefix || "",
      projectLocation = fieldsValue.projectLocation || "",
      developer = fieldsValue.developer || "",
      onlyGenerateEntity = fieldsValue.onlyGenerateEntity || false,
    } = this.state;
    const values = {
      projectLocation,
      developer,
      tablePrefix,
      projectPackage,
      model,
      entityName,
      tableName,
      onlyGenerateEntity,
    };
    if (Object.keys(values).every(key => values[key] !== "")) {
      request.POST(`${config.host}/${generateUrl}`, {
        body: values
      }).then((res) => {
        if (res.success) {
          Notification.success({
            message: "生成成功"
          });
        } else {
          Notification.error({
            message: res.msg
          });
        }
      });
    } else {
      Notification.warn({
        message: "有选项没有填哦"
      });
    }
  };
  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };
  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };
  selectChange = (value) => {
    const obj = this.state.tables.find(v => v.tableName === value) || {};
    this.setState({
      entityName: obj.tableComment,
      tableName: value
    });
  };
  selectOption = () => this.state.tables && this.state.tables.map(d => <Option key={d.tableName}>{d.tableName} - {d.tableComment}</Option>);
  renderForm = (step) => {
    const { props, state } = this;
    const { getFieldDecorator, getFieldsValue } = props.form;
    const fieldsValue = getFieldsValue();
    const {
      params = {},
      entityName = fieldsValue.entityName || "",
      projectPackage = fieldsValue.projectPackage || "",
      model = fieldsValue.model || "",
      tableName = fieldsValue.tableName || "",
      tablePrefix = fieldsValue.tablePrefix || ""
    } = state;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    const projectPackageModel = `${projectPackage}.${model}`;
    const newTableName = tableName.replace(tablePrefix, "")
      .split("_").map(v => v.replace(v.charAt(0), v.charAt(0).toUpperCase())).join("");
    const entityClassName = `${projectPackage}.${model}.entity.${newTableName}`;
    return (
      <Form title="代码生成器" actionGroup={() => <div />}>
        {
          step === 1 && (
            <div>
              <div>生成代码的项目路径，配置到项目根目录即可</div>
              <FormItem
                {...formItemLayout}
                label="项目路径"
              >
                {getFieldDecorator("projectLocation", {
                  initialValue: params.projectLocation,
                  rules: [{ required: true, message: "项目路径必填!" }],
                })(<Input onChange={e => this.inputChange({ name: "projectLocation", value: e.target.value })} />)}
              </FormItem>
              <div>开发人员名称</div>
              <FormItem
                {...formItemLayout}
                label="开发者"
              >
                {getFieldDecorator("developer", {
                  initialValue: params.developer,
                  rules: [{ required: true, message: "开发者必填!" }],
                })(<Input onChange={e => this.inputChange({ name: "developer", value: e.target.value })} />)}
              </FormItem>
              <div>忽略的表前缀，生成后的实体类名会忽略前缀</div>
              <FormItem
                {...formItemLayout}
                label="数据表前缀"
              >
                {getFieldDecorator("tablePrefix", {
                  initialValue: params.tablePrefix,
                  rules: [{ required: true, message: "数据表前缀必填!" }],
                })(<Input onChange={e => this.inputChange({ name: "tablePrefix", value: e.target.value })} />)}
              </FormItem>
            </div>
          )
        }
        {
          step === 2 && (
            <div>
              <div>模块Java包路径，例如：com.iciyun.adi.base</div>
              <FormItem
                {...formItemLayout}
                label="模块包路径"
              >
                {getFieldDecorator("projectPackage", {
                  initialValue: "",
                  rules: [{ required: true, message: "新密码必填!" }],
                })(<Input onChange={e => this.inputChange({ name: "projectPackage", value: e.target.value })} />)}
              </FormItem>
              <div>代码所属子模块</div>
              <FormItem
                {...formItemLayout}
                label="所属子模块"
              >
                {getFieldDecorator("model", {
                  initialValue: "platform",
                  rules: [{ required: true, message: "新密码必填!" }],
                })(<Input onChange={e => this.inputChange({ name: "model", value: e.target.value })} />)}
              </FormItem>
            </div>
          )
        }
        {
          step === 3 && (
            <div>
              <div>实体名称，例如：生产订单。注意实体名称后不要带XX表</div>
              <FormItem
                {...formItemLayout}
                label="实体名称"
              >
                <Input disabled value={entityName} placeholder="请选择下方数据表" />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="选择数据表"
              >
                {getFieldDecorator("tableName", {
                  initialValue: "",
                  rules: [
                    { required: true, message: "必填!" },
                  ],
                })(<Select
                  mode="combobox"
                  defaultActiveFirstOption={!1}
                  onChange={this.selectChange}
                >
                  {this.selectOption()}
                </Select>)}
              </FormItem>
            </div>
          )
        }
        {
          step === 4 && (
            <div>
              <div>实体名称，例如：生产订单。注意实体名称后不要带XX表</div>
              <FormItem
                {...formItemLayout}
                label="实体名称"
              >
                <Input disabled value={entityName} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="代码包路径"
              >
                <Input disabled value={projectPackageModel} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="实体类名"
              >
                <Input disabled value={entityClassName} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="只生成实体类"
              >
                {getFieldDecorator("onlyGenerateEntity", {
                  initialValue: "",
                  rules: [
                  ],
                })(<Switch style={{ textAlign: "left", marginLeft: "2px" }} />)}
              </FormItem>
            </div>
          )
        }
      </Form>
    );
  };
  render () {
    const { state } = this;
    const { current } = state;

    const steps = [{
      title: "第一步：项目配置",
      content: this.renderForm(1),
    }, {
      title: "第二步：模块配置",
      content: this.renderForm(2),
    }, {
      title: "第三步：选择数据表",
      content: this.renderForm(3),
    }, {
      title: "第四步：生成代码",
      content: this.renderForm(4),
    }];
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div style={stepsContent}>
          {steps[this.state.current].content}
          <div style={stepsAction}>
            {
              this.state.current > 0
              &&
              <Button title="上一步" primary={!1} style={{ marginRight: 8 }} onClick={() => this.prev()} />
            }
            {
              this.state.current < steps.length - 1
              &&
              <Button title="下一步" primary={!1} onClick={() => this.next()} />
            }
            {
              this.state.current === steps.length - 1
              &&
              <Button title="生成代码" onClick={this.handleSubmit} />
            }
          </div>
        </div>
      </div>
    );
  }
}
export default Create(CodeBuilder);
