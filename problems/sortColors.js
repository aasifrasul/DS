var nums = [0,0,0,2,1,,2,1,2,1,2,0,1,0, 0, 0];

var swap = function (nums, i, j) {
	nums[i] = nums[i] + nums[j];
	nums[j] = nums[i] - nums[j];
	nums[i] = nums[i] - nums[j];
	return nums;
};

var sortColors = function (nums) {
	const len = nums.length - 1, mid = Math.floor(len / 2);
	let i = j = (count = 0);

	while (i <= mid) {
		count++;
		console.log(nums);
		if (nums[i] == 2 && nums[len - i] == 0) {
			console.log('swapping 2, 0 from', i, len - i);
			swap(nums, i, len - i);
			i++;
			continue;
		}
		if (nums[i] == 2) {
			j = i;
			while(nums[j] !== 2) {
				j++;
			}
			nums.splice(len, 0, nums.splice(i, j - i)).flat();
			console.log('Moving from ', i, len);
			console.log(nums);
		}
		if (nums[len - i] == 0) {
			j = len - i;
			while(nums[j] !== 2) {
				j--;
			}
			nums.splice(0, 0, nums.splice(j, len - i).flat();
			console.log('Moving from ', len - i, 0);
			console.log(nums);
		}

		++i;
	}
	console.log('count', count);
};

sortColors(nums);
console.log(nums);
