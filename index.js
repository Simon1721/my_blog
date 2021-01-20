require('./web/init');
require('./service/init')
require('./dao/init')
// require('./dao/liuyans')
// const lyServ = require('./service/liuyanServer')

// comServ.addComment({
//     parentId:-1,
//     parentName:'章鱼哥',
//     content:'我是章鱼哥，你好~',
//     publishDate:+new Date(),
//     imgurl:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=358356120,3885652403&fm=26&gp=0.jpg',
//     ArticleId:1
// }).then(e=>{console.log(e);})

// comServ.deletedComment(19)
// comServ.deletedComment(11)
// comServ.deletedComment(12)
// comServ.deletedComment(13)

// lyServ.addLiuyan({
//     parentId: -1,
//     name: '蜡笔小新',
//     content: '哈喽~ 小姐，你喜欢吃青椒吗？',
//     publishDate: +new Date(),
//     imgurl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2418376134,2162912053&fm=15&gp=0.jpg',
// }).then(e => { console.log(e); })

// const artServ = require('./service/articleServer');

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