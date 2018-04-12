"use strict";
const path = require("path");
const utils = require("./utils");
const webpack = require("webpack");
const config = require("../config");
const merge = require("webpack-merge");
// 基础设置配置文件
const baseWebpackConfig = require("./webpack.base.conf");
// webpack 复制文件和文件夹的插件
const CopyWebpackPlugin = require("copy-webpack-plugin");
// 自动生成 html 并且注入到 .html 文件中的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 整合css的工具 https://github.com/webpack-contrib/extract-text-webpack-plugin
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 压缩提取出的css 并解决ExtractTextPlugin分离出的重复问题
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
// 压缩代码
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const env = require("../config/prod.env");

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js")
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      "process.env": env
    }),
    new UglifyJsPlugin({
      // 压缩uglify的配置
      uglifyOptions: {
        compress: {
          // 压缩后删除没有用到的代码时不输出警告
          warnings: false
        }
      },
      // 是否使用sourcemap做关联
      sourceMap: config.build.productionSourceMap,
      // 压缩代码中是否使用多进程进行构建
      parallel: true
    }),
    // extract css into its own file
    // 将每个模块的css提取到一个文件里面
    new ExtractTextPlugin({
      filename: utils.assetsPath("css/[name].[contenthash].css"),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduced.
    // 删除重复的css内容
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // 对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用
    // new HtmlWebpackPlugin({
    //   // 生成html的名称
    //   filename: config.build.index,
    //   // 模板文件
    //   template: "index.html",
    //   // 这个配置项指js文件插入的位置 可以 true || 'head' || 'body' || false Inject all
    //   inject: true,
    //   minify: {
    //     // 删去html中的注释项
    //     removeComments: true,
    //     // 折叠html中的空白字符
    //     collapseWhitespace: true,
    //     // 删除html属性中只有一个值的引号 <p class="foo-bar" title="blah blah">foo</p><p class=foo-bar title="blah blah">foo</p>
    //     removeAttributeQuotes: true
    //     // more options:
    //     // https://github.com/kangax/html-minifier#options-quick-reference
    //   },
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: "dependency"
    // }),
    // keep module.id stable when vendor modules does not change
    // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    /*
          提取公共模块
          https://doc.webpack-china.org/plugins/commons-chunk-plugin

        */
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, "../node_modules")) === 0
        );
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: "app",
      async: "vendor-async",
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.build.assetsSubDirectory,
        ignore: [".*"]
      }
    ])
  ].concat(utils.htmlPlugin())
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin");

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp(
        "\\.(" + config.build.productionGzipExtensions.join("|") + ")$"
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
