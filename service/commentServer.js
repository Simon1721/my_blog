const validate = require('validate.js');
const comment = require('../dao/comments');
const {Op} = require('sequelize')

/**
 * 添加一条评论
 * @param {*} comtObj 
 */
exports.addComment = async function (comtObj) {
    const rule={
        who:{
            presence:{
                allowEmpty:false
            },
        },
        ArticleId:{
            presence:{
                allowEmpty:false
            },
            numericality:'strict'
        }
    }
    const _comtObj = validate(comtObj,rule)
    if(!_comtObj){
        const result = await comment.create(comtObj);
        return result.toJSON()
    }
    return new Error('评论格式错误，请检查后重试')
}


/**
 * 删除一条评论
 * @param {*} id 
 */
exports.deletedComment = async function (id) {
    const result = await comment.destroy({
        where:{
            id
        }
    })
    return result;
}


/**
 * 查找一条评论（评论了谁）
 * @param {*} who 
 */
exports.findComment = async function (who){
    const result = await comment.findAll({
        where:{
            [Op.like]:`%${who}%`
        }
    })
    console.log(result);
    // return JSON.parse(JSON.stringify(re))
}