const express = require('express')
const artServ = require('../../service/articleServer');
const sendMsg = require('./error')
//创建一个路由
const artRouter = express.Router();

//分页获取文章信息
artRouter.get('/get', async (req, res) => {
    const keyword = req.query.keyword || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const result = await artServ.findArticle(keyword, page, limit);
    res.send(sendMsg.getResult(result))
})

//根据标签获取文章
artRouter.get('/getByTag', async (req, res) => {
    const tag = req.query.tag || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const result = await artServ.findArticleByTag(tag, page, limit);
    res.send(sendMsg.getResult(result))
})

//添加一篇文章
artRouter.post('/add', (req, res) => { })

//删除一篇文章
artRouter.delete('/delete/:id', (req, res) => { })

//修改一篇文章
artRouter.put('/update/:id', (req, res) => { })

module.exports = artRouter;