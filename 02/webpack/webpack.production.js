const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    mode: 'development',
    target: 'web',
  entry:path.resolve(__dirname,'../src/index.tsx'),
  output:{
    filename:'js/[name].[hash:5].js',
    path:path.resolve(__dirname,'../dist'),
  },
  module:{
    rules:[
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
            test:/\.tsx?$/,
            use: {
                loader:'ts-loader',
                options:{
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
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  plugins: [
    //  new HtmlWebpackPlugin({
    //     template: path.resolve(__dirname, './public/index.html'),
    //   }),
      new MiniCssExtractPlugin({
        // filename: 'static/css/[name].css',
        // chunkFilename: 'static/css/[name].css',
      }),
  ],
  devServer: {
    host:'0.0.0.0',
    port: 8080,
    contentBase: path.resolve(__dirname,'./dist'),
    overlay: {
      errors:true,
      warnings:true
    },
    hot: true,
    stats: 'minimal',
  }
 
}