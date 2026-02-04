/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
    let max = citations.length;
    while (max > 0) {
        let c = 0;
        for (var i = 0; i < citations.length; i++) {
            if (citations[i] >= max) c++;
        }
        if (c >= max) break;
        else max--;
    }

    return max;
};