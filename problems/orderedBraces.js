function orderedBraces(braces) {
	if (!Array.isArray(braces) || !braces.length) {
		return [];
	}

	const bracePairs = {
			'{': 0,
			'[': 0,
			'(': 0,
			'}': 0,
			']': 0,
			')': 0,
		},
		res = [];
	let i = 0,
		j = 0,
		item,
		cur,
		isMatch;

	while (i < braces.length) {
		cur = braces[i];

		if (cur.length % 2) {
			res.push('NO');
			i++;
			continue;
		}
		j = 0;

		while (j < cur.length) {
			item = cur[j];
			bracePairs[item]++;
			j++;
		}

		isMatch =
			!((bracePairs['{'] + bracePairs['}']) % 2) &&
			!((bracePairs['['] + bracePairs[']']) % 2) &&
			!((bracePairs['('] + bracePairs[')']) % 2);

		i++;
		res.push(isMatch ? 'YES' : 'NO');
	}

	return res;
}

console.log(orderedBraces(['{{[()]}}', '{{}[()]}}', '{{[()[]]}}']));
