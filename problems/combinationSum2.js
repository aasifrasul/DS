var combinationSum2 = function (candidates, target) {
	const results = [];
	const combination = [];

	candidates.sort((a, b) => a - b); // Sort the candidates

	function backtrack(remaining, start) {
		if (remaining === 0) {
			results.push([...combination]);
			return;
		}

		if (remaining < 0) return;

		for (let i = start; i < candidates.length; i++) {
			if (i > start && candidates[i] === candidates[i - 1]) {
				continue; // Skip duplicate candidates
			}
			combination.push(candidates[i]);
			backtrack(remaining - candidates[i], i + 1);
			combination.pop();
		}
	}

	backtrack(target, 0);
	return results;
};

console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));
console.log(combinationSum2([2, 5, 2, 1, 2], 5));
console.log(combinationSum2([2, 2, 3, 5], 8));
