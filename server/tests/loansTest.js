/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testDb from './testDb'
import errorStrings from '../helpers/errorStrings'

chai.use(chaiHttp);
chai.should();

let currentToken;
const signinUrl = '/api/v1/auth/signin';
const loanApplicationUrl = '/api/v1/loans';

describe('Loans Controller', () => {  

  it('it should return authentication error', (done) => {
    chai.request(app)
      .post(loanApplicationUrl)
      .send(testDb.testLoansApplication[1])
      .end((error, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal(errorStrings.notAuthenticated);
        done();
    });
  });

  describe('POST /api/v1/loans', () => {
    before((done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testDb.testUsers[7])
        .end((error, res) => {
          currentToken = res.body.data.token;
          done();
        });
    });
    
    it(`it should create loan application with valid amount and tenor`, (done) => {
      chai.request(app)
        .post(loanApplicationUrl)
        .send(testDb.testLoansApplication[0])
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('loanId');
          res.body.data.should.have.property('user');
          res.body.data.should.have.property('createdOn');
          res.body.data.should.have.property('status');
          res.body.data.should.have.property('repaid');
          res.body.data.should.have.property('tenor');
          res.body.data.should.have.property('amount');
          res.body.data.should.have.property('paymentInstallment');
          res.body.data.should.have.property('balance');
          res.body.data.should.have.property('interest');
          done();
        });
    });

    it('it should not create loan application with invalid amount', (done) => {
      chai.request(app)
        .post(loanApplicationUrl)
        .send(testDb.testLoansApplication[1])
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal(errorStrings.validAmount);
          done();
      });
    });

    it('it should not create loan application with invalid tenor', (done) => {
      chai.request(app)
        .post(loanApplicationUrl)
        .send(testDb.testLoansApplication[2])
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal(errorStrings.validTenor);
          done();
      });
    });

    it('Client cannot apply for another loan when there is a current loan', (done) => {
      chai.request(app)
        .post(loanApplicationUrl)
        .send(testDb.testLoansApplication[3])
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal(`You have an unpaid loan of 60000 which is under review or yet to be fully repaid`);
          done();
      });
    });

    it('Client cannot apply for another loan when there is a pending loan', (done) => {
      chai.request(app)
        .post(loanApplicationUrl)
        .send(testDb.testLoansApplication[4])
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal(`You have an unpaid loan of 60000 which is under review or yet to be fully repaid`);
          done();
      });
    });

  });



});