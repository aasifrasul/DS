function mySort(arr) {
	const len = arr.length;
	const mid = Math.floor(len / 2);

	for (let j = 0; j < mid; j++) {
		let min = j;
		let max = j;

		// Find min and max in the unsorted portion
		for (let i = j; i < len - j; i++) {
			if (arr[i] < arr[min]) min = i;
			if (arr[i] > arr[max]) max = i;
		}

		// Handle the special case where max is at the current position
		if (j === max) {
			// Only swap min if it's not at the same position
			if (j !== min) {
				[arr[min], arr[j]] = [arr[j], arr[min]];
			}
		} else {
			// First swap min to front (if needed)
			if (min !== j) {
				[arr[min], arr[j]] = [arr[j], arr[min]];
				// If max was at min position, update max index
				if (max === min) max = j;
			}

			// Then swap max to end
			[arr[max], arr[len - j - 1]] = [arr[len - j - 1], arr[max]];
		}
	}

	return arr;
}

// Test cases
console.log(mySort([5, 2, 9, 3, 4])); // [2,3,4,5,9]
console.log(mySort([1, 5, 2, 4, 3])); // [1,2,3,4,5]
console.log(mySort([9, 8, 7, 6, 5])); // [5,6,7,8,9]
console.log(mySort([1, 1, 1, 1, 1])); // [1,1,1,1,1]
console.log(mySort([3])); // [3]
console.log(mySort([])); // []
