class PriorityQueue {
	/**
		This is min PQ,
		For max PQ comparator = (a, b) => b.priority - a.priority
	*/
	constructor(comparator = (a, b) => a.priority - b.priority) {
		this.heap = [];
		this.comparator = comparator;
	}

	// Helper Methods for heap indices
	getLeftChildIndex(parentIndex) {
		return 2 * parentIndex + 1;
	}

	getRightChildIndex(parentIndex) {
		return 2 * parentIndex + 2;
	}

	getParentIndex(childIndex) {
		return Math.floor((childIndex - 1) / 2);
	}

	// Helper Methods for checking existence
	hasLeftChild(index) {
		return this.getLeftChildIndex(index) < this.heap.length;
	}

	hasRightChild(index) {
		return this.getRightChildIndex(index) < this.heap.length;
	}

	hasParent(index) {
		return this.getParentIndex(index) >= 0;
	}

	// Helper Methods for accessing heap nodes
	leftChild(index) {
		return this.heap[this.getLeftChildIndex(index)];
	}

	rightChild(index) {
		return this.heap[this.getRightChildIndex(index)];
	}

	parent(index) {
		return this.heap[this.getParentIndex(index)];
	}

	// Core priority queue operations
	enqueue(element, priority) {
		const node = { element, priority };
		this.heap.push(node);
		this.bubbleUp();
		return this.size;
	}

	dequeue() {
		if (this.isEmpty()) {
			return null;
		}

		const min = this.heap[0];
		const last = this.heap.pop();

		if (this.heap.length > 0) {
			this.heap[0] = last;
			this.bubbleDown();
		}

		return min.element;
	}

	peek() {
		return this.isEmpty() ? null : this.heap[0].element;
	}

	isEmpty() {
		return this.size === 0;
	}

	get size() {
		return this.heap.length;
	}

	// Heap maintenance operations
	swap(index1, index2) {
		console.log(`Swapping`, index1, index2, 'heap', JSON.parse(JSON.stringify(this.heap)));
		const temp = this.heap[index1];
		this.heap[index1] = this.heap[index2];
		this.heap[index2] = temp;
	}

	bubbleUp() {
		let index = this.heap.length - 1;

		while (
			this.hasParent(index) &&
			this.comparator(this.heap[index], this.parent(index)) < 0
		) {
			const parentIndex = this.getParentIndex(index);
			this.swap(parentIndex, index);
			index = parentIndex;
		}
	}

	bubbleDown() {
		let index = 0;

		while (this.hasLeftChild(index)) {
			let smallerChildIndex = this.getLeftChildIndex(index);

			if (
				this.hasRightChild(index) &&
				this.comparator(this.rightChild(index), this.leftChild(index)) < 0
			) {
				smallerChildIndex = this.getRightChildIndex(index);
			}

			if (this.comparator(this.heap[index], this.heap[smallerChildIndex]) <= 0) {
				break;
			}

			this.swap(index, smallerChildIndex);
			index = smallerChildIndex;
		}
	}

	// Optional: method to change priority of an element
	changePriority(element, newPriority) {
		// Find the element (linear search - could be optimized with a map in production)
		for (let i = 0; i < this.heap.length; i++) {
			if (this.heap[i].element === element) {
				const oldPriority = this.heap[i].priority;
				this.heap[i].priority = newPriority;

				// If priority decreased, bubble up
				if (
					this.comparator({ priority: newPriority }, { priority: oldPriority }) < 0
				) {
					this.bubbleUpSpecific(i);
				}
				// If priority increased, bubble down
				else if (
					this.comparator({ priority: newPriority }, { priority: oldPriority }) > 0
				) {
					this.bubbleDownSpecific(i);
				}

				return true;
			}
		}
		return false; // Element not found
	}

	// Helper methods for changePriority
	bubbleUpSpecific(index) {
		while (
			this.hasParent(index) &&
			this.comparator(this.heap[index], this.parent(index)) < 0
		) {
			const parentIndex = this.getParentIndex(index);
			this.swap(parentIndex, index);
			index = parentIndex;
		}
	}

	bubbleDownSpecific(index) {
		while (this.hasLeftChild(index)) {
			let smallerChildIndex = this.getLeftChildIndex(index);

			if (
				this.hasRightChild(index) &&
				this.comparator(this.rightChild(index), this.leftChild(index)) < 0
			) {
				smallerChildIndex = this.getRightChildIndex(index);
			}

			if (this.comparator(this.heap[index], this.heap[smallerChildIndex]) <= 0) {
				break;
			}

			this.swap(index, smallerChildIndex);
			index = smallerChildIndex;
		}
	}
}

// Example usage:
const pq = new PriorityQueue();

// Enqueue elements with priorities
pq.enqueue('Task A', 3);
pq.enqueue('Task B', 1);
pq.enqueue('Task C', 2);
pq.enqueue('Task D', 4);

console.log('Queue size:', pq.size); // 4
console.log('Next task:', pq.peek()); // Task B (lowest priority number)

// Process the queue
console.log(pq.dequeue()); // Task B
console.log(pq.dequeue()); // Task C
console.log(pq.dequeue()); // Task A
console.log(pq.dequeue()); // Task D
console.log(pq.isEmpty()); // true

// Example with custom comparator (max priority queue)
const maxPQ = new PriorityQueue((a, b) => b.priority - a.priority);
maxPQ.enqueue('High', 3);
maxPQ.enqueue('Medium', 2);
maxPQ.enqueue('Low', 1);

console.log(maxPQ.dequeue()); // High
console.log(maxPQ.dequeue()); // Medium
console.log(maxPQ.dequeue()); // Low
