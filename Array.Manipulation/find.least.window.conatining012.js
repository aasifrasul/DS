/**
Given a string S of size N consisting of the characters 0, 1 and 2, 
the task is to find the length of the smallest substring of string S 
that contains all the three characters 0, 1 and 2. If no such substring exists, 
then return -1.
*/

const smallestSubstring = (S) => {
	let res = 9999999;

	// To check 0, 1 and 2
	let zero = false,
		one = false,
		two = false;

	// To store indexes of 0, 1 and 2
	let zeroindex, oneindex, twoindex;
	for (let i = 0; i < S.length; i++) {
		if (S[i] == '0') {
			zero = true;
			zeroindex = i;
		} else if (S[i] == '1') {
			one = true;
			oneindex = i;
		} else if (S[i] == '2') {
			two = true;
			twoindex = i;
		}

		// Calculating length
		if (zero && one && two)
			res = Math.min(
				res,
				Math.max(...[zeroindex, oneindex, twoindex]) -
					Math.min(...[zeroindex, oneindex, twoindex]),
			);
	}

	// In case if there is no substring that contains 0,1 and 2
	if (res == 9999999) return -1;
	return res + 1;
};

// Driver Code
let S = '01212';

// Function call
console.log(smallestSubstring(S));
