function getMostRepeatedCharacter(input) {
	const hash = {};
	let i,
		item,
	for (i = 0; i < input.length; i++) {
		item = input[i];
		console.log('item', item);
		hash[item] = (hash[item] || 0) + 1;
		if (hash['maxCount'] < hash[item]) {
			hash['maxCount'] = hash[item];
			hash['maxCountChar'] = item;
		}
	}
	return hash['maxCountChar'];
}

getMostRepeatedCharacter('dsdgdgdf');
