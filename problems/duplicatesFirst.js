function duplicatesFirst(arr) {
	let i = 1;
	let count = 1;
	while (count < arr.length) {
		count++;

		//if (typeof hash[Next Item] === 'undefined') {
		//	hash[Next Item] = Next Item;
		if (arr[i] === arr[i - 1]) {
			arr.push(arr.splice(i, 1)[0]);
			console.log('i, hash, arr', i, hash, arr);
		} else {
			i++;
		}
	}
	return arr;
}

duplicatesFirst([0, 0, 0, 0, 1, 1, 2, 3, 3, 3]);
// Output  should be [ 0, 1, 2, 3, 0, 0, 0, 1, 3, 3]

/*
Next Item 0:=> No Change		[0, 0, 0, 0, 1, 1, 2, 3, 3, 3]
Next Item 0:=> PUSH IT TO END	[0, 0, 0, 1, 1, 2, 3, 3, 3, 0] 
Next Item 0:=> PUSH IT TO END	[0, 0, 1, 1, 2, 3, 3, 3, 0, 0] 
Next Item 0:=> PUSH IT TO END	[0, 1, 1, 2, 3, 3, 3, 0, 0, 0] 
Next Item 1:=> No Change		[0, 1, 1, 2, 3, 3, 3, 0, 0, 0] 
Next Item 1:=> PUSH IT TO END	[0, 1, 2, 3, 3, 3, 0, 0, 0, 1] 
Next Item 2:=> No Change		[0, 1, 2, 3, 3, 3, 0, 0, 0, 1] 
Next Item 3:=> No Change		[0, 1, 2, 3, 3, 3, 0, 0, 0, 1] 
Next Item 3:=> PUSH IT TO END	[0, 1, 2, 3, 3, 0, 0, 0, 1, 3] 
Next Item 3:=> PUSH IT TO END	[0, 1, 2, 3, 0, 0, 0, 1, 3, 3] 
*/
