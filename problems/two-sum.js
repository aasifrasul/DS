function twoSum(items, sum) {
	const len = items.length;
	const hash = {}; // Store numbers we've seen and their indices

	for (let i = 0; i < len; i++) {
		const complement = sum - items[i];

		if (complement in hash) {
			return [hash[complement], i]; // Found the pair!
		}

		hash[items[i]] = i; // Store the current number and its index
	}

	return null; // No pair found
}

console.log(twoSum([1, 2, 2, 4, 5, 6], 9)); // Output: [3, 4]
console.log(twoSum([1, 2, 2, 4, 5, 6], 3)); // Output: [0, 1] or [0, 2] (this version returns the first it finds)
console.log(twoSum([1, 2, 2, 4, 5, 6], 15)); // Output: null

/**
	two pointer approach for a sorted list
*/
const twoSumSorted = (nums, target, start = 0) => {
	let left = start,
		right = nums.length - 1;
	const result = [];
	while (left < right) {
		const sum = nums[left] + nums[right];
		if (sum === target) {
			result.push([nums[left], nums[right]]);
			// if we want only the first set of values
			// we can safely return from here

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
};

findTwoSum([98, 87, 76, 65, 54, 32, 21, 15, 8, 2], 36);
