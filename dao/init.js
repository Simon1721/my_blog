const sequelize = require('./dataBaseConfig');
require('./articles')
require('./comments')
require('./mapping')
require('./tags');
//将所有模型同步到数据库，创建相应的表
(async function () {
    await sequelize.sync({ alter: true });
    console.log("所有模型均已成功同步.");
})()