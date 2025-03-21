function rotateArrayByKPosition(arr, k) {
	const len = arr.length;

	// Normalize k to handle negative values and values larger than array length
	k = ((k % len) + len) % len; // This handles both positive and negative k

	// If k is 0 or equal to length, no rotation needed
	if (k === 0 || k === len) return arr;

	// Reverse entire array
	reverse(arr, 0, len - 1);

	// Reverse first k elements
	reverse(arr, 0, k - 1);

	// Reverse remaining elements
	reverse(arr, k, len - 1);

	return arr;
}

// Helper function to reverse array portion from start to end index
function reverse(arr, start, end) {
	while (start < end) {
		[arr[start], arr[end]] = [arr[end], arr[start]];
		start++;
		end--;
	}
}

function roteArrayByKPos(nums, k) {
	const len = nums.length;

	// Normalize k to handle negative values and values larger than array length
	k = ((k % len) + len) % len; // This handles both positive and negative k

	// If k is 0 or equal to length, no rotation needed
	if (k === 0) return nums;

	const result = new Array(len);

	for (let i = 0; i < len; i++) {
		const currPos = (i + k) % len;
		result[i] = nums[currPos];
	}

	return result;
}

roteArrayByKPos([1, 2, 3, 4, 5, 6, 7], 2);
roteArrayByKPos([1, 2, 3, 4, 5, 6, 7], 3);
roteArrayByKPos([1, 2, 3, 4, 5, 6, 7], -3);
