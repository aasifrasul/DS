function findMinSubMatrix(matrix, size, sum) {
	let flatMatrix = [];
	const colLength = matrix[0].length;
	const rowLength = matrix.length;
	const step = colLength - size;
	let i = 0,
		j = 0;
	const aggregateMinMatrix = [];
	let subArr;
	if (step < 0) {
		return [];
	}

	// flatMatrix = matrix.flat();
	matrix.forEach((item) => {
		console.log(item);
		flatMatrix = flatMatrix.concat(item);
	});

	console.log('flatMatrix', flatMatrix);

	while (i < flatMatrix.length) {
		if ((i % colLength) + size > colLength) {
			console.log('Reached Row End', i);
			i++;
			continue;
		}
		subArr = [];
		j = 0;
		while (j < size) {
			subArr = subArr.concat(flatMatrix.slice(i + j * size + j * step, i + (j + 1) * size + j * step));
			j++;
		}
		if (
			sum ===
			subArr.reduce((accu, item) => {
				return accu + item;
			}, 0)
		) {
			return subArr;
		}

		i++;
	}

	return [];
}

function findMinSubMatrix(matrix, size, sum) {
	const flatArr = matrix.flat();
	let tempFlatArr;
	let i = 0,
		j = 0;
	let subArr = [];

	while (j < flatArr.length) {
		subArr = [];
		tempFlatArr = flatArr.slice(j);
		console.log('tempFlatArr', tempFlatArr);
		while (i < size) {
			const tempArr = tempFlatArr.slice(i * size + i, (i + 1) * size + i);
			console.log('tempArr', tempArr);
			subArr.push(...tempArr);
			i++;
		}
		console.log('subArr', subArr);
		if (subArr.length < size * size) {
			break;
		}
		j++;
	}

	return subArr;
}

var matrix = [
	[1, 2, 3, 4],
	[5, 6, 7, 8],
	[9, 10, 11, 12],
	[13, 14, 15, 16],
];
/*
	[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

	2X2
	[1,2,5,6]
	[2,3,6,7]
	[3,4,7,8]
	[5,6,9,10]
	[6,7,10,11]
	[7,8,11,12]
	[9,10,13,14]
	[10,11,14,15]
	[11,12,15,16]

	3X3
	[1,2,3,5,6,7,9,10,11]
	[2,3,4,6,7,8,10,11,12]
	[5,6,7,9,10,11,13,14,15]
	[6,7,8,10,11,,12,14,15,16]
*/

findMinSubMatrix(matrix, 2, 14);
