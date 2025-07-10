class PriorityQueue {
	constructor() {
		this.heap = [];
	}

	// Helper Methods
	getLeftChildIndex(parentIndex) {
		return 2 * parentIndex + 1;
	}

	getRightChildIndex(parentIndex) {
		return 2 * parentIndex + 2;
	}

	getParentIndex(childIndex) {
		return Math.floor((childIndex - 1) / 2);
	}

	hasLeftChild(index) {
		return this.getLeftChildIndex(index) < this.heap.length;
	}

	hasRightChild(index) {
		return this.getRightChildIndex(index) < this.heap.length;
	}

	hasParent(index) {
		return this.getParentIndex(index) >= 0;
	}

	leftChild(index) {
		return this.heap[this.getLeftChildIndex(index)];
	}

	rightChild(index) {
		return this.heap[this.getRightChildIndex(index)];
	}

	parent(index) {
		return this.heap[this.getParentIndex(index)];
	}

	swap(indexOne, indexTwo) {
		[this.heap[indexOne], this.heap[indexTwo]] = [
			this.heap[indexTwo],
			this.heap[indexOne],
		];
	}

	peek() {
		if (this.heap.length === 0) return null;
		return this.heap[0].element;
	}

	// Removing an element will reomve the
	// top element with highest priority then
	// heapifyDown will be called
	enqueue(element, priority) {
		this.heap.push({ element, priority });
		this.heapifyUp();
	}

	dequeue() {
		if (this.heap.length === 0) return null;
		const item = this.heap[0];
		this.heap[0] = this.heap[this.heap.length - 1];
		this.heap.pop();
		this.heapifyDown(0);
		return item.element; // Return just the element
	}

	heapifyUp() {
		let index = this.heap.length - 1;
		while (this.hasParent(index) && this.parent(index) > this.heap[index]) {
			this.swap(this.getParentIndex(index), index);
			index = this.getParentIndex(index);
		}
	}

	heapifyDown(index) {
		while (this.hasLeftChild(index)) {
			let minIndex = this.getLeftChildIndex(index);
			if (this.hasRightChild(index) && this.rightChild(index) < this.leftChild(index)) {
				minIndex = this.getRightChildIndex(index);
			}
			if (this.heap[index] < this.heap[minIndex]) {
				break;
			} else {
				this.swap(index, minIndex);
			}
			index = minIndex;
		}
	}

	get size() {
		return this.heap.length;
	}

	isEmpty() {
		return this.heap.length === 0;
	}
}

// Creating The Priority Queue
const PriQueue = new PriorityQueue();

// Adding the Elements
PriQueue.enqueue(32);
PriQueue.enqueue(45);
PriQueue.enqueue(12);
PriQueue.enqueue(65);
PriQueue.enqueue(85);

console.log(PriQueue.peek());
console.log(PriQueue.dequeue());
console.log(PriQueue.peek());
console.log(PriQueue.dequeue());
console.log(PriQueue.peek());
console.log(PriQueue.dequeue());
