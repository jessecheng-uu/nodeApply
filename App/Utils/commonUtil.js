let crypto = require('crypto');

exports.cryptoStr = (str) => {
    return crypto.createHash('md5').update(str).digest('base64');
}