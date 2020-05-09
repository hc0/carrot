var config = require("./config.json");

try {
  config = require("./../../config.json");
  module.exports = config;
} catch (err) {
  console.warn("还没有在根目录下添加config.json文件哦");
  module.exports = config;
}
