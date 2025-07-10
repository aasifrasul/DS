[0, 1, 0, 1, 0, 0, 1, 1, 1, 0]
[0, 0, 0, 1, 0, 0, 1, 1, 1, 1]
[0, 0, 0, 0, 0, 1, 1, 1, 1, 1]

function sortOnesAndZeores(items) {
	let left = 0;
	let right = items.length - 1;

	while (left < right) {
		if (items[left] == 1 && items[right] === 0) {
			[items[left], items[right]] = [items[right], items[left]];
			left++;
			right--;
		} else if(items[left] == 0) {
			left++;
		} else if(items[right] === 1) {
			right--;
		}
	}
}

console.log(sortOnesAndZeores([0, 1, 0, 1, 0, 0, 1, 1, 1, 0]));
