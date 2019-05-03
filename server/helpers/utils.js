/**
*   @fileOverview - This class helps generate repeated codes
*   @class Utils
*   @exports Utils
**/

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
     * find specific objects in array of objects
     * @param {Object} filter search citerea
     * @param {Object} data array of objects
     * @param {Object} key object key to match
     * @returns {array}  array of matched objects
     */

    static findInArray(filter, data, key) {
        const arr = [];
        
        for ( let item of data ){
            if (item[key] === filter ){
                arr.push(item);
            }
        }
        return arr;
    }

    /**
     * return single object in array of objects
     * @param {Object} filter search citerea
     * @param {Object} data array of objects
     * @param {Object} key object key to match
     * @returns {array}  array of matched objects
     */

    static getSingleObject(filter, data, key) {
                
        return data.find(item => item[key] === filter );
    }

}

export default Utils;