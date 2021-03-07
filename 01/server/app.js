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