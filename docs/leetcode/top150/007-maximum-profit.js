/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    // We need to find the maximum difference between two elements in the array
    // such that the larger element appears after the smaller element
    // We can iterate through the array and keep track of the minimum element seen so far
    // and the maximum profit found so far
    // To achive that we assume minimum price is Infinity and maximum profit is 0
    // Iterate through array and find minimum price and maximum profit in single loop
    // If current price is less than minimum price, update minimum price
    // If current price minus minimum price is greater than maximum profit, update maximum profit
    let minPrice = Infinity;
    let maxProfit = 0;

    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        } else if (prices[i] - minPrice > maxProfit) {
            maxProfit = prices[i] - minPrice;
        }
    }

    return maxProfit;
};