function isValidSudoku(board) {
	const rows = Array(9)
		.fill()
		.map(() => Array(9).fill(false));
	const cols = Array(9)
		.fill()
		.map(() => Array(9).fill(false));
	const boxes = Array(9)
		.fill()
		.map(() => Array(9).fill(false));

	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			const cell = board[i][j];

			if (cell === '.') continue;

			const num = parseInt(cell) - 1; // Convert '1'-'9' to 0-8 index
			const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
			console.log(i, j, boxIndex);
			// Check if number already exists in row, column, or box
			if (rows[i][num] || cols[j][num] || boxes[boxIndex][num]) {
				return false;
			}

			// Mark number as seen in row, column, and box
			rows[i][num] = true;
			cols[j][num] = true;
			boxes[boxIndex][num] = true;
		}
	}

	return true;
}

console.log(
	isValidSudoku([
		['5', '3', '.', '.', '7', '.', '.', '.', '4'],
		['6', '.', '.', '1', '9', '5', '.', '.', '.'],
		['.', '9', '8', '.', '.', '.', '.', '6', '.'],
		['8', '.', '.', '.', '6', '.', '.', '.', '3'],
		['4', '.', '.', '8', '.', '3', '.', '.', '1'],
		['7', '.', '.', '.', '2', '.', '.', '.', '6'],
		['.', '6', '.', '.', '.', '.', '2', '8', '.'],
		['.', '.', '.', '4', '1', '9', '.', '.', '5'],
		['.', '.', '.', '.', '8', '.', '.', '7', '9'],
	]),
);
