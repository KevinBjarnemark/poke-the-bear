
/**
 * This function is tuned to extract a specific value from a child 
 * inside an HTML element. It extracts each value from each child 
 * and outputs an array containing all the children values
 * 
 * @param {object} childrenObj The object that contains the children.
 * @param {string} entry The entry that should be listed in the 
 * outputed array. 
 * @returns {Array} The array containing the values extracted from 
 * the children's entries.
 */
export function getChildrenValuesFromElement (childrenObj, entry) {
    let result = [];
    for (let i of childrenObj["children"]) {
        result.push(i[entry]);
    }
    return result;
}

/**
 * Waits for a specified number of milliseconds.
 * This function can be used to introduce a delay in asynchronous operations.
 *
 * @param {number} ms The number of milliseconds to wait before resolving the promise.
 * @returns {Promise<boolean>} A promise that resolves to true after the specified delay.
 */
export const waitMs = async (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, ms);
    });
};
