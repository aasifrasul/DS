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

	getMin() {
		return this.heap.length ? this.heap[0] : null;
	}

	removeMin() {
		const min = this.heap[0];
		if (this.count > 1) {
			this.heap[0] = this.heap[this.count - 1];
			this.count = this.count - 1;
			this.__minHeapify(0);
			return min;
		} else if (this.count == 1) {
			this.count = this.count - 1;
			return min;
		} else {
			return null;
		}
	}

	__percolateUp(index) {
		if (index <= 0) {
			return;
		}
		let parent = Math.floor((index - 1) / 2);
		if (this.heap[parent] > this.heap[index]) {
			this.swap(parent, index);
			this.__percolateUp(parent);
		}
	}

	__minHeapify(index) {
		let left = index * 2 + 1;
		let right = index * 2 + 2;
		let smallest = index;
		if (this.count > left && this.heap[smallest] > this.heap[left]) {
			smallest = left;
		}
		if (this.count > right && this.heap[smallest] > this.heap[right]) smallest = right;
		if (smallest !== index) {
			this.swap(smallest, index);
			this.__minHeapify(smallest);
		}
	}

	buildHeap(arr) {
		this.heap = arr;
		this.count = this.heap.length;
		for (let i = this.heap.length - 1; i >= 0; i--) {
			this.__minHeapify(i);
		}
	}
}

let heap = new minHeap();
heap.insert(12);
heap.insert(10);
heap.insert(-10);
heap.insert(100);
heap.insert(-100);

console.log(heap.getMin()); //you should get -10

let newheap = new minHeap();
let arr = [12, 6, 8, 3, 16, 4, 27];
newheap.buildHeap(arr); //builds this new heap with elements from the array
console.log(newheap.getMin()); //this logs 3

newheap.removeMin();

console.log(newheap.getMin());
