const reverseWords = (str) => {
	if (typeof str !== 'string') {
		return '';
	}
	var reversedWords = '';
	var flag = 0;
	var subStr = '';
	const count = str.length;
	for (i = 0; i < count; i++) {
		if (str[i] === ' ' || i === count - 1) {
			if (flag) {
				if (i === count - 1) {
					subStr = str.substr(flag + 1, i - flag);
				} else {
					subStr = str.substr(flag + 1, i - flag - 1);
				}
			} else {
				subStr = str.substr(flag, i - flag);
			}
			reversedWords = reversedWords ? `${subStr} ${reversedWords}` : subStr;
			flag = i;
		}
	}
	return reversedWords;
};
