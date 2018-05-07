# **express邮件服务器**

## 目录  
* [项目介绍](#项目介绍)  
* [使用说明](#使用说明)
* [License](#License)  



<a name="项目介绍"></a>  
## 项目介绍 
一个简单的邮件服务器，使用express+nodemailer构建，可实现简单的邮件发送。

<a name="使用说明"></a>  
## 使用说明

**第一步：安装依赖的node包**

```
$ npm i
```


**第二步：配置发件信息**

代码中已经配置好了一个我的测试邮箱，因此您只需修改收件邮件即可测试。

修改`routes/index.js`这个文件，仅需将此文件的23行修改为你自己的邮箱即可。
```js
/*
* routes/index.js
*/
var options = {
    from: 'stevenrobot@yeah.net',
    to: 'qcstevengo@gmail.com', //TODO 改为你自己的邮箱
    subject: '一封来自Node Mailer的邮件',
    text: '一封来自Node Mailer的邮件',
    html: '<h1>你好，这是一封来自Steven Lee的邮件！仅供测试</h1><p></p>',
    attachments: []//附件 
};

```
**第三步：启动项目**
```
$ npm start
```
浏览器中打开`http://localhost:3000/`，此时可以看到express欢迎界面。

**第四步：发送邮件**

浏览器中打开`http://localhost:3000/send`，且页面提示邮件发送成功，就可以愉快滴去你的邮箱查看这封邮件了。



<a name="License"></a>  
## License

MIT License

Copyright (c) 2018 Steven Lee