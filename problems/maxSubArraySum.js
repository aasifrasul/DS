function maxSubArraySum(items) {
	let maxSum = items[0];
	let currentSum = items[0];

	for (let i = 1; i < items.length; i++) {
		// Choose whether to extend previous subarray or start a new one
		currentSum = Math.max(items[i], currentSum + items[i]);
		// Update maximum sum if current sum is larger
		maxSum = Math.max(maxSum, currentSum);
	}

	return maxSum;
}

maxSubArraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
