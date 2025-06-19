/**
 * A very optimized Queue implementation.
 * Also handles prequeue
 */
class Queue {
	#elements = {};
	#upperLimit = 0;
	#lowerLimit = 0;

	enqueue(element) {
		this.#elements[++this.#upperLimit] = element;
	}

	prequeue(element) {
		this.#elements[this.#lowerLimit--] = element;
	}

	dequeue() {
		if (this.isEmpty()) return null;

		const element = this.#elements[++this.#lowerLimit];
		delete this.#elements[this.#lowerLimit];
		return element;
	}

	isEmpty() {
		return this.size === 0;
	}

	get size() {
		return this.#upperLimit - this.#lowerLimit;
	}
}
