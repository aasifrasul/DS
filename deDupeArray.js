
const deDupeArray = arr => {
	if (!Array.isArray(arr) || arr.length <= 1) {
		return [];
	}
	const count = arr.length;
	const hash = {};
	const uniqueVals = [];
	let num = 0;
	for (i = 0; i < count; i++) {
		num = arr[i];
		if (!hash[num]) {
			hash[num] = num;
			uniqueVals.push(num);
		}
	}
	return uniqueVals;
}

function dedupe(arr) {
	const cleaned = {};
	return Array.isArray(arr) && arr.filter(n => !cleaned[n] && (cleaned[n] = true));
}
