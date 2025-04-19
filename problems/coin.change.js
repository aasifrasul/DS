// JavaScript program for coin change problem.
// using recursion

function countRecur(coins, n, sum) {
	// If sum is 0 then there is 1 solution
	// (do not include any coin)
	if (sum === 0) return 1;

	// 0 ways in the following two cases
	if (sum < 0 || n === 0) return 0;

	// count is sum of solutions (i)
	// including coins[n-1] (ii) excluding coins[n-1]
	return countRecur(coins, n, sum - coins[n - 1]) + countRecur(coins, n - 1, sum);
}

function count(coins, sum) {
	return countRecur(coins, coins.length, sum);
}

const coins = [1, 2, 3];
const sum = 5;
console.log(count(coins, sum));

// JavaScript program for coin change problem using tabulation

function count(coins, sum) {
	const n = coins.length;

	// 2d dp array where n is the number of coin
	// denominations and sum is the target sum
	const dp = Array.from({ length: n + 1 }, () => Array(sum + 1).fill(0));

	// Represents the base case where the target sum is 0,
	// and there is only one way to make change: by not
	// selecting any coin
	dp[0][0] = 1;
	for (let i = 1; i <= n; i++) {
		for (let j = 0; j <= sum; j++) {
			// Add the number of ways to make change without
			// using the current coin
			dp[i][j] += dp[i - 1][j];

			if (j - coins[i - 1] >= 0) {
				// Add the number of ways to make change
				// using the current coin
				dp[i][j] += dp[i][j - coins[i - 1]];
			}
		}
	}
	return dp[n][sum];
}

const coins = [1, 2, 3];
const sum = 5;
console.log(count(coins, sum));

// JavaScript program for coin change problem
// using space optimised dp

function count(coins, sum) {
	const n = coins.length;

	// dp[i] will be storing the number of solutions for
	// value i. We need sum+1 rows as the dp is
	// constructed in bottom up manner using the base case
	// (sum = 0)
	const dp = Array(sum + 1).fill(0);

	// Base case (If given value is 0)
	dp[0] = 1;

	// Pick all coins one by one and update the table[]
	// values after the index greater than or equal to the
	// value of the picked coin
	for (let i = 0; i < n; i++)
		for (let j = coins[i]; j <= sum; j++) dp[j] += dp[j - coins[i]];

	return dp[sum];
}

const coins = [1, 2, 3];
const sum = 5;
console.log(count(coins, sum));
