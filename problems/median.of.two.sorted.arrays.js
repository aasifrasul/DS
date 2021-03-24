/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
	const sorted = mergeSortedArray(nums1, nums2);
	const isOdd = sorted.length % 2;
	const mid = isOdd ? Math.floor(sorted.length / 2) : sorted.length / 2 - 1;

	return isOdd ? sorted[mid] : (sorted[mid] + sorted[mid + 1]) / 2;
};

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
