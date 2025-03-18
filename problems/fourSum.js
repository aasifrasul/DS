function fourSum(numbers, targetSum) {
	if (!numbers || numbers.length < 4) {
		return []; // Return empty array for invalid input
	}

	numbers.sort((a, b) => a - b);
	const len = numbers.length;
	const result = [];

	for (let i = 0; i < len - 3; i++) {
		if (i > 0 && numbers[i] === numbers[i - 1]) {
			continue; // Skip duplicate values for i
		}
		for (let j = i + 1; j < len - 2; j++) {
			if (j > i + 1 && numbers[j] === numbers[j - 1]) {
				continue; // Skip duplicate values for j
			}
			let left = j + 1;
			let right = len - 1;

			while (left < right) {
				const currentSum = numbers[i] + numbers[j] + numbers[left] + numbers[right];

				if (currentSum === targetSum) {
					result.push([numbers[i], numbers[j], numbers[left], numbers[right]]);

					// Skip duplicate values for left and right
					while (left < right && numbers[left] === numbers[left + 1]) {
						left++;
					}
					while (left < right && numbers[right] === numbers[right - 1]) {
						right--;
					}

					left++;
					right--;
				} else if (currentSum < targetSum) {
					left++;
				} else {
					right--;
				}
			}
		}
	}
	return result;
}

console.log(fourSum([2, 8, 4, 6, 3, 1], 12));
console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
console.log(fourSum([1, 2, 3, 4, 5], 100));
