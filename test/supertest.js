/*
* Author: stevenlee
* Date: 2018/6/4
* Description: ... 
*/

let request = require('supertest');
let should = require('should');
let receiveEmail = 'qcstevengo@gmail.com';


describe('Basic function test', () => {
    it('should no error to get the home gage', done => {
        request('http://localhost:8888')
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                res.status.should.equals(200);
                res.request.host.should.equals('localhost:8888');
                res.headers['content-length'].should.equals('5888');
                done();
            });
    });

    it('should no error to send an email', done => {
        request('http://localhost:8888')
            .post('/send')
            .send({
                email: 'qcstevengo@gmail.com',
                subject: 'Email server test',
                message: 'It\'s is an interesting test email for yourself!'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                console.log(res.body);
                res.charset.should.equals('utf-8');
                res.status.should.equals(res.body.state);
                res.request.host.should.equals('localhost:8888');
                res.body.type.should.equals('success');
                res.body.msg.should.equals(`邮件已经发送至：${receiveEmail}`);
                done();
            })
    });
});

// todo 错误处理相关测试用例

