import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../app';
import testDb from './testDb'
import errorStrings from '../helpers/errorStrings'

chai.use(chaiHttp);
chai.should();

const signupUrl = '/api/v1/auth/signup';

describe('User Controller', () => {
    it(`it should register a user with POST ${signupUrl}`, (done) => {
      chai.request(app)
        .post(signupUrl)
        .send(testDb[0])
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
          .send(testDb[1])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.have.property('nameRequired');
              res.body.error.nameRequired.should.equal(errorStrings.nameRequired);
            done();
        });
    });

    it('it should not register a user with firstname or lastname less than 2 characters', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testDb[1])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.have.property('nameLength');
              res.body.error.nameLength.should.equal(errorStrings.nameLength);
            done();
        });
    });

    it('it should not register a user with invalid firstname or lastname', (done) => {
        chai.request(app)
          .post(signupUrl)
          .send(testDb[1])
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
          .send(testDb[2])
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
          .send(testDb[3])
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
          .send(testDb[4])
          .end((error, res) => {
              res.should.have.status(406);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              res.body.error.should.have.property('validAddress');
              res.body.error.validAddress.should.equal(errorStrings.validAddress);
            done();
        });
    });
});