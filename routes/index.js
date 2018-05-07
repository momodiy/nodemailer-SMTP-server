var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var mailTransport = nodemailer.createTransport({
    host: 'smtp.yeah.net',
    port: 25,
    // secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth: {
        user: 'stevenrobot@yeah.net',
        pass: 'shouquan1617'
    }
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: '邮件服务器首页', content: '您的项目启动成功！'});
});


router.get('/send', function (req, res, next) {
    var options = {
        from: 'stevenrobot@yeah.net',
        to: 'qcstevengo@gmail.com', //TODO 改为你自己的邮箱
        subject: '一封来自Node Mailer的邮件',
        text: '一封来自Node Mailer的邮件',
        html: '<h1>你好，这是一封来自Steven Lee的邮件！仅供测试</h1><p></p>',
        attachments: []//附件
    };


    mailTransport.sendMail(options, function (err, msg) {
        if (err) {
            console.log(err);
            res.render('error', {title: err});
        }
        else {
            console.log(msg);
            res.render('success', {msg: "邮件已经发送至：" + msg.accepted, title: '邮件发送成功'});
        }
    });
});
module.exports = router;
