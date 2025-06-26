class PriorityQueue {
	constructor() {
		this.reset();
	}

	enqueue(item, priority) {
		if (!this.items[priority]) {
			this.items[priority] = [];
		}
		this.items[priority].push(item);
		this.topPriority = Math.max(this.topPriority, priority);
	}

	dequeue() {
		if (this.isEmpty()) throw new Error('Queue is empty');

		const item = this.items[this.topPriority].shift();

		if (this.items[this.topPriority].length === 0) {
			delete this.items[this.topPriority];
			this.findNextTopPriority();
		}

		return item;
	}

	findNextTopPriority() {
		if (this.isEmpty()) return;

		let topPriority = Number.NEGATIVE_INFINITY;
		for (const priority in this.items) {
			const numPriority = +priority; // Convert string to number
			if (numPriority > topPriority) {
				topPriority = numPriority;
			}
		}
		this.topPriority = topPriority;
	}

	isEmpty() {
		return Object.keys(this.items).length === 0;
	}

	peek() {
		if (this.isEmpty()) return;
		return this.items[this.topPriority][0];
	}

	reset() {
		this.items = {};
		this.topPriority = Number.NEGATIVE_INFINITY;
	}
}
