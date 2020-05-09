import React, { Component } from "react";
import PropTypes from "prop-types";
// import { margin } from "polished";
import { Card, Modal } from "antd";
// import zhCN from "antd/lib/locale-provider/zh_CN";
import FixedTool from "../../base/fixedTool/fixedTool";
import Table from "../../base/table/table.js";
// import Button from "../../base/button/button.js";
import request from "../../util/request/request.js";


import config from "../../../getConfig.js";

const pageHeaderStyle = {
  position: "static",
  justifyContent: "space-between",
  marginBottom: config["@padding-sm"],
  border: 0,
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0,
};

const advancedSearchStyle = {
  position: "static",
  justifyContent: "space-between",
  marginTop: 0,
  marginBottom: config["@padding-sm"],
  border: `1px solid ${config["@border-color-split"]}`,
  borderRadius: config["@border-radius-base"],
  paddingLeft: 0,
  paddingRight: 0,
  // boxShadow: `0px 1px 10px 1px ${config["@border-color-split"]}`
};

// const styles = {
//   ...margin(0, 0, 0, ` ${config["@padding-sm"]}`)
// };

// const actions = _this => (
//   <div>
//     <Button
//       style={styles}
//       title="新增"
//       onClick={() => {
//         console.log(_this);
//       }}
//     />
//     <Button
//       style={styles}
//       title="编辑"
//       onClick={() => {
//         const { state } = _this;
//         const { selectedRows } = state;
//         console.log(selectedRows);
//       }}
//     />
//     <Button
//       style={styles}
//       title="删除"
//       primary={!1}
//     />
//   </div>
// );

/**
 * Table抽象
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
class TableAbstract extends Component {
  static propTypes = {
    /**
     * table名称，需返回ReactNode
     */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /** 查询条件，需返回ReactNode */
    filterGroup: PropTypes.func,
    /** 高级搜索，需返回ReactNode */
    advancedSearchGroup: PropTypes.func,
    /** 操纵按钮，需返回ReactNode */
    actionGroup: PropTypes.func,
    /** 分页，返回false时不显示 */
    pagination: PropTypes.func,
    /** 表头，[属性参见antd](https://ant.design/components/table-cn/#Column) */
    columns: PropTypes.func,
    /** 弹层内容，需返回ReactNode */
    modalContent: PropTypes.func,
    /**
     * 单选/多选
     */
    type: PropTypes.oneOf(["normal", "radio", "checkbox"]),
    /**
     * 获取数据URL
     */
    getURL: PropTypes.object,
    /**
     * dataSource取getURL返回值的字段名
     */
    dataSourceKey: PropTypes.string,
    /**
     * 远程获取数据
     *
     * 自动获取state里的值并和分页数据，在URL后拼接参数向getURL发送请求，并将返回数据绑定至state.dataSource
     */
    loadData: PropTypes.func
    /**
     * 新增提交URL
     */
    // postURL: PropTypes.string,
    /**
     * 编辑提交URL
     */
    // updateURL: PropTypes.string,
    /**
     * 删除提交URL
     */
    // deleteURL: PropTypes.string,
  };
  static defaultProps = {
    bordered: true,
    title: () => "通用表格CRUD",
    // filter: () => "",
    // actionGroup: actions,
    columns: () => [{
      title: "名称",
      dataIndex: "name",
      key: "name",
    }, {
      title: "编码",
      dataIndex: "code",
      key: "code",
    }, {
      title: "描述",
      dataIndex: "description",
      key: "description",
    }],
    type: "checkbox",
    // getURL: {},
    dataSourceKey: "records",
    pagination: _this => ({
      showQuickJumper: true,
      size: "small",
      total: _this.state.dataSource.total,
      current: _this.state.dataSource.current,
      pageSize: _this.state.dataSource.size,
      showSizeChanger: true,
      onChange: (current) => {
        _this.loadData({ pageSize: _this.state.dataSource.size, current, });
      },
      onShowSizeChange: (current, pageSize) => {
        _this.loadData({ pageSize, current: 1 });
      }
    }),
  };
  state = {
    columns: this.props.columns(this),
    modalShowed: false,
    advancedSearchShowed: false,
    dataSource: [{
      key: "1",
      name: "胡彦斌",
      code: 32,
      description: "西湖区湖底公园1号"
    }, {
      key: "2",
      name: "胡彦祖",
      code: 42,
      description: "西湖区湖底公园1号"
    }, {
      key: "3",
      name: "胡彦祖",
      code: 42,
      description: "西湖区湖底公园1号"
    }, {
      key: "4",
      name: "胡彦祖",
      code: 42,
      description: "西湖区湖底公园1号"
    }, {
      key: "5",
      name: "胡彦祖",
      code: 42,
      description: "西湖区湖底公园1号"
    }, {
      key: "6",
      name: "胡彦祖",
      code: 42,
      description: "西湖区湖底公园1号"
    }, {
      key: "7",
      name: "胡彦祖",
      code: 42,
      description: "西湖区湖底公园1号"
    }, {
      key: "8",
      name: "胡彦祖",
      code: 42,
      description: "西湖区湖底公园1号"
    }, {
      key: "9",
      name: "胡彦祖",
      code: 42,
      description: "西湖区湖底公园1号"
    }, {
      key: "10",
      name: "胡彦祖",
      code: 42,
      description: "西湖区湖底公园1号"
    }, {
      key: "11",
      name: "胡彦祖",
      code: 42,
      description: "西湖区湖底公园1号"
    }, {
      key: "12",
      name: "胡彦祖",
      code: 42,
      description: "西湖区湖底公园1号"
    }, {
      key: "13",
      name: "胡彦祖",
      code: 42,
      description: "西湖区湖底公园1号"
    }, {
      key: "14",
      name: "胡彦祖",
      code: 42,
      description: "西湖区湖底公园1号"
    }]
  };
  componentDidMount () {
    this.loadData();
  }

  getSearchParams = (searchCondition = {}) => {
    const { pageSize = 10, current = 1 } = searchCondition;
    const { state } = this;

    const params = {
      ...searchCondition,
      pageSize,
      current,
      order: "desc"
    };
    Object.keys(state)
      .filter(v => (v !== "columns" && v !== "dataSource" && v !== "modalShowed" && v !== "advancedSearchShowed"))
      .forEach((v) => {
        params[v] = state[v];
      });
    return params;
  };

  loadData = (searchCondition = {}) => {
    const { props, state } = this;
    const {
      getURL,
    } = props;
    const params = this.getSearchParams(searchCondition);
    const {
      url,
      method,
    } = getURL || {};
    request[(method && method.toUpperCase()) || "POST"](`${config.host}/${url}`, {
      body: Object.assign({}, getURL.params, params),
      params: Object.assign({}, getURL.params, params),
    }).then((res) => {
      // console.log("res", res);
      // 将数据补全
      // const { size } = res.data;
      // if (size === 10 && res.data.records.length !== size) {
      //   const emptyArray = Array(size - res.data.records.length).fill({});
      //   res.data.records = res.data.records.concat(emptyArray);
      // }

      this.setState({
        dataSource: res.data || res || state.dataSource,
      });
    });
  };
  toggleModal = () => this.setState((prevState) => {
    // console.log(prevState.modalContent);
    // console.log(prevState.modalShowed);
    let stateData = {
      modalShowed: !prevState.modalShowed
    };
    if (prevState.modalShowed) {
      stateData = Object.assign({}, stateData, {
        modalContent: null
      });
    }
    return stateData;
  });
  render () {
    const { props, state } = this;
    const {
      actionGroup,
      advancedSearchGroup,
      filterGroup,
      title,
      bordered,
      type,
      dataSourceKey,
      pagination,
      rowSelection = {
        type: type,
        onChange: (selectedRowKeys, selectedRows) => {
          this.setState({
            selectedRowKeys,
            selectedRows,
          });
        },
      },
    } = props;
    // console.log(actionGroup);
    const {
      columns,
      dataSource,
      modalShowed,
      advancedSearchShowed,
      modalContent = props.modalContent,
    } = state;
    return (
      <Card
        title={
          typeof title === "function" ? title() : title
        }
        // title={
        //   <FixedTool
        //     style={pageHeaderStyle}
        //   >
        //     {typeof title === "function" ? title() : title}
        //     { actionGroup && actionGroup(this)}
        //   </FixedTool>
        // }
      >
        <div
          style={{
            position: "relative"
          }}
        >
          {
            (actionGroup || filterGroup) &&
            <FixedTool style={pageHeaderStyle}>
              {filterGroup && filterGroup(this)}
              {actionGroup && actionGroup(this)}
            </FixedTool>
          }
          {
            advancedSearchShowed && advancedSearchGroup &&
            <FixedTool style={advancedSearchStyle}>
              {advancedSearchGroup && advancedSearchGroup(this)}
            </FixedTool>
          }
          {/*
            <button onClick={() => this.toggleModal()} />
          */}
          <Table
            {...props}
            title={() => {}}
            // bordered={bordered}
            // rowKey="id"
            dataSource={(dataSourceKey && dataSourceKey !== "") ? dataSource[dataSourceKey] : dataSource}
            // dataSource={dataSource}
            columns={columns}
            rowSelection={type !== "normal" ? rowSelection : null}
            pagination={pagination && pagination(this)}
          />
          {
            modalShowed &&
            <Modal
              visible={!!1}
              footer={null}
              destroyOnClose={!!1}
              onCancel={() => this.toggleModal()}
              width="80%"
              maskClosable={!1}
            >
              {
                modalContent
              }
            </Modal>
          }
        </div>
      </Card>
    );
  }
}

export default TableAbstract;
