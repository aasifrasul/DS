// JavaScript program to find Maximum Product Subarray using
// Minimum and Maximum Product ending at every index

function max(a, b, c) {
	return a > b ? (a > c ? a : c) : b > c ? b : c;
}

function min(a, b, c) {
	return a < b ? (a < c ? a : c) : b < c ? b : c;
}

// Function to find the product of max product subarray
function maxProduct(arr) {
	// Initialize the maximum and minimum products ending at
	// the current index
	let currMax = arr[0];
	let currMin = arr[0];

	// Initialize the overall maximum product
	let maxProd = arr[0];

	// Iterate through the array starting from the second element
	for (let i = 1; i < arr.length; i++) {
		// Calculate potential maximum product at this index
		const temp = max(arr[i] * currMax, arr[i] * currMin, arr[i]);

		// Update the minimum product ending at the current index
		currMin = min(arr[i] * currMax, arr[i] * currMin, arr[i]);

		// Update the maximum product ending at the current index
		currMax = temp;

		// Update the overall maximum product
		maxProd = max(maxProd, maxProd, currMax);
	}
	return maxProd;
}

const arr = [-2, 6, -3, -10, 0, 2];
console.log(maxProduct(arr).toString());
