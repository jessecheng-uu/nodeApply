const User = require('../Models/user.model.js')
var jwtUtil = require('../Utils/jwtUtil');
var commonUtil = require('../Utils/commonUtil');

exports.login = (req, res) => {

    User.findOne({ 'name': req.body.name }, function (err, user) {
        //查找信息不存在情况
        if (!user) {
            res.send("用户名不存在,请核实后重新尝试登陆!");
            return;
        }

        if (user.password == commonUtil.cryptoStr(req.body.password)) {
            const userToken = {
                username: user.username,
                password: user.password,
                loginAt: +new Date
            }

            var token = jwtUtil.createNewToken(userToken);

            return res.send(token);
        } else {
            res.send("登陆失败,你输入的密码不正确,请重新输入");
            return;
        }
    })
}
