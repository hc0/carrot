示例 Example ⬇️

```jsx
/**
 * 操纵按钮格式
 */
const actionGroup = _this => (<div>
  <Button title="1" onClick={() => { console.log(_this); }} />
  <Button title="2" />
  <Button title="3" />
</div>);
/**
 * 表头信息格式
 */
const columns = _this => [{
  title: "名称",
  dataIndex: "name",
  key: "name",
}, {
  title: "编号",
  dataIndex: "code",
  key: "code",
}, {
  title: "最大值",
  dataIndex: "max",
  key: "max",
}, {
  title: "长度",
  dataIndex: "numLength",
  key: "numLength",
}, {
  title: "前缀",
  dataIndex: "prefix",
  key: "prefix",
}, {
  title: "批量",
  dataIndex: "fetchSize",
  key: "fetchSize",
}, {
  title: "步长",
  dataIndex: "step",
  key: "step",
}, {
  title: "类型",
  dataIndex: "noType",
  key: "noType",
}, {
  title: "操作",
  dataIndex: "operation",
  key: "operation",
  render: (text, record) => (
    <button onClick={() => {
      console.log(_this)
      }} />
  ),
}];
<AutoNumber
/>
```
