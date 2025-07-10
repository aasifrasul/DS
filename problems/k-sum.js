function kSum(numbers, target, k) {
	if (!numbers || numbers.length < k || k < 2) {
		return [];
	}

	// Sort the array first
	numbers.sort((a, b) => a - b);

	// Main recursive function
	function kSumHelper(nums, target, k, start = 0) {
		const result = [];

		// Base case: 2Sum using two pointers
		if (k === 2) {
			let left = start;
			let right = nums.length - 1;

			while (left < right) {
				const sum = nums[left] + nums[right];
				if (sum === target) {
					result.push([nums[left], nums[right]]);
					// Skip duplicates
					while (left < right && nums[left] === nums[left + 1]) left++;
					while (left < right && nums[right] === nums[right - 1]) right--;
					left++;
					right--;
				} else if (sum < target) {
					left++;
				} else {
					right--;
				}
			}
			return result;
		}

		// Recursive case: fix one element and solve (k-1)Sum
		for (let i = start; i < nums.length - k + 1; i++) {
			// Skip duplicates at current level
			if (i > start && nums[i] === nums[i - 1]) continue;

			// Early termination optimizations
			// If smallest possible sum is too large
			if (nums[i] * k > target) break;
			// If largest possible sum is too small
			if (nums[i] + nums.slice(-k + 1).reduce((a, b) => a + b, 0) < target) continue;

			// Recursively find (k-1)Sum with remaining target
			const subResults = kSumHelper(nums, target - nums[i], k - 1, i + 1);

			// Add current element to each sub-result
			for (const subResult of subResults) {
				result.push([nums[i], ...subResult]);
			}
		}

		return result;
	}

	return kSumHelper(numbers, target, k);
}

// Convenience functions for common cases
function twoSum(numbers, target) {
	return kSum(numbers, target, 2);
}

function threeSum(numbers, target = 0) {
	return kSum(numbers, target, 3);
}

function fourSum(numbers, target) {
	return kSum(numbers, target, 4);
}

// Test cases
console.log('2Sum [2,7,11,15], target=9:', twoSum([2, 7, 11, 15], 9));
console.log('3Sum [1,0,-1,0,-2,2], target=0:', threeSum([1, 0, -1, 0, -2, 2]));
console.log('4Sum [1,0,-1,0,-2,2], target=0:', fourSum([1, 0, -1, 0, -2, 2], 0));
console.log('5Sum [1,2,3,4,5,6], target=15:', kSum([1, 2, 3, 4, 5, 6], 15, 5));
