const user = require('../dao/users');
const validate = require('validate.js');
// const md5 = require('md5')

/**
 * 添加一名用户
 * @param {object} userObj 用户对象
 */
exports.addUser = async function (userObj) {
    //验证传递的用户对象格式是否符合规则
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
        loginID: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
            length: {
                minimum: 3,
                maximum: 11
            }
        },
        loginPwd: {
            presence: {
                allowEmpty: false
            },
            type: 'string',
            length: {
                minimum: 3,
                maximum: 16
            }
        }
    }
    const _userObj = validate(userObj, rule)
    console.log(_userObj);
    if (!_userObj) {
        // userObj.loginPwd = md5(userObj.loginPwd)
        const result = await user.create(userObj);
        return result.toJSON();
    }
    return new Error('添加用户格式有误，请检查后再重试')
}

/**
 * 登录
 * @param {*} loginID 
 * @param {*} loginPwd
 */
exports.login = async function (loginID,loginPwd) {
    const result = await user.findAll({
        where:{
            loginID,
            loginPwd
        }
    });
    return JSON.parse(JSON.stringify(result));
}

/**
 * 根据id查找用户
 * @param {*} id 
 */
exports.findUserById = async function (id) {
    const result = await user.findByPk(id);
    return JSON.parse(JSON.stringify(result));
}

/**
 * 根据id删除一名用户
 * @param {*} id 
 */
exports.deletedUser = async function (id) {
    const result = await user.destroy({
        where: {
            id
        }
    });
    return result;
}
