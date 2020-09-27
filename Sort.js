class Sort {
	swap(arr, i, j) {
		const temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	isValidArray(arr) {
		return Array.isArray(arr) || arr.length > 1;
	}
	bubbleSort(arr) {
		if (!this.isValidArray(arr)) {
			return arr;
		}
		let count = arr.length;
		let i = 0,
			j = 0,
			lastIndex = 0,
			swappped = true,
			hash = {};
		while (swappped) {
			console.info("arr", arr);
			swappped = false;
			hash.value = 0;
			hash.index = 0;

			for (i = j; i < count; i++) {
				if (arr[j] > arr[i]) {
					console.info("swappped", arr[j], arr[i]);
					this.swap(arr, i, j);
					swappped = true;
				}
				if (arr[i - j] > hash.value) {
					console.info("hash", hash);
					console.info("arr[i]", arr[i]);
					hash.value = arr[i];
					hash.index = i;
				}
			}
			console.info("hash", hash);
			lastIndex = count - (j + 1);
			console.info("arr[lastIndex]", arr[lastIndex]);
			if (hash.value > arr[lastIndex] && hash.index < lastIndex) {
				console.info(
					"swappped bigger",
					arr[hash.index],
					arr[lastIndex]
				);
				this.swap(arr, hash.index, lastIndex);
			}
			j++;
		}
		return arr;
	}
}

const sort = new Sort();
sort.bubbleSort([40, 46, 93, 39, 5, 7, 9, 23, 76, 98, 45, 46, 68, 73, 45]);
