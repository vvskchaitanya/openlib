/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    // 'reachable' tracks the furthest index we can currently reach.
    // Think of it as our maximum driving range.
    let reachable = 0;

    for (let i = 0; i < nums.length; i++) {
        // If the current position 'i' is greater than our max range ('reachable'),
        // it means we're stuck and can't jump to this spot.
        if (i > reachable) return false;

        // At each step, calculate the furthest we can go from here (i + nums[i]).
        // Update 'reachable' if this jump extends our maximum range.
        reachable = Math.max(reachable, i + nums[i]);

        // If our range covers the last index, we know we can finish the game.
        if (reachable >= nums.length - 1) return true;
    }

    // Only if array is empty
    return false;
};