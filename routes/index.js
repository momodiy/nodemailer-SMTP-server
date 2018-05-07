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
    },
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Excuse me'});
});


router.get('/send', function (req, res, next) {
    console.log(111);
    console.log(req);
    var options = {
        from: 'stevenrobot@yeah.net',
        to: 'qcjy16@126.com',
        subject: '一封来自Node Mailer的邮件',
        text: '一封来自Node Mailer的邮件',
        html: '<h1>你好，这是一封来自Steven Lee的邮件！仅供测试</h1><p></p>',
        attachments: //附件
            [
                // {
                //     filename: 'img1.png',            // 改成你的附件名
                //     path: 'public/images/img1.png',  // 改成你的附件路径
                //     cid : '00000001'                 // cid可被邮件使用
                // },
                // {
                //     filename: 'img2.png',            // 改成你的附件名
                //     path: 'public/images/img2.png',  // 改成你的附件路径
                //     cid : '00000002'                 // cid可被邮件使用
                // },
            ]
    };


    mailTransport.sendMail(options, function (err, msg) {
        if (err) {
            console.log(err);
            res.render('index', {title: err});
        }
        else {
            console.log(msg);
            res.render('index', {title: "邮件已经发送至：" + msg.accepted});
        }
    });
});
module.exports = router;
