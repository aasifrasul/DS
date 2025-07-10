class PriorityQueue {
	constructor() {
		this.heap = [];
	}

	enqueue(element, priority) {
		this.heap.push({ element, priority });
		this.heapifyUp(this.heap.length - 1);
	}

	dequeue() {
		if (this.isEmpty()) throw new Error('Queue is empty');

		const min = this.heap[0];
		const last = this.heap.pop();

		if (!this.isEmpty()) {
			this.heap[0] = last;
			this.heapifyDown(0);
		}

		return min.element;
	}

	// O(log n) for both enqueue and dequeue
	heapifyUp(index) {
		while (index > 0) {
			const parentIndex = Math.floor((index - 1) / 2);
			if (this.heap[parentIndex].priority <= this.heap[index].priority) break;

			[this.heap[parentIndex], this.heap[index]] = [
				this.heap[index],
				this.heap[parentIndex],
			];
			index = parentIndex;
		}
	}

	heapifyDown(index) {
		while (true) {
			let minIndex = index;
			const leftChild = 2 * index + 1;
			const rightChild = 2 * index + 2;

			if (
				leftChild < this.heap.length &&
				this.heap[leftChild].priority < this.heap[minIndex].priority
			) {
				minIndex = leftChild;
			}

			if (
				rightChild < this.heap.length &&
				this.heap[rightChild].priority < this.heap[minIndex].priority
			) {
				minIndex = rightChild;
			}

			if (minIndex === index) break;

			[this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];
			index = minIndex;
		}
	}

	front() {
		return this.isEmpty() ? undefined : this.heap[0].element;
	}

	isEmpty() {
		return this.heap.length === 0;
	}
}
