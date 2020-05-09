示例 Example ⬇️

``` jsx
const shortcuts = [{
  name: '用户管理',
  desc: "用户管理",
  path: "/com",
  id:'1'
},{
  name: '角色管理',
  desc: "角色管理",  
  path: "/com",
  id:'2'
},{
  name: '资源管理',
  desc: "资源管理",  
  path: "/com",
  id:'3'
},{
  name: '系统工具',
  desc: "短信组件 邮件组件 代码生成器 Swagger API 框架生成",  
  path: "/com",
  id:'4'
}];
const Home = ()=> (
  <HomePage shortcuts={shortcuts}/>
)
const menus = [
  {
    id: '1',
    path: "/",
    name: "首页",
    component: Home
  },{
    id: '2',    
    name: "用户中心",
    children: [
      {
        id: '3',    
        path: "/comp2",
        name: "角色管理",
        component: Cascader
      }, {
        id: '4',    
        path: "/home3",
        name: "用户管理",
        component: Button
      }
    ]
  }
];
<div />
{/*
<Menu style={{width: 200}} menus={menus}/>
*/}
```
