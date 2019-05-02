/**
 * @fileOverview - This module holds test data
 * @exports - object
 */

const testUsers = [
     {
      // sign up test data
        email : 'shonubijerry@gmail.cam', // valid registration details
        firstName : 'Shonubi',
        lastName : 'Oluwakorede',
        password : 'olujac',
        address : '33, Ahmed Oghere Street, Idimu'
     },
     {
        email : 'adenekan@gmail.info',
        firstName : '',  // no name
        lastName : '#Quad%ri*', // invalid name
        password : 'adenekan123',
        address : '6, Felix Street, Ikotun'
     },
     {
        email : 'adenekagmail.info', // invalid email
        firstName : 'Baba',
        lastName : 'Quadri',
        password : 'adenekan123',
        address : '6, Felix Street, Ikotun'
     },
     {
        email : 'shonubijerry@gmail.com',  // email already exist
        firstName : 'Baba',
        lastName : 'Quadri',
        password : 'adenekan123',
        address : '6, Felix Street, Ikotun'
     },
     {
        email : 'shonubijerry@ymail.com',
        firstName : 'Baba',
        lastName : 'Quadri',
        password : 'adenee',
        address : '6'  // invalid address
     },
     {
        email : 'shonubi@ymail.com',
        firstName : 'Baba',
        lastName : 'Quadri',
        password : 'adann',  // password length short
        address : '6, Felix Street, Ikotun' 
     },
     {
        email : 'shonubi@ymail.com',
        firstName : 'Baba',
        lastName : 'Quadri',
        password : '',  // empty password
        address : '6, Felix Street, Ikotun'
     },

     // sign in test data
     {
      email : 'shonubijerry@gmail.com',  // valid login details
      password : 'olujac'
     },
     {
      email : 'shonubijerrygmail.com',  // invalid login email
      password : 'olujac'
     },
     {
      email : 'shonubijerrygmail.com',
      password : ''  // empty login password
     },
     {
      email : 'korede.hot@yahoo.com', // user does not exist
      password : 'olujac'
     },
     {
      email : 'shonubijerry@gmail.com',
      password : 'olujac1'  // incorrect login password
     }
];


export default { testUsers };