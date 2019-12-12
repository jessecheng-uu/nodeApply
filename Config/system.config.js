const path = require('path');

const System = {
    API_server_type: 'http://',
    API_server_host: 'localhost',
    API_server_port: '3000', 
    Dist_Url: path.resolve(__dirname, '../dist'), //静态文件存放目录
    LogConfig_Url: path.resolve(__dirname, './log4js.config.json'),//日志配置目录
    Session_Key: 'hagsdhagTRETW556sdrsfd', 
}

const DB = {
    url: 'mongodb://127.0.0.1:27017/Test'
}

module.exports.System = System;
module.exports.DB = DB;