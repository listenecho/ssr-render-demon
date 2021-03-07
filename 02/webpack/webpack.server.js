const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const LoadablePlugin = require("@loadable/webpack-plugin");
const SSRServerPlugin = require("../webpack/server-plugin");

const { NODE_ENV } = process.env
const IS_DEV = NODE_ENV === 'production' ? false : true
module.exports = {
    target: 'node',
    mode: IS_DEV ? 'development' : 'production',
    externals: nodeExternals(),
    resolve: {
        fallback: { 
            path: require.resolve("path-browserify"),
            stream: require.resolve("stream-browserify/")
         },
        
    },
    entry: path.resolve(__dirname,'../src/index.server.tsx'),
    output: {
        filename: 'app.js',
        libraryTarget: "commonjs2",  // 打包成commonjs2规范
        path:  path.resolve(__dirname,'../dist'),
    },
    module: {
        rules: [
       
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        getCustomTransformers: () => ({
                            before: [
                                // 默认为 antd 启用
                                tsImportPluginFactory({
                                    libraryName: 'antd-mobile',
                                    libraryDirectory: 'lib',
                                    style: true
                                })
                            ]
                        }),
                        compilerOptions: {
                            module: 'es2015'
                        }
                    }
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                  presets: ['@babel/preset-react',  ['@babel/preset-env', {
                    targets: {
                      browsers: ['last 2 versions']
                    }
                  }]]
                }
              },
            {
                test: /\.less$/,
                use: [
                 'isomorphic-style-loader',
                  {
                    loader: MiniCssExtractPlugin.loader,
                   
                  },
                  'css-loader',
                  {
                    loader: 'less-loader',
                    options: {
                    //   sourceMap: devMode,
                      lessOptions: {
                        javascriptEnabled: true,
                      },
                    },
                  },
                ],
              },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new SSRServerPlugin({
          filename: "server-bundle.json",
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    // watch:true,  //默认为false，也就是不开启
    // //只有开启监听模式时，watchOptions才有意义
    // watchOptions:{
    //     //默认为空，不监听的文件或者文件夹，支持正则匹配
    //     ignored:/node_modules/,
    //     //监听到变化后会等300ms再去执行，默认为300ms
    //     aggregateTimeout:300,
    //     //判断文件发生变化是通过不停询问系统指定的文件有没有变化实现的，默认每秒询问一次
    //     poll:1000
    // }

}