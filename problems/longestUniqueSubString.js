function longestUniqueSubString(str) {
	let lStr = {};
	let start = 0;
	let diff = 1;
	for (let i = 0; i < str.length; i++) {
		if (str[i] in lStr) {
			console.log(i, start, diff);
			if (str.slice(start, i).length > diff) {
				diff = i - start;
			}

			lStr = {};
			start = i;
		}

		lStr[str[i]] = str[i];
	}

	if (start !== str.length - 1 && str.length - start > diff) {
		diff = str.length - start;
	}

	return diff;
}

longestUniqueSubString('zsfgdfhfgfg');
