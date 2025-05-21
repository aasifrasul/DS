class PriorityQueue {
	constructor() {
		this.reset();
	}

	enqueue(item, priority) {
		this.map.set(priority, item);
		this.topPriority = Math.max(this.topPriority, priority);
	}

	dequeue() {
		if (this.isEmpty()) {
			throw new Error('List is Empty');
		}

		const item = this.map.get(this.topPriority);
		this.map.delete(this.topPriority);

		this.findNextTopPriority();

		return item;
	}

	findNextTopPriority() {
		if (this.isEmpty()) {
			return -1;
		}

		let topPriority = Number.NEGATIVE_INFINITY;

		// set the next Top Priority
		for (const tempPriority of this.map.keys()) {
			topPriority = tempPriority > topPriority ? tempPriority : topPriority;
		}

		this.topPriority = topPriority;
	}

	peek() {
		if (this.isEmpty()) {
			return -1;
		}

		return this.map.get(this.topPriority);
	}

	isEmpty() {
		return !this.map.size;
	}

	reset() {
		this.map = new Map();
		this.topPriority = Number.NEGATIVE_INFINITY;
	}
}
