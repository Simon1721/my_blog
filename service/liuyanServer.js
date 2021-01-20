const validate = require('validate.js');
const liuyan = require('../dao/liuyans');
// const {Op} = require('sequelize');

/**
 * 添加一条留言
 * @param {*} comtObj 
 */
exports.addLiuyan = async function (obj) {
    const rule={
        parentId:{
            presence:{
                allowEmpty:false
            },
        },
        name:{
            presence:{
                allowEmpty:false
            },
            type:'string'
        },
        content:{
            presence:{
                allowEmpty:false
            },
            type:'string'
        },
        publishDate:{
            presence:{
                allowEmpty:false
            },
            datetime:true
        },
        imgurl:{
            presence:{
                allowEmpty:false
            },
            type:'string'
        }
    }
    const _comtObj = validate(obj,rule)
    // console.log(_comtObj);
    if(!_comtObj){
        const result = await liuyan.create(obj);
        return result.toJSON()
    }
    return new Error('评论格式错误，请检查后重试')
}


/**
 * 删除一条留言
 * @param {*} id 
 */
exports.deletedLiuyan = async function (id) {
    const result = await liuyan.destroy({
        where:{
            id
        }
    })
    return result;
}


/**
 * 查找留言
 * @param {*} parentId 
 */
exports.findLiuyan = async function (parentId){
    const result = await liuyan.findAll({
        where:{
            parentId,
        }
    })
    return JSON.parse(JSON.stringify(result))
}