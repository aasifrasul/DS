function getMostRepeatedCharacter(inputString) {
	const hash = Object.create(null);
	const len = inputString.length;
	let i,
		item,
		max = 0,
		key,
		char;
	hash['maxCount'] = 1;
	hash['maxCountChar'] = inputString[0];
	const arr = [];

	for (i = 0; i < len; i++) {
		item = inputString[i];
		const itemCount = hash[item];
		if (typeof itemCount === 'undefined') {
			const arr0 = arr[0] || [];
			arr0.push(item);
			arr[0] = arr0;
			hash[item] = 1;
		} else {
			arr[itemCount - 1].splice(arr[itemCount - 1].indexOf(item), 1);
			const arrn = arr[itemCount] || [];
			arrn.push(item);
			arr[itemCount] = arrn;
			hash[item]++;
		}
	}
	console.log([...new Set(arr)]);
}

console.log(getMostRepeatedCharacter('dsdgdgdf'));
