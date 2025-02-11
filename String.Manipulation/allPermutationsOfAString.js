// Find all permutations of a string

/*'abcd'
a, b, c, d
ab, bc, ca, ad, bd, cd 
abc, abd, bcd, 
abcd
*/

function display(obj) {
	console.log(JSON.parse(JSON.stringify(obj)));
}

function allPermutationsOfAString(str) {
	const len = str.length;
	const dp = Array(len)
		.fill()
		.map(() => Array(len).fill(''));

	for (let i = 0; i < len; i++) {
		dp[i][i] = str[i];
	}

	for (let i = 0; i < len - 1; i++) {
		dp[i][i + 1] = str[i] + str[i + 1];
	}

	display(dp);

	for (let n = 3; n < len + 1; n++) {
		for (let i = 0; i < len - n + 1; i++) {
			let j = i + n - 1;
			dp[i][j] = str.slice(i, j);
			display(str.slice(i, j));
		}
	}

	display(dp);
}

allPermutationsOfAString('abcd');
