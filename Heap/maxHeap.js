class maxHeap {
	constructor() {
		this.heap = [];
		this.count = 0;
	}

	swap(p1, p2) {
		const tmp = this.heap[p1];
		this.heap[p1] = this.heap[p2];
		this.heap[p2] = tmp;
	}

	insert(val) {
		if (this.count >= this.heap.length) {
			this.count = this.count + 1;
			this.heap.push(val);
			this.__percolateUp(this.heap.length - 1);
		} else {
			this.heap[this.count] = val;
			this.count = this.count + 1;
			this.__percolateUp(this.count - 1);
		}
	}

	getMax() {
		return this.count ? this.heap[0] : null;
	}

	removeMax() {
		let max = this.heap[0];
		if (this.count > 1) {
			this.heap[0] = this.heap[this.count - 1];
			this.count = this.count - 1;
			this.__maxHeapify(0);
			return max;
		} else if (this.count === 1) {
			this.count = this.count - 1;
			return max;
		} else {
			return null;
		}
	}

	__percolateUp(index) {
		if (index <= 0) {
			return;
		}
		const parent = Math.floor((index - 1) / 2);
		if (this.heap[parent] < this.heap[index]) {
			this.swap(parent, index);
			this.__percolateUp(parent);
		}
	}

	__maxHeapify(index) {
		let left = index * 2 + 1;
		let right = index * 2 + 2;
		let largest = index;
		if (this.count > left && this.heap[largest] < this.heap[left]) {
			largest = left;
		} else if (this.count > right && this.heap[largest] < this.heap[right]) {
			largest = right;
		} else if (largest !== index) {
			this.swap(largest, index);
			this.__maxHeapify(largest);
		}
	}

	buildHeap(arr) {
		this.heap = arr;
		this.count = this.heap.length;
		for (let i = this.heap.length - 1; i >= 0; i--) {
			this.__maxHeapify(i);
		}
	}
}
let heap = new maxHeap();
