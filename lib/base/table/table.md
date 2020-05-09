示例 Example ⬇️

```jsx
const columns = [{
  title: "Name",
  dataIndex: "name",
  render: text => <a href="#">{text}</a>,
}, {
  title: "Age",
  dataIndex: "age",
}, {
  title: "Address",
  dataIndex: "address",
}];
const data = [{
  id: "1",
  name: "John Brown",
  age: 32,
  address: "New York No. 1 Lake Park",
}, {
  id: "244",
  name: "Jim Green",
  age: 42,
  address: "London No. 1 Lake Park",
}, {
  id: "3",
  name: "Joe Black",
  age: 32,
  address: "Sidney No. 1 Lake Park",
}, {
  id: "4",
  name: "Disabled User",
  age: 99,
  address: "Sidney No. 1 Lake Park",
  disabled: true
}];

<Table columns={columns} dataSource={data} />
```
