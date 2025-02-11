// Merge overlapping intervals
function mergeOverlappingIntervals(intervals) {
	const sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);
	const result = [sortedIntervals[0]];

	for (let i = 1; i < sortedIntervals.length; i++) {
		const currentInterval = sortedIntervals[i];
		const lastMergedInterval = result[result.length - 1]; // Get the latest merged interval

		// if the the higher mark of the last Merged Interval is greater than
		// lower mark of the next item, then it needs to merge,
		// and the higher mark would be bigger of the two higher marks of the items
		if (lastMergedInterval[1] >= currentInterval[0]) {
			lastMergedInterval[1] = Math.max(currentInterval[1], lastMergedInterval[1]);
		} else {
			result.push(currentInterval);
		}
	}
	return result;
}

const sortedIntervals = [
	[1, 3],
	[2, 6],
	[3, 4],
	[8, 10],
	[15, 18],
	[5, 9],
];
mergeOverlappingIntervals(sortedIntervals);
