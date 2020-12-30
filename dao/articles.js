const sequelize = require('./dataBaseConfig');
const DadaTypes = require('sequelize')

//文章表
module.exports = sequelize.define('Article', {
    name: {
        type: DadaTypes.STRING,
        allowNull: false
    },
    imgurl: {
        type: DadaTypes.STRING,
        allowNull: false
    },
    content: {
        type: DadaTypes.TEXT,
        allowNull: false
    },
    author: {
        type: DadaTypes.STRING,
        allowNull: false
    },
    tag: {
        type: DadaTypes.STRING,
        allowNull: false
    }
}, {
    paranoid: true
})