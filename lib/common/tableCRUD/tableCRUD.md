示例 Example ⬇️

```jsx
/**
 * 扩展按钮格式
 */
const actionGroup = [{
  title: "姓名",
  icon: "key",
  style: "",
  onClick: (_this) => {
    console.log(_this);
    _this.setState({
      modalContent: <div>modalContent</div>
    });
    _this.toggleModal();

  } ,
}, {
  title: "性别",
  key: "gender",
  primary: true,
  onClick: () => {
    alert();
  }
}];


/**
 * 表头信息格式
 */
const columns = [{
  title: "Txs Hash",
  key: "txHash",
  render: text => (
    <a
      href="#saf"
      roles="botton"
      tabIndex="0"
    >
      {text}
    </a>
  )
}, {
  title: "Tx  Amount",
  key: "txAmount",
}, {
  title: "Tx  Task  Code",
  key: "txTaskCode",
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
    url: "transaction/list",
    params: {
      blockHash: 232
    },
    method: "get"
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
      type: "withoutFormItem",
      content: "请输入角色名称1",
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

<TableCRUD
  dataSourceKey="content"
  rowKey="txHash"
  // type="normal"
  // title={() => "通用表格CRUD231312"}
   actionGroup={actionGroup}
  // pagination={!1}
  columns={columns}
  // filterGroup={!1}
  advancedSearchGroup={advancedSearchGroup}
  //hasAdd={!1}
  //hasUpdate={!1}
  //hasDelete={!1}
  // hasExport={!!1}
  // hasPrint={!!1}
  //restURL="role/list"
  customURL={customURL}
  detailForm={detailForm}
  detailColumn={2}
  // detailBordered={!1}
  // detailItemCol={[13, 5]}
/>
</div>
```
