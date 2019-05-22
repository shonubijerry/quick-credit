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

describe('Loans Controller', () => {
  it('it should return authentication error', (done) => {
    chai.request(app)
      .post(loansUrl)
      .send(testDb.loanApplication[1])
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

  describe('POST A LOAN', () => {
    it('it should create loan application with valid amount and tenor', (done) => {
      chai.request(app)
        .post(loansUrl)
        .send(testDb.loanApplication[0])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('loanuser');
          expect(res.body.data).to.have.property('createdon');
          expect(res.body.data).to.have.property('status');
          expect(res.body.data).to.have.property('repaid');
          expect(res.body.data).to.have.property('tenor');
          expect(res.body.data).to.have.property('amount');
          expect(res.body.data).to.have.property('paymentinstallment');
          expect(res.body.data).to.have.property('balance');
          expect(res.body.data).to.have.property('interest');
          done();
        });
    });

    it('it should not create loan application with invalid amount', (done) => {
      chai.request(app)
        .post(loansUrl)
        .send(testDb.loanApplication[1])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(422);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql([`${errorStrings.validAmount}`]);
          done();
        });
    });

    it('it should not create loan application with invalid tenor', (done) => {
      chai.request(app)
        .post(loansUrl)
        .send(testDb.loanApplication[2])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(422);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql([`${errorStrings.validTenor}`]);
          done();
        });
    });

    describe('User has current loan', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.users[13])
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });

      it('Client cannot apply for another loan when there is a current loan', (done) => {
        chai.request(app)
          .post(loansUrl)
          .send(testDb.loanApplication[0])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(409);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal('You have an unpaid loan of 63000.00 which is under review or yet to be fully repaid');
            done();
          });
      });
    });

    it('Client cannot apply for another loan when there is a pending loan', (done) => {
      chai.request(app)
        .post(loansUrl)
        .send(testDb.loanApplication[0])
        .set('Authorization', currentToken)
        .end((error, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('You have an unpaid loan of 63000.00 which is under review or yet to be fully repaid');
          done();
        });
    });
  });

  describe('GET ALL LOANS', () => {
    describe('User should get their loans', () => {
      it('it should get user\'s loans', (done) => {
        chai.request(app)
          .get(loansUrl)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.be.a('object');
            expect(res.body.data[0]).to.have.property('id');
            expect(res.body.data[0]).to.have.property('loanuser');
            expect(res.body.data[0]).to.have.property('createdon');
            expect(res.body.data[0]).to.have.property('status');
            expect(res.body.data[0]).to.have.property('repaid');
            expect(res.body.data[0]).to.have.property('tenor');
            expect(res.body.data[0]).to.have.property('amount');
            expect(res.body.data[0]).to.have.property('paymentinstallment');
            expect(res.body.data[0]).to.have.property('balance');
            expect(res.body.data[0]).to.have.property('interest');
            done();
          });
      });
    });

    describe('Admin should get all loans', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.users[7])
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });

      it('It should get all loans for admin', (done) => {
        chai.request(app)
          .get(loansUrl)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.be.a('object');
            expect(res.body.data[0]).to.have.property('id');
            expect(res.body.data[0]).to.have.property('loanuser');
            expect(res.body.data[0]).to.have.property('createdon');
            expect(res.body.data[0]).to.have.property('status');
            expect(res.body.data[0]).to.have.property('repaid');
            expect(res.body.data[0]).to.have.property('tenor');
            expect(res.body.data[0]).to.have.property('amount');
            expect(res.body.data[0]).to.have.property('paymentinstallment');
            expect(res.body.data[0]).to.have.property('balance');
            expect(res.body.data[0]).to.have.property('interest');
            done();
          });
      });
    });
  });

  describe('GET LOAN BY ID', () => {
    it('it should return authentication error if user is not logged in', (done) => {
      chai.request(app)
        .get(`${loansUrl}/3`)
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.notAuthenticated);
          done();
        });
    });
    describe('403 Page forbidden', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.users[13]) // this user is not an admin
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });
      it('it should not get the loan if user is not admin', (done) => {
        chai.request(app)
          .get(`${loansUrl}/6f746db2-e5e7-4824-8926-cdec24a02312`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(403);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.notAllowed);
            done();
          });
      });

      describe('Admin should get a specific loan', () => {
        before((done) => {
          chai.request(app)
            .post(signinUrl)
            .send(testDb.users[7])
            .end((error, res) => {
              currentToken = res.body.data.token;
              done();
            });
        });

        it('It should get a specific loan application for admin', (done) => {
          chai.request(app)
            .get(`${loansUrl}/6f746db2-e5e7-4824-8926-cdec24a02312`)
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.a('object');
              expect(res.body).to.have.property('data');
              expect(res.body.data).to.be.a('object');
              expect(res.body.data).to.have.property('id');
              expect(res.body.data).to.have.property('loanuser');
              expect(res.body.data).to.have.property('createdon');
              expect(res.body.data).to.have.property('status');
              expect(res.body.data).to.have.property('repaid');
              expect(res.body.data).to.have.property('tenor');
              expect(res.body.data).to.have.property('amount');
              expect(res.body.data).to.have.property('paymentinstallment');
              expect(res.body.data).to.have.property('balance');
              expect(res.body.data).to.have.property('interest');
              done();
            });
        });

        it('it should return error if no loan is found', (done) => {
          chai.request(app)
            .get(`${loansUrl}/6f746db2-e5e7-4824-8926-cdec24a02355`)
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(404);
              expect(res.body).to.be.a('object');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal(errorStrings.noLoan);
              done();
            });
        });

        it('it should return error if invalid loan id', (done) => {
          chai.request(app)
            .get(`${loansUrl}/6f746db2-e5e7-4824-8926`)
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(400);
              expect(res.body).to.be.a('object');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal(errorStrings.validLoanId);
              done();
            });
        });
      });
    });
  });


  describe('GET CURRENT LOANS', () => {
    it('it should return authentication error if user is not logged in', (done) => {
      chai.request(app)
        .get(`${loansUrl}/3`)
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.notAuthenticated);
          done();
        });
    });
    describe('403 Page forbidden', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.users[13]) // this user is not an admin
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });
      it('it should not get current loans if user is not admin', (done) => {
        chai.request(app)
          .get(`${loansUrl}/4`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(403);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.notAllowed);
            done();
          });
      });

      describe('Admin should get all current loans', () => {
        before((done) => {
          chai.request(app)
            .post(signinUrl)
            .send(testDb.users[7])
            .end((error, res) => {
              currentToken = res.body.data.token;
              done();
            });
        });

        it('It should get all current loans for admin', (done) => {
          chai.request(app)
            .get(`${loansUrl}?status=approved&repaid=false`)
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.a('object');
              expect(res.body).to.have.property('data');
              expect(res.body.data).to.be.a('array');
              expect(res.body.data[0]).to.be.a('object');
              expect(res.body.data[0]).to.have.property('id');
              expect(res.body.data[0]).to.have.property('loanuser');
              expect(res.body.data[0]).to.have.property('createdon');
              expect(res.body.data[0]).to.have.property('status');
              expect(res.body.data[0]).to.have.property('repaid');
              expect(res.body.data[0]).to.have.property('tenor');
              expect(res.body.data[0]).to.have.property('amount');
              expect(res.body.data[0]).to.have.property('paymentinstallment');
              expect(res.body.data[0]).to.have.property('balance');
              expect(res.body.data[0]).to.have.property('interest');
              done();
            });
        });

        it('it should return page not found if query citerea not correct', (done) => {
          chai.request(app)
            .get(`${loansUrl}?status=wrongCiteria&repaid=false`)
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(404);
              expect(res.body).to.be.a('object');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal(errorStrings.pageNotFound);
              done();
            });
        });

        // this test is necessary to delete all current loans in data model so that
        // next test will return loans not found
        it('Alter loans so next test will not find a current loan', (done) => {
          chai.request(app)
            .patch(`${loansUrl}/ff741315-7075-4488-8627-8f8ccccbada6`)
            .send(testDb.approveRejectLoan[3])
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(200);
              done();
            });
        });
        it('Alter loans so next test will not find a current loan', (done) => {
          chai.request(app)
            .patch(`${loansUrl}/4a860db6-aac6-47cc-954b-7912900be2eb`)
            .send(testDb.approveRejectLoan[3])
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(200);
              done();
            });
        });

        it('it should return empty loan if citerea matched but no result', (done) => {
          chai.request(app)
            .get(`${loansUrl}?status=approved&repaid=false`)
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.a('object');
              expect(res.body).to.have.property('data');
              expect(res.body.data).to.eql([]);
              done();
            });
        });
      });
    });
  });


  describe('GET REPAID LOANS', () => {
    it('it should return authentication error if user is not logged in', (done) => {
      chai.request(app)
        .get(`${loansUrl}/3`)
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.notAuthenticated);
          done();
        });
    });
    describe('403 Page forbidden', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.users[13]) // this user is not an admin
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });
      it('it should not get repaid loans if user is not admin', (done) => {
        chai.request(app)
          .get(`${loansUrl}?status=approved&repaid=true`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(403);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.notAllowed);
            done();
          });
      });

      describe('Admin should get all repaid loans', () => {
        before((done) => {
          chai.request(app)
            .post(signinUrl)
            .send(testDb.users[7])
            .end((error, res) => {
              currentToken = res.body.data.token;
              done();
            });
        });
        it('it should return page not found if query citerea not correct', (done) => {
          chai.request(app)
            .get(`${loansUrl}?status=wrongCiteria&repaid=false`)
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(404);
              expect(res.body).to.be.a('object');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal(errorStrings.pageNotFound);
              done();
            });
        });

        it('It should get all repaid loans for admin', (done) => {
          chai.request(app)
            .get(`${loansUrl}?status=approved&repaid=true`)
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.a('object');
              expect(res.body).to.have.property('data');
              expect(res.body.data).to.be.a('array');
              expect(res.body.data[0]).to.be.a('object');
              expect(res.body.data[0]).to.have.property('id');
              expect(res.body.data[0]).to.have.property('loanuser');
              expect(res.body.data[0]).to.have.property('createdon');
              expect(res.body.data[0]).to.have.property('status');
              expect(res.body.data[0]).to.have.property('repaid');
              expect(res.body.data[0]).to.have.property('tenor');
              expect(res.body.data[0]).to.have.property('amount');
              expect(res.body.data[0]).to.have.property('paymentinstallment');
              expect(res.body.data[0]).to.have.property('balance');
              expect(res.body.data[0]).to.have.property('interest');
              done();
            });
        });
      });
    });
  });

  describe('PATCH APPROVE/REJECT LOANS', () => {
    it('it should return authentication error if user is not logged in', (done) => {
      chai.request(app)
        .patch(`${loansUrl}/3`)
        .send(testDb.approveRejectLoan[0])
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.notAuthenticated);
          done();
        });
    });
    describe('403 Page forbidden', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.users[13]) // this user is not an admin
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });
      it('it should not approve/reject loan if user is not admin', (done) => {
        chai.request(app)
          .patch(`${loansUrl}/00298627-71e4-4ede-af91-aec1862fae22`)
          .send(testDb.approveRejectLoan[0])
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(403);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.notAllowed);
            done();
          });
      });

      describe('Admin should approve or reject a loan', () => {
        before((done) => {
          chai.request(app)
            .post(signinUrl)
            .send(testDb.users[7])
            .end((error, res) => {
              currentToken = res.body.data.token;
              done();
            });
        });

        it('it should not approve or reject a loan if post citerea not correct', (done) => {
          chai.request(app)
            .patch(`${loansUrl}/00298627-71e4-4ede-af91-aec1862fae22`)
            .send(testDb.approveRejectLoan[2])
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(400);
              expect(res.body).to.be.a('object');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.eql([`${errorStrings.validApproveLoan}`]);
              done();
            });
        });

        it('it should not approve or reject a loan if parameter is not a valid id', (done) => {
          chai.request(app)
            .patch(`${loansUrl}/00298627-71e4-4ede-af9`)
            .send(testDb.approveRejectLoan[0])
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(400);
              expect(res.body).to.be.a('object');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.eql([`${errorStrings.validLoanId}`]);
              done();
            });
        });

        it('it should not approve or reject a loan if loan not found by its id', (done) => {
          chai.request(app)
            .patch(`${loansUrl}/00298627-71e4-4ede-af91-aec1862fae25`)
            .send(testDb.approveRejectLoan[0])
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(404);
              expect(res.body).to.be.a('object');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal(errorStrings.noLoan);
              done();
            });
        });

        it('It should approve or reject loan', (done) => {
          chai.request(app)
            .patch(`${loansUrl}/00298627-71e4-4ede-af91-aec1862fae22`)
            .send(testDb.approveRejectLoan[0])
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.a('object');
              expect(res.body).to.have.property('data');
              expect(res.body.data).to.be.a('object');
              expect(res.body.data).to.have.property('id');
              expect(res.body.data).to.have.property('loanuser');
              expect(res.body.data).to.have.property('createdon');
              expect(res.body.data).to.have.property('status');
              expect(res.body.data).to.have.property('repaid');
              expect(res.body.data).to.have.property('tenor');
              expect(res.body.data).to.have.property('amount');
              expect(res.body.data).to.have.property('paymentinstallment');
              expect(res.body.data).to.have.property('balance');
              expect(res.body.data).to.have.property('interest');
              done();
            });
        });

        it('it should not approve/reject loan if loan is already approved/rejected as the case may be', (done) => {
          chai.request(app)
            .patch(`${loansUrl}/00298627-71e4-4ede-af91-aec1862fae22`)
            .send(testDb.approveRejectLoan[0])
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(409);
              expect(res.body).to.be.a('object');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal(`${errorStrings.alreadyApproved} ${testDb.approveRejectLoan[0].status}`);
              done();
            });
        });
      });
    });
  });
});
