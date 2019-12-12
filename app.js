const express = require('express')
const bodyParser = require('body-parser')
const listEndPoints = require('express-list-endpoints')
const mongoose = require('mongoose')
const log4js = require('log4js');
var jwt = require('jsonwebtoken'); // 使用jwt签名
var jwtUtil = require('./App/Utils/jwtUtil');
var systConfig = require('./Config/system.config.js'); // 引入配置

// 定义app，生成一个express实例
const app = express()
// 加载log4js配置
log4js.configure(systConfig.System.LogConfig_Url);
// 加载日志中间件
app.use(log4js.connectLogger(log4js.getLogger("info"), { level: 'auto', format: (req, res, format) => format(`:method :url  :status  :response-time ms`) }));
// 加载解析url中间件
app.use(bodyParser.urlencoded({ extended: true }))
// 加载解析json中间件
app.use(bodyParser.json())

// 设置从dist目录下加载静态资源文件
app.use(express.static(systConfig.System.Dist_Url))

// 设置渲染引擎
app.set('views', systConfig.System.Dist_Url);
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// Token 校验中间件
app.use(function (req, res, next) {
    if (req.path.indexOf('admin') !== -1) {
        var token = req.body.token || req.headers['authorization'] || req.headers['Authorization'];
        token = token.substr("Bearer".length).trim();
        if (token) {
            try {
                // 解码 token (验证 secret 和检查有效期（exp）)
                jwt.verify(token, systConfig.System.Session_Key, function (err, decoded) {
                    if (err) {
                        // 没有拿到token 返回错误 
                        return res.status(403).send({
                            result_code: -1,
                            msg: '无效的token.'
                        });
                    } else {
                        next();
                    }
                });
            }
            catch (error) {
                //token过期 生成新的token
                const newToken = jwtUtil.createNewToken(user);
                //将新token放入Authorization中返回给前端
                res.setHeader('Authorization', newToken);
            }

        } else {
            // 没有拿到token 返回错误 
            return res.status(403).send({
                result_code: -1,
                msg: '缺少token.'
            });
        }
    }
    else {
        next();
    }
})

app.get('/', function (req, res) {
    res.json({ message: "ok", endPoints: listEndPoints(app) })
})

// mongodb 配置文件，连接数据库
mongoose.Promise = global.Promise
mongoose.connect(systConfig.DB.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Database Connect Successfully")
}).catch(error => {
    console.log(error)
    console.log('Could not connect to the database. Exiting now...')
})

require('./App/Routers/web.router.js')(app);

// 加载路由路由控制器
// 公开路由
app.use('/api/login', require('./App/Routers/login.router.js'));
app.use('/api/common', require('./App/Routers/common.router.js'));
app.use('/api/user', require('./App/Routers/user.router.js'));

// 保护
// app.use('/admin/user', require('./App/Routers/user.router.js'));

//all error中间件
app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
});

// 定义服务器端启动端口
app.listen(systConfig.System.API_server_port, function () {
    console.log("Server is listening on port " + systConfig.System.API_server_port)
})
