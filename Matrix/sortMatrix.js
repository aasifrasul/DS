function sortMatrix(items) {
	// Number of elements in matrix
	const col = items[0].length;
	let size = items.length * col;

	// Loop to sort the matrix
	// using Bubble Sort
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size - 1; j++) {
			// Condition to check
			// if the Adjacent elements
			if (
				items[Math.floor(j / col)][j % col] >
				items[Math.floor((j + 1) / col)][(j + 1) % col]
			) {
				// Swap if previous value is greater
				let temp = items[Math.floor(j / col)][j % col];
				items[Math.floor(j / col)][j % col] =
					items[Math.floor((j + 1) / col)][(j + 1) % col];
				items[Math.floor((j + 1) / col)][(j + 1) % col] = temp;
			}
		}
	}
}

let mat = [
	[5, 4, 7],
	[1, 3, 8],
	[2, 9, 6],
];
sortMatrix(mat);

// Method 1: Flatten, Sort, Reshape (Most Efficient)
function sortMatrixFlat(matrix) {
	const rows = matrix.length;
	const cols = matrix[0].length;

	// Flatten the matrix into a 1D array
	const flattened = matrix.flat();

	// Sort using JavaScript's built-in sort (Timsort - O(n log n))
	flattened.sort((a, b) => a - b);

	// Reshape back into matrix
	const result = [];
	for (let i = 0; i < rows; i++) {
		result.push(flattened.slice(i * cols, (i + 1) * cols));
	}

	return result;
}

// Method 2: Quick Sort Implementation for Matrix
function sortMatrixQuickSort(matrix) {
	const rows = matrix.length;
	const cols = matrix[0].length;
	const size = rows * cols;

	// Helper function to get element at linear index
	function getElement(index) {
		return matrix[Math.floor(index / cols)][index % cols];
	}

	// Helper function to set element at linear index
	function setElement(index, value) {
		matrix[Math.floor(index / cols)][index % cols] = value;
	}

	// Quick sort partition function
	function partition(low, high) {
		const pivot = getElement(high);
		let i = low - 1;

		for (let j = low; j < high; j++) {
			if (getElement(j) <= pivot) {
				i++;
				// Swap elements
				const temp = getElement(i);
				setElement(i, getElement(j));
				setElement(j, temp);
			}
		}

		// Place pivot in correct position
		const temp = getElement(i + 1);
		setElement(i + 1, getElement(high));
		setElement(high, temp);

		return i + 1;
	}

	// Quick sort recursive function
	function quickSort(low, high) {
		if (low < high) {
			const pi = partition(low, high);
			quickSort(low, pi - 1);
			quickSort(pi + 1, high);
		}
	}

	quickSort(0, size - 1);
}

// Method 3: Merge Sort Implementation for Matrix
function sortMatrixMergeSort(matrix) {
	const rows = matrix.length;
	const cols = matrix[0].length;
	const size = rows * cols;

	// Convert 2D to 1D for easier processing
	const arr = [];
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			arr.push(matrix[i][j]);
		}
	}

	// Merge sort implementation
	function mergeSort(arr, left = 0, right = arr.length - 1) {
		if (left < right) {
			const mid = Math.floor((left + right) / 2);
			mergeSort(arr, left, mid);
			mergeSort(arr, mid + 1, right);
			merge(arr, left, mid, right);
		}
	}

	function merge(arr, left, mid, right) {
		const leftArr = arr.slice(left, mid + 1);
		const rightArr = arr.slice(mid + 1, right + 1);

		let i = 0,
			j = 0,
			k = left;

		while (i < leftArr.length && j < rightArr.length) {
			if (leftArr[i] <= rightArr[j]) {
				arr[k++] = leftArr[i++];
			} else {
				arr[k++] = rightArr[j++];
			}
		}

		while (i < leftArr.length) arr[k++] = leftArr[i++];
		while (j < rightArr.length) arr[k++] = rightArr[j++];
	}

	mergeSort(arr);

	// Convert back to 2D matrix
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			matrix[i][j] = arr[i * cols + j];
		}
	}
}

// Method 4: In-place Quick Sort (Memory Efficient)
function sortMatrixInPlace(matrix) {
	const rows = matrix.length;
	const cols = matrix[0].length;

	// Create array of references to matrix elements
	const elements = [];
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			elements.push({
				value: matrix[i][j],
				row: i,
				col: j,
			});
		}
	}

	// Sort the references
	elements.sort((a, b) => a.value - b.value);

	// Update matrix in place
	for (let i = 0; i < elements.length; i++) {
		const row = Math.floor(i / cols);
		const col = i % cols;
		matrix[row][col] = elements[i].value;
	}
}

// Performance test function
function performanceTest() {
	// Create test matrices of different sizes
	const createMatrix = (rows, cols) => {
		const matrix = [];
		for (let i = 0; i < rows; i++) {
			const row = [];
			for (let j = 0; j < cols; j++) {
				row.push(Math.floor(Math.random() * 1000));
			}
			matrix.push(row);
		}
		return matrix;
	};

	const testMatrix = createMatrix(100, 100); // 10,000 elements

	console.log('Performance Test Results:');
	console.log('Matrix size: 100x100 (10,000 elements)');

	// Test Method 1: Flatten approach
	const matrix1 = testMatrix.map((row) => [...row]);
	const start1 = performance.now();
	const sorted1 = sortMatrixFlat(matrix1);
	const time1 = performance.now() - start1;
	console.log(`Flatten method: ${time1.toFixed(2)}ms`);

	// Test Method 2: Quick sort
	const matrix2 = testMatrix.map((row) => [...row]);
	const start2 = performance.now();
	sortMatrixQuickSort(matrix2);
	const time2 = performance.now() - start2;
	console.log(`Quick sort method: ${time2.toFixed(2)}ms`);

	// Test Method 3: Merge sort
	const matrix3 = testMatrix.map((row) => [...row]);
	const start3 = performance.now();
	sortMatrixMergeSort(matrix3);
	const time3 = performance.now() - start3;
	console.log(`Merge sort method: ${time3.toFixed(2)}ms`);
}

// Example usage
mat = [
	[5, 4, 7],
	[1, 3, 8],
	[2, 9, 6],
];

console.log('Original matrix:');
console.log(mat);

// Method 1: Most efficient for most cases
const sortedMat = sortMatrixFlat(mat.map((row) => [...row]));
console.log('\nSorted using flatten method:');
console.log(sortedMat);

// Method 2: Quick sort implementation
const mat2 = mat.map((row) => [...row]);
sortMatrixQuickSort(mat2);
console.log('\nSorted using quick sort:');
console.log(mat2);

// Run performance test
// performanceTest();
