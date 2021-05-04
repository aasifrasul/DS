/*

	given a mtrix of M*N, and a size w, find all the submatrix of w*w size 
	and filter out all the min values in a diff matrix
	e.g.
	[
		[1,2,3],
		[4,5,6],
		[7,8,9]
	]
	[1,2,3,4,5,6,7,8,9]
	The sub Matrices are
	[
		[1,2],
		[4,5]
	]
	[
		[2,3],
		[5,6]
	]
	[
		[4,5],
		[7,8]
	]
	[
		[5,6],
		[8,9]
	]
	
*/

/*
	Solution:
	Flatten the array
	[1,2,3,4,5,6,7,8,9]
	[1,2,4,5]
	[2,3,5,6]
	[4,5,7,8]
	[5,6,8,9]


	[
		[1,2,3,4]
		[5,6,7,8]
		[9,10,11,12]
		[13,14,15,16]
	]
	[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
	[1,2,5,6]
	[2,3,6,7]
	[3,4,7,8]
	[5,6,9,10]
	[6,7,10,11]
	[7,8,11,12]
	[9,10,13,14]
	[10,11,14,15]
	[11,12,15,16]


	[1,2,3,5,6,7,9,10,11]
	[2,3,4,6,7,8,10,11,12]
	[5,6,7,9,10,11,13,14,15]
	[6,7,8,10,11,,12,14,15,16]
*/

function findMinSubMatrix(matrix, size) {
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
		console.log('subArr', subArr);
		if (subArr.length < size * size) {
			console.log('Reached matrix End');
			break;
		}

		aggregateMinMatrix.push(Math.min(...subArr));
		i++;
	}

	return aggregateMinMatrix;
}

function findMinSubMatrix(matrix, size) {
	const flatAndSortedArr = matrix.flat().sort((a, b) => a - b);
	let i = 0;
	const subArr = [];

	while (i < size) {
		const tempArr = flatAndSortedArr.slice(i * size + i, (i + 1) * size + i);
		console.log('tempArr', tempArr);
		subArr.push(...tempArr);
		i++;
	}

	return subArr;
}

var matrix = [
	[1, 2, 3, 4],
	[5, 6, 7, 8],
	[9, 10, 11, 12],
	[13, 14, 15, 16],
];

console.log(findMinSubMatrix(matrix, 3));
