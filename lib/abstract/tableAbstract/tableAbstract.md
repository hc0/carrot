示例 Example ⬇️

```jsx


/**
 * 表头信息格式
 */
const columns = _this => [{
  title: "名称1",
  dataIndex: "name",
  key: "name",
}, {
  title: "编码1",
  dataIndex: "code",
  key: "code",
}, {
  title: "描述1",
  dataIndex: "description",
  key: "description",
}, {
  title: "操作1",
  dataIndex: "operation",
  key: "operation",
  render: (text, record) => (
    <button onClick={() => {
      console.log(_this)
      }} />
  ),
}];

<div>
<TableAbstract
  columns={columns}
  pagination={!1}
  // title={() => "通用表格CRUD231312"}
  // type="radio"
  // getURL="role/list"
  // dataSourceKey="records"
/>

</div>
```
