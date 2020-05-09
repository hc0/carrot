import React from "react";
import PropTypes from "prop-types";
import AntdTable from "antd/lib/table";
import "antd/lib/table/style";

/**
 * 表格组件
 * antd-table文档(https://ant.design/components/table-cn/#components-table-demo-dynamic-settings)
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default class Table extends React.Component {
  static propTypes = {
    /** 表格行 key 的取值，可以是字符串或一个函数 */
    rowKey: PropTypes.string,
    /**
     * Gets called when the user clicks on the breadcrumb
     *
     * @param {SyntheticEvent} event The react `SyntheticEvent`
     * @param {Object} allProps All props of this Breadcrumb
     */
    // onClick: PropTypes.func
  };
  static defaultProps = {
    rowKey: "id",
  };
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    // loading: false,
  };
  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys, });
  };
  render () {
    const { props } = this;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled, // Column configuration not to be checked
      }),
    };
    return (
      <AntdTable
        rowKey={props.rowKey}
        rowSelection={rowSelection}
        {...props}
      />
    );
  }
}
