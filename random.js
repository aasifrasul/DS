function toArray(args) {
	return Array.prototype.slice.call(args);
}

function add(n) {
	let sum = n;
	const f = function f(m) {
		sum += m;
		return f;
	};
	f.toString = function() {
		return sum;
	};
	return f;
}

function mul(n) {
	let res = n;
	const f = function f(m) {
		res *= m;
		return f;
	};
	f.toString = function() {
		return res;
	};
	return f;
}

function isPrime(n) {
	if (n === 1 || n === 2) {
		return true;
	}
	if (n % 2 === 0) {
		return false;
	}
	let divisor = 3;

	while (divisor < n / 2) {
		if (n % divisor === 0) {
			return false;
		}
		divisor += 2;
	}
	return true;
}

function primeFactors(n) {
	let factors = {}, divisor = 3;
	if (n === 1 || n === 2) {
		return true;
	}
	if (n % 2 === 0) {
		factors[2] = 2;
	}
	while (n > 2) {
		if (n % divisor == 0) {
			factors[divisor] = divisor;
			n = n / divisor;
		} else {
			divisor += 2;
		}
	}
	return Object.keys(factors);
}

function dedupe(arr) {
	const cleaned = {};
	return arr.filter(n => !cleaned[n] && (cleaned[n] = true));
}

const greatestCommonDivisor = (a, b) => (b == 0 ? a : greatestCommonDivisor(b, a % b));

function mergeSortedArray(a, b) {
	let merged = [], aElm = a[0], bElm = b[0], i = 1, j = 1;

	if (a.length == 0) return b;
	if (b.length == 0) return a;
	/* 
  if aElm or bElm exists we will insert to merged array
  (will go inside while loop)
   to insert: aElm exists and bElm doesn't exists
             or both exists and aElm < bElm
    this is the critical part of the example            
  */
	while (aElm || bElm) {
		if ((aElm && !bElm) || aElm < bElm) {
			merged.push(aElm);
			aElm = a[i++];
		} else {
			merged.push(bElm);
			bElm = b[j++];
		}
	}
	return merged;
}

const reverse = str => (str === '' ? '' : reverse(str.substr(1)) + str.charAt(0));

function reverseWords(str) {
	let rev = [], wordLen = 0;
	for (let i = str.length - 1; i >= 0; i--) {
		if (str[i] == ' ' || i == 0) {
			rev.push(str.substr(i, wordLen + 1));
			wordLen = 0;
		} else wordLen++;
	}
	return rev.join(' ');
}

function firstNonRepeatChar(str) {
	let len = str.length, char, charCount = {};
	for (let i = 0; i < len; i++) {
		char = str[i];
		if (charCount[char]) {
			charCount[char]++;
		} else charCount[char] = 1;
	}
	for (const j in charCount) {
		if (charCount[j] == 1) return j;
	}
}

function removeDuplicateChar(str) {
	let len = str.length, char, charCount = {}, newStr = '';
	for (let i = 0; i < len; i++) {
		char = str[i];
		if (charCount[char]) {
			charCount[char]++;
		} else charCount[char] = 1;
	}
	return false;
}

// Gives the diff between Biggest and Smallest element
const getMaxDifference = arr => Math.max.apply(null, arr) - Math.min.apply(null, arr);

function maxDifference(arr) {
	let min = arr[0], max = arr[0], len = arr.length, num, i;

	for (i = 0; i < len; i++) {
		num = arr[i];
		min = min > num ? num : min;
		max = max < num ? num : max;
	}

	return max - min;
}

function topSum(arr) {
	let biggest = arr[0], second = arr[1], len = arr.length, i = 2;

	if (len < 2) return null;

	if (biggest < second) {
		biggest = arr[1];
		second = arr[0];
	}

	for (; i < len; i++) {
		if (arr[i] > biggest) {
			second = biggest;
			biggest = arr[i];
		} else if (arr[i] > second) {
			second = arr[i];
		}
	}
	return biggest + second;
}

function countZeroes(n) {
	let count = 0;
	while (n > 0) {
		count += Math.floor(n / 10);
		n = n / 10;
	}
	return count;
}

function findSubString(str, subStr) {
	let idx = 0, i = 0, j = 0, len = str.length, subLen = subStr.length;

	for (; i < len; i++) {
		if (str[i] == subStr[j]) j++;
		else j = 0;

		//check starting point or a match
		if (j == 0) idx = i;
		else if (j == subLen) return idx;
	}

	return -1;
}

function permutations(str) {
	let arr = str.split(''), len = arr.length, perms = [], rest, picked, restPerms, next;

	if (len == 0) return [str];

	for (let i = 0; i < len; i++) {
		rest = Object.create(arr);
		picked = rest.splice(i, 1);

		restPerms = permutations(rest.join(''));

		for (let j = 0, jLen = restPerms.length; j < jLen; j++) {
			next = picked.concat(restPerms[j]);
			perms.push(next.join(''));
		}
	}
	return perms;
}

Object.compare = (obj1, obj2) => {
	let p;
	for (p in obj1) {
		if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

		switch (typeof obj1[p]) {
			case 'object':
				if (!Object.compare(obj1[p], obj2[p])) return false;
				break;
			case 'function':
				if (
					typeof obj2[p] == 'undefined' ||
					(p != 'compare' && obj1[p].toString() != obj2[p].toString())
				)
					return false;
				break;
			default:
				if (obj1[p] != obj2[p]) return false;
		}
	}

	for (p in obj2) {
		if (typeof obj1[p] == 'undefined') return false;
	}
	return true;
};

const isAnagaram = (str1, str2) => {
	const hash = str =>
		Array.prototype.slice.call(str).reduce((hash, item) => {
			hash[item] = item;
			return hash;
		}, {});
	const hash1 = hash(str1);
	const hash2 = hash(str2);
	for (key in hash1) {
		if (!hash2[key]) {
			return false;
		}
	}
	for (key in hash2) {
		if (!hash1[key]) {
			return false;
		}
	}
	return true;
};

function binarySearch(items, value) {
	let startIndex = 0, stopIndex = items.length - 1, middle = Math.floor((stopIndex + startIndex) / 2);

	while (items[middle] != value && startIndex < stopIndex) {
		//adjust search area
		if (value < items[middle]) {
			stopIndex = middle - 1;
		} else if (value > items[middle]) {
			startIndex = middle + 1;
		}

		//recalculate middle
		middle = Math.floor((stopIndex + startIndex) / 2);
	}

	//make sure it's the right value
	return items[middle] != value ? -1 : middle;
}

// Compare 2 Objects
// Irrespective of order of the keys
function isEqual(a, b) {
	const aProps = Object.getOwnPropertyNames(a), bProps = Object.getOwnPropertyNames(b);

	if (aProps.length != bProps.length) {
		return false;
	}

	for (let i = 0; i < aProps.length; i++) {
		const propName = aProps[i];

		if (a[propName] !== b[propName]) {
			return false;
		}
	}
	return true;
}

var fib = function(n) {
	return n === 0 || n === 1 ? n : fib(n - 1) + fib(n - 2);
};

// memmoized Versiom
var fib = (function(n) {
	const hash = {};
	function f(n) {
		if (n in hash) return hash[n];
		if (n === 0 || n === 1) {
			value = n;
		} else {
			value = fib(n - 1) + fib(n - 2);
		}
		hash[n] = value;
		return value;
	}
	return f;
})();

// Generic function to memoize another function
const memoize = function(func) {
	const memo = {};
	const slice = Array.prototype.slice;

	return function() {
		const args = slice.call(arguments);
		return args in memo ? memo[args] : (memo[args] = func.apply(this, args));
	};
};

// Shim for bind
Function.prototype.bind =
	Function.prototype.bind ||
	function(context) {
		const self = this;
		return function() {
			return self.apply(context, arguments);
		};
	};

// Shim For forEach
Array.prototype.forEach =
	Array.prototype.forEach ||
	function(callback, thisArg) {
		if (!Array.isArray(this) || typeof callback != 'function') return;

		for (i in this) {
			callback.call(thisArg || this, this[i], i, this);
		}
	};

// Move Left Animation
function moveLeft(elem, distance) {
	let left = 0;

	function frame() {
		left++;
		elem.style.left = left + 'px';

		if (left == distance) clearInterval(timeId);
	}

	var timeId = setInterval(frame, 10);
}

Function.prototype.curry = function() {
	if (arguments.length < 1) {
		return this;
	}
	const self = this;
	const args = toArray(arguments);
	return function() {
		return self.apply(this, args.concat(toArray(arguments)));
	};
};
