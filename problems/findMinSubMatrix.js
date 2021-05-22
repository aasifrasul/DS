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
	2 X 2
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


	3 X 3
	[1,2,3,5,6,7,9,10,11]
	[2,3,4,6,7,8,10,11,12]
	[5,6,7,9,10,11,13,14,15]
	[6,7,8,10,11,,12,14,15,16]
*/

/*
function findMinSubMatrix(matrix, size) {
	let flatMatrix = [];
	const colLength = matrix[0].length;
	const step = colLength - size;
	let i = 0,
		j = 0;
	const finalArray = [];
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
			console.log('subArr row', flatMatrix.slice(i + j * size + j * step, i + (j + 1) * size + j * step));
			subArr = subArr.concat(flatMatrix.slice(i + j * size + j * step, i + (j + 1) * size + j * step));
			j++;
		}
		console.log('subArr', subArr);
		if (subArr.length < size * size) {
			console.log('Reached matrix End');
			break;
		}

		finalArray.push(Math.min(...subArr));
		// Can also use Math.min.apply(Math, subArr)
		i++;
	}

	return finalArray;
}

var matrix = [
	[1, 2, 3, 4, 25],
	[5, 6, 7, 8, 26],
	[9, 10, 11, 12, 27],
	[13, 14, 15, 16, 28],
	[29, 30, 31, 32, 33],
];

console.log(findMinSubMatrix(matrix, 4));
*/
function findMinSubMatrix(mat, size) {
	const finalArray = [],
		colLength = mat[0].length,
		rowLength = mat.length,
		step = colLength - size;
	let i = (j = k = 0),
		flattenedMatrix = [],
		tempArr = [];
	let count = 0;

	mat.forEach((i) => {
		flattenedMatrix = flattenedMatrix.concat(i);
	});
	while (i < flattenedMatrix.length) {
		if ((i % colLength) + size > colLength) {
			console.log('Row end reached', i, (i % colLength) + size);
			i++;
			continue;
		}
		tempArr = [];
		j = 0;
		while (j < size * size) {
			count++;
			k = i + j;
			if (j >= size) {
				k += step;
			}
			console.log('k', k);
			if (!flattenedMatrix[k]) {
				break;
			}
			tempArr.push(flattenedMatrix[k]);
			j++;
		}
		if (tempArr.length < size * size) {
			console.log('End reached', i);
			break;
		}
		console.log('count', count);
		finalArray.push(Math.min(...tempArr));
		i++;
	}
	return finalArray;
}

var matrix = [
	[1, 2, 3, 4, 25],
	[5, 6, 7, 8, 26],
	[9, 10, 11, 12, 27],
	[13, 14, 15, 16, 28],
	[29, 30, 31, 32, 33],
];

console.log(findMinSubMatrix(matrix, 4));
