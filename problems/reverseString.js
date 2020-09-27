const reverseString = (str) => {
	if (typeof str !== "string") {
		return "";
	}
	let reversedString = "";

	for (i = 0; i < str.length; i++) {
		reversedString = `${str[i]}${reversedString}`;
	}

	return reversedString;
};
