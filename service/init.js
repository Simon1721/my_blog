const validate = require('validate.js');
const moment = require('moment');

validate.extend(validate.validators.datetime, {
    parse: function (value, options) {
        let format = ['YYYY-MM-DD hh:mm:ss', 'YYYY-MM-DD','YYYY-M-D', 'X'];
        if (options.dateOnly) {
            format.shift()
        }
        return +moment.utc(value, format, true)
    },
    format: function (value, options) {
        var format = options.dateOnly ? ["YYYY-MM-DD","x","YYYY-M-D"] : "YYYY-MM-DD hh:mm:ss";
        return moment.utc(value).format(format);
    }
})