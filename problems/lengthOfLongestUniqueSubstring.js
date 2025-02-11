// Generic function to memoize another function
var memoize = function (func) {
	const hash = new Map();
	const slice = Array.prototype.slice;

	return function () {
		const args = slice.call(arguments);
		let res = hash.get(args);
		if (!res) {
			res = func.apply(this, args);
			hash.set(args, res);
		}

		return res;
	};
};

var isStringUnique = function (str) {
	var len = str.length;
	var hash = Object.create(null);
	for (var i = 0; i < len; i++) {
		if (hash[str[i]]) {
			return false;
		}
		hash[str[i]] = true;
	}
	return true;
};

function longestSubString(str) {
	let i = 0,
		currentStr = '';
	start = 0;

	while (i < str.length) {
		if (str[i] !== str[start]) {
			currentStr = str.slice(start, i);
			start = i;
		}
		i++;
	}

	if (str.length > start && str.length - start > currentStr.length) {
		currentStr = str.slice(start, str.length);
	}

	return currentStr;
}

longestSubString('abbcccdddd');
