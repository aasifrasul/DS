// Gives the diff between Biggest and Smallest element

// const getMaxDifference = arr => Math.max.apply(null, arr) - Math.min.apply(null, arr);
// const getMaxDifference = arr => Math.max(...list) - Math.min(...list);
// const getMaxDifference = arr => arr.reduce((a, b) => Math.max(a, b)) - arr.reduce((a, b) => Math.min(a, b));

function getMaxDifference(arr) {
	let min = arr[0],
		max = arr[0],
		len = arr.length,
		num,
		i;

	for (i = 0; i < len; i++) {
		num = arr[i];
		min = min > num ? num : min;
		max = max < num ? num : max;
	}

	return max - min;
}
