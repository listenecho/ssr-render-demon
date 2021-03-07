# ssr-render-demon
公司内部分享SSR服务端渲染



### 服务端渲染

服务器端拿到数据，装载到html上，然后将带有数据的html返回给浏览器。

```js
const express = require('express')
const _PORT_ = 8000
const app = express()
const data = require('./mock/data.json')

const html = `
    <html>
        <body>
            <h1>${data.company}</h1>
            <div>${data.project}</div>
        </body>
    </html>
`
app.get('/', (req, res) => {
    res.send(html)
})
app.listen(_PORT_, () => {
    console.log('服务运行在', _PORT_);
    
})
```

