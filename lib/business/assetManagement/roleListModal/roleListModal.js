import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { Button } from "../../../index";
import RoleListContent from "./roleListContent";

const RoleList = (props) => {
  const operation = {
    /**
     * 重写默认属性 （注：属性值为false时，该功能隐藏。）
     */
    add: false,
    query: false,
    ok (selectedRows) {
      return (
        <Button
          className="operation-button"
          type="primary"
          style={{ marginLeft: 25 }}
          title="保存"
          onClick={() => {
            if (props.hideModal) {
              props.hideModal();
            }
            if (props.onSelectedRows) {
              props.onSelectedRows(selectedRows);
            }
          }}
        />);
    },
    close () {
      return <Button title="关闭" className="operation-button" type="primary" style={{ marginLeft: 25 }} onClick={props.hideModal} />;
    }
  };
  return (
    <RoleListContent roleSelectedRows={props.roleSelectedRows} operation={operation} type={props.type} />
  );
};
const operation = target => ({
  add: false,
  query: false,
  ok (selectedRows) {
    target.setState({
      selectedRows
    });
    return (
      <div />
    );
  },
});
class RoleListModal extends Component {
  static propTypes = {
    /**
     * 单选/多选
     */
    type: PropTypes.oneOf(["normal", "radio", "checkbox"]),
    /**
     * 显隐
     */
    visible: PropTypes.bool,
    /**
     * 设置选中项
     */
    roleSelectedRows: PropTypes.array,
    /**
     * 弹层隐藏方法
     */
    hideModal: PropTypes.func,
    /**
     * 保存时调用
     */
    onSelectedRows: PropTypes.func,
    /**
     * 样式
     */
    style: PropTypes.object
  };
  static defaultProps = {
    visible: false,
    roleSelectedRows: [],
    type: "checkbox",
    style: {
      width: "550px",
      borderRadius: "5px",
      overflow: "hidden"
    }
  };
  render () {
    const {
      style, visible, hideModal, onSelectedRows, roleSelectedRows, type
    } = this.props;

    return (
      <div>
        <Modal
          visible={visible}
          footer={null}
          closable={false}
          style={style}
        >
          {
            visible &&
            <RoleList
              key="role-modal"
              type={type}
              roleSelectedRows={roleSelectedRows}
              onSelectedRows={onSelectedRows}
              hideModal={hideModal}
            />
            // <div>
            //   <RoleListContent roleSelectedRows={roleSelectedRows} operation={this.state.operation} type={type} />
            //   <div>
            //     <Button
            //       className="operation-button"
            //       type="primary"
            //       style={{ marginLeft: 25 }}
            //       title="保存"
            //       onClick={() => {
            //         if (hideModal) {
            //           hideModal();
            //         }
            //         if (onSelectedRows) {
            //           onSelectedRows(this.state.selectedRows);
            //         }
            //       }}
            //     />
            //     <Button title="关闭" className="operation-button" type="primary" style={{ marginLeft: 25 }} onClick={hideModal} />
            //   </div>
            // </div>
          }
        </Modal>
      </div>
    );
  }
}

export default RoleListModal;

