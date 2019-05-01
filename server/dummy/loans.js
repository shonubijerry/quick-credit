/**
 * @fileOverview - This module holds dummy data for loans
 * @exports - loans object
 */
const loans = [
    {
        id: 1,
        user: 'shonubijerry@gmail.com',
        createdOn: '01/05/2019 2:16:17 PM',
        status: 'approved',
        repaid: true,
        tenor: 5,
        amount: 40000,
        paymentInstallment: '8400.00',
        balance: '0.00',
        interest: '2000.00'
    },
    {
        id: 2,
        user: 'adeade@gmail.com',
        createdOn: '01/04/2019 2:16:17 PM',
        status: 'approved',
        repaid: false,
        tenor: 7,
        amount: 80000,
        paymentInstallment: '12000.00',
        balance: '84000.00',
        interest: '4000.00'
    },
    { 
        id: 3,
        user: 'shonubijerry@gmail.com',
        createdOn: '01/05/2019 2:17:34 PM',
        status: 'approved',
        repaid: true,
        tenor: 5,
        amount: 8960000,
        paymentInstallment: '1881600.00',
        balance: '0.00',
        interest: '448000.00'
    },
    { 
        id: 4,
        user: 'adeade@gmail.com',
        createdOn: '01/05/2019 3:40:18 PM',
        status: 'approved',
        repaid: true,
        tenor: 7,
        amount: 60000,
        paymentInstallment: '9000.00',
        balance: '0.00',
        interest: '3000.00' 
    }
 ];

export default loans;