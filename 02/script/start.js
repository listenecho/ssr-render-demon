


const express = require('express')
const fs = require('fs')
const path = require('path')
const setDevUpdate = require('./dev')
const isProd = process.env.NODE_ENV === "production";
const app = express()
const ServerRender = require('./render')
let template = fs.readFileSync("./public/index.html", "utf-8");
let readyPromise;
let render
if(isProd) {
    // 开发环境直接读取文件系统
} else {
    
   readyPromise = setDevUpdate(app,(bundle, clientManifest) => {
        render = new ServerRender(bundle, template, clientManifest)
    })
}
app.use("/public", express.static(path.join(__dirname, "../public")));
const serverToRender = (req, res) => {
    render.renderToString(req, {}).then(({error, html}) => {
        res.send(html);
    })
}
app.get('*', function (req, res) {
   
  
    readyPromise.then(() => serverToRender(req, res  ))
  })
app.listen(8888, () => {
    console.log('服务器运行起来了:', 8888);
})


