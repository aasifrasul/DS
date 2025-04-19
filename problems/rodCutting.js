function rodCuttingBruteForce(prices, length, hash = {}) {
	// Base cases
	if (length <= 0) return 0;

	if (length in hash) {
		return hash[length];
	}

	// Initialize maximum value to negative infinity
	let maxValue = Number.NEGATIVE_INFINITY;

	const options = Math.min(prices.length, length);

	// Try every possible cut position
	for (let i = 0; i < options; i++) {
		// Current price + recursive call for remaining length
		// prices[i] is the price for a rod of length i+1
		const key = `${length}#${i}`;
		const currentValue =
			hash[key] || prices[i] + rodCuttingBruteForce(prices, length - (i + 1), hash);
		hash[key] = currentValue;
		maxValue = Math.max(maxValue, currentValue);
	}

	console.log(JSON.stringify(hash));
	return maxValue;
}

// Helper function to demonstrate usage with detailed output
function solveAndExplain(prices, length) {
	console.log(`Solving rod cutting for length ${length} with prices:`, prices);
	const startTime = performance.now();
	const result = rodCuttingBruteForce(prices, length);
	const endTime = performance.now();

	console.log(`Maximum value: $${result}`);
	console.log(`Time taken: ${(endTime - startTime).toFixed(2)}ms`);
	return result;
}

// Example usage
const prices = [1, 5, 8, 9]; // prices for lengths 1, 2, 3, 4
console.log('\nExample 1:');
solveAndExplain(prices, 4);

console.log('\nExample 2:');
solveAndExplain(prices, 5);

function rodCutting(prices, n) {
	// Handle case where n is larger than prices array
	const actualLength = Math.min(n, prices.length);
	const dp = new Array(n + 1).fill(0);

	// Build solution bottom-up
	for (let i = 1; i <= n; i++) {
		let maxValue = -Infinity;
		// Only try cuts up to the available prices
		for (let j = 0; j < Math.min(i, actualLength); j++) {
			maxValue = Math.max(maxValue, prices[j] + dp[i - j - 1]);
		}
		dp[i] = maxValue;
	}

	return dp[n];
}

// Helper function to demonstrate usage with detailed output
function solveAndExplain(prices, length) {
	console.log(`Solving rod cutting for length ${length} with prices:`, prices);
	const startTime = performance.now();
	const result = rodCutting(prices, length);
	const endTime = performance.now();

	console.log(`Maximum value: $${result}`);
	console.log(`Time taken: ${(endTime - startTime).toFixed(2)}ms`);
	return result;
}

// Example usage
const prices = [1, 5, 8, 9]; // prices for lengths 1, 2, 3, 4
console.log('\nExample 1:');
solveAndExplain(prices, 1000);
