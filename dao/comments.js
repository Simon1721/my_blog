const sequelize = require('./dataBaseConfig');
const DadaTypes = require('sequelize')

//评论表
module.exports = sequelize.define('Comment',{
    parentId:{
        type:DadaTypes.STRING,
    },
    parentName:{
        type:DadaTypes.STRING,
    },
    imgurl:{
        type:DadaTypes.STRING,
    },
    content:{
        type:DadaTypes.TEXT,
        allowNull:false
    },
    publishDate:{
        type:DadaTypes.DATE,
        allowNull:false,
        get(){
            return this.getDataValue('publishDate').getTime();
        }
    }    
},{
    paranoid:true
});