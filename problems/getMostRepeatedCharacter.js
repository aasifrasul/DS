function getMostRepeatedCharacter(inputString) {
	const hash = Object.create(null);
	const hashLastCount = Object.create(null);
	const len = inputString.length;
	let i,
		item,
		max = 0,
		currentCount,
		char;
	hash[1] = [];
	if (len < 2) return inputString;
	for (i = 0; i < len; i++) {
		item = inputString[i];
		console.log('item', item);
		if (typeof hashLastCount[item] === 'undefined') {
			hash[1] = { [item]: item };
			hashLastCount[item] = 1;
		} else {
			currentCount = hashLastCount[item] + 1;
			console.log('lastCount', currentCount);
			hashLastCount[item] = currentCount;
			if (typeof hash[currentCount] === 'undefined') {
				hash[currentCount] = { [item]: item };
			} else {
				hash[currentCount][item] = item;
			}

			delete hash[currentCount - 1][item];

			max = Math.max(max, currentCount);
		}
		console.log('hash', Object.assign({}, hash));
	}
	console.log(hash);
}

console.log(getMostRepeatedCharacter('dsdgdgdf'));
