var lengthOfLongestSubstring = function (s) {
	if (typeof s !== "string" || s.length === 0) {
		return 0;
	}

	var maxLength = 0;
	var curMaxLength = 0;
	var hash = Object.create(null);

	for (var i = 0; i < s.length; i++) {
		console.log("Current hash => ", hash);
		console.log("Current Cahr => ", s[i]);
		if (hash[s[i]]) {
			console.log("Match Found => ");
			console.log("Max length => ", maxLength);
			console.log("Cur Max length => ", curMaxLength);
			hash = Object.create(null);
			if (curMaxLength > maxLength) {
				maxLength = curMaxLength;
			}
			curMaxLength = 0;
		} else {
			curMaxLength++;
			console.log("Cur Max length => ", curMaxLength);
		}
		hash[s[i]] = true;
	}

	return Math.max(maxLength, curMaxLength);
};
