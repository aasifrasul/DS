// A Naive recursive implementation of LCS problem

// Returns length of LCS for s1[0..m-1], s2[0..n-1]
function lcs(s1, s2, m, n) {
	// Base case: If either string is empty, the length of LCS is 0
	if (m === 0 || n === 0) return 0;

	// If the last characters of both substrings match
	if (s1[m - 1] === s2[n - 1])
		// Include this character in LCS and recur for remaining substrings
		return 1 + lcs(s1, s2, m - 1, n - 1);
	// If the last characters do not match
	// Recur for two cases:
	// 1. Exclude the last character of S1
	// 2. Exclude the last character of S2
	// Take the maximum of these two recursive calls
	else return Math.max(lcs(s1, s2, m, n - 1), lcs(s1, s2, m - 1, n));
}

// driver code
let s1 = 'AGGTAB';
let s2 = 'GXTXAYB';
let m = s1.length;
let n = s2.length;

console.log(lcs(s1, s2, m, n));

// A Top-Down DP implementation of LCS problem

// Returns length of LCS for s1[0..m-1], s2[0..n-1]
function lcs(s1, s2, m, n, memo) {
	// Base Case
	if (m === 0 || n === 0) return 0;

	// Already exists in the memo table
	if (memo[m][n] !== -1) return memo[m][n];

	// Match
	if (s1[m - 1] === s2[n - 1]) {
		memo[m][n] = 1 + lcs(s1, s2, m - 1, n - 1, memo);
		return memo[m][n];
	}

	// Do not match
	memo[m][n] = Math.max(lcs(s1, s2, m, n - 1, memo), lcs(s1, s2, m - 1, n, memo));
	return memo[m][n];
}

// driver code
const s1 = 'AGGTAB';
const s2 = 'GS1TS1AS2B';

const m = s1.length;
const n = s2.length;
const memo = Array.from({ length: m + 1 }, () => Array(n + 1).fill(-1));

console.log(lcs(s1, s2, m, n, memo));
