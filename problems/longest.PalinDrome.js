/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
	console.log('Input String =>', s);
	var len = s.length;
	var hash = Object.create(null);
	var dupeHashArr = Object.create(null);
	var curChar;
	var largestPalindrome = '';
	var isStringPalindrome;
	var repeatedChars = 0;

	for (var i = 0; i < len; i++) {
		curChar = s[i];

		if (typeof hash[curChar] !== 'undefined') {
			repeatedChars++;
			if (typeof dupeHashArr[curChar] === 'undefined') {
				dupeHashArr[curChar] = [hash[curChar]];
			}
			dupeHashArr[curChar].push(i);
		} else {
			hash[curChar] = i;
		}
	}

	console.log('dupeHashArr =>', dupeHashArr);
	console.log('repeatedChars =>', repeatedChars);

	if (repeatedChars === 0) {
		return `${s[0]}`;
	}

	var tempArr;

	for (var key in dupeHashArr) {
		tempArr = dupeHashArr[key];
		len = tempArr.length;
		var startOfRepeat = -1;
		console.log('tempArr', tempArr);
		for (var i = 0; i < len - 1; i++) {
			if (tempArr[i + 1] - tempArr[i] === 1) {
				console.log('Repeating chars', i, i + 1);
				startOfRepeat < 0 && (startOfRepeat = i);
				continue;
			} else if (startOfRepeat >= 0) {
				curChar = s.slice(tempArr[startOfRepeat], tempArr[i] + 1);
				console.log('curChar =>', curChar);
				largestPalindrome = curChar.length > largestPalindrome.length ? curChar : largestPalindrome;
				startOfRepeat = -1;
				continue;
			}
			console.log('startOfRepeat', startOfRepeat);
			curChar = s.slice(tempArr[i], tempArr[i + 1] + 1);
			console.log('curChar =>', curChar);
			if (isPalinDrome(curChar)) {
				largestPalindrome = curChar.length > largestPalindrome.length ? curChar : largestPalindrome;
			}
		}
		console.log('largestPalindrome => ', largestPalindrome);
		console.log(tempArr);
	}

	return largestPalindrome;
};

var isPalinDrome = function (str) {
	if (typeof str !== 'string' || str.length === 0) {
		return false;
	}

	var size = str.length;
	var len = Math.floor(size / 2);
	for (var i = 0; i < len; i++) {
		if (str[i] !== str[size - i - 1]) {
			console.log(str[i], str[size - i - 1]);
			return false;
		}
	}

	return true;
};

function strShuffle(length) {
	let result = '';
	const characters = 'abcdefghijklmnopqrstuvwxyz';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
	console.log('Input Str =>', s);
	var len = s.length;
	var hash = Object.create(null);
	var longestStr = '';
	var curChar = '';
	var curStr = '';
	var startOfRepeat = -1;
	var endOfRepeat = -1;

	if (len < 3) {
		return s;
	}

	for (var i = 0; i < len; i++) {
		curChar = s[i];
		console.log('curChar =>', curChar);
		if (hash[curChar] >= 0) {
			curStr = s.slice(hash[curChar], i + 1);
			if (s[i] === s[i - 1]) {
				console.log('Repeating chars', i, i - 1);
				startOfRepeat < 0 && (startOfRepeat = hash[curChar]);
				endOfRepeat = i;
				continue;
			} else if (startOfRepeat >= 0) {
				curStr = s.slice(startOfRepeat, endOfRepeat + 1);
				console.log('Start/End of repeat =>', startOfRepeat, endOfRepeat, curStr);
				longestStr = curStr.length > longestStr.length ? curStr : longestStr;
				startOfRepeat = -1;
				endOfRepeat = -1;
				continue;
			}
			console.log('curStr =>', curStr);
			if (isPalinDrome(curStr)) {
				console.log('Ispalindrome =>', curStr);
				longestStr = curStr.length > longestStr.length ? curStr : longestStr;
			}
		} else {
			hash[curChar] = i;
		}
	}
	console.log('hash =>', hash);
	return longestStr;
};

longestPalindrome(strShuffle(10));
