function display(obj) {
	console.log(JSON.parse(JSON.stringify(obj)));
}

function longestPalindromicSubstring(str) {
	if (!str || str.length < 2) return str;

	const n = str.length;
	// dp[i][j] represents whether substring from index i to j is palindrome
	const dp = Array(n)
		.fill()
		.map(() => Array(n).fill(false));

	// All substrings of length 1 are palindromes
	for (let i = 0; i < n; i++) {
		dp[i][i] = true;
	}

	display(dp);

	let start = 0;
	let maxLength = 1;

	// Check for substrings of length 2
	for (let i = 0; i < n - 1; i++) {
		if (str[i] === str[i + 1]) {
			dp[i][i + 1] = true;
			start = i;
			maxLength = 2;
		}
	}

	display(dp);

	// Check for substrings of length 3 or more
	for (let len = 3; len <= n; len++) {
		console.log('len', len);
		for (let i = 0; i <= n - len; i++) {
			const j = i + len - 1;
			console.log('i', i);
			console.log('j', j);
			console.log('string', str.slice(i, len));
			console.log('dp[i + 1][j - 1]', dp[i + 1][j - 1]);
			console.log(`str[i] (${str[i]}) === str[j] (${str[j]}) `, str[i] === str[j]);

			// Check if substring from (i+1) to (j-1) is palindrome
			// and characters at i and j match
			if (dp[i + 1][j - 1] && str[i] === str[j]) {
				console.log('found ^');
				display(dp);
				dp[i][j] = true;
				if (len > maxLength) {
					start = i;
					maxLength = len;
				}
			}
		}
	}

	return str.slice(start, start + maxLength);
}

// Test cases
console.log(longestPalindromicSubstring('aba')); // "bab" or "aba"
