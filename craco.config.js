const CracoLessPlugin = require("craco-less");
const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const archiver = require("archiver");

const packageJsonPath = "./package.json";
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const packageName = packageJson.name;
const tyConfig = Object.assign(
  {
    appName: packageName,
  },
  packageJson.ty_config
);

const isProduction = process.env.NODE_ENV === "production";
console.log(isProduction);
module.exports = {
  devServer: {
    // 配置webpack-dev-server， 在本地启动一个服务器运行
    // host: "localhost", // 服务器的ip地址 希望服务器外可以访问就设置 0.0.0.0
    // port: 5566, // 端口
    // open: true, // 自动打开页面
    // historyApiFallback: true,
    proxy: {
      "/api/": {
        target: "http://127.0.0.1",
        changeOrigin: true,
        pathRewrite: { "^/api/": "/api/" }, //重写请求路径（必须要做）
      },
    },
  },
  webpack: {
    // ouput: { filename: "[name].[contenthash].js" },
    alias: {
      "@": path.resolve("src"),
      constants: path.resolve("src/constants"),
      services: path.resolve("src/services"),
      layouts: path.resolve("src/layouts"),
      utils: path.resolve("src/utils"),
      styles: path.resolve("src/styles"),
    },
    configure: (webpackConfig, { env, paths }) => {
      //配置静态资源base
      webpackConfig.output.publicPath = "/" + packageName + "/";

      // 将配置信息注入到webpackConfig中
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          "process.env.CONFIG": JSON.stringify(tyConfig),
        })
      );

      // 在生产环境下的配置
      if (isProduction) {
        // 禁用 sourcemap
        webpackConfig.devtool = false;
        // 添加 CopyWebpackPlugin 配置, 把package文件输出到build目录下
        webpackConfig.plugins.push(
          new CopyWebpackPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, "package.json"),
                to: path.resolve(paths.appBuild, "package.json"),
              },
            ],
          })
        );

        // 配置 craco 打包后输出为 zip 包到项目根目录
        webpackConfig.plugins.push({
          apply: (compiler) => {
            compiler.hooks.afterEmit.tap("AfterEmitPlugin", (compilation) => {
              const outputDir = compilation.outputOptions.path;
              const zipFileName = packageName + ".zip";
              const output = fs.createWriteStream(
                path.join(process.cwd(), zipFileName)
              );
              const archive = archiver("zip", {
                zlib: { level: 9 }, // 压缩级别
              });
              output.on("close", () => {
                console.log(archive.pointer() + " total bytes");
                console.log(
                  "archiver has been finalized and the output file descriptor has closed."
                );
              });

              archive.pipe(output);
              archive.directory(outputDir, false);
              archive.finalize();
            });
          },
        });
      }
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
