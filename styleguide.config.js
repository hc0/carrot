
const path = require("path");
const config = require("./config.json");

module.exports = {
  // 生成文档的位置
  components: "lib/**/*.js",
  // 标题
  title: "Carrot -- the UI Components of the MagCloud's Front-End",
  // 是否显示侧边栏
  // showSidebar: false,
  // 模版样式
  theme: {
    baseBackground: "#fdfdfc",
    link: "#274e75",
    linkHover: "#90a7bf",
    border: "#e0d2de",
    font: ["Helvetica", "sans-serif"],
  },
  styles: {
    Playground: {
      preview: {
        paddingLeft: 0,
        paddingRight: 0,
        borderWidth: [[0, 0, 1, 0]],
        borderRadius: 0,
      },
    },
    Markdown: {
      pre: {
        border: 0,
        background: "none",
      },
      code: {
        fontSize: 14,
      },
    },
  },

  // showCode: true, // 是否显示CODE 默认不显示
  showUsage: true, // 是否显示PROPS & METHODS 默认不显示
  // 显示引用方法
  getComponentPathLine (componentPath) {
    const name = path.basename(componentPath, ".js");
    return `import { ${name.replace(name.charAt(0), name.charAt(0).toUpperCase())} } from "carrot";`;
  },
  // 页面模版
  styleguideComponents: {
    Logo: path.join(__dirname, "/styleguide/components/Logo"),
    StyleGuideRenderer: path.join(__dirname, "/styleguide/components/StyleGuide"),
  },
  // 侧边栏目录
  sections: [
    {
      name: "基础组件",
      content: "lib/base/index.md",
      components: "lib/base/**/*.js"
    }, {
      name: "工具组件",
      content: "lib/util/index.md",
      components: "lib/util/**/*.js"
    }, {
      name: "抽象组件",
      content: "lib/abstract/index.md",
      components: "lib/abstract/**/*.js"
    }, {
      name: "通用组件",
      content: "lib/common/index.md",
      components: "lib/common/**/*.js"
    },
    {
      name: "业务组件",
      content: "lib/business/index.md",
      components: "lib/business/**/*.js"
    },
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&mimetype=image/svg+xml"
        },
        {
          test: /\.less|.css$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
              options: {
                minimize: true,
                importLoaders: 2
                // "-autoprefixer": true,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: function () {
                  return [
                    require("autoprefixer")
                  ];
                }
              }
            },
            {
              loader: "less-loader",
              options: {
                // modules: false,
                modifyVars: config
              }
            },

          ],
        },
        {
          // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
          // 如下配置，将小于8192byte的图片转成base64码
          test: /\.(png|jpeg|jpg|gif)$/,
          loader: "url-loader?limit=8192&name=./static/img/[hash].[ext]",
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          query: {
            presets: ["stage-3", "stage-2", "stage-0", "es2015-loose", "es2015", "react"],
            cacheDirectory: true,
            plugins: ["transform-runtime", "transform-decorators-legacy", "transform-class-properties", "transform-async-to-generator", "transform-object-assign", [
              "import", {
                libraryName: "antd",
              }
            ]],
          },
        },
      ]
    }
  }
};
