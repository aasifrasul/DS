function permutations(arr) {
	const result = [];
	const current = [];

	function backtrack(remaining) {
		if (remaining.length === 0) {
			result.push([...current]); // Add a copy to avoid modification
			return;
		}

		for (let i = 0; i < remaining.length; i++) {
			const next = remaining[i];
			const newRemaining = [...remaining.slice(0, i), ...remaining.slice(i + 1)];
			current.push(next);
			backtrack(current, newRemaining);
			current.pop(); // Backtrack: remove the last element
		}
	}

	backtrack(arr);
	return result;
}

const arr = [1, 2, 3];
const allPermutations = permutations(arr);
console.log(allPermutations); // Output: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
