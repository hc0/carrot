"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

exports.default = NotificationCenter;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _notificationcenter = require("notificationcenter");

var noti = _interopRequireWildcard(_notificationcenter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NotificationCenter(Target) {
  var WithSubscription = function WithSubscription(props) {
    return _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(Target, (0, _extends3.default)({}, props, { notification: noti }))
    );
  };
  WithSubscription.displayName = "Notification(" + Target.name + ")";
  return WithSubscription;
}