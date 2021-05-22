/*
function spiralTraverseOfMatrix(matrix) {
	let left = 0;
	let top = 0;
	let bottom = matrix.length - 1; // Row Length
	let right = matrix[0].length - 1; // Col Length 
	let dir = (i = 0);
	const finalArr = [];
	let count = 0;

	while (left <= right && top <= bottom) {
		count++;
		console.log('finalArr', finalArr)
		switch (dir) {
			case 0: // left -> right (on the top)
				i = left;
				while (i < right + 1) {
					finalArr.push(matrix[top][i]);
					i++;
				}
				top++;
				dir = 1;
				break;
			case 1: // top -> bottom (on the right)
				i = top;
				while (i < bottom + 1) {
					finalArr.push(matrix[i][right]);
					i++;
				}
				right--;
				dir = 2;
				break;
			case 2: // right -> left (on the bottom)
				i = right;
				while (i >= left) {
					finalArr.push(matrix[bottom][i]);
					i--;
				}
				bottom--;
				dir = 3;
			case 3: // bottom -> top (on the left)
				i = bottom;
				while (i > top - 1) {
					finalArr.push(matrix[i][left]);
					i--;
				}
				dir = 0;
				left++;
		}
	}

	console.log('count =>',count)
	return finalArr;
}

*/

function spiralTraverseOfMatrix(matrix) {
	let dir = 0,
		top = 0,
		left = 0,
		bottom = matrix.length - 1, // Row count
		right = matrix[0].length - 1, // Col count
		i;
	const finalArr = [];

	while (left <= right && top <= bottom) {
		switch (dir) {
			case 0: // left -> right (on top of the matrix)
				for (i = left; i <= right; i++) {
					finalArr.push(matrix[top][i]);
				}
				top++;
				dir = 1;
				break;
			case 1: // top -> bottom (on right side of the matrix)
				for (i = top; i <= bottom; i++) {
					finalArr.push(matrix[i][right]);
				}
				right--;
				dir = 2;
				break;
			case 2: // right -> left (on bottom of the matrix)
				for (i = right; i >= left; i--) {
					finalArr.push(matrix[bottom][i]);
				}
				bottom--;
				dir = 3;
				break;
			case 3: // bottom -> top (on left side of the matrix)
				for (i = bottom; i >= top; i--) {
					finalArr.push(matrix[i][left]);
				}
				left++;
				dir = 0;
				break;
		}
	}

	return finalArr;
}

var matrix = [
	[1, 2, 3, 4, 5],
	[6, 7, 8, 9, 10],
	[11, 12, 13, 14, 15],
	[16, 17, 18, 19, 20],
	[21, 22, 23, 24, 25],
];

console.info(spiralTraverseOfMatrix(matrix));
