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
     * find specific object by matching more than one property in array of objects.
     * The filter/key parameter must be ordered such that each parameter is followed by its
     * respective search citerion
     * @param {Object} data array of objects
     * @param {Object} filters search criterea ( spread array of properties and expected values)
     * @returns {array}  array of matched objects
     */

  static findDoubleKeysInArray(data, key1, filter1, key2, filter2) {
    const arr = [];
    data.forEach((item) => {
      // if (Utils.addQuery(item, filters, filters.length - 1) === true) {
      if (item[key1] === filter1 && item[key2] === filter2) {
        arr.push(item);
      }
    });
    if (Object.keys(arr).length > 0) {
      return arr;
    }
    return { error: false };
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
     * check the lenght of an array of objects
     * @param {Object} data array of objects
     * @returns {Number}  return length of array
     */

  static checkLength(data) {
    return data.length;
  }

  /**
     * find the sum of specific property of an object that is inside an array of objects
     * @param {Object} key object property to find it's sum
     * @param {Object} data array of objects to search
     * @returns {Float}  sum of selected property
     */

  static sumProperty(key, data) {
    const sum = data.reduce((total, item) => Number(total) + Number(item[key]), 0);
    return sum;
  }

  /**
   * Find an object in array with its and return it along with it's index position
   * @param {object} obj array of objects
   * @param {array} key property to search
   * @param {array} value value to match
   * @returns {boolean} return object with its index in array or false object not found
   */

  static updateItems(obj, key, value) {
    let toUpdate = false;
    obj.map((item, index) => {
      if (item[key] === value) {
        toUpdate = { item, index };
      }
      return toUpdate;
    });
    return toUpdate;
  }

  /**
     * Check if an API requst has query
     * @param {object} req
     * @returns {object} return true if the request has query or false otherwise
     */

  static hasQuery(req) {
    if (Object.keys(req.query).length > 0) {
      return true;
    }
    return false;
  }
}

export default Utils;
