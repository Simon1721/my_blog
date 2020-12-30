const sequelize = require('./dataBaseConfig');
const DadaTypes = require('sequelize')

//评论表
module.exports = sequelize.define('Comment',{
    who:{
        type:DadaTypes.STRING,
    },
    content:{
        type:DadaTypes.TEXT,
        allowNull:false
    }    
},{
    paranoid:true
});