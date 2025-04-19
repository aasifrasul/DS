class PriorityQueue {
	constructor(comparator = (a, b) => a.priority - b.priority) {
		this.heap = [];
		this.comparator = comparator;
	}

	enqueue(element, priority) {
		const node = { element, priority };
		this.heap.push(node);
		this._bubbleUp(this.heap.length - 1);
		return this.heap.length;
	}

	dequeue() {
		if (this.isEmpty()) {
			return null;
		}

		const min = this.heap[0];
		const last = this.heap.pop();

		if (this.heap.length > 0) {
			this.heap[0] = last;
			this._bubbleDown(0);
		}

		return min.element;
	}

	peek() {
		return this.isEmpty() ? null : this.heap[0].element;
	}

	isEmpty() {
		return this.heap.length === 0;
	}

	size() {
		return this.heap.length;
	}

	// Helper methods for maintaining heap property
	_bubbleUp(index) {
		while (index > 0) {
			const parentIndex = Math.floor((index - 1) / 2);

			if (this.comparator(this.heap[index], this.heap[parentIndex]) >= 0) {
				break;
			}

			this._swap(index, parentIndex);
			index = parentIndex;
		}
	}

	_bubbleDown(index) {
		while (true) {
			let smallest = index;
			const leftChild = 2 * index + 1;
			const rightChild = 2 * index + 2;

			if (
				leftChild < this.heap.length &&
				this.comparator(this.heap[leftChild], this.heap[smallest]) < 0
			) {
				smallest = leftChild;
			}

			if (
				rightChild < this.heap.length &&
				this.comparator(this.heap[rightChild], this.heap[smallest]) < 0
			) {
				smallest = rightChild;
			}

			if (smallest === index) {
				break;
			}

			this._swap(index, smallest);
			index = smallest;
		}
	}

	_swap(i, j) {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}
}

// Example usage:
const pq = new PriorityQueue();
pq.enqueue('A', 2);
pq.enqueue('B', 1);
pq.enqueue('C', 3);
console.log(pq.dequeue()); // 'B'
console.log(pq.dequeue()); // 'A'
console.log(pq.dequeue()); // 'C'
