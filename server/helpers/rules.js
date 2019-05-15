/* eslint-disable no-useless-escape */
/**
 *   @fileOverview - regular expressions for available fields
 *   @exports rules
 * */

const rules = {
  validName: /^[a-zA-Z]+$/,
  validAddress: /[#.\w',-\\/.\s]/ig,
  empty: /^(\S+)/,
  addressLength: /^[a-zA-Z][a-zA-Z0-9\s?.,:]{10,150}$/,
  validEmail: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
  nameLength: /^[a-zA-Z]{2,30}$/,
  passwordLength: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  validUrl: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
  validTenor: /^([1-9]|[0-1][0-2])$/,
  validAmount: /^[0-9]+(\.[0-9]{1,2})?$/,
  validNumber: /^[0-9]*$/,
  validApproveLoan: /(approved|rejected)/,
};

export default rules;

// url regex: https://www.regextester.com/93652
// email regex: https://www.regextester.com/1922
