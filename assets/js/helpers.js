
/**
 * This function is 'tuned' to extract a specified value from a child 
 * span inside an HTML element. It extracts each value from each span 
 * and outputs an array containing all the values.
 * 
 * @param {object} childrenObj The object that contains the children.
 * @param {string} entry The entry that should be listed in the 
 * outputed array eg. innerText.
 * @returns {Array} The array containing the values extracted from 
 * the children's entries.
 */
export function getChildrenValuesFromSpan (childrenObj, entry) {
    let result = [];
    // Target span elements and ignore other elements 
    let spans = childrenObj.querySelectorAll('span');
    // Loop all span elements and build the array
    for (let i of spans) {
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

/**
 * Sets the inner text of an HTML element
 * 
 * @param {object} element The HTML object
 * @param {string} text The text that should be inserted into the HTML object
 */
export function setInnerText (element, text) {
    if (element){
        element["innerText"] = text;
    }
}
