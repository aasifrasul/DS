/**
Count Occurrences of Anagrams
Given a word pattern and a string text consisting of lowercase characters, the task is to return the count of substrings in text which are anagrams of the pattern.

Examples: 

Input : text = "forxxorfxdofr", pattern = "for"
Output : 3
Explanation : Anagrams present are for, orf and ofr. Each appears in the text once and hence the count is 3.

Input : text = "aabaabaa", pattern = "aaba"
Output : 4
Explanation : Anagrams present are aaba and abaa. Each appears twice in the text and hence the count is 4.
*/

function areAnangrams(s1, s2) {
	const hash = {};
	console.log(s1, s2);

	for (let i = 0; i < s1.length; i++) {
		hash[s1[i]] = (hash[s1[i]] || 0) + 1;
		hash[s2[i]] = (hash[s2[i]] || 0) - 1;

		if (hash[s1[i]] === 0) delete hash[s1[i]];
		if (hash[s2[i]] === 0) delete hash[s2[i]];
	}

	console.log(hash);

	for (const char in hash) {
		if (hash[char]) return false;
	}

	return true;
}

function countOfAnagrams(text, pattern) {
	let temp = '';
	let count = 0;

	for (let i = 0; i < text.length - pattern.length + 1; i++) {
		if (areAnangrams(text.slice(i, i + pattern.length), pattern)) count++;
	}

	return count;
}

countOfAnagrams('forxxorfxdofr', 'for');
