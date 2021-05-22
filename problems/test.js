var isArray = (data) => Object.prototype.toString.call(data).slice(8, -1).toLowerCase();

function findOrderingOfTasks(input) {
	const len = input.length,
		finalArr = [];
	let i = 0,
		item,
		idx0,
		idx1;
	while (i < len) {
		item = input[i];
		idx0 = finalArr.indexOf(item[0]);
		idx1 = finalArr.indexOf(item[1]);

		if (idx1 >= 0) {
			if (idx0 >= 0) {
				console.log(item);
				if (idx1 > idx0) {
					item[0] = item[0] + item[1];
					item[1] = item[0] - item[1];
					item[0] = item[0] - item[1];
				}
			} else {
				finalArr.splice(idx1 + 1, 0, item[0]);
			}
		} else {
			if (idx0 >= 0) {
				finalArr.splice(idx0, 0, item[1]);
			} else {
				finalArr.push(item[1]);
				finalArr.push(item[0]);
			}
		}

		i++;
	}

	return finalArr;
}

var input = [
	[1, 0],
	[2, 0],
	[3, 0],
	[3, 2],
	[4, 3],
	[0, 4],
	[2, 5],
	[0, 6],
];

//console.log(findOrderingOfTasks(input));

/*
function lengthOfLongestUniqueSubstring(str) {
	const len = str.length;
	let sums = start = diff = i = maxLength = 0,
		hash = {},
		char;

	while (i < len) {
		char = str[i];
		console.log('char, hash', char, hash)
		if (typeof hash[char] !== 'undefined') {
			console.log('subString', str.slice(hash[char], i))
			sums = hash[char] + 1;
			console.log('sums, start', sums, start)
			start = Math.max(sums, start);
		}

		diff = i - start + 1;
		console.log('maxLength, diff', maxLength, diff)
		maxLength = Math.max(maxLength, diff);
		hash[char] = i;
		i++;
	}

	return maxLength;
}

function lengthOfLongestUniqueSubstring(str) {
	const len = str.length;
	let i = j = 0, temp, maxLength = 0, curLength = 0, hash = new Map(), count = 0;

	while (i < len) {
		j = i;
		while (j < len) {
			count++;
			temp = str[j];
			if (hash.has(temp)) {
				maxLength = Math.max(curLength, maxLength);
				curLength = 0;
				hash = new Map();
				break;
			}

			curLength++;
			hash.set(temp, i)
			j++;
		}
		i++;
	}

	console.log('count', count);

	return maxLength;
}
*/

function lengthOfLongestUniqueSubstring(str) {
	const len = str.length,
		hash = new Map();
	let i = 0,
		maxLength = (sums = start = diff = 0),
		char;

	while (i < len) {
		char = str[i];
		if (hash.has(char)) {
			console.log('char, hash', char, hash);

			sums = hash.get(char) + 1;
			console.log('sums, start', sums, start);
			start = Math.max(sums, start);
		}
		diff = i - start + 1;
		console.log('diff, maxLength', diff, maxLength);
		maxLength = Math.max(maxLength, diff);
		hash.set(char, i);
		i++;
	}

	return maxLength;
}

//console.log(lengthOfLongestUniqueSubstring('abca'));
function countSteps(n, steps) {
	const hash = {
		0: 1,
		1: 1,
		2: 2,
	};
	let i = 3,
		j = 1;

	while (i <= n) {
		console.log('i', i);
		hash[i] = 0;
		j = steps;
		while (j > 0) {
			if (i >= j) {
				hash[i] += hash[i - j];
			}
			console.log('j, temp', j, temp);
			j--;
		}
		i++;
	}

	return hash[n];
}

// console.log(countSteps(5, 4));
/*
[
	[1,2,3],
	[4,5,6],
	[7,8,9],
]
[1,2,3,4,5,6,7,8,9]
[1,3,5,7,9]

[
	[1,2,3,4],
	[5,6,7,8],
	[9,10,11,12]
	[13,14,15,16]
]
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

[1,4,6,7,10,11,13,16]

[
	[1,2,3,4,5],
	[6,7,8,9,10],
	[11,12,13,14,15],
	[16,17,18,19,20],
	[21,22,23,24,25],
]
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,21,22,23,24,25]
[1,5,7,9,13,17,19,21,25]
*/

/*
var mat = [[5,1,0],[-5,-5,-5]];
var mat = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]];
var mat = [[0]];

function countNegativesInGrid(mat) {
	const colLength = mat[0].length - 1, rowLength = mat.length - 1;
	let i = rowLength, count = sum = j = 0;

	while (i >= 0 && j <= colLength) {
		count++;
		if(mat[i][j] < 0) {
			console.log('sum, i, j, mat[i][j]', sum, i, j, mat[i][j]);
			sum += colLength + 1 - j;
			console.log('sum', sum)
			i--;
		} else {
			j++;
		}
	}
	console.log('count', count);
	return sum;
}

console.log(countNegativesInGrid(mat));

*/
var luckyNumbers = function (matrix) {
	const rowLength = matrix.length;
	let j,
		count = (i = max = 0),
		result = [];
	while (i < rowLength) {
		least = Math.min(...matrix[i]);
		idx = matrix[i].indexOf(least);
		j = 0;
		max = 0;
		while (j < rowLength) {
			count++;
			max = Math.max(matrix[j][idx], max);
			j++;
		}

		if (least == max) {
			result.push(max);
		}
		i++;
	}
	console.log('count', count);
	return result;
};

var mat = [
	[1, 10, 4, 2],
	[9, 3, 8, 7],
	[15, 16, 17, 12],
];

console.log(luckyNumbers(mat));
