import debug from 'debug';
import Model from '../model';
import seed from './seed.db';


const userSeeder = new Model('users');
const loanSeeder = new Model('loans');
const repaymentSeeder = new Model('repayments');

const seed1 = seed.users.forEach(async (user) => {
  try {
    await userSeeder.insert(
      'id, email, firstname, lastname, password, address, status, isadmin',
      '$1, $2, $3, $4, $5, $6, $7, $8',
      Object.values(user),
    );
  } catch (err) {
    debug('app/debug')(err);
  }
});

const seed2 = seed.loans.forEach(async (loan) => {
  try {
    await loanSeeder.insert(
      'id, loanuser, status, repaid, tenor, amount, paymentinstallment, balance, interest',
      '$1, $2, $3, $4, $5, $6, $7, $8, $9',
      Object.values(loan),
    );
  } catch (err) {
    debug('app/debug')(err);
  }
});

const seed3 = seed.repayments.forEach(async (repayment) => {
  try {
    await repaymentSeeder.insert(
      'id, loanid, amount',
      '$1, $2, $3',
      Object.values(repayment),
    );
  } catch (err) {
    debug('app/debug')(err);
  }
});

const tasks = [
  seed1,
  seed2,
  seed3,
];

export default tasks;
