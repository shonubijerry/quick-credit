/**
*   @fileOverview - This class helps generate repeated codes
*   @class Utils
*   @exports Utils
* */

class Utils {
  /**
     * get present date and time
     * @returns {string}
     */

  static getNow() {
    const d = new Date();
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }

  /**
     * find specific object by matching a particular property in array of objects
     * @param {Object} filter search citerea
     * @param {Object} key object property to match
     * @param {Object} data array of objects
     * @returns {array}  array of matched objects
     */

  static findInArray(filter, key, data) {
    const arr = [];

    data.forEach((item) => {
      if (item[key] === filter) {
        arr.push(item);
      }
    });
    return arr;
  }

  /**
     * find single object in array of objects
     * @param {Object} filter search citerea
     * @param {Object} key object key to match
     * @param {Object} data array of objects
     * @returns {array}  matched single object
     */

  static findSingleItem(filter, key, data) {
    return data.find(item => item[key] === filter);
  }

  /**
     * find single object in array of objects
     * @param {Object} filter search citerea
     * @param {Object} key object key to match
     * @param {Object} data array of objects
     * @returns {array}  matched single object
     */

  static checkLength(data) {
    return data.length;
  }
}

export default Utils;
