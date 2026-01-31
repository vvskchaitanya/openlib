(function (global) {
    const Arrays = {
        shift: {
            /**
             * Inserts a value at the specified index, shifting subsequent elements to the right.
             * @param {Array} array - The array to modify.
             * @param {number} index - The index at which to insert the value.
             * @param {*} insert - The value to insert.
             * @returns {Array} The modified array.
             */
            right: function (array, index, insert) {
                if (!Array.isArray(array)) {
                    console.error("Arrays.shift.right: First argument must be an array.");
                    return array;
                }
                // Initialize k with insert value
                let k = insert;
                // Iterate from index to end of array
                for (let i = index; i < array.length; i++) {
                    // Swap k with array[i]
                    let temp = array[i];
                    array[i] = k;
                    k = temp;
                }
                // Ignore last element as it is shifted out of the array
                // Because we want to preserve the length of the array
                return array;
            },

            /**
             * Removes the element at the specified index, shifting subsequent elements to the left.
             * @param {Array} array - The array to modify.
             * @param {number} index - The index of the element to remove.
             * @returns {Array} The modified array.
             */
            left: function (array, index) {
                if (!Array.isArray(array)) {
                    console.error("Arrays.shift.left: First argument must be an array.");
                    return array;
                }
                // Initialize k with the value at the specified index
                let k = array[index];
                // Iterate from index to start of array
                for (let i = index; i >= 0; i--) {
                    // Swap k with array[i]
                    let temp = array[i];
                    array[i] = k;
                    k = temp;
                }
                // Ignore first element as it is shifted out of the array
                // Because we want to preserve the length of the array
                return array;
            }
        }
    };

    // Attach to global scope (window in browser, global in Node)
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Arrays;
    } else {
        global.Arrays = Arrays;
    }

})(typeof window !== 'undefined' ? window : this);
