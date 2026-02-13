/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
    var possible = [];
    var result = -1;
    // get possible indexes
    for (var i = 0; i < gas.length; i++) {
        if (gas[i] >= cost[i]) possible.push(i);
    }

    for (var i = 0; i < possible.length; i++) {
        var ind = possible[i];
        let g = gas[ind];
        let c = 0;
        do {
            if (c == gas.length) { result = possible[i]; break; }
            g = g - cost[ind];
            if (ind == gas.length - 1) ind = 0;
            else ind++;
            c++;
            g += gas[ind];
        } while (g >= cost[ind]);
        if (result > -1) break;
    }
    return result;
};