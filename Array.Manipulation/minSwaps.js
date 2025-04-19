// JavaScript program to find no. of swaps required to
// sort the array using cycle detection method.

function minSwaps(arr) {
	let n = arr.length;

	// Array to Keep track of those elements
	// who already been included in the cycle.
	let vis = new Array(n).fill(false);

	// Hashing elements with their original positions
	let pos = new Map();
	arr.forEach((value, index) => pos.set(value, index));

	arr.sort((a, b) => a - b);

	let swaps = 0;
	for (let i = 0; i < n; i++) {
		// Already a part of another cycle Or
		// in its correct position
		if (vis[i] || pos.get(arr[i]) === i) continue;

		let j = i,
			cycleSize = 0;

		// We make a cycle until it comes
		// back to first element again.
		while (!vis[j]) {
			vis[j] = true;

			// move to next element of the cycle
			j = pos.get(arr[j]);
			cycleSize++;
		}

		// Update answer by adding current cycle.
		if (cycleSize > 0) {
			swaps += cycleSize - 1;
		}
	}
	return swaps;
}

// Driver Code
let arr = [10, 19, 6, 3, 5];
console.log(minSwaps(arr));
