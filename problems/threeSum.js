// Implementation 1 (Sorted Two-Pointer Approach)
function threeSum(numbers, sum) {
	const result = [];
	const arr = numbers.slice().sort((a, b) => a - b);
	const len = arr.length;

	for (let i = 0; i < len - 2; i++) {
		if (i > 0 && arr[i] === arr[i - 1]) {
			continue;
		}

		let left = i + 1;
		let right = len - 1;

		while (left < right) {
			const currentSum = arr[i] + arr[left] + arr[right];

			if (currentSum === sum) {
				result.push([arr[i], arr[left], arr[right]]);

				while (left < right && arr[left] === arr[left + 1]) {
					left++;
				}
				while (left < right && arr[right] === arr[right - 1]) {
					right--;
				}

				left++;
				right--;
			} else if (currentSum < sum) {
				left++;
			} else {
				right--;
			}
		}
	}

	return result;
}

console.log(threeSum([2, 8, 4, 6, 3, 1], 12));
console.log(threeSum([0, 0, 0, 0], 0));
console.log(threeSum([1, 2, 2, 4, 5, 6, 3], 10)); // Output: [ 1, 3, 6 ] or [2, 2, 6]
console.log(threeSum([2, 2, 2], 6)); // Output: [2, 2, 2]
console.log(threeSum([-1, 0, 1, 2, -1, -4], 0)); // Output: [-1, -1, 2] (handles duplicates correctly)
console.log(threeSum([1, 2, 3, 4, 5], 12)); // Output: null
