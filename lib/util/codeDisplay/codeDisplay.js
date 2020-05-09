import React from "react";
import PropTypes from "prop-types";

// const styles = {
//   pre: {
//     outline: "1px solid #ccc",
//     padding: "5px",
//     margin: "5px"
//   },
//   string: {
//     color: "green"
//   },
//   number: {
//     color: "darkorange"
//   },
//   boolean: {
//     color: "blue"
//   },
//   null: {
//     color: "magenta"
//   },
//   key: {
//     color: "red"
//   }
// };

const transfer = (match) => {
  // let cls = 'number';
  // if (/^"/.test(match)) {
  //   if (/:$/.test(match)) {
  //     cls = 'key';
  //   } else {
  //     cls = 'string';
  //   }
  // } else if (/true|false/.test(match)) {
  //   cls = 'boolean';
  // } else if (/null/.test(match)) {
  //   cls = 'null';
  // }
  // return <span style={styles[cls]}>{match}</span>;
  return <span>{match}</span>;
}

/**
 * 代码展示组件
 *
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
*/
export default function CodeDisplay(json) {
  if (typeof json != 'string') {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
  json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => transfer(match));
  return (
    <pre>
      {
        json
      }
    </pre>
  );
}
