const app = require('./server');
const supertest = require('supertest');
const request = supertest(app);
import 'babel-polyfill';

//test endpoint to ensure it is successful
it('Testing / endpoint', async done => {
    const res = await request.get('/');
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    done();
})