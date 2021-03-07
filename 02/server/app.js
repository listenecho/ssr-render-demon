
const express = require('express')
import React from 'react'
import { renderToString } from 'react-dom/server';
import Home from '../src/page/Home'
const app = express()
 

app.get('/', function (req, res) {
  console.log('asdssssdsa');
  
   res.send(
    renderToString(<Home />)
   );
})



app.listen(3001, () => {
    console.log('服务运行在， 3001')
})