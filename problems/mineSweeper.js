function reveal(row, col) {
	// check if tile contains bomb
	if (grid[row][col].bomb) {
		gameOver();
		return;
	}

	// reveal tile
	grid[row][col].revealed = true;

	// update adjacent tiles
	var adjacentTiles = getAdjacentTiles(row, col);
	var numAdjacentBombs = 0;
	for (var i = 0; i < adjacentTiles.length; i++) {
		var tile = adjacentTiles[i];
		if (tile.bomb) {
			numAdjacentBombs++;
		}
	}
	grid[row][col].numAdjacentBombs = numAdjacentBombs;

	// recursively reveal adjacent tiles if no adjacent bombs
	if (numAdjacentBombs === 0) {
		for (var i = 0; i < adjacentTiles.length; i++) {
			var tile = adjacentTiles[i];
			if (!tile.revealed) {
				reveal(tile.row, tile.col);
			}
		}
	}
}
