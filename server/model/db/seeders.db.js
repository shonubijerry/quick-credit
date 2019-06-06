import debug from 'debug';
import Model from '../model';
import seed from './seed.db';

debug('app/seeder')('Seeding database...');

const userSeeder = new Model('users');
const loanSeeder = new Model('loans');
const repaymentSeeder = new Model('repayments');

const seed1 = seed.users.forEach(async (user) => {
  await userSeeder.insert(
    'id, email, firstname, lastname, password, address, status, isadmin',
    '$1, $2, $3, $4, $5, $6, $7, $8',
    Object.values(user),
  );
});

const seed2 = seed.loans.forEach(async (loan) => {
  await loanSeeder.insert(
    'id, loanuser, status, repaid, tenor, amount, paymentinstallment, balance, interest',
    '$1, $2, $3, $4, $5, $6, $7, $8, $9',
    Object.values(loan),
  );
});

const seed3 = seed.repayments.forEach(async (repayment) => {
  await repaymentSeeder.insert(
    'id, loanid, amount',
    '$1, $2, $3',
    Object.values(repayment),
  );
});

const tasks = [
  seed1,
  seed2,
  seed3,
];

export default tasks;
