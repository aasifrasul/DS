function getLargestRepeatingSubstring(str) {
	const len = str.length,
		hash = {},
		max = {
			size: 0,
		};
	let i = -1,
		char,
		prevChar,
		curSize;

	while (++i < len) {
		char = str[i];
		if (!hash[char]) {
			hash[char] = {
				start: i,
			};
		}

		prevChar = str[i - 1];

		if (prevChar && char !== prevChar) {
			hash[prevChar].end = i - 1;
			curSize = i - hash[prevChar].start;
			if (curSize > max.size) {
				max.size = curSize;
				max.string = str.slice(hash[prevChar].start, i);
			}
			console.log(max);
			delete hash[prevChar];
		}
	}

	return console.log(max);
}

getLargestRepeatingSubstring('sdgdfffffhfgggggghfgrrrrrrrewt');
