function getBiggestWordFromDictionary(dict, str) {
	var cur,
		hash = {},
		isMatch,
		matched = '';

	for (var i = str.length - 1; i >= 0; i--) {
		hash[str[i]] = str[i];
	}

	for (var i = dict.length - 1; i >= 0; i--) {
		isMatch = true;
		cur = dict[i];
		for (var j = cur.length - 1; j >= 0; j--) {
			if (!hash[cur[j]]) {
				isMatch = false;
			}
		}

		if (isMatch && cur.length > matched.length) {
			matched = cur;
		}
	}

	return matched;
}

getBiggestWordFromDictionary(['to', 'toe', 'toes', 'oats', 'oat'], 'tao');
