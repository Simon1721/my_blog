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
    result.datas.forEach(item => {
        item.link = '/blog_datail.html?id=' + item.id;
    })
    res.send(sendMsg.getResult(result))
})

//根据标签获取文章
artRouter.get('/getByTag', async (req, res) => {
    const tag = req.query.tag || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const result = await artServ.findArticleByTag(tag, page, limit);
    result.datas.forEach(item => {
        item.link = '/blog_datail.html?id=' + item.id;
    })
    res.send(sendMsg.getResult(result))
})

//根据id获取文章
artRouter.get('/getById', async (req, res) => {
    const id = req.query.id;
    const result = await artServ.findArticleById(id);
    res.send(sendMsg.getResult(result))
})

//获取全部文章
artRouter.get('/getAll', async (req, res) => {
    const keyword = req.query.tag || '';
    const result = await artServ.findArticleAll(keyword);
    result.forEach(item => {
        item.link = '/blog_datail.html?id=' + item.id;
    })
    res.send(sendMsg.getResult(result))
})

//添加一篇文章
artRouter.post('/add', async (req, res) => {
    let artobj = '';
    req.on('data', chunk => {
        artobj += chunk;
    })
    req.on('end', async () => {
        console.log(artobj);
        const result = await artServ.addArticle(JSON.parse(artobj));
        res.send(sendMsg.getResult(result))
    })

})

//删除一篇文章
artRouter.delete('/delete', async (req, res) => {
    const id = req.query.id || '';
    const result = await artServ.deletedArticle(id);
    res.send(sendMsg.getResult(result))
})

module.exports = artRouter;