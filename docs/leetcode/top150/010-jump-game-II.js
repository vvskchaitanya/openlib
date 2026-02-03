/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
    let jumps = 0;
    let currentJumpEnd = 0;
    let farthest = 0;

    // Iterate up to the second to last element.
    // If we reach the last element, we don't need to jump anymore.
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);

        // If we have reached the end of the current jump,
        // we need to make another jump
        if (i === currentJumpEnd) {
            jumps++;
            currentJumpEnd = farthest;

            // Optimization: If we can already reach the end, break early
            if (currentJumpEnd >= nums.length - 1) break;
        }
    }

    return jumps;
};