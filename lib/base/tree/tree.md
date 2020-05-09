示例 Example ⬇️
1.手动设置选项
```jsx
const TreeNode = Tree.TreeNode;
<Tree
  checkable
  defaultExpandedKeys={['0-0-0', '0-0-1']}
  defaultSelectedKeys={['0-0-0', '0-0-1']}
  defaultCheckedKeys={['0-0-0', '0-0-1']}
>
  <TreeNode title="parent 1" key="0-0">
    <TreeNode title="parent 1-0" key="0-0-0" disabled>
      <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
      <TreeNode title="leaf" key="0-0-0-1" />
    </TreeNode>
    <TreeNode title="parent 1-1" key="0-0-1">
      <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
    </TreeNode>
  </TreeNode>
</Tree>

```
2.根据数据源自动加载选项
```jsx
const treeData = [{
  title: '0-0',
  key: '0-0',
  children: [{
    title: '0-0-0',
    key: '0-0-0',
    children: [
      { title: '0-0-0-0', key: '0-0-0-0' },
      { title: '0-0-0-1', key: '0-0-0-1' },
      { title: '0-0-0-2', key: '0-0-0-2' },
    ],
  }, {
    title: '0-0-1',
    key: '0-0-1',
    children: [
      { title: '0-0-1-0', key: '0-0-1-0' },
      { title: '0-0-1-1', key: '0-0-1-1' },
      { title: '0-0-1-2', key: '0-0-1-2' },
    ],
  }, {
    title: '0-0-2',
    key: '0-0-2',
  }],
}, {
  title: '0-1',
  key: '0-1',
  children: [
    { title: '0-1-0-0', key: '0-1-0-0' },
    { title: '0-1-0-1', key: '0-1-0-1' },
    { title: '0-1-0-2', key: '0-1-0-2' },
  ],
}, {
  title: '0-2',
  key: '0-2',
}];

const TreeNode = Tree.TreeNode;
<Tree
  checkable
  defaultExpandedKeys={['0-0-0', '0-0-1']}
  defaultSelectedKeys={['0-0-0', '0-0-1']}
  defaultCheckedKeys={['0-0-0', '0-0-1']}
  options={treeData}
/>

```
