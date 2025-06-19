/** Longest Subarray with 0 Sum */

/**
Given an array arr[] of size n, 
the task is to find the length of the longest subarray with sum equal to 0.

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

/**
The idea is based on the observation that for two different indices i and j 
(where j > i) if the prefix sums Si and Sj are equal, 
it means that the sum of the elements between indices i+1 and j is zero. This is because:

Sj - Si = arr[i+1] + arr[i+2] + …... + arr[j]
If Si = Sj, then: Sj - Si = 0
This means the subarray from i+1 to j has a sum of zero.

Illustration:

Consider the array arr = {5, 2, -1, 1, 4}. Calculate the prefix sums:

S0 = 5
S1 = 5 + 2 = 7
S2 = 5 + 2 - 1 = 6
S3 = 5 + 2 - 1 + 1 = 7
Here, S1 = S3 = 7. This equality tells us that 
the subarray from index 2 to 3 (subarray [-1, 1]) sums to zero.
*/

/**
Step-by-step approach:

Use a hashmap (or dictionary) to store the first occurrence of each prefix sum.
Iterate over each element of array:
Check if the current prefix sum has been seen before, 
it means a subarray with zero sum exists between the previous index 
(where this prefix sum was first seen) and the current index.
Keep track of the maximum length of any zero-sum subarray found.
Below is the implementation of the above approach:
*/

// Function to return the length of the largest subarray
// with sum 0
function longestSubarrayWith0Sum(arr, k) {
	// Map to store the previous sums
	const sumHash = new Map();
	let sum = 0;
	let maxLen = 0;

	// Traverse through the given array
	for (let i = 0; i < arr.length; i++) {
		// Add current element to sum
		sum += arr[i];

		// If the sum is 0, update maxLen
		if (sum === 0) maxLen = i + 1;

		// Check if this sum is seen before
		if (sumHash.has(sum)) {
			// If this sum is seen before, update maxLen
			maxLen = Math.max(maxLen, i - sumHash.get(sum));
		} else {
			// If this sum is not seen before, add it to the map
			sumHash.set(sum, i);
		}
	}

	return maxLen;
}

console.log(longestSubarrayWith0Sum([15, -2, 2, -8, 1, 7, 10, 23], 0));
