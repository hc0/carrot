示例 Example ⬇️

```jsx

/**
 * 表头信息格式
 */
const columns = [{
  title: "名称1223423423",
  key: "name",
}, {
  title: "编码33",
  key: "code",
}, {
  title: "描述44",
  key: "description",
}];

const advancedSearchGroup = [{
  title: "角色编码",
  key: "code",
  type: "input",
  placeholder: "请输入姓名"
}, {
  title: "角色名称",
  key: "name",
  type: "select",
  placeholder: "请选择性别"
}, {
  title: "是否停用",
  key: "status",
  type: "time",
  placeholder: "请选择时间"
}, {
  title: "地区",
  key: "dict",
  type: "cascader",
  placeholder: "请选择时间"
}, {
  title: "自定义",
  key: "mendian",
  type: "custom",
  placeholder: "请选择门店"
}];

const customURL = {
  getURL: {
    url: "role/list",
    method: "POST"
  },
  getDetailURL: {
    url: "role/detail",
    //method: "POST"
  },
  addURL: {
    url: "sys/role/save",
    //method: "POST"
  },
  updateURL: {
    url: "role/update",
    method: "POST"
  },
  deleteURL: {
    url: "role/delete",
    method: "get"
  },
  exportAllURL: "order/order/bespeak/exportBespeakExcelByCondition",
  exportPartURL: "order/order/bespeak/exportBespeakExcelByOrderId"
};

const detailForm = [
  [
    {
      title: "角色编码",
      key: "code",
      type: "input",
      placeholder: "请输入姓名",
      rules: [{ required: true, message: "角色编码必填!" }],
    },
    {
      title: "角色名称",
      key: "name",
      rules: [{ required: true, message: "角色名称必填!" }],
    },
    {
      title: "是否停用",
      key: "status",
      rules: [{ required: true, message: "是否停用必填!" }],
    }
  ],
  [
    {
      title: "描述",
      key: "description",
    },
    {
      title: "其他",
      key: "other",
    }
  ],
  [
    {
      title: "描述2",
      key: "description2",
    },
    {
      title: "其他2",
      key: "other2",
    }
  ],
  [
    {
      title: "描述3",
      key: "description3",
    },
    {
      title: "其他3",
      key: "other3",
    }
  ],
  [
    {
      title: "描述4",
      key: "description4",
    },
    {
      title: "其他4",
      key: "other4",
    }
  ],
  [
    {
      title: "描述41",
      key: "description41",
    },
    {
      title: "其他41",
      key: "other41",
    }
  ],
  [
    {
      title: "描述42",
      key: "description42",
    },
    {
      title: "其他42",
      key: "other42",
    }
  ],
  [
    {
      title: "描述43",
      key: "description43",
    },
    {
      title: "其他43",
      key: "other43",
    }
  ],
  [
    {
      title: "描述44",
      key: "description44",
    },
    {
      title: "其他44",
      key: "other44",
    }
  ],
  [
    {
      title: "描述45",
      key: "description45",
    },
    {
      title: "其他45",
      key: "other45",
    }
  ],
  [
    {
      title: "描述46",
      key: "description46",
    },
    {
      title: "其他46",
      key: "other46",
    }
  ]
];

<div>

<TableDetail
  detailForm={detailForm}
/>
</div>
```
