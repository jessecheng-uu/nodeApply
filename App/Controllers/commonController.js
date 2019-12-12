var formidable = require("formidable");
const fs = require("fs");

/**
 * 文件上传
 */
exports.upload = (req, res) => {
    var form = new formidable.IncomingForm();

    form.encoding = 'utf-8'; // 编码
    form.keepExtensions = true; // 保留扩展名
    form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小
    // form.uploadDir = 'D:/Users/Administrator/Downloads'  // 存储路径
    form.parse(req, function (err, fileds, files) {
        if (err) { return console.log(err) }

        let imgPath = files.upload.path
        var dir = './upload/';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        let imgName = dir + "test." + files.upload.name;
        let data = fs.readFileSync(imgPath)

        fs.writeFile(imgName, data, function (err) {

            if (err) { return console.log(err) }

            // fs.unlink(imgPath,function(){})
            res.json({ code: 1 })
        })
    })
}

/**
 * 文件下载
 */
exports.download = function (req, res) {
    res.download(req.query.fp);
};
