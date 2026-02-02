/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    // Assuming nums1 is the final merged array because it has m+n size
    // Init variable to track second array index
    let j = 0;
    // Iterate through nums1
    for (var i = 0; i < m + n; i++) {
        // If second array element is smaller than or equal first array element
        // Then do right shift of first array by inserting element at current index
        if (nums2[j] <= nums1[i]) {
            shift(nums1, i, nums2[j]);
            // As element has been inserted increment counter
            j++;
        }
    }
    // Check if all elements of second array have been inserted using counter
    while (j < n) {
        // If not then insert remaining elements of second array into first array
        // Basically all these elements are greater than first array elements and should replace our zero-heroes 
        nums1[m + j] = nums2[j];
        j++;
    }
    // Return merged array
    return nums1;
};

// Arrays Right Shift - Refer data/Arrays.js
var shift = function (arr, ind, ins) {
    let k = ins;
    for (var i = ind; i < arr.length; i++) {
        let temp = arr[i];
        arr[i] = k;
        k = temp;
    }
}