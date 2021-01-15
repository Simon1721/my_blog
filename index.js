require('./web/init');
require('./service/init')
require('./dao/init')

// const comServ = require('./service/commentServer')

// const result = comServ.findComment(2).then(e=>{console.log(e);})

const artServ = require('./service/articleServer');

// async function updateart (){
//     const result = await artServ.findArticleById(7)
//     console.log(result.content);
// }
// updateart()

// async function updateart (){
//     const result = await artServ.updateArticle(6,{
//         tag:'CSS sass web前端',
//     })
//     console.log(result);
// }

// updateart()