/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
    // k is the number of times to rotate
    // Normalize k with nums.length as k can be greater than nums.length 
    // If k is a multiple of nums.length, then k % nums.length will be 0, and we don't need to rotate
    // So we just need reminder rotations in that case
    k = k % nums.length;
    if (k === 0) return;

    // Helper function to reverse a portion of the array
    var reverse = (arr, start, end) => {
        while (start < end) {
            let temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    };

    // Rotating array for k times to the right is equivalent to 
    // 1. Reverse the entire array
    // 2. Reverse the first k elements
    // 3. Reverse the remaining elements

    // Step 1: Reverse the entire array
    reverse(nums, 0, nums.length - 1);

    // Step 2: Reverse the first k elements
    reverse(nums, 0, k - 1);

    // Step 3: Reverse the remaining elements
    reverse(nums, k, nums.length - 1);
};