/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (num) {
	var finalNum = 0;
	var remainder = 0;
	var isNegative = num < 0;
	var cleanedNum = Math.abs(num);

	while (cleanedNum) {
		remainder = cleanedNum % 10;
		cleanedNum = Math.floor(cleanedNum / 10);
		finalNum = finalNum * 10 + remainder;
	}
	return (isNegative ? -1 : 1) * finalNum;
};

console.log(reverse(123));
