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
     * @param {Object} key object key to match
     * @param {Object} data array of objects
     * @returns {array}  array of matched objects
     */

    static findInArray( filter, key, data ) {
        const arr = [];
        
        for ( let item of data ){
            if (item[key] === filter ){
                arr.push(item);
            }
        }
        return arr;
    }

    /**
     * find single object in array of objects
     * @param {Object} filter search citerea
     * @param {Object} key object key to match
     * @param {Object} data array of objects
     * @returns {array}  matched single object
     */

    static findSingleItem( filter, key, data ) {

        return data.find(item => item[key] === filter);
    }

}

export default Utils;