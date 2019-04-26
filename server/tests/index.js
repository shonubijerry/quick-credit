import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
chai.use(chaiHttp);
const indexURL = '/';
chai.should();

describe('Home page', () => {
    it('it should take users to the landing page', (done) => {
      chai.request(app)
        .get('/')
        .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('message');
            res.body.data.message.should.equal('Welcome To Quick Credit');
          done();
        });
    });
});

describe('Page Not Found', () => {
    it('it should return error for invalid page', (done) => {
      chai.request(app)
        .get('/wrong_url.html')
        .end((error, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal('The URL you are trying to access does not exist. Please enter a valid url');
          done();
        });
    });
});