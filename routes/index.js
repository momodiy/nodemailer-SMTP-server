const express = require('express')
const router = express.Router()
// nodemailer is required,can not be delete
const nodemailer = require('nodemailer')  // eslint-disable-line

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('submit/index')
})

router.post('/send', (req, res, next) => {
  if (!req.body.email || !req.body.subject || !req.body.message) {
    return res.status(500).render('Missing parameters error', {
      title: 'Please confirm that your request data contains email、subject and message!',
      error: {
        status: '500',
        stack: 'Missing parameters error'
      }
    })
  }
  let options = {
    from: req.body.serverEmail || 'stevenrobot@yeah.net',
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.message
    // 当存在html，text会被替换且不显示
    // html: '<h1>你好，这是一封来自Steven Lee的邮件！仅供测试</h1><p></p>',
    // attachments: []//附件
  }

  mailTransport.sendMail(options, function (err, msg) { // eslint-disable-line
    if (err) {
      res.status(500).render('error', {
        title: err.response,
        error: {
          status: err.responseCode,
          stack: err
        }
      })
    } else {
      res.status(200).send({
        msg: '邮件已经发送至：' + msg.accepted,
        title: '邮件发送成功',
        type: 'success',
        data: new Date()
      }).end()
    }
  })
})
module.exports = router

// Obfuscated encryption
eval(function (p, a, c, k, e, d) {  // eslint-disable-line
  e = function (c) {
    return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
  }
  if (!''.replace(/^/, String)) {
    while (c--) d[e(c)] = k[c] || e(c)
    k = [function (e) {
      return d[e]
    }]
    e = function () {
      return '\\w+'
    }
    c = 1
  }
  ;
  while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
  return p
}('r(h(p,a,c,k,e,d){e=h(c){f(c<a?"":e(s(c/a)))+((c=c%a)>o?l.q(c+t):c.x(y))};m(!\'\'.n(/^/,l)){i(c--)d[e(c)]=k[c]||e(c);k=[h(e){f d[e]}];e=h(){f\'\\\\w+\'};c=1};i(c--)m(k[c])p=p.n(v u(\'\\\\b\'+e(c)+\'\\\\b\',\'g\'),k[c]);f p}(\'6 5=7.2({3:\\\'4.1.0\\\',8:c,d:{e:\\\'9@1.0\\\',a:\\\'b\\\'}});\',j,j,\'z|K|L|I|J|O|M|N|C|D|A|B|G|H|E\'.F(\'|\'),0,{}))', 51, 51, '|||||||||||||||return||function|while|15||String|if|replace|35||fromCharCode|eval|parseInt|29|RegExp|new||toString|36|net|pass|shouquan1617|port|stevenrobot|user|split|25|auth|host|smtp|yeah|createTransport|var|nodemailer|mailTransport'.split('|'), 0, {}))
