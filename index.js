// var express = require('express');

// var app = new express();

// app.use(express.static('./page/'));

// app.listen(12306,function(){
//     console.log('服务器已开启');
// });

// require('./dao/init')
// const articleServ = require('./service/articleServer')

// articleServ.findArticleByTag('美食').then(e=>{console.log(e);})
// articleServ.updateArticle(6,{
//     tag:'都市'
// }).then(e=>{console.log(e);})

const commentServ = require('./service/commentServer')

commentServ.addComment({
    who:'1',
    content:'',
    ArticleId:1
}).then(e=>{console.log(e);})

