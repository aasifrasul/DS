function maxStreak(arr, k) {
	let maxCount = 0;
	let flipCount = 0;
	let lastIndex = 0;

	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === 0) {
			if (flipCount === k) {
				lastIndex = i - 1;
				flipCount = 0;
			} else {
				flipCount++;
			}
		}

		maxCount = Math.max(maxCount, i - lastIndex + 1);
	}

	return maxCount;
}

maxStreak([1, 0, 0, 1, 0, 1, 0, 1], 2);