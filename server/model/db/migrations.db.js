import pool from '../../config/connection.db';

pool.query(`DROP TABLE IF EXISTS users CASCADE;
        CREATE TABLE users(
            id UUID NOT NULL UNIQUE PRIMARY KEY,
            email VARCHAR(128) UNIQUE NOT NULL,
            firstname VARCHAR(128),
            lastname VARCHAR(128),
            password VARCHAR NOT NULL,
            address VARCHAR(200),
            status VARCHAR(10) NOT NULL DEFAULT 'unverified',
            isadmin BOOLEAN NOT NULL DEFAULT false
        );
        DROP TABLE IF EXISTS loans CASCADE;
        CREATE TABLE loans(
            id UUID NOT NULL UNIQUE,
            loanuser VARCHAR(128) NOT NULL,
            createdon TIMESTAMP NOT NULL DEFAULT NOW(),
            status VARCHAR(10) DEFAULT 'pending',
            repaid BOOLEAN NOT NULL DEFAULT false,
            tenor SMALLINT NOT NULL,
            amount NUMERIC(10, 2) NOT NULL,
            paymentinstallment NUMERIC(10, 2) NOT NULL,
            balance NUMERIC(10, 2) NOT NULL,
            interest NUMERIC(10, 2) NOT NULL
        );
        DROP TABLE IF EXISTS repayments CASCADE;
        CREATE TABLE repayments(
            id UUID NOT NULL UNIQUE,
            loanid UUID NOT NULL,
            createdon TIMESTAMP NOT NULL DEFAULT NOW(),
            amount NUMERIC(10, 2) DEFAULT 0.00
        );
    `).then(() => {
  pool.end();
});
