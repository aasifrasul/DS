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
