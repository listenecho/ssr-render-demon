const clientConfig = require('../webpack/webpack.development')
const serverConfig = require('../webpack/webpack.server')
const webpack = require('webpack')
const MFS = require("memory-fs");
const path = require('path')



module.exports = (app, callback) => {
    let clientManifest
    let bundle
    let resolve;
    const readyPromise = new Promise(r => { resolve = r });
    const updata = () => {
        if(bundle && clientManifest) {
            callback(bundle, clientManifest)
            resolve()
        }

    }
    // 对入口文件增加'webpack-hot-middleware/client' 配置,用于监听服务端更新
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app]
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

    const clientComplier = webpack(clientConfig)
    const readFile = (fs, fileName) => {
        return fs.readFileSync(path.join(clientConfig.output.path, fileName), "utf-8");
    }
    const devMiddleware = require('webpack-dev-middleware')(clientComplier, {
        publicPath: clientConfig.output.publicPath,
        logLevel: "warn"
    })
    app.use(devMiddleware)

    clientComplier.hooks.done.tap("done", stats => {
        clientManifest = JSON.parse(readFile(devMiddleware.fileSystem, "client-manifest.json"));
        updata()
    })
    app.use(require('webpack-hot-middleware')(clientComplier))


    // // 服务端打包
    const serverCompiler = webpack(serverConfig);
    // // 内存文件系统
    const mfs = new MFS();
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (error, stats) => {
        bundle = JSON.parse(readFile(mfs, "server-bundle.json"));
        updata()
    })
    return readyPromise
}
