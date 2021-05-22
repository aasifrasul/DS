var diagonalSumOfMatrix = function (mat) {
	const rowLength = mat[0].length - 1;
	let sum = 0;

	function addSum(val) {
		sum += val;
		// console.log('val, sum', val, sum)
	}

	for (let i = 0; i < rowLength + 1; i++) {
		// console.log('i', i)
		addSum(mat[i][i]);
		i !== Math.abs(rowLength - i) && addSum(mat[i][rowLength - i]);
	}

	return sum;
};

var mat = [
	[1, 2, 3, 4, 5],
	[6, 7, 8, 9, 10],
	[11, 12, 13, 14, 15],
	[16, 17, 18, 19, 20],
	[21, 22, 23, 24, 25],
];

console.log(diagonalSumOfMatrix(mat));
