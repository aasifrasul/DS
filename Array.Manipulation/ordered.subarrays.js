/**
Count Strictly Increasing Subarrays
Given an integer array arr[], the task is to count the number of subarrays in arr[] that are strictly increasing and have a size of at least 2. A subarray is a contiguous sequence of elements from arr[]. A subarray is strictly increasing if each element is greater than its previous element.

Examples:

Input: arr[] = [1, 4, 5, 3, 7, 9]
Output: 6
Explanation: The strictly increasing subarrays are: [1, 4], [1, 4, 5], [4, 5], [3, 7], [3, 7, 9], [7, 9]

Input: arr[] = [1, 3, 3, 2, 3, 5]
Output: 4
Explanation: The strictly increasing subarrays are: [1, 3], [2, 3], [2, 3, 5], [3, 5] 

Input: arr[] = [2, 2, 2, 2]
Output: 0
Explanation: No strictly increasing subarray exists.
*/

function orderedSubArrays(items) {
	let count = 0;
	let currentStreak = 1;

	for (let i = 1; i < items.length; i++) {
		if (items[i] > items[i - 1]) {
			currentStreak++;
		} else {
			count += (currentStreak * (currentStreak - 1)) / 2;
			currentStreak = 1;
		}
	}

	count += (currentStreak * (currentStreak - 1)) / 2;

	return count;
}
orderedSubArrays([1, 4, 5, 3, 7, 9]);

function findSubArrays(items) {}

/**
[1,2]=> 1
[1,2,3] => 3
	[1,2], [1,2,3]
	[2,3]
[1,2,3,4] => 6
	[1,2], [1,2,3], [1,2,3,4]
	[2,3], [2,3,4]
	[3,4]
[1,2,3,4,5] => 10
	[1,2], [1,2,3], [1,2,3,4], [1,2,3,4,5]
	[2,3], [2,3,4], [2,3,4.5]
	[3,4], [3,4,5]
	[4,5]
[1,2,3,4,5,6] => 15
	[1,2], [1,2,3], [1,2,3,4], [1,2,3,4,5], [1,2,3,4,5,6]
	[2,3], [2,3,4], [2,3,4.5], [2,3,4.5,6]
	[3,4], [3,4,5], [3,4,5,6]
	[4,5], [4,5,6]
	[5,6]
So basically to find out the count of all possible subAarrays is n * (n-1)/2 
*/
