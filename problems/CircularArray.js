function circularArray(arr, pos) {
	const newArr = [];
	let len = arr.length - 1;
	let i = 0;

	while (len >= pos) {
		newArr.unshift(arr[len]);
		len--;
	}
	while (i < pos) {
		newArr.push(arr[i]);
		i++;
	}
	return newArr;
}

circularArray(['A', 'B', 'C', 'D', 'E', 'F'], 3);

///This however can be implemented in a one liner

function circularArray(arr, pos) {
	return arr.splice(pos, arr.length).concat(arr);
}
