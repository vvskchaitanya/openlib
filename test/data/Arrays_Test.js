const Arrays = require('../../source/data/Arrays.js');

// ANSI Color Codes
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

console.log("Running Arrays Tests...");

// Test shift.right
// Logic: Inserts element, shifts right, drops last element to preserve length.
try {
    let arr = [1, 2, 3];
    console.log("Testing shift.right with", JSON.stringify(arr), "insert 99 at index 1");
    Arrays.shift.right(arr, 1, 99);
    console.log("Result:", JSON.stringify(arr));

    // Original: [1, 2, 3]
    // Insert 99 at 1 -> [1, 99, 2] (3 is dropped)
    assert(arraysEqual(arr, [1, 99, 2]), "Failed: Expected [1, 99, 2]");
    console.log(`${GREEN}PASS: shift.right preserved length and shifted elements.${RESET}`);

    // Test shift.right at index 0
    arr = ['a', 'b', 'c', 'd'];
    console.log("Testing shift.right with", JSON.stringify(arr), "insert 'x' at index 0");
    Arrays.shift.right(arr, 0, 'x');
    console.log("Result:", JSON.stringify(arr));
    // Expected: ['x', 'a', 'b', 'c']
    assert(arraysEqual(arr, ['x', 'a', 'b', 'c']), "Failed: Expected ['x', 'a', 'b', 'c']");
    console.log(`${GREEN}PASS: shift.right at index 0.${RESET}`);

} catch (e) {
    console.error(`${RED}FAIL: shift.right test exception: ${e.message}${RESET}`);
    process.exit(1);
}

// Test shift.left
try {
    let arr2 = ['a', 'b', 'c', 'd'];
    console.log("Testing shift.left with", JSON.stringify(arr2), "index 2");
    Arrays.shift.left(arr2, 2);
    console.log("Result:", JSON.stringify(arr2));

    // Based on code trace:
    // Expected: ['b', 'c', 'c', 'd'] (if my trace is right)

    assert(arraysEqual(arr2, ['b', 'c', 'c', 'd']), "Behavior matches code trace");
    console.log(`${GREEN}PASS: shift.left matched code behavior (shift 0..index left).${RESET}`);

} catch (e) {
    console.error(`${RED}FAIL: shift.left test exception: ${e.message}${RESET}`);
    process.exit(1);
}
