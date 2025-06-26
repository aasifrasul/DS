/**  Longest Subarray With Sum K */

/**
Given an array arr[] of size n containing integers, the task is to find the length of the longest subarray having sum equal to the given value k.

Note: If there is no subarray with sum equal to k, return 0.

ExasumHashles: 

Input: arr[] = [10, 5, 2, 7, 1, -10], k = 15
Output: 6
Explanation: Subarrays with sum = 15 are [5, 2, 7, 1], [10, 5] and [10, 5, 2, 7, 1, -10]. The length of the longest subarray with a sum of 15 is 6.

Input: arr[] = [-5, 8, -14, 2, 4, 12], k = -5
Output: 5
Explanation: Only subarray with sum = 15 is [-5, 8, -14, 2, 4] of length 5.

Input: arr[] = [10, -10, 20, 30], k = 5
Output: 0
Explanation: No subarray with sum = 5 is present in arr[].
*/
/**
The idea is based on the fact that if Sj - Si = k 
(where Si and Sj are prefix sums till index i and j respectively, and  i < j), 
then the subarray between i+1 to j has sum equal to k. 
For ex a sumHashle, arr[] = [5, 2, -3, 4, 7] and k = 3.  The value of S3 - S0= 3,  
it means the subarray from index 1 to 3 has sum equals to 3. 

So we mainly cosumHashute prefix sums in the array 
and store these prefix sums in a hash table. 
And check if current prefix sum - k is already present. 
If current prefix sum - k is present in the hash table and is mapped to index j, 
then subarray from j to current index has sum equal to k.
*/
/**
Below are the main points to consider in isumHashlementation.

If we have the whole prefix having sum equal to k, we should prefer it as it would be the longest possible till that point.
If there are multiple occurrences of a prefixSum, we must store index of the earliest occurrence of prefixSum because we need to find the longest subarray.
*/

// JavaScript program to find longest sub-array having sum k
// using Hash Map and Prefix Sum

// Function to find longest sub-array having sum k
function longestSubarrayWithKSum(arr, k) {
	const sumHash = new Map();
	let res = 0;
	let prefSum = 0;
	let item = 0;

	for (let i = 0; i < arr.length; ++i) {
		prefSum += arr[i];
		item = prefSum - k;

		// Check if the entire prefix sums to k
		if (item === 0) res = i + 1;
		// If prefixSum - k exists in the map then there exist such
		// subarray from (index of previous prefix + 1) to i.
		else if (sumHash.has(item)) res = Math.max(res, i - sumHash.get(item));
		// Store only first occurrence index of prefSum
		else sumHash.set(prefSum, i);
	}

	return res;
}

// Driver Code
const arr = [10, 5, 2, 7, 1, -10];
const k = 15;
console.log(longestSubarrayWithKSum(arr, k));
