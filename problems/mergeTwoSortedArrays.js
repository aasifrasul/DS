function mergeSortedArray(a, b) {
	var sorted = [],
		idxA = 0,
		idxB = 0;

	while (idxA < a.length && idxB < b.length) {
		sorted.push(sortFn(a[idxA], b[idxB]) > 0 ? b[idxB++] : a[idxA++]);
	}

	return sorted.concat(idxB < b.length ? b.slice(idxB) : a.slice(idxA));
}

function sortFn(a, b) {
	return a - b;
}

function mergeSortedArray(arr1, arr2) {
	let merged = [];
	let index1 = 0;
	let index2 = 0;
	let current = 0;

	while (current < arr1.length + arr2.length) {
		let isArr1Depleted = index1 >= arr1.length;
		let isArr2Depleted = index2 >= arr2.length;

		if (!isArr1Depleted && (isArr2Depleted || arr1[index1] < arr2[index2])) {
			merged[current] = arr1[index1];
			index1++;
		} else {
			merged[current] = arr2[index2];
			index2++;
		}

		current++;
	}

	return merged;
}

console.log(mergeSortedArray([1, 2, 3, 5, 9], [4, 6, 7, 8]));
