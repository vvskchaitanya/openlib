/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
    // Iterate through the nums array
    for (var i = 0; i < nums.length; i++) {
        // Check if element is equal to val
        if (nums[i] == val) {
            // Remove element
            nums.splice(i, 1);
            // Decrement i to check the next element because array length has changed
            i--;
        }
    }
    return nums.length;
};