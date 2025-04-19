function stockPurchaseOptimized(prices) {
	let minPrice = prices[0];
	let maxProfit = 0;

	for (let i = 1; i < prices.length; i++) {
		if (prices[i] < minPrice) {
			minPrice = prices[i];
		} else {
			maxProfit = Math.max(maxProfit, prices[i] - minPrice);
		}
	}
	return maxProfit;
}

function stockPurchase(numbers) {
	const n = numbers.length;
	if (n <= 1) return 0;

	let minPrice = numbers[0];
	let maxProfit = 0;

	for (let i = 1; i < n; i++) {
		// Update maximum profit if selling at current price is more profitable
		maxProfit = Math.max(maxProfit, numbers[i] - minPrice);

		// Keep track of the lowest price seen so far
		minPrice = Math.min(minPrice, numbers[i]);
	}

	return maxProfit;
}

stockPurchase([7, 10, 1, 3, 6, 9, 2]);
