function add(n) {
  var sum = n;
  var f = function f(m) {
    sum += m;
    return f;
  }
  f.toString = function() {
    return sum;
  }
  return f;
}

function mul(n) {
  var res = n;
  var f = function f(m) {
    res *= m;
    return f;
  }
  f.toString = function() {
    return res;
  }
  return f;
}

function isPrime(n) {
  if (n === 1 || n === 2) {
    return true;
  }
  if (n % 2 === 0) {
    return false;
  }
  var divisor = 3;

  while (divisor < n / 2) {
    if (n % divisor === 0) {
      return false;
    }
    divisor += 2;
  }
  return true;
}

function primeFactors(n) {
  var factors = {},
    divisor = 3;
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
  var cleaned = {};
  return arr.filter(n => !cleaned[n] && (cleaned[n] = true));
}

var greatestCommonDivisor = (a, b) => (b == 0) ? a : greatestCommonDivisor(b, a % b);

function mergeSortedArray(a, b) {
  var merged = [],
    aElm = a[0],
    bElm = b[0],
    i = 1,
    j = 1;

  if (a.length == 0)
    return b;
  if (b.length == 0)
    return a;
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

var reverse = str => (str === '') ? '' : reverse(str.substr(1)) + str.charAt(0);

function reverseWords(str) {
  var rev = [],
    wordLen = 0;
  for (var i = str.length - 1; i >= 0; i--) {
    if (str[i] == ' ' || i == 0) {
      rev.push(str.substr(i, wordLen + 1));
      wordLen = 0;
    } else
      wordLen++;
  }
  return rev.join(' ');
}

function firstNonRepeatChar(str) {
  var len = str.length,
    char,
    charCount = {};
  for (var i = 0; i < len; i++) {
    char = str[i];
    if (charCount[char]) {
      charCount[char]++;
    } else
      charCount[char] = 1;
  }
  for (var j in charCount) {
    if (charCount[j] == 1)
      return j;
  }
}

function removeDuplicateChar(str) {
  var len = str.length,
    char,
    charCount = {},
    newStr = '';
  for (var i = 0; i < len; i++) {
    char = str[i];
    if (charCount[char]) {
      charCount[char]++;
    } else
      charCount[char] = 1;
  }
  for (var j in charCount) {
    if (charCount[j] == 1)
      newStr += j;
  }
  return newStr;
}

function isPalindrome(str) {
  var i, len = str.length;
  for (i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - 1 - i])
      return false;
  }
  return true;
}

// Find the missing no of an unsorted array from 0 => n
/*
function missingNumber(arr) {
  var n = arr.length + 1,
    sum = 0,
    expectedSum = n * (n + 1) / 2;

  for (var i = 0, len = arr.length; i < len; i++) {
    sum += arr[i];
  }

  return expectedSum - sum;
}
*/

function missingNumber(arr) {
  var n = arr.length + 1;
  return (n * (n + 1) / 2) - eval(arr.join('+'));
}

function findSum(arr, sum) {
  var hash = {},
    len = arr.length;

  for (var i = 0; i < len; i++) {
    if (hash[sum - arr[i]]) {
      return true;
    }
    hash[arr[i]] = true;
  }

  return false;
}

function maxDifference(arr) {
  var min = arr[0],
    max = arr[0],
    len = arr.length,
    num,
    i;

  for (i = 0; i < len; i++) {
    num = arr[i];
    min = min > num ? num : min;
    max = max < num ? num : max;
  }

  return max - min;
}

function topSum(arr) {
  var biggest = arr[0],
    second = arr[1],
    len = arr.length,
    i = 2;

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
  var count = 0;
  while (n > 0) {
    count += Math.floor(n / 10);
    n = n / 10;
  }
  return count;
}

function subStringFinder(str, subStr) {
  var idx = 0,
    i = 0,
    j = 0,
    len = str.length,
    subLen = subStr.length;

  for (; i < len; i++) {
    if (str[i] == subStr[j])
      j++;
    else
      j = 0;

    //check starting point or a match   
    if (j == 0)
      idx = i;
    else if (j == subLen)
      return idx;
  }

  return -1;
}

function permutations(str) {
  var arr = str.split(''),
    len = arr.length,
    perms = [],
    rest,
    picked,
    restPerms,
    next;

  if (len == 0)
    return [str];

  for (var i = 0; i < len; i++) {
    rest = Object.create(arr);
    picked = rest.splice(i, 1);

    restPerms = permutations(rest.join(''));

    for (var j = 0, jLen = restPerms.length; j < jLen; j++) {
      next = picked.concat(restPerms[j]);
      perms.push(next.join(''));
    }
  }
  return perms;
}

Object.compare = (obj1, obj2) => {
	var p;
  for (p in obj1) {
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

    switch (typeof(obj1[p])) {
      case 'object':
        if (!Object.compare(obj1[p], obj2[p])) return false;
        break;
      case 'function':
        if (typeof(obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
        break;
      default:
        if (obj1[p] != obj2[p]) return false;
    }
  }

  for (p in obj2) {
    if (typeof(obj1[p]) == 'undefined') return false;
  }
  return true;
};

var isAnagaram = (str1, str2) => {
	var hash = str => Array.prototype.slice.call(str).reduce((hash, item) => {
		hash[item] = item;
		return hash;
	}, {});
	var hash1 = hash(str1);
	var hash2 = hash(str2);
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
}