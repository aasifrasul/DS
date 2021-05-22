function findDupliateItem(arr) {
	var i = 0;
	var totalSum = 0;
	var uniqueSum = 0;
	var len = arr.length;
	while (i < len) {
		console.log('i, arr[i]', i, arr[i]);
		totalSum += arr[i];
		console.log('totalSum', totalSum);
		i++;
		if (i != len) {
			uniqueSum += i;
			console.log('uniqueSum', uniqueSum);
		}
	}

	return totalSum - uniqueSum;
}

findDupliateItem([1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10]);
