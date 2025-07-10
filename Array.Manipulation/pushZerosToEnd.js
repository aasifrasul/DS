/**
	This is in-place soln, without creating an additonal array
*/
function pushZerosToEnd(items) {
	// Pointer to track the position for next non-zero element
	let count = 0;
	let i = -1;
	
	while (++i < items.length) {
		
		// If the current element is non-zero
		if (items[i] !== 0) {
			
			// Swap the current element with the 0 at index 'count'
			[items[i], items[count]] = [items[count], items[i]];
			
			// Move 'count' pointer to the next position
			count++;
		}
	}
}

// Driver Code
const items = [1, 2, 0, 4, 3, 0, 5, 0];
pushZerosToEnd(items);