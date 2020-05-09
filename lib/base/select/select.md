示例 Example ⬇️

1. 手动设置选项
```jsx
const Option = Select.Option;
<Select defaultValue="lucy" style={{ width: 120 }}>
  <Option value="jack">Jack</Option>
  <Option value="lucy">Lucy</Option>
  <Option value="disabled" disabled>Disabled</Option>
  <Option value="Yiminghe">yiminghe</Option>
</Select>

```
2. 根据数据源自动加载选项
```jsx
const options = [
  {
    value: '1',
    text: '小明'
  }, {
    value: '2',
    text: '小丽',
    disabled: true
  }, {
    value: '3',
    text: '小刚'
  }
];
<Select defaultValue="1" style={{ width: 120 }} options={options} />
```
3. 支持多选
```jsx
const options = [
  {
    value: '1',
    text: '小明'
  }, {
    value: '2',
    text: '小丽',
    disabled: true
  }, {
    value: '3',
    text: '小刚'
  }
];
<Select multiple defaultValue="1" style={{ width: 120 }} options={options} />
```
