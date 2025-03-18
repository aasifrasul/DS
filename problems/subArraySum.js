function subArraySum(arr, sum) {
	const size = arr.length;
	const map = new Map();
	let currentSum = 0;
	const result = [];

	// Store the initial sum (0) with an index of -1
	map.set(sum, [-1]);

	for (let i = 0; i < size; i++) {
		currentSum += arr[i];

		if (map.has(currentSum)) {
			const startIndexList = map.get(currentSum);
			for (const startIndex of startIndexList) {
				result.push([startIndex + 1, i]);
			}
			//add the current index to the list of indexes for the current sum.
			map.get(currentSum).push(i);
		} else {
			map.set(currentSum, [i]);
		}
	}

	return result;
}

let arr = [6, 3, -1, -3, 4, -2, 2, 4, 6, -12, -7];
subArraySum(arr, 0);

// JavaScript program to print all subarrays
// in the array which has sum 0

// Function to print all subarrays in the array which
// has sum 0

function subArraySum(arr, n) {
	// create an empty map
	let map = {};

	// create an empty vector of pairs to store
	// subarray starting and ending index
	let out = [];

	// Maintains sum of elements so far
	let sum = 0;

	for (var i = 0; i < n; i++) {
		// add current element to sum
		sum += arr[i];

		// if sum is 0, we found a subarray starting
		// from index 0 and ending at index i
		if (sum == 0) out.push([0, i]);

		// If sum already exists in the map there exists
		// at-least one subarray ending at index i with
		// 0 sum
		if (map.hasOwnProperty(sum)) {
			// map[sum] stores starting index of all subarrays
			let vc = map[sum];
			for (let it of vc) out.push([it + 1, i]);
		} else {
			map[sum] = [];
		}

		// Important - no else
		map[sum].push(i);
	}

	// return output vector
	return out;
}

let arr = [6, 3, -1, -3, 4, -2, 2, 4, 6, -12, -7];
subArraySum(arr, 0);

// Above ones are specific to 0 sum.
// This is generic, targetSum can be  anything
function genericSubArraySum(arr, targetSum) {
	const size = arr.length;
	const map = new Map();
	let currentSum = 0;
	const result = [];

	for (let i = 0; i < size; i++) {
		currentSum += arr[i];

		// If currentSum equals targetSum, subarray from index 0 to i has sum equal to targetSum
		if (currentSum === targetSum) {
			result.push([0, i]);
		}

		// Check if there is any subarray ending at index i with sum equal to targetSum
		if (map.has(currentSum - targetSum)) {
			const startIndexList = map.get(currentSum - targetSum);
			for (const startIndex of startIndexList) {
				result.push([startIndex + 1, i]);
			}
		}

		// Add current index to the list of indices for current sum
		if (map.has(currentSum)) {
			map.get(currentSum).push(i);
		} else {
			map.set(currentSum, [i]);
		}
	}

	return result;
}
