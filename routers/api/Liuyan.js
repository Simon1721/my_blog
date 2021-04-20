const express = require('express');
const liuyanServ = require('../../service/liuyanServer');
const sendMsg = require('./error');

const liuyanRouter = express.Router();

//添加一条留言
liuyanRouter.post('/add', async (req, res) => {
    let obj = '';
    req.on('data', chunk => {
        obj += chunk
    })
    req.on('end', async () => {
        console.log(JSON.parse(obj));
        const result = await liuyanServ.addLiuyan(JSON.parse(obj))
        res.send(sendMsg.getResult(result))
    })

})

//获取留言
liuyanRouter.get('/get', async (req, res) => {
    const parentId = req.query.parentId;
    const result = await liuyanServ.findLiuyan(parentId)
    res.send(sendMsg.getResult(result))
})
module.exports = liuyanRouter;