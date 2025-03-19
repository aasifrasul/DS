var combinationSum = function (candidates, target) {
	const results = [];
	const combination = [];

	function backtrack(remaining, start) {
		if (remaining === 0) {
			results.push([...combination]); // Create a copy of the combination
			return;
		}

		if (remaining < 0) return;

		for (let i = start; i < candidates.length; i++) {
			combination.push(candidates[i]);
			// We can reuse the same element, so we pass i instead of i+1
			backtrack(remaining - candidates[i], i); // Allow repeated use of the same candidate
			combination.pop(); // Backtrack
		}
	}

	backtrack(target, 0);
	return results;
};
