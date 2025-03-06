class Range {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}

	*[Symbol.iterator]() {
		for (let i = this.start; i < this.end; i++) {
			yield i;
		}
	}
}

var numOfSubarrays = function (arr) {
	const len = arr.length;
	let sum = 0;
	let result = 0;

	for (const i of new Range(0, len)) {
		sum = 0;
		for (const j of new Range(i, len)) {
			sum += arr[j];
			console.log(arr[j], sum, sum % 2);
			if (Boolean(sum % 2)) {
				result += 1;
			}
		}
	}

	return result;
};

numOfSubarrays([1, 3, 5]);
