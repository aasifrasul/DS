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

	return subArr;
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

function findMinSubMatrix(mat) {
	const len = mat.length;
	const hash = {};

	for (let i = 2; i < len; i++) {
		hash[i] = [];
		for (let j = 0; j < len - 2; j++) {
			for (let k = 0; k < len - 2; k++) {
				console.log(mat[j].slice(k, i), mat[j + 1].slice(k, i));
				hash[i].push([mat[j].slice(k, i), mat[j + 1].slice(k, i)]);
			}
		}
	}
	return hash;
}
findMinSubMatrix(matrix, 2, 14);
