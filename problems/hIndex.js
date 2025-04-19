var hIndex = function (citations) {
	citations = citations.sort((a, b) => b - a);
	let i;
	for (i = 0; i < citations.length; i++) {
		console.log(i);
	}
	return i + 1;
};

hIndex([100]);
