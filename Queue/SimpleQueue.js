class SimpleQueue {
	constructor() {
		this.reset();
	}

	enqueue(item) {
		if (item === undefined || item === null) {
			throw new Error('Cannot enqueue null or undefined values.');
		}
		this.map.set(++this.upperLimit, item);
	}

	dequeue() {
		if (this.isEmpty()) {
			return undefined;
		}

		const key = this.lowerLimit + 1;
		const result = this.map.get(this.lowerLimit + 1);
		this.map.delete(key);
		this.lowerLimit++;

		return result;
	}

	*[Symbol.iterator]() {
		for (const value of this.map.values()) {
			yield value;
		}
	}

	peek() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.map.get(this.lowerLimit + 1);
	}

	reset() {
		this.map.clear();
		this.upperLimit = 0;
		this.lowerLimit = 0;
	}

	get size() {
		return this.map.size;
	}

	isEmpty() {
		return this.size === 0;
	}
}
