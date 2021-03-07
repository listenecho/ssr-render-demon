
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

    renderToString(request, staticContext ) {
        return new Promise((resolve, reject) => {
            const serverEntry = this.serverEntry;
            const createApp = serverEntry.createApp;
            const router = serverEntry.router;
           
            let matchs = matchRoutes(router, request.path);
            console.log(matchs);
            const render = () => {
                let component = createApp(request.url);
                let extractor = new ChunkExtractor({ 
                    stats: this.manifest, 
                    entrypoints: ["app"]  // 入口entry
                  });
                let root = ReactDOMServer.renderToString(
                React.createElement(
                    ChunkExtractorManager,
                    { extractor },
                    component)
                );
                resolve({
                    error: undefined, 
                    html: this._generateHTML(root, extractor)
                  });
            }
            render();
        })
    }
    _generateHTML(root, extractor, initalState) {
        // 必须在组件renderToString后获取
        // 替换注释节点为渲染后的html字符串
        return this.template
        .replace("<!--react-ssr-outlet-->", `<div id="root">${root}</div>\n${extractor.getScriptTags()}`);
      }

}

module.exports  = ServerRender