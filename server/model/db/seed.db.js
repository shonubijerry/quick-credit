
/**
 * @fileOverview - This module holds dummy data to seed to database
 * @exports - users object
 */
const users = [
  {
    id: '661b0c4b-1d4a-4e44-8b09-66e3554c045b',
    email: 'adenekan2017@gmail.com',
    firstName: 'Adenekan',
    lastName: 'Quadri',
    password: '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki',
    address: '6, Felix Street, Ikotun',
    status: 'verified',
    isAdmin: false,
  },
  {
    id: '7f5393a0-a5ad-4194-ab8d-b837b0d9e1c5',
    email: 'badmanga@yahoo.com',
    firstName: 'Gbenga',
    lastName: 'Badmus',
    password: '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki',
    address: '4, Rhodes Crescent, Apapa',
    status: 'unverified',
    isAdmin: false,
  },
  {
    id: 'd80590d1-b811-4e43-bdcc-aaefe2dec4bd',
    email: 'chiboy155@gmail.com',
    firstName: 'Chisom',
    lastName: 'Nwosu',
    password: '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki',
    address: '12, Mukandasi Street, Ago',
    status: 'verified',
    isAdmin: false,
  },
  {
    id: '68256b2b-3649-4dd2-b847-91841a5958df',
    email: 'shehumohammed@gmail.com',
    firstName: 'Mohammed',
    lastName: 'Shehu',
    password: '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki',
    address: '17, Fidel Streen, Garki',
    status: 'verified',
    isAdmin: false,
  },
  {
    id: '44cf9d87-6b40-4111-b06f-936d9740ce79',
    email: 'mikeo007@gmail.com',
    firstName: 'Mike',
    lastName: 'Ogbuehi',
    password: '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki',
    address: '9, Ahmed Fashola Street, Yaba',
    status: 'unverified',
    isAdmin: false,
  },
  {
    id: 'afd19c8a-37d7-43f2-9c5e-8b4eca110fe6',
    email: 'adeade@gmail.com',
    firstName: 'Ade',
    lastName: 'Adebayo',
    password: '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki',
    address: '5, Adams street, Oshodi',
    status: 'verified',
    isAdmin: false,
  },
  {
    id: 'd56e5970-f169-453e-9646-939b15c3900a',
    email: 'ciromalapai@hotmail.com',
    firstName: 'Lapai',
    lastName: 'Chiroma',
    password: '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki',
    address: '17, Bank avenue, Garki',
    status: 'verified',
    isAdmin: false,
  },
  {
    id: '8468bb44-68c7-4bee-8043-c944fe2d3ff3',
    email: 'janetpeters@live.com',
    firstName: 'Janet',
    lastName: 'Peters',
    password: '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki',
    address: '17, Isaac John street, Ikeja',
    status: 'unverified',
    isAdmin: false,
  },
  {
    id: '54ef67cc-f170-41e8-9495-1d7b051e38fd',
    email: 'mamoodd@gmail.com',
    firstName: 'Mamood',
    lastName: 'Daura',
    password: '$2b$10$DAUlN//SebBEPkWppjD1AeIRy6dWJ3k8DMv.T4hBSeZh/Lycb0Yki',
    address: '17, Alhaji Abdulahi street, Kano',
    status: 'unverified',
    isAdmin: false,
  },

];


const loans = [
  {
    id: '8502d3d7-9c27-4a3e-bcd0-b1ecf914e628',
    loanuser: 'shonubijerry@gmail.com',
    status: 'approved',
    repaid: true,
    tenor: '5',
    amount: 40000.00,
    paymentInstallment: 8400.00,
    balance: 0.00,
    interest: 2000.00,
  },
  {
    id: 'ff741315-7075-4488-8627-8f8ccccbada6',
    loanuser: 'adenekan2017@gmail.com',
    status: 'approved',
    repaid: false,
    tenor: '7',
    amount: 80000,
    paymentInstallment: 12000.00,
    balance: 84000.00,
    interest: 4000.00,
  },
  {
    id: '00298627-71e4-4ede-af91-aec1862fae22',
    loanuser: 'chiboy155@gmail.com',
    status: 'pending',
    repaid: false,
    tenor: '4',
    amount: 310080.00,
    paymentInstallment: 81600.00,
    balance: 326400.00,
    interest: 16320.00,
  },
  {
    id: '6f746db2-e5e7-4824-8926-cdec24a02312',
    loanuser: 'adeade@gmail.com',
    status: 'pending',
    repaid: false,
    tenor: '7',
    amount: 60000.00,
    paymentInstallment: 9000.00,
    balance: 63000.00,
    interest: 3000.00,
  },
  {
    id: '4a860db6-aac6-47cc-954b-7912900be2eb',
    loanuser: 'adenekan2017@gmail.com',
    status: 'approved',
    repaid: false,
    tenor: '8',
    amount: 89600.00,
    paymentInstallment: 11760.00,
    balance: 11760.00,
    interest: 4480.00,
  },
];


const repayments = [
  {
    id: 'dccc8272-4b57-423c-906f-3da93e823f49',
    loanid: loans[4].id,
    amount: 11760.00,
  },
  {
    id: '118a9b78-e47d-46f0-952f-ff0ccf7856b3',
    loanid: loans[4].id,
    amount: 11760.00,
  },
  {
    id: 'e7e3ecbc-48cf-4f48-9423-364c5e6519ae',
    loanid: loans[4].id,
    amount: 11760.00,
  },
  {
    id: '51eec787-ed02-43fc-8c30-f505bbd7b1b5',
    loanid: loans[2].id,
    amount: 81600.00,
  },
  {
    id: '39928224-40fd-4791-b162-055b1faf58ef',
    loanid: loans[2].id,
    amount: 81600.00,
  },
  {
    id: '98b82343-a1a0-4e98-8c0f-c9e91d06b595',
    loanid: loans[2].id,
    amount: 31600.00,
  },
  {
    id: '03e60fc1-b373-45f3-954b-d24d78756575',
    loanid: loans[2].id,
    amount: 76600.00,
  },
  {
    id: 'c1aae401-b477-4d61-b377-5d81c1e4191b',
    loanid: loans[4].id,
    amount: 11760.00,
  },
  {
    id: 'd566ac8f-7603-4ac9-9390-93cb9c07459a',
    loanid: loans[4].id,
    amount: 11760.00,
  },
  {
    id: '62ad92df-6079-43c6-bca4-66a96e7cddcc',
    loanid: loans[4].id,
    amount: 11760.00,
  },
  {
    id: '344a8d57-57b5-408f-a4ca-903f02d024db',
    loanid: loans[4].id,
    amount: 11760.00,
  },
];

export default { users, loans, repayments };
