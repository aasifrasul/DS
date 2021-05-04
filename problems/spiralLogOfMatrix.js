/*

[
	[1,2,3],
	[4,5,6],
	[7,8,9]
]

*/

var isArray = (arr) => Object.prototype.toString.call(arr).slice(8, -1).toLowerCase();
function spiralLogOfMatrix(matrix) {
	if (isArray(matrix) !== 'array' || !matrix.length) {
		return matrix;
	}
	const finalRes = [];
	let topLeft = 0;
	let topRight = matrix[0].length - 1;
	let botLeft = 0;
	let botRight = matrix.length - 1;
	let dir = 0;
	let i = 0;

	while (topLeft <= topRight && botLeft <= botRight) {
		if (dir == 0) {
			i = topLeft;
			while (i <= topRight) {
				finalRes.push(matrix[topLeft][i]);
				i++;
			}
			dir = 1;
			topLeft++;
		} else if (dir == 1) {
			i = topLeft;
			while (i < topRight) {
				finalRes.push(matrix[i][topRight]);
				i++;
			}
			dir = 2;
		} else if (dir == 2) {
			i = topRight;
			while (i >= botLeft) {
				finalRes.push(matrix[botRight][i]);
				i--;
			}
			dir = 3;
			botLeft++;
			botRight--;
		} else if (dir == 3) {
			i = botRight;
			while (i > topLeft - 1) {
				finalRes.push(matrix[i][topLeft - 1]);
				i--;
			}
			topRight--;
			dir = 0;
		}
	}

	return finalRes;
}

var mat = [
	[1, 2, 3, 4, 5, 6],
	[7, 8, 9, 10, 11, 12],
	[13, 14, 15, 16, 17, 18],
	[19, 20, 21, 22, 23, 24],
	[25, 26, 27, 28, 29, 30],
	[31, 32, 33, 34, 35, 36],
];

console.log(spiralLogOfMatrix(mat));
