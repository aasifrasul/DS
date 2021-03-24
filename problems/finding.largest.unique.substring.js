
// Generic function to memoize another function
var memoize = function (func) {
	const memo = Object.create(null);;
	const slice = Array.prototype.slice;

	return function () {
		const args = slice.call(arguments);
		return args in memo ? memo[args] : (memo[args] = func.apply(this, args));
	};
};

var longestSubString = function(str) {
	var len = str.length;
	var maxLength = 0;
	for (var i = 0; i < len; i++) {
		for (var j = i + 1; j <= len; j++) {
			var subStr = str.slice(i, j);
			console.log('subStr =>', subStr);
			if (isStringUnique(subStr)) {
				maxLength = Math.max(maxLength, subStr.length);
				console.log('maxLength changed =>', maxLength);
			}
			
		}
	}

	return maxLength;
}

var isStringUnique = function(str) {
	var len = str.length;
	var hash = Object.create(null);
	for (var i = 0; i < len; i++) {
		if (hash[str[i]]) {
			return false;
		}
		hash[str[i]] = true;
	}
	return true;
}

lengthOfLongestSubstring = memoize(longestSubString);


longestSubString("yfntvbzviexurkstwsmjzfkjqniwsmlqralmbm")