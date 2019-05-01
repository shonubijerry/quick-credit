/* eslint-disable no-undef */
import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testUsers from './testDb'
import errorStrings from '../helpers/errorStrings'

chai.use(chaiHttp);
chai.should();

const signupUrl = '/api/v1/auth/signup';
const signinUrl = '/api/v1/auth/signin';

describe('User Controller', () => {
  describe('POST /api/v1/auth/signup', () => {
    it(`it should register a user with POST ${signupUrl}`, (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(testUsers[0])
        .end((error, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('token');
            res.body.data.should.have.property('id');
            res.body.data.should.have.property('firstName');
            res.body.data.should.have.property('lastName');
            res.body.data.should.have.property('email');
          done();
        });
    });

    it('it should not register a user with empty firstname or lastname', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testUsers[1])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.have.property('nameRequired');
              res.body.error.nameRequired.should.equal(errorStrings.nameRequired);
            done();
        });
    });

    it('it should not register a user with invalid firstname or lastname', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testUsers[1])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.have.property('validName');
              res.body.error.validName.should.equal(errorStrings.validName);
            done();
        });
    });

    it('it should not register a user with invalid email', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testUsers[2])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.have.property('validEmail');
              res.body.error.validEmail.should.equal(errorStrings.validEmail);
            done();
        });
    });

    it('it should not register a user with same email twice', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testUsers[3])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.equal(errorStrings.emailExists);
            done();
        });
    });

    it('it should not register a user with invalid address', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testUsers[4])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.have.property('validAddress');
              res.body.error.validAddress.should.equal(errorStrings.validAddress);
            done();
        });
    });

    it('it should not register a user with password less than 6 characters', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testUsers[4])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.have.property('passwordLength');
              res.body.error.passwordLength.should.equal(errorStrings.passwordLength);
            done();
        });
    });

    it('it should not register a user with empty password field', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testUsers[5])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.have.property('passwordEmpty');
              res.body.error.passwordEmpty.should.equal(errorStrings.passwordEmpty);
            done();
        });
    });
  });


  describe('POST /api/v1/auth/signin', () => {
    it(`it should login a user with valid email and password`, (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testUsers[6])
        .end((error, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('token');
            res.body.data.should.have.property('id');
            res.body.data.should.have.property('firstName');
            res.body.data.should.have.property('lastName');
            res.body.data.should.have.property('email');
          done();
        });
    });

    it('it should not login a user with invalid email', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testUsers[7])
        .end((error, res) => {
            res.should.have.status(406);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.have.property('validEmail');
            res.body.error.validEmail.should.equal(errorStrings.validEmail);
          done();
      });
    });

    it('it should not login a user with empty password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testUsers[8])
        .end((error, res) => {
            res.should.have.status(406);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.have.property('passwordEmpty');
            res.body.error.passwordEmpty.should.equal(errorStrings.passwordEmpty);
          done();
      });
    });

    it('it should not login a user who doesn\'t exist', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testUsers[9])
        .end((error, res) => {
            res.should.have.status(406);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal(errorStrings.emailNotExist);
          done();
      });
    });

    it('it should not login a user with wrong login email or password', (done) => {
      chai.request(app)
        .post(signinUrl)
        .send(testUsers[10])
        .end((error, res) => {
            res.should.have.status(406);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal(errorStrings.loginFailure);
          done();
      });
    });

  });



});