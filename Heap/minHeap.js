class minHeap {
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
		this.heap[this.count] = val;
		this.count++;
		this.percolateUp(this.count - 1);
	}

	getMin() {
		return this.count > 0 ? this.heap[0] : null;
	}

	removeMin() {
		if (this.count === 0) return null;

		const min = this.heap[0];

		if (this.count > 1) {
			this.heap[0] = this.heap[this.count - 1];
			this.count--;
			this.minHeapify(0);
		} else {
			this.count--;
		}

		return min;
	}

	percolateUp(index) {
		if (index <= 0) return;

		const parent = Math.floor((index - 1) / 2);

		if (this.heap[parent] > this.heap[index]) {
			this.swap(parent, index);
			this.percolateUp(parent);
		}
	}

	minHeapify(index) {
		const left = index * 2 + 1;
		const right = index * 2 + 2;
		let smallest = index;

		if (left < this.count && this.heap[smallest] > this.heap[left]) {
			smallest = left;
		}

		if (right < this.count && this.heap[smallest] > this.heap[right]) {
			smallest = right;
		}

		if (smallest !== index) {
			this.swap(smallest, index);
			this.minHeapify(smallest);
		}
	}

	buildHeap(arr) {
		this.heap = arr;
		this.count = this.heap.length;

		// Start from the first non-leaf node and heapify downwards
		for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
			this.minHeapify(i);
		}
	}
}

// Test cases
const heap = new minHeap();
heap.insert(12);
heap.insert(10);
heap.insert(-10);
heap.insert(100);
heap.insert(-100);
console.log(heap.getMin()); // Should output -100

const newheap = new minHeap();
const arr = [12, 6, 8, 3, 16, 4, 27];
newheap.buildHeap(arr);
console.log(newheap.getMin()); // Should output 3
newheap.removeMin();
console.log(newheap.getMin()); // Should output 4
