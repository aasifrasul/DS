function orderedBraces(str) {
	const len = str.length;
	const bracesCount = {
		'{': 0,
		'}': 0,
		'[': 0,
		"]": 0,
		'(': 0,
		')': 0,
	};

	//for (var i = str.length - 1; i >= 0; i--) {
	for (let value of str) {
		if (value in bracesCount) {
			bracesCount[value] = bracesCount[value] + 1;
			console.log('bracesCount', bracesCount);
		}
	}

	return (bracesCount['{'] === bracesCount['}'] && bracesCount['['] === bracesCount[']'] && bracesCount['('] === bracesCount[')']) ? 'valid' : 'invalid';
}

orderedBraces('{dfhhfg}');