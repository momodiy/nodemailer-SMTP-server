/*
* Author: stevenlee
* Date: 2018/6/4
* Description: Interface testing
*/

let request = require('supertest');
let should = require('should');
let recipientEmail = 'qcstevengo@gmail.com';
let os = require('os');
// console.log(os.networkInterfaces().eth0[0].address);

describe('Basic function test', function () {
    this.timeout(30000);
    it('should no error to get the home gage', done => {
        request('http://' + getIPAdress() + ':8888')
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                res.status.should.equals(200);
                res.request.host.should.equals(getIPAdress() + ':8888');
                done();
            });
    });

    it('should no error to send an email', done => {

        request('http://' + getIPAdress() + ':8888')
            .post('/send')
            .send({
                email: recipientEmail,
                subject: 'Email server test',
                message: 'It\'s is an interesting test email for yourself!'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                console.log(res);
                res.charset.should.equals('utf-8');
                res.status.should.equals(200);
                res.request.host.should.equals(getIPAdress() + ':8888');
                res.body.type.should.equals('success');
                res.body.msg.should.equals(`邮件已经发送至：${recipientEmail}`);
                done();
            })
    });
});

describe('Error handle test', function () {
    this.timeout(30000);
    it('should get error to send email use error server email', done => {
        request('http://' + getIPAdress() + ':8888')
            .post('/send')
            .send({
                email: 'qcstevengo@gmail.com',
                subject: 'Email server test',
                message: 'It\'s is an interesting test email for yourself!',
                serverEmail: 'qcjy16@126.com'
            })
            .set('Accept', 'application/json')
            .expect(500)
            .end((err, res) => {
                if (err) throw err;
                res.charset.should.equals('utf-8');
                res.status.should.equals(500);
                res.header['content-length'].should.equals('341');
                res.error.text.should.containEql('Mail from must equal authorized user');
                done();
            })
    });

    it('should get error to send email missing parameters', done => {
        request('http://' + getIPAdress() + ':8888')
            .post('/send')
            .send({
                email: 'qcstevengo@gmail.com',
                subject: 'Email server test'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(500)
            .end((err, res) => {
                if (err) throw err;
                res.charset.should.equals('utf-8');
                res.status.should.equals(500);
                res.serverError.should.equals(true);
                res.error.text.should.containEql('Missing parameters error');
                done();
            })
    });

    it('should get 404 to access invalid route', done => {
        request('http://' + getIPAdress() + ':8888')
            .get('/invalidRoute')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(404)
            .end((err, res) => {
                if (err) throw err;
                res.res.statusMessage.should.equals('Not Found');
                done();
            });
    });
});

const getIPAdress = () => {
    let interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}