import chaiHttp from 'chai-http';
import chai from 'chai';
import dotenv from 'dotenv';
import app from '../app';
import testDb from './testDb';
import errorStrings from '../helpers/errorStrings';


const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();

let currentToken;
const signupUrl = '/api/v1/auth/signup';
const signinUrl = '/api/v1/auth/signin';
const usersUrl = '/api/v1/users';

describe('User Controller', () => {
  describe('POST SIGN UP', () => {
    it(`it should register a user with POST ${signupUrl}`, (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(testDb.users[0])
        .end((error, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('firstname');
          expect(res.body.data).to.have.property('lastname');
          expect(res.body.data).to.have.property('email');
          done();
        });
    });

    it('it should not register a user with empty firstname or lastname', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(testDb.users[14])
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql([`${errorStrings.validFirstName}`]);
          done();
        });
    });

    it('it should not register a user with invalid firstname or lastname', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(testDb.users[1])
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql([`${errorStrings.validLastName}`]);
          done();
        });
    });

    it('it should not register a user with invalid email', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(testDb.users[2])
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql([`${errorStrings.validEmail}`]);
          done();
        });
    });

    it('it should not register a user with same email twice', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(testDb.users[3])
        .end((error, res) => {
          expect(res).to.have.status(409);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.emailExists);
          done();
        });
    });

    it('it should not register a user with invalid address', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(testDb.users[4])
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql([`${errorStrings.validAddress}`]);
          done();
        });
    });

    it('it should not register a user with password less than 8 characters', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(testDb.users[5])
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql([`${errorStrings.passwordLength}`]);
          done();
        });
    });

    it('it should not register a user with empty password field', (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(testDb.users[6])
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error[1]).to.equal(errorStrings.passwordEmpty);
          done();
        });
    });
  });


  describe('POST SIGN IN', () => {
    it('it should login a user with valid email and password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testDb.users[7])
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('firstname');
          expect(res.body.data).to.have.property('lastname');
          expect(res.body.data).to.have.property('email');
          done();
        });
    });

    it('it should not login a user with invalid email', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testDb.users[8])
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql([`${errorStrings.validEmail}`]);
          done();
        });
    });

    it('it should not login a user with empty password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testDb.users[9])
        .end((error, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.eql([`${errorStrings.passwordEmpty}`]);
          done();
        });
    });

    it('it should not login a user with wrong login email or password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testDb.users[11])
        .end((error, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.loginFailure);
          done();
        });
    });
  });


  describe('GET ALL USERS', () => {
    it('it should return authentication error if user is not logged in', (done) => {
      chai.request(app)
        .get(usersUrl)
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.notAuthenticated);
          done();
        });
    });

    describe('403 Page forbidden', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.users[13])
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });
      it('it should not get all users if subject is not admin', (done) => {
        chai.request(app)
          .get(usersUrl)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(403);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.notAllowed);
            done();
          });
      });
    });

    describe('Admin should get all users', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.users[7])
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });

      it('It should get all users for admin', (done) => {
        chai.request(app)
          .get(usersUrl)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.be.a('object');
            expect(res.body.data[0]).to.have.property('id');
            expect(res.body.data[0]).to.have.property('email');
            expect(res.body.data[0]).to.have.property('firstname');
            expect(res.body.data[0]).to.have.property('lastname');
            expect(res.body.data[0]).to.have.property('address');
            expect(res.body.data[0]).to.have.property('status');
            expect(res.body.data[0]).to.have.property('isadmin');
            done();
          });
      });

      it('It should get verified users for admin', (done) => {
        chai.request(app)
          .get(`${usersUrl}/?status=verified`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.be.a('object');
            expect(res.body.data[0]).to.have.property('id');
            expect(res.body.data[0]).to.have.property('email');
            expect(res.body.data[0]).to.have.property('firstname');
            expect(res.body.data[0]).to.have.property('lastname');
            expect(res.body.data[0]).to.have.property('address');
            expect(res.body.data[0]).to.have.property('status');
            expect(res.body.data[0]).to.have.property('isadmin');
            expect(res.body.data[0].status).to.equal('verified');
            done();
          });
      });

      it('It should get unverified users for admin', (done) => {
        chai.request(app)
          .get(`${usersUrl}/?status=unverified`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('data');
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.be.a('object');
            expect(res.body.data[0]).to.have.property('id');
            expect(res.body.data[0]).to.have.property('email');
            expect(res.body.data[0]).to.have.property('firstname');
            expect(res.body.data[0]).to.have.property('lastname');
            expect(res.body.data[0]).to.have.property('address');
            expect(res.body.data[0]).to.have.property('status');
            expect(res.body.data[0]).to.have.property('isadmin');
            expect(res.body.data[0].status).to.equal('unverified');
            done();
          });
      });

      it('it should not get users if query param is not status', (done) => {
        chai.request(app)
          .get(`${usersUrl}/?stater=apa`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.pageNotFound);
            done();
          });
      });

      it('it should not get users if query param is status but value is wrong', (done) => {
        chai.request(app)
          .get(`${usersUrl}/?status=apa`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.validUserStatus);
            done();
          });
      });
    });
  });

  describe('POST VERIFY A USER', () => {
    it('it should return authentication error if user is not logged in', (done) => {
      const email = 'badmanga@yahoo.com'; // unverified user
      chai.request(app)
        .patch(`${usersUrl}/${email}/verify`)
        .end((error, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal(errorStrings.notAuthenticated);
          done();
        });
    });
    describe('403 Page forbidden', () => {
      before((done) => {
        chai.request(app)
          .post(signinUrl)
          .send(testDb.users[13])
          .end((error, res) => {
            currentToken = res.body.data.token;
            done();
          });
      });
      it('it should not verify a user if subject is not admin', (done) => {
        const email = 'badmanga@yahoo.com'; // unverified user
        chai.request(app)
          .patch(`${usersUrl}/${email}/verify`)
          .set('Authorization', currentToken)
          .end((error, res) => {
            expect(res).to.have.status(403);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('error');
            expect(res.body.error).to.equal(errorStrings.notAllowed);
            done();
          });
      });
      describe('Verify a user', () => {
        before((done) => {
          chai.request(app)
            .post(signinUrl)
            .send(testDb.users[7])
            .end((error, res) => {
              currentToken = res.body.data.token;
              done();
            });
        });
        it('it should verify a user', (done) => {
          const email = 'badmanga@yahoo.com'; // unverified user
          chai.request(app)
            .patch(`${usersUrl}/${email}/verify`)
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('data');
              expect(res.body.data).to.be.a('object');
              expect(res.body.data).to.have.property('email');
              expect(res.body.data).to.have.property('firstname');
              expect(res.body.data).to.have.property('lastname');
              expect(res.body.data).to.have.property('password');
              expect(res.body.data).to.have.property('address');
              expect(res.body.data).to.have.property('status');
              done();
            });
        });

        it('it should not verify a user if already verified', (done) => {
          const email = 'badmanga@yahoo.com'; // user already verified from above test case
          chai.request(app)
            .patch(`${usersUrl}/${email}/verify`)
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(409);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal(errorStrings.alreadyVerified);
              done();
            });
        });

        it('it should not verify a user if user does not exist', (done) => {
          const email = 'johnokoro@yahoo.com'; // user does not exist
          chai.request(app)
            .patch(`${usersUrl}/${email}/verify`)
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(404);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal(errorStrings.noUser);
              done();
            });
        });

        it('it should not verify a user if email is invalid', (done) => {
          const email = 'johnokoroyahoo.com'; // invalid emal
          chai.request(app)
            .patch(`${usersUrl}/${email}/verify`)
            .set('Authorization', currentToken)
            .end((error, res) => {
              expect(res).to.have.status(400);
              expect(res.body).to.be.an('object');
              expect(res.body).to.have.property('error');
              expect(res.body.error).to.equal(errorStrings.validVerifyEmail);
              done();
            });
        });
      });
    });
  });
});
describe('Expired session', () => {
  it('it Return session expired for admin', (done) => {
    const email = 'shonubijerry@gmail.com';
    chai.request(app)
      .patch(`${usersUrl}/${email}/verify`)
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InNob251YmlqZXJyeUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJTaG9udWJpIiwibGFzdE5hbWUiOiJPbHV3YWtvcmVkZSIsInBhc3N3b3JkIjoiJDJiJDEwJGVIN1dITk9VUjVjc1Q1c0tuVVNkdXVJTEQ2bWJUamVwWkFBSzVCZXdBdXZENlZzZDRuQ2N5IiwiYWRkcmVzcyI6IjMzLCBBaG1lZCBPZ2hlcmUgU3RyZWV0LCBJZGltdSIsInN0YXR1cyI6InZlcmlmaWVkIiwiaXNBZG1pbiI6dHJ1ZX0sImlhdCI6MTU1NzQ0MzIzOCwiZXhwIjoxNTU3NTI5NjM4fQ.hOlVCFzTxL5ut1knfTwEA3lx2yuhljEsVek7X-sov-g')
      .end((error, res) => {
        expect(res).to.have.status(419);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('it Return session expired for a user', (done) => {
    chai.request(app)
      .get('/api/v1/loans')
      .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFmZDE5YzhhLTM3ZDctNDNmMi05YzVlLThiNGVjYTExMGZlNiIsImVtYWlsIjoiYWRlYWRlQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6IkFkZSIsImxhc3RuYW1lIjoiQWRlYmF5byIsImlhdCI6MTU1ODU4MjYyNCwiZXhwIjoxNTU4NTgyNjM0fQ.zt13SrUTRfa7URkgYnr6h3tMqc-1c2HnhNugBLb3biY')
      .end((error, res) => {
        expect(res).to.have.status(419);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
