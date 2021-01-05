const express = require('express')  
const path = require('path')

const app = express();
const fileName = path.resolve(__dirname,'../page')
app.use(express.static(fileName))

app.use('/api/article',express.json())
//根据路由自动匹配请求方式
app.use('/api/article',require('./api/getArticle'))

app.listen('1721',()=>{
    console.log('listen port on 1721');
})    