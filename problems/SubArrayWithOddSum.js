function countOddSubarrays(arr) {
	const n = arr.length;
	let oddCount = 0;
	let evenCount = 0;
	let totalOddSubarrays = 0;
	const modulo = 10 ** 9 + 7;

	for (const num of arr) {
		if (num % 2 === 0) {
			evenCount++;
		} else {
			[oddCount, evenCount] = [evenCount + 1, oddCount];
		}
		totalOddSubarrays = (totalOddSubarrays + oddCount) % modulo;
	}

	return totalOddSubarrays;
}

function countOddSumSubarrays(arr) {
	const MOD = 1000000007;

	// Initialize counters for even and odd prefix sums
	let evenCount = 1; // Start with 1 for empty subarray (sum 0 is even)
	let oddCount = 0;
	let prefixSum = 0;
	let result = 0;

	for (let num of arr) {
		// Update prefix sum
		prefixSum += num;

		// Check if current prefix sum is odd or even
		if (prefixSum % 2 === 1) {
			// Odd prefix sum
			// Add count of even prefix sums to result
			// (current odd prefix sum - previous even prefix sum = odd subarray sum)
			result = (result + evenCount) % MOD;
			// Increment odd prefix sum counter
			oddCount++;
		} else {
			// Even prefix sum
			// Add count of odd prefix sums to result
			// (current even prefix sum - previous odd prefix sum = odd subarray sum)
			result = (result + oddCount) % MOD;
			// Increment even prefix sum counter
			evenCount++;
		}
	}

	return result;
}

// Example usage:
// console.log(countOddSumSubarrays([1,3,5])); // Output: 4
// console.log(countOddSumSubarrays([2,4,6])); // Output: 0
// console.log(countOddSumSubarrays([1,2,3,4,5,6,7])); // Output: 16
