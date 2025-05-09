function maxSubarraySum(arr) {
	let res = arr[0];
	let maxEnding = arr[0];

	for (let i = 1; i < arr.length; i++) {
		// Find the maximum sum ending at index i by either extending
		// the maximum sum subarray ending at index i - 1 or by
		// starting a new subarray from index i
		maxEnding = Math.max(maxEnding + arr[i], arr[i]);

		// Update res if maximum subarray sum ending at index i > res
		res = Math.max(res, maxEnding);
	}
	return res;
}
