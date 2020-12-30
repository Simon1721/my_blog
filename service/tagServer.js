const tag = require('../dao/tags');
const { Op } = require('sequelize');

/**
 * 添加一个标签
 * @param {*} tagobj 
 */
exports.addTag = async function (tagobj) {
    const result = await tag.create(tagobj);
    return result.toJSON()
};

/**
 * 删除一个标签
 * @param {*} id 
 */
exports.deletedTag = async function (id) {
    const result = await tag.destroy({
        where:{
            id
        }
    })
    return result;
}

/**
 * 修改一个标签
 * @param {*} id 
 * @param {*} tagobj 
 */
exports.updateTag = async function (id,tagobj) {
    const result = await tag.update(tagobj,{
        where:{
            id
        }
    })
    return result;
}


/**
 * 关键字查找标签
 * @param {*} keyword 
 */
exports.findTag = async function (keyword) {
    const result = await tag.findAll({
        where:{
            name:{
                [Op.like]:`%${keyword}%`
            }
        }
    })
    return JSON.parse(JSON.stringify(result))
}