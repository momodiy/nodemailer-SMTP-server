/*
* Author: stevenlee
* Date: 2018/6/4
* Description: ... 
*/

let request = require('supertest');
let should = require('should');


describe('get home page', () => {
    it('respond with json', done => {
        request('http://localhost:8888')
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                res.status.should.equals(200);
                res.charset.should.equals('UTF-8');
                res.request.host.should.equals('localhost:8888');
                res.headers['content-length'].should.equals('5888');
                done();
            });
    });
});

