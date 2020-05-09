import React, { Component } from "react";
import PropTypes from "prop-types";
import { margin } from "polished";
import { Tooltip, Row, Col, Input as ATInput, Popconfirm } from "antd";
import TableAbstract from "../../abstract/tableAbstract/tableAbstract.js";
// import zhCN from "antd/lib/locale-provider/zh_CN";
// import FixedTool from "../../base/fixedTool/fixedTool";
import Button from "../../base/button/button.js";
import Icon from "../../base/icon/icon.js";
import Input from "../../base/input/input.js";
import Print from "../../base/print/print.js";
import notification from "../../base/notification/notification.js";
import TableDetail from "./tableDetail.js";
import Storage from "../../util/localData/storage.js";
import request, { urlAppendQuery } from "../../util/request/request.js";

import config from "../../../getConfig.js";

// const pageHeaderStyle = {
//   position: "static",
//   justifyContent: "space-between"
// };

const styles = {
  ...margin(0, 0, 0, ` ${config["@padding-sm"]}`)
};

const clearAdvancedSearchValue = (_this) => {
  const { advancedSearchGroupPropsArray = [] } = _this;
  const newState = {};
  advancedSearchGroupPropsArray.forEach((item) => {
    newState[item.key] = "";
  });
  _this.setState(newState);
};


/**
 * 通用表格CRUD抽象
 *
 * [应用demo](#taskmanagement)
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
class TableCRUD extends Component {
  static propTypes = {
    /**
     * table名称，字符串或ReactNode
     */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /** 查询条件，默认有，若为false则隐藏 */
    filterGroup: PropTypes.bool,
    /** 高级搜索e，默认无，若有则高级搜索按钮回会自动显示出来 */
    advancedSearchGroup: PropTypes.array,
    /** 扩展操纵按钮 */
    actionGroup: PropTypes.array,
    /** 分页，默认有，若为false则不显示 */
    pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    /** 表头，[属性参见antd](https://ant.design/components/table-cn/#Column) */
    columns: PropTypes.array,
    /**
     * 单选/多选
     */
    type: PropTypes.oneOf(["normal", "radio", "checkbox"]),
    /**
     * 表头是否有操作功能
     */
    hasOperation: PropTypes.bool,
    /**
     * 是否有新增功能
     */
    hasAdd: PropTypes.bool,
    /**
     * 是否有编辑功能
     */
    hasUpdate: PropTypes.bool,
    /**
     * 是否有删除功能
     */
    hasDelete: PropTypes.bool,
    /**
     * 是否有导出功能
     */
    hasExport: PropTypes.bool,
    /**
     * 是否有打印功能
     */
    hasPrint: PropTypes.bool,
    /**
     * dataSource取getURL返回值的字段名
     */
    dataSourceKey: PropTypes.string,
    /**
     * restful接口URL，各操作将按照restful风格自动匹配接口
     */
    restURL: PropTypes.string,
    /**
     * 自定义接口URL，
     * {
     *    addURL: {
     *      url: 地址,
     *      method: 请求方法
     *    },
          updateURL,
          deleteURL,
          getDetailUR,
          exportAllURL,
          exportPartURL
     * }
     */
    customURL: PropTypes.object,
    /**
     * 详情页表单内项
     */
    detailForm: PropTypes.array,
    /**
     * 详情页表单项列数
     */
    detailColumn: PropTypes.number,
    /**
     * 详情页表单项分栏比例
     */
    detailItemCol: PropTypes.array,
    /**
     * 详情页表单项是否有边框
     */
    detailBordered: PropTypes.bool,
    /**
     * 远程获取数据
     *
     * 自动获取state里的值并和分页数据，在URL后拼接参数向getURL发送请求，并将返回数据绑定至state.dataSource
     */
    // loadData: PropTypes.func,
    /**
     * 获取数据URL，优先级高于restURL
     */
    // getURL: PropTypes.string,
    /**
     * 新增提交URL，优先级高于restURL
     */
    // addURL: PropTypes.string,
    /**
     * 编辑提交URL，优先级高于restURL
     */
    // updateURL: PropTypes.string,
    /**
     * 删除提交URL，优先级高于restURL
     */
    // deleteURL: PropTypes.string,
    /**
     * 获取详情URL，优先级高于restURL
     */
    // getDetailUR: PropTypes.string,
    /**
     * 导出URL，优先级高于restURL
     */
    // exportURL: PropTypes.string,
  };
  static defaultProps = {
    columns: [{
      title: "名称12",
      key: "name",
    }, {
      title: "编码33",
      key: "code",
    }, {
      title: "描述44",
      key: "description",
    }],
    /**
     * @private
     */
    filterGroup: true,
    hasOperation: true,
    hasAdd: true,
    hasUpdate: true,
    hasDelete: true,
    hasExport: false,
    hasPrint: false,

    // restURL: "123",
    // getURL: `${this.restURL}/get`,
    // addURL: `${this.restURL}/addURL`,
    // updateURL: `${this.restURL}/updateURL`,
    // deleteURL: `${this.restURL}/deleteURL`,
    // getDetailUR: `${this.restURL}/getDetailUR`,
    // exportURL: `${this.restURL}/exportURL`,
    // advancedSearchGroup: advancedSearch,

  };
  // state = {
  //   detailId: "",
  //   // readonly: true,
  // };
  composeActionGroup = actionGroup => _this => (
    <div>
      {
        this.props.hasAdd &&
        <Button
          style={styles}
          icon="plus"
          title="新增"
          onClick={() => {
            // const { state } = _this;
            // const { selectedRows } = state;
            // console.log(selectedRows);
            _this.setState({
              modalContent: this.composeDetail({
                readonly: false,
                detailId: "",
                parentThis: _this,
              })
            });
            _this.toggleModal();
          }}
        />
      }
      {
        this.props.hasDelete &&
        <Popconfirm
          title="确认删除选中项？"
          placement="bottom"
          okText="确认"
          cancelText="取消"
          onConfirm={() => {
            if (!_this.state.selectedRows || !_this.state.selectedRows.length) {
              notification.warn({ message: "请选择删除项" });
              return false;
            }
            const { deleteURL } = this.props.customURL || {
              deleteURL: {
                url: this.props.restURL,
                method: "DELETE"
              }
            };
            return this.delete(deleteURL, _this.state.selectedRowKeys, _this);
          }}
        >
          <Button
            style={styles}
            icon="delete"
            title="删除选中"
            primary={!1}
          />
        </Popconfirm>
      }
      {
        this.props.hasExport &&
        <Button
          style={styles}
          icon="download"
          title="全部导出"
          primary={!1}
          onClick={() => {
            const url = this.props.customURL && this.props.customURL.exportAllURL;
            this.exportAll(url, _this.getSearchParams());
          }}
        />
      }
      {
        this.props.hasExport &&
        <Button
          style={styles}
          icon="download"
          title="导出选中"
          primary={!1}
          onClick={() => {
            if (!_this.state.selectedRows || !_this.state.selectedRows.length) {
              notification.warn({ message: "请选择导出项" });
              return false;
            }
            const url = this.props.customURL && this.props.customURL.exportPartURL;
            this.exportPart(url, { orderIds: _this.state.selectedRowKeys });
          }}
        />
      }
      {
        this.props.hasPrint &&
        <Button
          style={styles}
          icon="print"
          title="打印"
          primary={!1}
          onClick={() => {
            this.printTable();
          }}
        />
      }
      {
        actionGroup && actionGroup.map(item => (
          <Button
            style={Object.assign({}, styles, item.style)}
            icon={item.icon}
            title={item.title}
            primary={item.primary ? true : !1}
            onClick={() => {
              if (item.onClick && typeof item.onClick === "function") {
                item.onClick(_this);
              }
            }}
          />
        ))
      }
    </div>
  );
  composeColumns = (columns = []) => {
    if (!(columns instanceof Array) && typeof columns === "function") {
      return columns;
    }
    columns.map((item) => {
      item.dataIndex = item.key;
      return item;
    });
    return _this => this.props.hasOperation ? columns.concat([
      {
        title: "操作",
        dataIndex: "operationHandle",
        key: "operationHandle",
        render: (text, record) => (
          <div>
            <Tooltip placement="top" title="查看">
              <Icon
                // style={styles}
                type="profile"
                onClick={() => {
                  _this.setState({
                    modalContent: this.composeDetail({
                      readonly: true,
                      detailId: record.id,
                      parentThis: _this,
                    })
                  });
                  _this.toggleModal();
                }}
              />
            </Tooltip>
            {
              this.props.hasUpdate &&
              <Tooltip placement="top" title="编辑">
                <Icon
                  style={styles}
                  type="edit"
                  onClick={() => {
                    _this.setState({
                      modalContent: this.composeDetail({
                        readonly: false,
                        detailId: record.id,
                        parentThis: _this,
                      })
                    });
                    _this.toggleModal();
                  }}
                />
              </Tooltip>
            }
            {
              this.props.hasDelete &&
              <Popconfirm
                title="确认删除？"
                okText="确认"
                cancelText="取消"
                onConfirm={() => {
                  const { deleteURL } = this.props.customURL || {
                    deleteURL: {
                      url: this.props.restURL,
                      method: "DELETE"
                    }
                  };
                  return this.delete(deleteURL, [record.id], _this);
                }}
              >
                <Tooltip placement="top" title="删除">
                  <Icon
                    style={styles}
                    type="delete"
                  />
                </Tooltip>
              </Popconfirm>
            }
          </div>
        ),
      }
    ]) : columns;
  };
  /**
   * 构建高级查询
   * @param  {Array}  advancedSearchGroup 111
   * @return {function}                     555
   */
  composeAdvancedSearchGroup = (advancedSearchGroup = []) => {
    if (!(advancedSearchGroup instanceof Array)) {
      return false;
    }

    // 高级搜索框的类型
    const searchFormItem = {
      input (item, _this) {
        return (
          <Input
            key={item.key}
            placeholder={item.placeholder}
            value={_this.state[item.key]}
            onChange={(e) => {
              _this.setState({
                [item.key]: e.target.value
              });
            }}
          />
        );
      },
      // select () {
      //   return (

      //   );
      // },
      // time () {
      //   return (
      //   );
      // },
      // cascader () {
      //   return (
      //   );
      // },
      // custom () {
      //   return (
      //   );
      // },
    };
    const advancedSearchGroupLength = advancedSearchGroup.length;
    if (!advancedSearchGroupLength) {
      return () => {};
    }
    console.log("advancedSearchGroupLength", advancedSearchGroupLength);
    const newAdvancedSearchGroup = (_this) => {
      _this.advancedSearchGroupPropsArray = advancedSearchGroup;

      return advancedSearchGroup.map((item) => {
        // const {
        //   title,
        //   key,
        //   type,
        //   placeholder
        // } = item;
        return (
          <Col key={item.key} span={(advancedSearchGroupLength > 4) ? 6 : (24 / advancedSearchGroupLength)}>
            <Col span={10} style={{ textAlign: "right", lineHeight: config["@input-height-base"] }}>
              {item.title}：
            </Col>
            <Col span={14}>
              {
                searchFormItem[item.type] && searchFormItem[item.type](item, _this)
              }
            </Col>
          </Col>
        );
      });
    };

    return (_this => (
      <div style={{ width: "100%" }}>
        {
          newAdvancedSearchGroup(_this)
        }
        <Col span={20} push={2}>
          <Button
            style={styles}
            // icon="filter"
            // primary={!1}
            title="查询"
            onClick={() => {
              _this.loadData();
              // 强制刷新以更新打印内容
              this.forceUpdate();
            }}
          />
          <Button
            style={styles}
            // icon="filter"
            primary={!1}
            title="清除"
            onClick={() => clearAdvancedSearchValue(_this)}
          />
        </Col>
      </div>
    ));
  };

  composeDetail = ({ readonly, detailId, parentThis }) => {
    const {
      detailTitle,
      detailForm,
      detailColumn,
      detailItemCol,
      detailBordered,
      customURL,
      restURL
    } = this.props;
    const { getDetailURL, addURL, updateURL } = customURL || {
      getDetailURL: { url: restURL, method: "GET" },
      addURL: { url: restURL, method: "POST" },
      updateURL: { url: restURL, method: "PUT" },
    };

    return (
      <TableDetail
        title={detailTitle}
        formItemGroup={detailForm}
        column={detailColumn}
        itemCol={detailItemCol}
        getDetailURL={getDetailURL}
        addURL={addURL}
        updateURL={updateURL}
        detailId={detailId}
        readonly={readonly}
        parentThis={parentThis}
        bordered={detailBordered}
      />
    );
  };

  composeFilterGroup = advancedSearchGroup => _this => (
    <Row style={{ minWidth: "450px" }}>
      <Col span={advancedSearchGroup ? 18 : 24}>
        <ATInput.Search
          id="ATInputSearch"
          placeholder="内容关键字"
          enterButton
          onChange={(e) => {
            _this.setState({
              search: e.target.value
            });
          }}
          onSearch={() => _this.loadData()}
        />
      </Col>
      {
        advancedSearchGroup &&
          <Col span={6}>
            <Button
              style={styles}
              icon="filter"
              primary={!1}
              title="高级查询"
              onClick={() => {
                clearAdvancedSearchValue(_this);
                _this.setState(prevSate => ({
                  advancedSearchShowed: !prevSate.advancedSearchShowed
                }));
                // 强制刷新以更新打印内容
                this.forceUpdate();
              }}
            />
          </Col>
      }
    </Row>
  );

  delete = (deleteURL = {}, params, _this) => {
    const {
      method,
    } = deleteURL;
    let { url } = deleteURL;
    if (params.length > 1) {
      url = `${config.host}/${url}`;
    } else {
      url = `${config.host}/${url}/${params[0]}`;
    }
    request[(method && method.toUpperCase()) || "DELETE"](url, {
      body: { ids: params },
      params: { ids: params },
    }).then((res) => {
      if (res.success) {
        Notification.success({
          message: "删除成功"
        });
        _this.loadData();
      } else {
        Notification.success({
          message: res.msg
        });
      }
    });
  };

  export = (url, params) => {
    const Authentication = Storage.get("Authentication").replace("\"", "").replace("\"", "");
    window.location.href = urlAppendQuery(`${config.host}/${url}`, { ...params, Authentication });
  };

  exportAll = (url, params) => {
    if (!url) {
      console.error("请设置Table导出接口的地址customURL.exportAllURL");
      return false;
    }
    this.export(url, params);
  };

  exportPart = (url, params) => {
    if (!url) {
      console.error("请设置Table导出接口的地址customURL.exportPartURL");
      return false;
    }
    this.export(url, params);
  };

  render () {
    const { props, state } = this;
    const {
      bordered,
      rowKey,
      title,
      type,
      columns,
      pagination,
      filterGroup,
      advancedSearchGroup,
      actionGroup,
      dataSourceKey,
      hasAdd,
      hasUpdate,
      hasDelete,
      hasExport,
      hasPrint,

      restURL,
      customURL,
      // addURL,
      // updateURL,
      // deleteURL,
      // getDetailUR,
      // exportURL,

    } = props;

    const { getURL } = customURL || {
      getURL: { url: restURL }
    };

    return (
      <Print
        print={(print) => {
          this.printTable = print;
        }}
        beforePrint={() => {
          // fix ATInputSearch打印时高度全屏
          const ATInputSearch = document.getElementById("ATInputSearch");
          if (ATInputSearch) {
            ATInputSearch.style.minHeight = 0;
            // 强制刷新以更新打印内容
            this.forceUpdate();
          }
        }}
        // afterPrint={afterPrint}
      >
        <TableAbstract
          bordered={bordered}
          rowKey={rowKey}
          title={title}
          type={type}
          getURL={getURL}
          dataSourceKey={dataSourceKey}
          pagination={pagination}
          columns={this.composeColumns(columns)}
          filterGroup={filterGroup ? this.composeFilterGroup(advancedSearchGroup) : () => <div />}
          advancedSearchGroup={this.composeAdvancedSearchGroup(advancedSearchGroup)}
          actionGroup={this.composeActionGroup(actionGroup)}
          hasAdd={hasAdd}
          hasUpdate={hasUpdate}
          hasDelete={hasDelete}
          hasExport={hasExport}
          hasPrint={hasPrint}
        />
      </Print>
    );
  }
}

export default TableCRUD;
