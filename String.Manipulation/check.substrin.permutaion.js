function checkSubStrinPermutation(txt, pat) {
	if (pat.length > txt.length) {
		return false;
	}

	const hash = {};

	for (let i = 0; i < pat.length; i++) {
		hash[pat[i]] = (hash[pat[i]] || 0) + 1;
	}

	for (let i = 0; i < txt.length; i++) {
		if (txt[i] in hash) {
			hash[txt[i]] -= 1;
			if (hash[txt[i]] === 0) {
				delete hash[txt[i]];
			}
		}
	}

	return Object.keys(hash).length === 0 ? true : false;
}

checkSubStrinPermutation('geeks', 'eke');

function findAllSubArraysGreaterThanK(items, K) {
	const result = [];
	let currItems = [items[0]];
	const size = items.length;
	let i = 1;

	while (i < size) {
		if (items[i] > items[i - 1]) {
			currItems.push(items[i]);
		} else {
			currItems = [items[i]];
		}

		if (currItems.length >= K) {
			result.push([...currItems]);
		}

		i++;
	}

	return result;
}

findAllSubArraysGreaterThanK([1, 4, 5, 3, 7, 9], 2);
