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

var longestSubString = function (str) {
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
};

var lengthOfLongestSubstring = (function () {
	const findLongestUniqueString = (s, maxLength = 0) => {
		if (typeof s !== 'string' || s.length === 0) {
			return 0;
		}

		const len = s.length;

		if (len === 1 || maxLength > len) return len;

		let i = 0;
		let start = 0;
		let end = 0;
		let substring = '';
		let ilen = 0;
		let tempArr = [];
		let curChar = '';
		let countRepeatChars = 0;
		let hash = Object.create(null);
		const dupHash = Object.create(null);

		for (i = 0; i < len; i++) {
			curChar = s[i];
			if (hash[curChar]) {
				countRepeatChars++;
				hash[curChar].push(i);
				dupHash[curChar] = hash[curChar];
			} else {
				hash[curChar] = [i];
			}
		}
		hash = Object.create(null);
		if (!countRepeatChars) return len;
		if (countRepeatChars === len - 1) return Math.max(maxLength, 1);

		for (key in dupHash) {
			tempArr = dupHash[key];
			ilen = tempArr.length;
			for (i = 0; i < ilen; i++) {
				start = i ? tempArr[i - 1] + 1 : 0;
				end = i === ilen - 1 ? len - 1 : tempArr[i + 1] - 1;
				substring = s.substring(start, end + 1);
				if (maxLength >= substring.length) continue;
				maxLength = Math.max(maxLength, lengthOfLongestSubstring(substring, maxLength));
			}
		}

		return maxLength;
	};

	return memoize(findLongestUniqueString);
})();

var lengthOfLongestSubstring = function (s) {
	if (typeof s !== 'string' || s.length === 0) {
		return 0;
	}

	var maxLength = 0;
	var curMaxLength = 0;
	var hash = Object.create(null);

	for (var i = 0; i < s.length; i++) {
		for (var j = i; j < s.length; j++) {
			if (hash[s[j]]) {
				hash = Object.create(null);
				if (curMaxLength > maxLength) {
					maxLength = curMaxLength;
				}
				curMaxLength = 0;
				break;
			} else {
				curMaxLength++;
			}
			hash[s[j]] = true;
		}
	}

	return Math.max(maxLength, curMaxLength);
};

var lengthOfLongestSubstring = (s) => {
	const hash = new Map();
	let maxLength = (start = 0),
		sums,
		char,
		diff;
	for (var i = 0; i < s.length; i++) {
		char = s[i];
		if (hash.has(char)) {
			console.log('char', char);
			console.log('hash', hash);
			sums = hash.get(char) + 1;
			if (sums > start) {
				start = sums;
			}
			console.log('start', start);
		}
		diff = i - start + 1;
		maxLength = Math.max(diff, maxLength);
		hash.set(char, i);
	}

	return maxLength;
};

lengthOfLongestSubstring('aa');

lengthOfLongestSubstring = memoize(longestSubString);
