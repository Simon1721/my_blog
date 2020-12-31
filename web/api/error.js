exports.getError = function (err = 'server internal error', errCode = 500) {
    return {
        code: errCode,
        msg: err
    }
}

exports.getResult = function (result) {
    return {
        code: 200,
        msg: '成功',
        data: result,
    }
}