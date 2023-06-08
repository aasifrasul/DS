/*

function twoSum(arr, sum) {
	const len = arr.length;
	let diff;

	const hash = {};

	for (let i = 0; i < len - 1; i++) {
		console.log(JSON.stringify(hash));
		diff = sum - arr[i];
		if (arr[i] in hash) {
			return [hash[arr[i]], i];
		}

		hash[diff] = i;
	}
}

twoSum([1, -4, 6, 4, -5, -7, 5, 0], 11);

*/

function threeSum(arr, sum) {
	const len = arr.length;
	let diff, sumTwo;

	const hash = {};

	for (let i = 0; i < len - 1; i++) {
		for (let j = i + 1; j < len; j++) {
			console.log(i, j, JSON.stringify(hash));
			sumTwo = arr[i] + arr[j];
			diff = sum - sumTwo;
			console.log(sumTwo, diff);
			if (sumTwo in hash) {
				return hash[sumTwo].split(',').concat(j);
			}

			hash[diff] = `${i},${j}`;
		}
	}
}

threeSum([0, 1, 2, 3, 4, 5 ,6], 10);
