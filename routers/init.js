const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express();
const fileName = path.resolve(__dirname, '../page')
app.use(express.static(fileName))

//使用cors模块解决跨域请求问题
app.use(cors())

//使用cookie模块生成cookie
app.use(cookieParser())

// app.use('/api/article', express.json())
//根据路由自动匹配请求方式
app.use('/api/article', require('./api/Article'))

app.use('/api/comment', require('./api/Comment'))

app.use('/api/liuyan', require('./api/Liuyan'))

app.use('/api/user', require('./api/User'))

//监听端口localhost:1721
app.listen('1721', () => {
    console.log('listen port on 1721');
})    