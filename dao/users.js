const sequelize = require('./dataBaseConfig');
const DadaTypes = require('sequelize');

//用户表
module.exports = sequelize.define('User', {
    name: {
        type: DadaTypes.STRING,
        allowNull: false
    },
    imgurl: {
        type: DadaTypes.TEXT,
        allowNull: false
    },
    loginID: {
        type: DadaTypes.STRING,
        allowNull: false
    },
    loginPwd: {
        type: DadaTypes.STRING,
        allowNull: false
    }
}, {
    paranoid: true
})