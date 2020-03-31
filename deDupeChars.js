
const deDupeChars = str => {
	if (typeof str !== 'string' || !str) {
		return '';
	}
	let len = str.length,
		char, hash = {},
		newStr = '';
	for (let i = 0; i < len; i++) {
		char = str[i];
		if (!hash[char]) {
			hash[char] = char;
			newStr = `${newStr}${char}`;
		}
	}
	return newStr;
};
