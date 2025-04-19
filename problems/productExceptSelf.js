var productExceptSelf = function (nums) {
	const result = new Array(nums.length);

	result[nums.length - 1] = 1;
	for (let i = nums.length - 2; i >= 0; i--) {
		result[i] = result[i + 1] * nums[i + 1];
	}

	let left = 1;
	for (let i = 0; i < nums.length; i++) {
		result[i] *= left;
		left *= nums[i];
	}

	return result;
};

productExceptSelf([1, 2, 3, 4]);

/*
1,2,3,4


result[3] = 1, right = nums[3] = 4;
i = 2, result[2] = result[3] * right (1 * 4) = 4, right = nums[2] = 3;
i = 1, result[1] = result[2] * right (4 * 3) = 12; right = nums[1] = 2;
i = 0, result[0] = result[1] * right (12 * 2) = 24; right = nums[0] = 1;
24,12,4,1

left = 1;
24 * 1, 24, left = 1 * 1 = 1 left = left * num[i], 1 * 1, 1
12 * 1 12, left = 1 * 2 =  left = left * nums[i], 1 * 2, 2
4 * 2 = 8, left = 2 * 3 = 6
1 * 6 = 6, left = 6 * 4 = 24
*/
