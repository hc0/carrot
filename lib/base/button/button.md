示例 Example ⬇️

```jsx
const style = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};
<div style={style}>
  <Button size="small"/>
  <Button />
  <Button size="large" />
</div>
```
```jsx
const onClick = () => {
  alert("点击按钮");
};
<Button
  title="rrreeerr"
  primary={false}
  onClick={onClick}
/>
```
