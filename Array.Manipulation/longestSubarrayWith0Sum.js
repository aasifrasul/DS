/**
Longest Subarray with 0 Sum
Last Updated : 02 Nov, 2024
Given an array arr[] of size n, the task is to find the length of the longest subarray with sum equal to 0.

Examples:

Input: arr[] = {15, -2, 2, -8, 1, 7, 10, 23}
Output: 5
Explanation: The longest subarray with sum equals to 0 is {-2, 2, -8, 1, 7}

Input: arr[] = {1, 2, 3}
Output: 0
Explanation: There is no subarray with 0 sum

Input:  arr[] = {1, 0, 3}
Output:  1
Explanation: The longest sub-array with sum equal to 0 is {0}
*/
// Function to return the length of the largest subarray
// with sum 0
function longestSubarrayWith0Sum(arr) {
	// Map to store the previous sums
	let presum = new Map();

	let sum = 0;
	let maxLen = 0;

	// Traverse through the given array
	for (let i = 0; i < arr.length; i++) {
		// Add current element to sum
		sum += arr[i];

		// If the sum is 0, update maxLen
		if (sum === 0) {
			maxLen = i + 1;
		}

		// Check if this sum is seen before
		if (presum.has(sum)) {
			// If this sum is seen before, update maxLen
			maxLen = Math.max(maxLen, i - presum.get(sum));
		} else {
			// If this sum is not seen before, add it to the map
			presum.set(sum, i);
		}
	}

	return maxLen;
}

const arr = [15, -2, 2, -8, 1, 7, 10, 23];
console.log(longestSubarrayWith0Sum(arr));
