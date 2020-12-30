const sequelize = require('./dataBaseConfig');
const DadaTypes = require('sequelize')

//标签表
module.exports = sequelize.define('Tag',{
    name:{
        type:DadaTypes.STRING,
        allowNull:false
    },   
},{
    paranoid:true
});