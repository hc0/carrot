示例 Example ⬇️

```jsx

/**
 * operation 顶部操作栏配置
 * 
 * @attr {bool|funcation(selectedRows, refresh, target)}
 */

// 举例：添加一个批量删除功能，隐藏新增功能
const operation = {
  /**
   * 批量删除
   * @param {array} selectedRows 选中项
   * @param {func} refresh 列表刷新方法
   * @param {object} target 被加载的组件
   * @return {ReactNode} ReactNode
   */
  delete (selectedRows, refresh, target) {
    return <Button title="批量删除" className="operation-button" type="primary" style={{ marginLeft: 25 }} />;
  },
  /**
   * 重写默认属性 （注：属性值为false时，该功能隐藏。）
   */
  add(selectedRows, refresh, target) {
    return <Button title="重写新增" className="operation-button" type="primary" style={{ marginLeft: 25 }} />;
  },
};
<div style={{
  position: "relative"
}}>
  <OrgManagement operation={operation} type="checkbox"/>
</div>
```
