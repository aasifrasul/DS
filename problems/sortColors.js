var swap = function (nums, i, j) {
	console.log('swapping', i, j);
	nums[i] = nums[i] + nums[j];
	nums[j] = nums[i] - nums[j];
	nums[i] = nums[i] - nums[j];
	return nums;
};

var sortColors = function (nums) {
	const len = nums.length - 1,
		res = [];
	let i = 0,
		item;

	while (i <= len - i) {
		item = nums[i];

		if (item === 2 && nums[len - i] == 0) {
			swap(nums, i, len - i);
		}

		if (item === 2 && nums[len - i] == 1) {
			swap(len - i, i, len - i);
		} else {
			nums.splice(len, 0, nums.splice(i, 1)[0]);
		}

		if (item === 1 && nums[len - i] == 0) {
			swap(nums, i, len - i);
		} else {
			nums.splice(0, 0, nums.splice(len - i, 1)[0]);
		}

		if (item === 1 && nums[i + 1] == 0) {
			swap(nums, i, i + 1);
		}

		if (nums[len - i] === 1 && nums[len - i - 1] == 2) {
			swap(nums, len - i, len - i - 1);
		}

		console.log(nums);

		++i;
	}

	nums.splice(nums.lastIndexOf(0) + 1, 0, ...res);

	console.log(nums);
};

sortColors([2, 0, 2, 2, 0, 1, 1, 0]);
