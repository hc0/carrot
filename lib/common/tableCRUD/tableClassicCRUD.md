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
  title: "备注",
  dataIndex: "description",
  key: "description",
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
<TableClassicCRUD
/>
```
