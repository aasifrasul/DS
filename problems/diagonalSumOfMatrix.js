var mat = [
	[01, 02, 03, 04, 05],
	[06, 07, 08, 09, 10],
	[11, 12, 13, 14, 15],
	[16, 17, 18, 19, 20],
	[21, 22, 23, 24, 25],
];

function sumOfDiagonalNumbersInMatrix(mat) {
	const len = mat.length;
	let sum = 0;

	for (let i = 0; i < len; i++) {
		console.log(mat[i][i], mat[i][len - i - 1]);
		sum += mat[i][i] + (i === len - i - 1 ? 0 : mat[i][len - i - 1]);
	}

	return sum;
}

sumOfDiagonalNumbersInMatrix(mat);
