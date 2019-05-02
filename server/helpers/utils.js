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

}

export default Utils;