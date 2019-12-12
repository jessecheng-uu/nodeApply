// 引入模块依赖
const jwt = require('jsonwebtoken');
var systConfig = require('../../Config/system.config.js').System; // 引入配置

// 创建 token 类
class Jwt {
    constructor(data) {
        this.data = data;
    }

    // 从header请求中获取token 
    static createNewToken(userInfo) {
        const userToken = {
            username: userInfo.username,
            password: userInfo.password,
            loginAt: +new Date
        }

        var token = jwt.sign(userToken, systConfig.Session_Key, {
            expiresIn: 60 * 60 * 4// 授权时效4小时
        });

        return token;
    }
}

module.exports = Jwt;
