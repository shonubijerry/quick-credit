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

describe('Loans Controller', () => {
  it('it should return authentication error', (done) => {
    chai.request(app)
      .post(loansUrl)
      .send(testDb.testLoansApplication[1])
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

  describe('POST A LOAN', () => {
    it('it should create loan application with valid amount and tenor', (done) => {
      chai.request(app)
        .post(loansUrl)
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
        .post(loansUrl)
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
        .post(loansUrl)
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

    describe('User has current loan', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.testUsers[13])
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });

      it('Client cannot apply for another loan when there is a current loan', (done) => {
        chai.request(app)
          .post(loansUrl)
          .send(testDb.testLoansApplication[0])
          .set('token', currentToken)
          .end((error, res) => {
            res.should.have.status(406);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal('You have an unpaid loan of 80000 which is under review or yet to be fully repaid');
            done();
          });
      });
    });

    it('Client cannot apply for another loan when there is a pending loan', (done) => {
      chai.request(app)
        .post(loansUrl)
        .send(testDb.testLoansApplication[0])
        .set('token', currentToken)
        .end((error, res) => {
          res.should.have.status(406);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('You have an unpaid loan of 60000 which is under review or yet to be fully repaid');
          done();
        });
    });
  });

  describe('GET ALL LOANS', () => {
    describe('User should get their loans', () => {
      it('it should get user\'s loans', (done) => {
        chai.request(app)
          .get(loansUrl)
          .set('token', currentToken)
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            res.body.data[0].should.be.a('object');
            res.body.data[0].should.have.property('id');
            res.body.data[0].should.have.property('user');
            res.body.data[0].should.have.property('createdOn');
            res.body.data[0].should.have.property('status');
            res.body.data[0].should.have.property('repaid');
            res.body.data[0].should.have.property('tenor');
            res.body.data[0].should.have.property('amount');
            res.body.data[0].should.have.property('paymentInstallment');
            res.body.data[0].should.have.property('balance');
            res.body.data[0].should.have.property('interest');
            done();
          });
      });
    });

    describe('Admin should get all loans', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.testUsers[7])
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });

      it('It should get all loans for admin', (done) => {
        chai.request(app)
          .get(loansUrl)
          .set('token', currentToken)
          .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('array');
            res.body.data[0].should.be.a('object');
            res.body.data[0].should.have.property('id');
            res.body.data[0].should.have.property('user');
            res.body.data[0].should.have.property('createdOn');
            res.body.data[0].should.have.property('status');
            res.body.data[0].should.have.property('repaid');
            res.body.data[0].should.have.property('tenor');
            res.body.data[0].should.have.property('amount');
            res.body.data[0].should.have.property('paymentInstallment');
            res.body.data[0].should.have.property('balance');
            res.body.data[0].should.have.property('interest');
            done();
          });
      });
    });

    describe('There is no loan to fetch', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.testUsers[12])
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });

      it('it should return empty data if no loan is found', (done) => {
        chai.request(app)
          .get(loansUrl)
          .set('token', currentToken)
          .end((error, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal(errorStrings.noLoans);
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
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal(errorStrings.notAuthenticated);
          done();
        });
    });
    describe('403 Page forbidden', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.testUsers[13]) // this user is not an admin
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });
      it('it should not get the loan if user is not admin', (done) => {
        chai.request(app)
          .get(`${loansUrl}/4`)
          .set('token', currentToken)
          .end((error, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal(errorStrings.notAllowed);
            done();
          });
      });

      describe('Admin should get a specific loan', () => {
        before((done) => {
          chai.request(app)
            .post(signinUrl)
            .send(testDb.testUsers[7])
            .end((error, res) => {
              currentToken = res.body.data.token;
              done();
            });
        });

        it('It should get a specific loan application for admin', (done) => {
          chai.request(app)
            .get(`${loansUrl}/4`)
            .set('token', currentToken)
            .end((error, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('object');
              res.body.data.should.have.property('id');
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
        it('it should return error if no loan is found', (done) => {
          chai.request(app)
            .get(`${loansUrl}/43`)
            .set('token', currentToken)
            .end((error, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.noLoan);
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
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal(errorStrings.notAuthenticated);
          done();
        });
    });
    describe('403 Page forbidden', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.testUsers[13]) // this user is not an admin
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });
      it('it should not get current loans if user is not admin', (done) => {
        chai.request(app)
          .get(`${loansUrl}/4`)
          .set('token', currentToken)
          .end((error, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal(errorStrings.notAllowed);
            done();
          });
      });

      describe('Admin should get all current loans', () => {
        before((done) => {
          chai.request(app)
            .post(signinUrl)
            .send(testDb.testUsers[7])
            .end((error, res) => {
              currentToken = res.body.data.token;
              done();
            });
        });

        it('it should return page not found if query citerea not correct', (done) => {
          chai.request(app)
            .get(`${loansUrl}?status=wrongCiteria&repaid=false`)
            .set('token', currentToken)
            .end((error, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.pageNotFound);
              done();
            });
        });

        it('It should get all current loans for admin', (done) => {
          chai.request(app)
            .get(`${loansUrl}?status=approved&repaid=false`)
            .set('token', currentToken)
            .end((error, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('array');
              res.body.data[0].should.be.a('object');
              res.body.data[0].should.have.property('id');
              res.body.data[0].should.have.property('user');
              res.body.data[0].should.have.property('createdOn');
              res.body.data[0].should.have.property('status');
              res.body.data[0].should.have.property('repaid');
              res.body.data[0].should.have.property('tenor');
              res.body.data[0].should.have.property('amount');
              res.body.data[0].should.have.property('paymentInstallment');
              res.body.data[0].should.have.property('balance');
              res.body.data[0].should.have.property('interest');
              done();
            });
        });

        // this test is necessary to delete all current loans in data model so that
        // next test will return loans not found
        it('Alter loans so next test will not find a current loan', (done) => {
          chai.request(app)
            .patch(`${loansUrl}/2`)
            .send(testDb.testApplyLoan[3])
            .set('token', currentToken)
            .end((error, res) => {
              res.should.have.status(200);
              done();
            });
        });
        it('Alter loans so next test will not find a current loan', (done) => {
          chai.request(app)
            .patch(`${loansUrl}/5`)
            .send(testDb.testApplyLoan[3])
            .set('token', currentToken)
            .end((error, res) => {
              res.should.have.status(200);
              done();
            });
        });

        it('it should return no loan if citerea matched but no result', (done) => {
          chai.request(app)
            .get(`${loansUrl}?status=approved&repaid=false`)
            .set('token', currentToken)
            .end((error, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.noLoans);
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
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal(errorStrings.notAuthenticated);
          done();
        });
    });
    describe('403 Page forbidden', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.testUsers[13]) // this user is not an admin
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });
      it('it should not get repaid loans if user is not admin', (done) => {
        chai.request(app)
          .get(`${loansUrl}/4`)
          .set('token', currentToken)
          .end((error, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal(errorStrings.notAllowed);
            done();
          });
      });

      describe('Admin should get all repaid loans', () => {
        before((done) => {
          chai.request(app)
            .post(signinUrl)
            .send(testDb.testUsers[7])
            .end((error, res) => {
              currentToken = res.body.data.token;
              done();
            });
        });
        it('it should return page not found if query citerea not correct', (done) => {
          chai.request(app)
            .get(`${loansUrl}?status=wrongCiteria&repaid=false`)
            .set('token', currentToken)
            .end((error, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.pageNotFound);
              done();
            });
        });

        // TODO: handle case if citerea matched but no result

        it('It should get all repaid loans for admin', (done) => {
          chai.request(app)
            .get(`${loansUrl}?status=approved&repaid=true`)
            .set('token', currentToken)
            .end((error, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('array');
              res.body.data[0].should.be.a('object');
              res.body.data[0].should.have.property('id');
              res.body.data[0].should.have.property('user');
              res.body.data[0].should.have.property('createdOn');
              res.body.data[0].should.have.property('status');
              res.body.data[0].should.have.property('repaid');
              res.body.data[0].should.have.property('tenor');
              res.body.data[0].should.have.property('amount');
              res.body.data[0].should.have.property('paymentInstallment');
              res.body.data[0].should.have.property('balance');
              res.body.data[0].should.have.property('interest');
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
        .send(testDb.testApplyLoan[0])
        .end((error, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal(errorStrings.notAuthenticated);
          done();
        });
    });
    describe('403 Page forbidden', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.testUsers[13]) // this user is not an admin
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });
      it('it should not approve/reject loan if user is not admin', (done) => {
        chai.request(app)
          .patch(`${loansUrl}/4`)
          .send(testDb.testApplyLoan[0])
          .set('token', currentToken)
          .end((error, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal(errorStrings.notAllowed);
            done();
          });
      });

      describe('Admin should approve or reject a loan', () => {
        before((done) => {
          chai.request(app)
            .post(signinUrl)
            .send(testDb.testUsers[7])
            .end((error, res) => {
              currentToken = res.body.data.token;
              done();
            });
        });

        it('it should not approve or reject a loan if citerea not correct', (done) => {
          chai.request(app)
            .patch(`${loansUrl}/5`)
            .send(testDb.testApplyLoan[2])
            .set('token', currentToken)
            .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.validApproveLoan);
              done();
            });
        });

        it('it should not approve or reject a loan if parameter is not a number', (done) => {
          chai.request(app)
            .patch(`${loansUrl}/e5`)
            .send(testDb.testApplyLoan[0])
            .set('token', currentToken)
            .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.validNumber);
              done();
            });
        });

        it('it should not approve or reject a loan if loan not found by its id', (done) => {
          chai.request(app)
            .patch(`${loansUrl}/98`)
            .send(testDb.testApplyLoan[0])
            .set('token', currentToken)
            .end((error, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.noLoan);
              done();
            });
        });

        it('It should approve or reject loan', (done) => {
          chai.request(app)
            .patch(`${loansUrl}/4`)
            .send(testDb.testApplyLoan[0])
            .set('token', currentToken)
            .end((error, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('object');
              res.body.data.should.have.property('loanId');
              res.body.data.should.have.property('loanAmount');
              res.body.data.should.have.property('tenor');
              res.body.data.should.have.property('status');
              res.body.data.should.have.property('monthlyInstallment');
              res.body.data.should.have.property('interest');
              done();
            });
        });

        it('it should not approve/reject loan if loan is already approved/rejected as the case may be', (done) => {
          chai.request(app)
            .patch(`${loansUrl}/1`)
            .send(testDb.testApplyLoan[0])
            .set('token', currentToken)
            .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.alreadyApproved);
              done();
            });
        });
      });
    });
  });
});
