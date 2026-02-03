/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    // We can buy and sell as many times as we want
    // So we can buy at every dip and sell at every peak
    // We can iterate through the array and keep track of the maximum profit found so far
    // If current price is greater than previous price, add the difference to the maximum profit
    let maxProfit = 0;

    // Greedy approach: Add every profitable opportunity
    // If prices[i] > prices[i-1], we buy at i-1 and sell at i.
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            maxProfit += prices[i] - prices[i - 1];
        }
    }

    return maxProfit;
};