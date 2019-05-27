import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import testDb from './testDb';
import errorStrings from '../helpers/errorStrings';

chai.use(chaiHttp);
const { expect } = chai;

let currentToken;
const signinUrl = '/api/v1/auth/signin';
const loansUrl = '/api/v1/loans';

describe('Repayment Controller', () => {
  it('it should return authentication error', (done) => {
    chai.request(app)
      .get(`${loansUrl}/3/repayments`)
      .end((error, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equal(errorStrings.notAuthenticated);
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
        .get(`${loansUrl}/00298627-71e4-4ede-af91-aec1862fae22/repayments`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data.repayments).to.be.a('array');
          expect(res.body.data.repayments[0]).to.have.property('id');
          expect(res.body.data.repayments[0]).to.have.property('loanid');
          expect(res.body.data.repayments[0]).to.have.property('createdon');
          expect(res.body.data.repayments[0]).to.have.property('amount');
          done();
        });
    });

    it('it should return empty data set if no repayment is found', (done) => {
      chai.request(app)
        .get(`${loansUrl}/ff741315-7075-4488-8627-8f8ccccbada6/repayments`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data.repayments).to.eql([]);
          done();
        });
    });

    it('it should not get repayment if uuid is wrong', (done) => {
      chai.request(app)
        .get(`${loansUrl}/ff741315-7075-4488-8627-8f8ccccbada67/repayments`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.validLoanId);
          done();
        });
    });

    it('it should not get repayments if uuid is correct but loan does not exist in database', (done) => {
      chai.request(app)
        .get(`${loansUrl}/ff741315-7075-4488-8627-8f8cc7cbada6/repayments`)
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.noLoan);
          done();
        });
    });
  });

  describe('Alter DB back to original state', () => {
    // DO NOT TOUCH CODE BLOCK UNLESS YOU HAVE STUDIED THIS BLOCK INSIDE loansTest.js on line 3xx
    // This block return altered loans inside loansTest.js, back to their original state
    it('Alter loans so next test will not find a current loan', (done) => {
      chai.request(app)
        .patch(`${loansUrl}/ff741315-7075-4488-8627-8f8ccccbada6`)
        .send(testDb.approveRejectLoan[0])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('Alter loans so next test will not find a current loan', (done) => {
      chai.request(app)
        .patch(`${loansUrl}/4a860db6-aac6-47cc-954b-7912900be2eb`)
        .send(testDb.approveRejectLoan[0])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    // end alter block
  });

  describe('POST LOAN REPAYMENT', () => {
    it('it should return authentication error', (done) => {
      chai.request(app)
        .post(`${loansUrl}/00298627-71e4-4ede-af91-aec1862fae22/repayment`)
        .send(testDb.repaymentAmount[0])
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.notAuthenticated);
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
        .post(`${loansUrl}/ff741315-7075-4488-8627-8f8ccccbada6/repayment`)
        .send(testDb.repaymentAmount[1])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('repayment');
          expect(res.body.data).to.have.property('amount');
          expect(res.body.data).to.have.property('tenor');
          expect(res.body.data.repayment).to.be.a('object');
          expect(res.body.data.repayment).to.have.property('id');
          expect(res.body.data.repayment).to.have.property('loanid');
          expect(res.body.data.repayment).to.have.property('createdon');
          expect(res.body.data.repayment).to.have.property('amount');
          done();
        });
    });

    it('it should post a loan repayment to test last repayment', (done) => {
      chai.request(app)
        .post(`${loansUrl}/4a860db6-aac6-47cc-954b-7912900be2eb/repayment`)
        .send(testDb.repaymentAmount[0])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('repayment');
          expect(res.body.data).to.have.property('amount');
          expect(res.body.data).to.have.property('tenor');
          expect(res.body.data.repayment).to.be.a('object');
          expect(res.body.data.repayment).to.have.property('id');
          expect(res.body.data.repayment).to.have.property('loanid');
          expect(res.body.data.repayment).to.have.property('createdon');
          expect(res.body.data.repayment).to.have.property('amount');
          done();
        });
    });

    it('it should return error loan id does not exist', (done) => {
      chai.request(app)
        .post(`${loansUrl}/67298627-71e4-4ede-af91-aec1462fae32/repayment`)
        .send(testDb.repaymentAmount[3])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.noLoan);
          done();
        });
    });

    it('it should return error if loan is not approved', (done) => {
      chai.request(app)
        .post(`${loansUrl}/6f746db2-e5e7-4824-8926-cdec24a02312/repayment`)
        .send(testDb.repaymentAmount[6])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.notApproved);
          done();
        });
    });

    it('it should return error if loan paymentInstallment is not equal to amount paid', (done) => {
      chai.request(app)
        .post(`${loansUrl}/4a860db6-aac6-47cc-954b-7912900be2eb/repayment`)
        .send(testDb.repaymentAmount[4])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(`${errorStrings.notAmount} 11760.00`);
          done();
        });
    });

    it('it should return error if amount sent is not valid', (done) => {
      chai.request(app)
        .post(`${loansUrl}/4a860db6-aac6-47cc-954b-7912900be2eb/repayment`)
        .send(testDb.repaymentAmount[2])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql([`${errorStrings.validAmount}`]);
          done();
        });
    });

    it('it should return error if loan has already been repaid', (done) => {
      chai.request(app)
        .post(`${loansUrl}/8502d3d7-9c27-4a3e-bcd0-b1ecf914e628/repayment`)
        .send(testDb.repaymentAmount[4])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.loanRepaid);
          done();
        });
    });

    it('it should return error if loan balance is more than amount paid', (done) => {
      chai.request(app)
        .post(`${loansUrl}/ff741315-7075-4488-8627-8f8ccccbada6/repayment`)
        .send(testDb.repaymentAmount[7])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(`${errorStrings.notBalance} 72000.00`);
          done();
        });
    });

    it('it should return error if amount post parameter is wrong', (done) => {
      chai.request(app)
        .post(`${loansUrl}/8502d3d7-9c27-4a3e-bcd0-b1ecf914e628/repayment`)
        .send(testDb.repaymentAmount[5])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql([`${errorStrings.validAmount}`]);
          done();
        });
    });

    it('it should return error if tenor does not reange from 1 - 12', (done) => {
      chai.request(app)
        .post(`${loansUrl}/8502d3d7-9c27-4a3e-bcd0-b1ecf914e628/repayment`)
        .send(testDb.repaymentAmount[8])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql([`${errorStrings.validTenor}`]);
          done();
        });
    });

    it('it should return error if tenor post parameter is wrong', (done) => {
      chai.request(app)
        .post(`${loansUrl}/8502d3d7-9c27-4a3e-bcd0-b1ecf914e628/repayment`)
        .send(testDb.repaymentAmount[9])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql([`${errorStrings.validTenor}`]);
          done();
        });
    });
  });
});
