var isPalinDrome = function (str) {
	if (typeof str !== "string" || str.length === 0) {
		return false;
	}

	var size = str.length;
	var len = Math.floor(size / 2);
	for (var i = 0; i < len; i++) {
		if (str[i] !== str[size - i - 1]) {
			console.log(str[i], str[size - i - 1]);
			return false;
		}
	}

	return true;
};
