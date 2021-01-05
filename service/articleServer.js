const article = require('../dao/articles');
const { Op } = require('sequelize');
const validate = require('validate.js')

/**
 * 添加一篇文章
 * @param {object} artobj 文章对象
 */
exports.addArticle = async function (artobj) {
    //验证传递的文章对象格式是否符合规则
    const rule = {
        name: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
            length: {
                minimum: 1,
                maximum: 40
            }
        },
        imgurl: {
            presence: true,
            type: 'string',
        },
        author: {
            presence: {
                allowEmpty: false
            },
            type: 'string'
        },
        tag: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
            length: {
                minimum: 1,
                maximum: 10
            }
        }
    }
    const _artobj = validate(artobj, rule)
    if (!_artobj) {
        const result = await article.create(artobj);
        return result.toJSON();
    }
    return new Error('添加文章格式有误，请检查后再重试')
}


/**
 * 根据id删除一篇文章
 * @param {*} id 
 */
exports.deletedArticle = async function (id) {
    const result = await article.destroy({
        where: {
            id
        }
    });
    return result;
}


/**
 * 修改一篇文章
 * @param {*} id 
 * @param {*} artobj 
 */
exports.updateArticle = async function (id, artobj) {
    const result = await article.update(artobj, {
        where: {
            id
        }
    });
    return result;
}


/**
 * 关键字查找文章
 * @param {string} keyword 
 */
exports.findArticle = async function (keyword, page = 1, limit = 6) {
    const result = await article.findAndCountAll({
        where: {
            name: {
                [Op.like]: `%${keyword}%`
            }
        },
        offset: (page - 1) * limit,
        limit: limit
    });
    return {
        total: result.count,
        datas: JSON.parse(JSON.stringify(result.rows))
    };
}


/**
 * 根据id查找文章
 * @param {*} id 
 */
exports.findArticleById = async function (id) {
    const result = await article.findByPk(id);
    return JSON.parse(JSON.stringify(result));
}

/**
 * 根据标签查找文章
 * @param {*} tag 
 */
exports.findArticleByTag = async function (tag, page = 1, limit = 6) {
    const result = await article.findAndCountAll({
        where: {
            tag: {
                [Op.like]: `%${tag}%`
            }
        },
        offset: (page - 1) * limit,
        limit: limit
    });
    return {
        total: result.count,
        datas: JSON.parse(JSON.stringify(result.rows))
    };
}

/**
 * 查询所有文章
 */
exports.findArticleAll = async function () {
    const result = await article.findAll()
    return JSON.parse(JSON.stringify(result))
};