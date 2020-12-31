const express = require('express')  

const app = new express();

app.use((arr, res, resp, next)=>{
    resp.send('<h1>你好</h1>')
})

app.listen('1721',()=>{
    console.log('listen port on 1721');
})    