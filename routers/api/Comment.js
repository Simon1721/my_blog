const express = require('express');
const comServ = require('../../service/commentServer');
const sendMsg = require('./error');

const comRouter = express.Router();

//添加一条评论
comRouter.post('/add', async (req, res) => {
    // console.log(req.getParamete);
    // const comtObj = req.query;
    let comtObj = '';
    req.on('data', chunk => {
        comtObj += chunk
    })
    req.on('end', async () => {
        const result = await comServ.addComment(JSON.parse(comtObj))
        res.send(sendMsg.getResult(result))
    })

})

//获取一条评论
comRouter.get('/get', async (req, res) => {
    const parentId = req.query.parentId;
    const result = await comServ.findComment(parentId)
    res.send(sendMsg.getResult(result))
})
module.exports = comRouter;