
const Anagram = function (arr) {
	if (!Array.isArray(arr) || !arr.length) {
		console.log('Invalid Array');
		return arr;
	}
	let i,
		key = '';
	const hash = {};

	for (i = 0; i < arr.length; i++) {
		key = arr[i] || '';
		key = key.split('').sort();
		if (!hash[key]) {
			hash[key] = [];
		}
		if (hash[key]) {
			hash[key].push(arr[i]);
		}
	}
	return hash;
};
