/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    const n = nums.length;
    const answer = new Array(n);

    // answer[i] will contain the product of all elements to the left of i
    answer[0] = 1;
    for (let i = 1; i < n; i++) {
        answer[i] = answer[i - 1] * nums[i - 1];
    }

    // variable to store product of all elements to the right of i
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        // limit the product to 32-bit integer if needed, but JS uses doubles safely for safe integer range. 
        // The problem description says it fits in 32-bit integer, so we don't need BigInt.
        answer[i] = answer[i] * rightProduct;
        rightProduct = rightProduct * nums[i];
    }

    return answer;
};