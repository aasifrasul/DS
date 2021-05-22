var nums = [2, 1, 0, 2, 0, 1, 1, 2];

var swap = function (nums, i, j) {
	nums[i] = nums[i] + nums[j];
	nums[j] = nums[i] - nums[j];
	nums[i] = nums[i] - nums[j];
	return nums;
};

var sortColors = function (nums) {
	const len = nums.length - 1;
	let i = (count = 0);

	while (i <= Math.floor(len / 2)) {
		count++;
		console.log(nums);
		if (nums[i] == 2 && nums[len - i] == 0) {
			console.log('swapping', i, len - i);
			swap(nums, i, len - i);
		}
		if (nums[i] == 2) {
			console.log('Moving from ', i, len);
			console.log(nums);
			nums.splice(len, 0, nums.splice(i, 1)[0]);
		}
		if (nums[len - i] == 0) {
			console.log('Moving from ', len - i, 0);
			console.log(nums);
			nums.splice(0, 0, nums.splice(len - i, 1)[0]);
		}
		if (nums[i + 1] == 0) {
			console.log('Moving from ', i + 1, 0);
			console.log(nums);
			nums.splice(0, 0, nums.splice(i + 1, 1)[0]);
		}
		if (nums[len - i - 1] == 2) {
			console.log('Moving from ', len - i - 1, len);
			console.log(nums);
			nums.splice(len, 0, nums.splice(len - i - 1, 1)[0]);
		}

		if (nums[i] > nums[i + 1]) {
			console.log('swapping', i, i + 1);
			swap(nums, i, i + 1);
		}

		++i;
	}
	console.log('count', count);
};

sortColors(nums);
console.log(nums);
