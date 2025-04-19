function longestUniqueSubString(str) {
	let hash = {};
	let start = 0;
	let maxLength = 0;
	let char;
	for (let i = 0; i < str.length; i++) {
		char = str[i];
		if (char in hash) {
			console.log(i, start, maxLength);
			if (start) {
				if (i - start > maxLength) {
					maxLength = i - start;
				}
			} else {
				maxLength = i;
			}

			start = Math.max(hash[char] + 1, start);
		}

		hash[char] = i;
	}

	console.log(start, hash);

	return Math.max(maxLength, str.length - start);
}

longestUniqueSubString('abcdghdeafbc');
