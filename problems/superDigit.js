function superDigit(num, sum = 0) {
	console.log(num);
	if (num == 0) {
		if (Math.floor(sum / 10)) {
			return superDigit(sum);
		} else {
			return sum;
		}
	} else {
		sum += num % 10;
		return superDigit(Math.floor(num / 10), sum);
	}
}

console.log(superDigit(987654));
