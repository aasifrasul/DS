/*
[[1, 0], [2, 0], [3, 0], [3, 2], [4, 3], [2, 5], [0,6]]

[1,2,3,4]
[0,2,3,5,6]

[0, 1, 2, 3]
{
	0: [1,2],
	1: [3],
	5:[2]
	2: [3],
	3: [4],
	4:[],
}

[0,5,2,1,3,4]
*/

function findOrderingOfTasks(input) {
	const len = input.length;
	const finalArr = [];
	let idx0,
		idx1,
		item,
		i = 0;

	while (i < len) {
		item = input[i];
		idx0 = finalArr.indexOf(item[0]);
		idx1 = finalArr.indexOf(item[1]);
		console.log('item', item);
		console.log('idx1', idx1);
		if (idx1 >= 0) {
			if (idx0 >= 0) {
				if (idx1 > idx0) {
					finalArr[idx0] = finalArr[idx0] + finalArr[idx1];
					finalArr[idx1] = finalArr[idx0] - finalArr[idx1];
					finalArr[idx0] = finalArr[idx0] - finalArr[idx1];
				}
			} else {
				finalArr.splice(idx1 + 1, 0, item[0]);
			}
		} else {
			if (idx0 >= 0) {
				finalArr.splice(idx0, 0, item[1]);
			} else {
				finalArr.push(item[1]);
				finalArr.push(item[0]);
			}
		}
		console.log('finalArr', finalArr);
		i++;
	}
	return finalArr;
}

var input = [
	[1, 0],
	[2, 0],
	[3, 0],
	[3, 2],
	[4, 3],
	[2, 5],
	[0, 6],
];

findOrderingOfTasks(input);
