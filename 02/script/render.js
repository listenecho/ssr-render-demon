
const { ChunkExtractor, ChunkExtractorManager } = require("@loadable/server");
const ReactDOMServer = require("react-dom/server");
const React = require("react");
const { matchRoutes } = require("react-router-config");
class ServerRender {
    constructor(bundle, template, mainfest) {
        this.template = template;
        this.manifest = mainfest;
        this.serverEntry = this._createEntry(bundle);
    }
    _createEntry(bundle) {
        // 获取打包的文件
        const file = bundle.files['app.js'];
        const vm = require("vm");
        const sandbox = {
            console,
            module,
            require
        };
        vm.runInNewContext(file, sandbox);
        return sandbox.module.exports;
    }

    renderToString(request, staticContext) {
        return new Promise((resolve, reject) => {
            const serverEntry = this.serverEntry;
            //获取服务端打包入口对象
            const createApp = serverEntry.createApp;
            const createStore = serverEntry.createStore;
            const router = serverEntry.router;

            const store = createStore({});


            const render = () => {
                // 存放组件内部路由相关属性，包括状态码，地址信息，重定向的url
                let context = {};
                if (staticContext && staticContext.constructor === Object) {
                    Object.assign(context, staticContext);
                }
                let component = createApp(context, request.url, store);
                let extractor = new ChunkExtractor({
                    stats: this.manifest,
                    entrypoints: ["app"]  // 入口entry
                });
                let root = ReactDOMServer.renderToNodeStream(
                    React.createElement(
                        ChunkExtractorManager,
                        { extractor },
                        component)
                );

                resolve({
                    error: undefined,
                    html: this._generateHTML(root, extractor, store.getState())
                });
            }

            let promises
            let matchs = matchRoutes(router, request.path);
            promises = matchs.map(({ route, match }) => {
                const loadData = route.loadData;
                return loadData ? loadData(store) : Promise.resolve(null);
            });

            Promise.all(promises).then(() => {
                render();
            })

        })
    }
    _generateHTML(root, extractor, initalState) {
        // 必须在组件renderToString后获取
        // 替换注释节点为渲染后的html字符串
        return this.template
            .replace("<!--react-ssr-head-->",
                `<script type="text/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(initalState)}
        </script>
        `)
            .replace("<!--react-ssr-outlet-->", `<div id="root">${root}</div>\n${extractor.getScriptTags()}`);
    }

}

module.exports = ServerRender