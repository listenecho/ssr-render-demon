const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    target: 'node',
    mode: 'development',
    externals: nodeExternals(),
    resolve: {
        fallback: { 
            path: require.resolve("path-browserify"),
            stream: require.resolve("stream-browserify/")
         },
        
    },
    entry: path.resolve(__dirname,'./server/app.js'),
    output: {
        filename: 'app.js',
        path:  path.resolve(__dirname,'./dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    //   'css-hot-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,

                    },
                    'css-loader',
                    //   {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //       plugins: () => [require('autoprefixer')()],
                    //     },
                    //   },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    //   'css-hot-loader',
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
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
    ],

}