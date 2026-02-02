/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    // temp
    let temp = nums[0];
    // additional check for double presence
    let c = false;
    // iterate
    for (var i = 1; i < nums.length; i++) {
        if (temp == nums[i]) {
            if (c) {
                // remove and decrement i
                nums.splice(i, 1);
                i--;
            } else c = true;
        } else {
            temp = nums[i];
            c = false;
        }
    }
    return nums.length;
};