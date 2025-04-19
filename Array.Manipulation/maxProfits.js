function maxProfits(numbers) {
	const n = numbers.length;

	let totalProfits = 0;

	for (let i = 0; i < n - 1; i++) {
		if (numbers[i] > numbers[i + 1]) {
			continue;
		} else {
			totalProfits += numbers[i + 1] - numbers[i];
		}
	}

	return totalProfits;
}

maxProfits([100, 180, 260, 310, 40, 535, 695]);
