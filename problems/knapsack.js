function getCombinations(arr, r, memo) {
	// Base cases
	if (r === 0) return [[]];
	if (arr.length === 0) return [];
	if (r > arr.length) return []; // Added this case!

	const key = arr.toString() + '-' + r;

	if (key in memo) {
		debugger;
		return memo[key];
	}

	console.log('\n======================');
	console.log(`arr, r`, JSON.stringify(arr), r);

	const firstElement = arr[0];
	const restArray = arr.slice(1);

	const combsWithFirst = getCombinations(restArray, r - 1, memo);
	const combsWithoutFirst = getCombinations(restArray, r, memo);

	console.log(`combsWithFirst`, JSON.stringify(combsWithFirst));
	console.log(`combsWithoutFirst`, JSON.stringify(combsWithoutFirst));
	console.log('======================\n');

	return [...combsWithFirst.map((comb) => [firstElement, ...comb]), ...combsWithoutFirst];
}

function knapsackBruteforce(items, weightLimit) {
	const n = items.length;
	let maxValue = 0;
	let bestCombination = null;
	const indices = Array.from({ length: n }, (_, i) => i);
	const memo = {};

	// Try combinations of different sizes (0 to n items)
	for (let j = 0; j <= n; j++) {
		// Get all combinations of size j
		const combinations = getCombinations(indices, j, memo);

		// Check each combination
		for (const combination of combinations) {
			const totalWeight = combination.reduce((sum, i) => sum + items[i][1], 0);
			const totalValue = combination.reduce((sum, i) => sum + items[i][0], 0);

			// If this combination is valid and better than our current best
			if (totalWeight <= weightLimit && totalValue > maxValue) {
				maxValue = totalValue;
				bestCombination = combination;
			}
		}
	}

	// Convert indices back to actual items
	const selectedItems = bestCombination ? bestCombination.map((i) => items[i]) : [];

	return { maxValue, selectedItems };
}

// Example usage
const items = [
	[9000, 6], // Gold  [value, weight]
	[4000, 5], // Silver
	[3000, 4], // Bronze
];
const weightLimit = 10;

const result = knapsackBruteforce(items, weightLimit);
console.log(`Maximum value: $${result.maxValue}`);
console.log('\nSelected items:');
result.selectedItems.forEach(([value, weight]) => {
	console.log(`Item with value $${value} and weight ${weight}kg`);
});
console.log(`\nTotal weight: ${result.selectedItems.reduce((sum, [_, w]) => sum + w, 0)}kg`);
