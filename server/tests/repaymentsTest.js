import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testDb from './testDb';
import errorStrings from '../helpers/errorStrings';

chai.use(chaiHttp);
chai.should();

let currentToken;
const signinUrl = '/api/v1/auth/signin';
const repaymentsUrl = '/api/v1/loans/3/repayments';

describe('Repayment Controller', () => {
  it('it should return authentication error', (done) => {
    chai.request(app)
      .get(repaymentsUrl)
      .end((error, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal(errorStrings.notAuthenticated);
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post(signinUrl)
      .send(testDb.testUsers[7])
      .end((error, res) => {
        currentToken = res.body.data.token;
        done();
      });
  });

  describe('GET /api/v1/loans', () => {
    it('it should get loan repayments', (done) => {
      chai.request(app)
        .get(repaymentsUrl)
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('array');
          res.body.data[0].should.be.a('object');
          res.body.data[0].should.have.property('loanId');
          res.body.data[0].should.have.property('createdOn');
          res.body.data[0].should.have.property('amount');
          res.body.data[0].should.have.property('monthlyInstallment');
          done();
        });
    });

    it('it should return error if no repayment is found', (done) => {
      chai.request(app)
        .get('/api/v1/loans/6/repayments')
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal(errorStrings.noRepayments);
          done();
        });
    });
  });
});
