"use strict";
const path = require("path");
const utils = require("./utils");
const config = require("../config");
const vueLoaderConfig = require("./vue-loader.conf");

// 取上级目录对应的dir路径
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: "eslint-loader",
  enforce: "pre",
  include: [resolve("src"), resolve("test")],
  options: {
    formatter: require("eslint-friendly-formatter"),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
});

module.exports = {
  // 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和 loader
  // webpack 的主目录
  // entry 和 module.rules.loader 选项
  // 相对于此目录解析
  context: path.resolve(__dirname, "../"),

  // 入口
  entry: {
    app: "./src/main.js"
  },
  // 输出
  output: {
    // 路径 配置为dist
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    // 现在你require文件的时候可以直接使用require('file')，不用使用require('file.js')
    extensions: [".js", ".vue", ".json"],
    // 创建 import 或 require 的别名，来确保模块引入变得更简单
    alias: {
      // 也可以在给定对象的键后的末尾添加 $，以表示精准匹配：为什么是vue.esm.js，请查看vue文档
      vue$: "vue/dist/vue.esm.js",
      // 定义app目录开头简写
      "@": resolve("src")
    }
  },
  module: {
    rules: [
      // es6 语法...扩展运算符，经典用法1 数组处理以后再赋值
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        // 单独的复杂模块 https://vue-loader.vuejs.org/zh-cn/start/spec.html
        loader: "vue-loader",
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        // This package allows transpiling JavaScript files using Babel and webpack.
        loader: "babel-loader",
        exclude: /(node_modules)/,
        include: [
          resolve("src"),
          resolve("test"),
          resolve("node_modules/webpack-dev-server/client")
        ],
        options: {
          // 配置选项
          // presets: ["babel-preset-env"]
        }
      },
      {
        // url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL base64
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("media/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    // 什么都不提供
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    // 提供空对象
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  }
};
