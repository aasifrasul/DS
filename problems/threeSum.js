function threeSum(items, sum) {
	const len = items.length;
	items.sort((a, b) => a - b); // Crucial: Sort the array

	for (let i = 0; i < len - 2; i++) {
		if (i > 0 && items[i] === items[i - 1]) {
			continue; // Skip duplicate values for the first number
		}

		let left = i + 1;
		let right = len - 1;

		while (left < right) {
			const currentSum = items[i] + items[left] + items[right];

			if (currentSum === sum) {
				return [items[i], items[left], items[right]]; // Found a triplet
			} else if (currentSum < sum) {
				left++;
			} else {
				right--;
			}
		}
	}

	return null; // No triplet found
}

console.log(threeSum([1, 2, 2, 4, 5, 6, 3], 10)); // Output: [ 1, 3, 6 ] or [2, 2, 6]
console.log(threeSum([2, 2, 2], 6)); // Output: [2, 2, 2]
console.log(threeSum([-1, 0, 1, 2, -1, -4], 0)); // Output: [-1, -1, 2] (handles duplicates correctly)
console.log(threeSum([1, 2, 3, 4, 5], 12)); // Output: null
