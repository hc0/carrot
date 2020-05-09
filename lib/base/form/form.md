示例 Example ⬇️

```jsx
const actions = _this => (<div>
  <Button title="1" onClick={() => { console.log(_this); }} />
  <Button title="2" />
  <Button title="3" />
</div>);

<div>
  <Form title="表单标题" handleSubmit={() => { console.log("handleSubmit"); }}>
    <Input />
    <Input />
    <Input />
  </Form>
  <br/>
  <Form title="表单标题" actionGroup={actions}>
    <Input />
    <Input />
    <Input />
  </Form>
</div>
```
构建带有验证的表单 [demo可见ChangePassword](/#changepassword)

``` jsx
<br />
// 1. 引入组件
// import { Form, FormItem, Create } from "../../base/form/form.js";
//...
{
  /*

  2. 给FormItem添加验证
  render () {
    const { props } = this;
    const { getFieldDecorator } = props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    return (
      <Form title="修改密码" handleSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="旧密码"
        >
          {getFieldDecorator("oldPassword", {
            initialValue: "",
            rules: [{ required: true, message: "旧密码必填!" }],
          })(<Input type="password" placeholder="旧密码" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新密码"
        >
          {getFieldDecorator("password", {
            initialValue: "",
            rules: [{ required: true, message: "新密码必填!" }],
          })(<Input type="password" placeholder="新密码" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码确认"
        >
          {getFieldDecorator("confirmPassword", {
            initialValue: "",
            rules: [
              { required: true, message: "必填!" },
              { validator: this.checkPassword }
            ],
          })(<Input type="password" placeholder="确认新密码" />)}
        </FormItem>
      </Form>
    );
  }
  */
}

// 3. 创建验证表单
// export default Create(ChangePassword);
```
