示例 Example ⬇️

```jsx
const items = [
  {
    name: "首页",
    onClick: () => {
      alert("首页");
    }
  }, {
    name: "基础组件",
    onClick: () => {
      alert("基础组件");
    }
  }
];
<Breadcrumb separator="~" items={items} />
```
