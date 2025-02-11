// Mathematical Summation of a series
function missingNumber(arr) {
	const n = arr.length + 1;
	const expectedSum = (n * (n + 1)) / 2;
	const actualSum = arr.reduce((sum, num) => sum + num, 0);
	return expectedSum - actualSum;
}

// XOR Method
function missingNumber(arr) {
	let xor = 0;
	// XOR all numbers from 1 to n
	for (let i = 1; i <= arr.length + 1; i++) xor ^= i;
	// XOR with all array elements
	for (let num of arr) xor ^= num;
	return xor;
}

// Cyclic Sort
function missingNumber(arr) {
	let i = 0;
	while (i < arr.length) {
		const correctPos = arr[i] - 1;
		if (arr[i] <= arr.length && arr[i] !== arr[correctPos]) {
			[arr[i], arr[correctPos]] = [arr[correctPos], arr[i]];
		} else {
			i++;
		}
	}
	// Find first position where index+1 !== number
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] !== i + 1) return i + 1;
	}
	return arr.length + 1;
}

// Binary Search
function missingNumber(arr) {
	arr.sort((a, b) => a - b);
	let left = 0,
		right = arr.length;

	while (left < right) {
		const mid = Math.floor((left + right) / 2);
		if (arr[mid] > mid + 1) {
			right = mid;
		} else {
			left = mid + 1;
		}
	}
	return left + 1;
}
