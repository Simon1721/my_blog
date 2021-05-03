//建立数据库连接

const Sequelize = require('sequelize');

//连接数据库
const sequelize = new Sequelize('js_blog','root','jiang@125879',{
    host:'localhost',
    dialect:'mysql',
    logging:false
});

module.exports = sequelize;
//测试连接
// (async function(){
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// })()