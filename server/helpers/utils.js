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
     * The filters parameter must be ordered such that each parameter is followed by its
     * respective search citerion
     * @param {Object} data array of objects
     * @param {Object} filters search criterea ( spread array of properties and expected values)
     * @returns {array}  array of matched objects
     */

  static findDoubleKeysInArray(data, ...filters) {
    const arr = [];
    data.forEach((item) => {
      if (Utils.addQuery(item, filters, filters.length - 1) === true) {
        arr.push(item);
      }
    });
    if (Object.keys(arr).length > 0) {
      return arr;
    }
    return { error: false };
  }

  /**
     * Recursive function to query a specific object by matching more than one properties in it.
     * @param {Object} data object to query
     * @param {Object} filters search criterea (properties and expected values to match)
     * @returns {boolean}  returns true if all conditions is met or false otherwise
     */

  static addQuery(item, key, n) {
    if (n <= 0) {
      return false;
    }
    if (n <= 1) {
      return item[key[n - 1]] === key[n];
    }
    return item[key[n - 1]] === key[n] && Utils.addQuery(item, key, n - 2);
    // return true;
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
   * Update single object in array of objects
   * @param {object} obj array of objects
   * @param {array} args properties to update
   * @returns {string} return update info
   */

  static updateItems(obj, ...filter) {
    let toUpdate = false;
    obj.map((item, index) => {
      if (item[filter[0]] === filter[1]) {
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
