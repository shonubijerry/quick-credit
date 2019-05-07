import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testDb from './testDb';
import errorStrings from '../helpers/errorStrings';

chai.use(chaiHttp);
chai.should();

let currentToken;
const signinUrl = '/api/v1/auth/signin';
const loansUrl = '/api/v1/loans';

describe('Repayment Controller', () => {
  it('it should return authentication error', (done) => {
    chai.request(app)
      .get(`${loansUrl}/3/repayments`)
      .end((error, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.equal(errorStrings.notAuthenticated);
        done();
      });
  });

  describe('GET LOAN REPAYMENTS', () => {
    before((done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testDb.users[7])
        .end((error, res) => {
          currentToken = res.body.data.token;
          done();
        });
    });

    it('it should get loan repayments', (done) => {
      chai.request(app)
        .get(`${loansUrl}/3/repayments`)
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
        .get(`${loansUrl}/6/repayments`)
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

  describe('Alter DB back to original state', () => {
    // DO NOT TOUCH CODE BLOCK UNLESS YOU HAVE STUDIED THIS BLOCK INSIDE loansTest.js on line 3xx
    // This block return altered loans inside loansTest.js, back to their original state
    it('Alter loans so next test will not find a current loan', (done) => {
      chai.request(app)
        .patch(`${loansUrl}/2`)
        .send(testDb.approveRejectLoan[0])
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('Alter loans so next test will not find a current loan', (done) => {
      chai.request(app)
        .patch(`${loansUrl}/5`)
        .send(testDb.approveRejectLoan[0])
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
    // end alter block
  });

  describe('POST LOAN REPAYMENT', () => {
    it('it should return authentication error', (done) => {
      chai.request(app)
        .post(`${loansUrl}/3/repayment`)
        .send(testDb.repaymentAmount[0])
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
        .send(testDb.users[7])
        .end((error, res) => {
          currentToken = res.body.data.token;
          done();
        });
    });

    it('it should post a loan repayment', (done) => {
      chai.request(app)
        .post(`${loansUrl}/2/repayment`)
        .send(testDb.repaymentAmount[1])
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('loanId');
          res.body.data.should.have.property('createdOn');
          res.body.data.should.have.property('amount');
          res.body.data.should.have.property('monthlyInstallment');
          res.body.data.should.have.property('paidAmount');
          res.body.data.should.have.property('balance');
          done();
        });
    });

    it('it should post a loan repayment to test last repayment', (done) => {
      chai.request(app)
        .post(`${loansUrl}/5/repayment`)
        .send(testDb.repaymentAmount[0])
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('id');
          res.body.data.should.have.property('loanId');
          res.body.data.should.have.property('createdOn');
          res.body.data.should.have.property('amount');
          res.body.data.should.have.property('monthlyInstallment');
          res.body.data.should.have.property('paidAmount');
          res.body.data.should.have.property('balance');
          done();
        });
    });

    it('it should return error if loan is not approved', (done) => {
      chai.request(app)
        .post(`${loansUrl}/3/repayment`)
        .send(testDb.repaymentAmount[3])
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal(errorStrings.notApproved);
          done();
        });
    });

    it('it should return error if loan paymentInstallment is not equal to amount paid', (done) => {
      chai.request(app)
        .post(`${loansUrl}/5/repayment`)
        .send(testDb.repaymentAmount[4])
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal(errorStrings.notAmount);
          done();
        });
    });

    it('it should return error if amount sent is not valid', (done) => {
      chai.request(app)
        .post(`${loansUrl}/5/repayment`)
        .send(testDb.repaymentAmount[2])
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal(errorStrings.validAmount);
          done();
        });
    });

    it('it should return error if loan has already been repaid', (done) => {
      chai.request(app)
        .post(`${loansUrl}/1/repayment`)
        .send(testDb.repaymentAmount[4])
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal(errorStrings.loanRepaid);
          done();
        });
    });

    it('it should return error if loan post parameter is wrong', (done) => {
      chai.request(app)
        .post(`${loansUrl}/1/repayment`)
        .send(testDb.repaymentAmount[5])
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal(errorStrings.validAmount);
          done();
        });
    });
  });
});
