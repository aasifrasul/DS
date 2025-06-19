/*
[1,5,8,3,6]
Expected output: [5,8,-1,6,-1]
*/

/**
The key insight is using a monotonic stack to maintain elements in decreasing order. Here's how it works:
Forward approach (first solution):

For each element, pop from stack all indices whose values are smaller than current element
For each popped index, the current element is its "next greater element"
Push current index to stack
*/

function nextGreaterElement(nums) {
	const result = new Array(nums.length).fill(-1);
	const stack = []; // Stack to store indices

	for (let i = 0; i < nums.length; i++) {
		// While stack is not empty and current element is greater than
		// the element at the index stored at top of stack
		while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
			const index = stack.pop();
			result[index] = nums[i];
		}
		stack.push(i);
	}

	return result;
}

// Test with your example
const input = [1, 5, 8, 3, 6];
const output = nextGreaterElement(input);
console.log('Input:', input);
console.log('Output:', output);

// Alternative approach using reverse iteration (also O(n))
/**
Reverse approach (second solution):

Traverse right to left, maintaining a stack of potential "next greater" candidates
For each position, the stack top (if exists) is the next greater element
Remove smaller elements from stack since they can't be "next greater" for future elements
*/
function nextGreaterElementReverse(nums) {
	const result = new Array(nums.length).fill(-1);
	const stack = [];

	// Traverse from right to left
	for (let i = nums.length - 1; i >= 0; i--) {
		// Pop elements from stack while they are smaller than current element
		while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {
			stack.pop();
		}

		// If stack is not empty, top element is the next greater element
		if (stack.length > 0) {
			result[i] = stack[stack.length - 1];
		}

		// Push current element to stack
		stack.push(nums[i]);
	}

	return result;
}

console.log('\nReverse approach:');
console.log('Output:', nextGreaterElementReverse(input));
