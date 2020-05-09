"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = require("antd/lib/card");

var _card2 = _interopRequireDefault(_card);

var _modal = require("antd/lib/modal");

var _modal2 = _interopRequireDefault(_modal);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fixedTool = require("../../base/fixedTool/fixedTool");

var _fixedTool2 = _interopRequireDefault(_fixedTool);

var _table = require("../../base/table/table.js");

var _table2 = _interopRequireDefault(_table);

var _request = require("../../util/request/request.js");

var _request2 = _interopRequireDefault(_request);

var _getConfig = require("../../../getConfig.js");

var _getConfig2 = _interopRequireDefault(_getConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pageHeaderStyle = {
  position: "static",
  justifyContent: "space-between",
  marginBottom: _getConfig2.default["@padding-sm"],
  border: 0,
  paddingTop: 0,
  paddingLeft: 0,
  paddingRight: 0
};

var advancedSearchStyle = {
  position: "static",
  justifyContent: "space-between",
  marginTop: 0,
  marginBottom: _getConfig2.default["@padding-sm"],
  border: "1px solid " + _getConfig2.default["@border-color-split"],
  borderRadius: _getConfig2.default["@border-radius-base"],
  paddingLeft: 0,
  paddingRight: 0
};

var TableAbstract = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(TableAbstract, _Component);

  function TableAbstract() {
    var _ref;

    var _temp, _this2, _ret;

    (0, _classCallCheck3.default)(this, TableAbstract);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref = TableAbstract.__proto__ || (0, _getPrototypeOf2.default)(TableAbstract)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
      columns: _this2.props.columns(_this2),
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
    }, _this2.getSearchParams = function () {
      var searchCondition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _searchCondition$page = searchCondition.pageSize,
          pageSize = _searchCondition$page === undefined ? 10 : _searchCondition$page,
          _searchCondition$curr = searchCondition.current,
          current = _searchCondition$curr === undefined ? 1 : _searchCondition$curr;
      var _this3 = _this2,
          state = _this3.state;


      var params = (0, _extends3.default)({}, searchCondition, {
        pageSize: pageSize,
        current: current,
        order: "desc"
      });
      (0, _keys2.default)(state).filter(function (v) {
        return v !== "columns" && v !== "dataSource" && v !== "modalShowed" && v !== "advancedSearchShowed";
      }).forEach(function (v) {
        params[v] = state[v];
      });
      return params;
    }, _this2.loadData = function () {
      var searchCondition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this4 = _this2,
          props = _this4.props,
          state = _this4.state;
      var getURL = props.getURL;

      var params = _this2.getSearchParams(searchCondition);

      var _ref2 = getURL || {},
          url = _ref2.url,
          method = _ref2.method;

      _request2.default[method && method.toUpperCase() || "POST"](_getConfig2.default.host + "/" + url, {
        body: (0, _extends3.default)({}, getURL.params, params),
        params: (0, _extends3.default)({}, getURL.params, params)
      }).then(function (res) {

        _this2.setState({
          dataSource: res.data || res || state.dataSource
        });
      });
    }, _this2.toggleModal = function () {
      return _this2.setState(function (prevState) {
        var stateData = {
          modalShowed: !prevState.modalShowed
        };
        if (prevState.modalShowed) {
          stateData = (0, _extends3.default)({}, stateData, {
            modalContent: null
          });
        }
        return stateData;
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this2, _ret);
  }

  (0, _createClass3.default)(TableAbstract, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var props = this.props,
          state = this.state;
      var actionGroup = props.actionGroup,
          advancedSearchGroup = props.advancedSearchGroup,
          filterGroup = props.filterGroup,
          title = props.title,
          bordered = props.bordered,
          type = props.type,
          dataSourceKey = props.dataSourceKey,
          pagination = props.pagination,
          _props$rowSelection = props.rowSelection,
          rowSelection = _props$rowSelection === undefined ? {
        type: type,
        onChange: function onChange(selectedRowKeys, selectedRows) {
          _this5.setState({
            selectedRowKeys: selectedRowKeys,
            selectedRows: selectedRows
          });
        }
      } : _props$rowSelection;
      var columns = state.columns,
          dataSource = state.dataSource,
          modalShowed = state.modalShowed,
          advancedSearchShowed = state.advancedSearchShowed,
          _state$modalContent = state.modalContent,
          modalContent = _state$modalContent === undefined ? props.modalContent : _state$modalContent;

      return _react2.default.createElement(
        _card2.default,
        {
          title: typeof title === "function" ? title() : title
        },
        _react2.default.createElement(
          "div",
          {
            style: {
              position: "relative"
            }
          },
          (actionGroup || filterGroup) && _react2.default.createElement(
            _fixedTool2.default,
            { style: pageHeaderStyle },
            filterGroup && filterGroup(this),
            actionGroup && actionGroup(this)
          ),
          advancedSearchShowed && advancedSearchGroup && _react2.default.createElement(
            _fixedTool2.default,
            { style: advancedSearchStyle },
            advancedSearchGroup && advancedSearchGroup(this)
          ),
          _react2.default.createElement(_table2.default, (0, _extends3.default)({}, props, {
            title: function title() {},

            dataSource: dataSourceKey && dataSourceKey !== "" ? dataSource[dataSourceKey] : dataSource,

            columns: columns,
            rowSelection: type !== "normal" ? rowSelection : null,
            pagination: pagination && pagination(this)
          })),
          modalShowed && _react2.default.createElement(
            _modal2.default,
            {
              visible: !!1,
              footer: null,
              destroyOnClose: !!1,
              onCancel: function onCancel() {
                return _this5.toggleModal();
              },
              width: "80%",
              maskClosable: !1
            },
            modalContent
          )
        )
      );
    }
  }]);
  return TableAbstract;
}(_react.Component), _class.propTypes = {
  title: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),

  filterGroup: _propTypes2.default.func,

  advancedSearchGroup: _propTypes2.default.func,

  actionGroup: _propTypes2.default.func,

  pagination: _propTypes2.default.func,

  columns: _propTypes2.default.func,

  modalContent: _propTypes2.default.func,

  type: _propTypes2.default.oneOf(["normal", "radio", "checkbox"]),

  getURL: _propTypes2.default.object,

  dataSourceKey: _propTypes2.default.string,

  loadData: _propTypes2.default.func
}, _class.defaultProps = {
  bordered: true,
  title: function title() {
    return "通用表格CRUD";
  },

  columns: function columns() {
    return [{
      title: "名称",
      dataIndex: "name",
      key: "name"
    }, {
      title: "编码",
      dataIndex: "code",
      key: "code"
    }, {
      title: "描述",
      dataIndex: "description",
      key: "description"
    }];
  },
  type: "checkbox",

  dataSourceKey: "records",
  pagination: function pagination(_this) {
    return {
      showQuickJumper: true,
      size: "small",
      total: _this.state.dataSource.total,
      current: _this.state.dataSource.current,
      pageSize: _this.state.dataSource.size,
      showSizeChanger: true,
      onChange: function onChange(current) {
        _this.loadData({ pageSize: _this.state.dataSource.size, current: current });
      },
      onShowSizeChange: function onShowSizeChange(current, pageSize) {
        _this.loadData({ pageSize: pageSize, current: 1 });
      }
    };
  }
}, _temp2);
exports.default = TableAbstract;