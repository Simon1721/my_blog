const sequelize = require('./dataBaseConfig');
const DadaTypes = require('sequelize')

//留言表
module.exports = sequelize.define('Liuyan',{
    parentId:{
        type:DadaTypes.STRING,
    },
    name:{
        type:DadaTypes.STRING,
    },
    imgurl:{
        type:DadaTypes.STRING,
    },
    content:{
        type:DadaTypes.TEXT('LONG'),
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

