/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
	if (typeof x !== 'number') {
		return '';
	}
	let str = Math.abs(x) + '';
	const origLen = str.length;
	const len = origLen >> 1;
	let temp;

	for (i = 0; i < len; i++) {
		console.log('str[i] =>', str[i]);
		console.log('str[origLen - i - 1] =>', str[origLen - i - 1]);
		str[i] = str[origLen - i - 1] + str[i];
		console.log('str[i] =>', str[i]);
		str[origLen - i - 1] = str[i] - str[origLen - i - 1];
		str[i] = str[i] - str[origLen - i - 1];
		console.log('str => ', str);
	}

	return (x < 0 ? -1 : 1) * (str * 1);
};

console.log(reverse(123));
