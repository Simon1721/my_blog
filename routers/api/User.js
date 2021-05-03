const express = require('express')
const userServ = require('../../service/userServer');
const sendMsg = require('./error')
//创建一个路由
const Router = express.Router();

//根据id获取用户
Router.get('/getById', async (req, res) => {
    const id = req.query.id;
    const result = await userServ.findUserById(id);
    res.send(sendMsg.getResult(result))
})

//用户注册
Router.post('/enroll',async (req,res)=>{
    let userObj = '';
    req.on('data',chunck =>{
        userObj += chunck
    })
    req.on('end',async ()=>{
        console.log(JSON.parse(userObj));
        const result = await userServ.addUser(JSON.parse(userObj));
        console.log(result);
        res.send(sendMsg.getResult(result))
    })
})


//登录验证，发送cookie
Router.post('/login', async (req, res) => {
    const loginID = req.query.loginID;
    const loginPwd = req.query.loginPwd;
    const result = await userServ.login(loginID, loginPwd);
    console.log(result);
    if (result != '') {
        console.log(result.id);
        res.cookie('token', result[0].id, {
            path: '/',
            domain: 'localhost',
            // maxAge:60*1000
            maxAge: 24 * 3600 * 1000 //单位：毫秒
        })
    }
    res.send(sendMsg.getResult(result))
})

module.exports = Router;
