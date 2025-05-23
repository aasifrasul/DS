/**
 * Initializes a new empty `PriorityQueue` with the given `comparator(a, b)`
 * function, uses `.DEFAULT_COMPARATOR()` when no function is provided.
 *
 * The comparator function must return a positive number when `a > b`, 0 when
 * `a == b` and a negative number when `a < b`.
 *
 * @param {Function}
 * @return {PriorityQueue}
 * @api public
 */
class PriorityQueue {
	/**
	 * Compares `a` and `b`, when `a > b` it returns a positive number, when
	 * it returns 0 and when `a < b` it returns a negative number.
	 *
	 * @param {String|Number} a
	 * @param {String|Number} b
	 * @return {Number}
	 * @api public
	 */
	static DEFAULT_COMPARATOR(a, b) {
		if (typeof a === 'number' && typeof b === 'number') {
			return a - b;
		} else {
			a = a.toString();
			b = b.toString();

			if (a == b) return 0;

			return a > b ? 1 : -1;
		}
	}

	constructor(comparator) {
		this.comparator = comparator || PriorityQueue.DEFAULT_COMPARATOR;
		this.elements = [];
	}

	/**
	 * Dequeues the top element of the priority queue.
	 *
	 * @return {Object}
	 * @throws {Error} when the queue is empty.
	 * @api public
	 */
	deq() {
		const first = this.peek();
		const last = this.elements.pop();
		const size = this.size();

		if (size === 0) return first;

		this.elements[0] = last;
		let current = 0;

		while (current < size) {
			let largest = current;
			const left = 2 * current + 1;
			const right = 2 * current + 2;

			if (left < size && this.compare(left, largest) >= 0) {
				largest = left;
			}

			if (right < size && this.compare(right, largest) >= 0) {
				largest = right;
			}

			if (largest === current) break;

			this.swap(largest, current);
			current = largest;
		}

		return first;
	}

	/**
	 * Enqueues the `element` at the priority queue and returns its new size.
	 *
	 * @param {Object} element
	 * @return {Number}
	 * @api public
	 */
	enq(element) {
		const size = this.elements.push(element);
		let current = size - 1;

		while (current > 0) {
			const parent = Math.floor((current - 1) / 2);

			if (this.compare(current, parent) <= 0) break;

			this.swap(parent, current);
			current = parent;
		}

		return size;
	}

	/**
	 * Returns whether the priority queue is empty or not.
	 *
	 * @return {Boolean}
	 * @api public
	 */
	isEmpty() {
		return this.size() === 0;
	}

	/**
	 * Peeks at the top element of the priority queue.
	 *
	 * @return {Object}
	 * @throws {Error} when the queue is empty.
	 * @api public
	 */
	peek() {
		if (this.isEmpty()) throw new Error('PriorityQueue is empty');

		return this.elements[0];
	}

	/**
	 * Returns the size of the priority queue.
	 *
	 * @return {Number}
	 * @api public
	 */
	size() {
		return this.elements.length;
	}

	/**
	 *  Iterates over queue elements
	 *
	 *  @param {Function} fn
	 */
	forEach(fn) {
		return this.elements.forEach(fn);
	}

	/**
	 * Compares the values at position `a` and `b` in the priority queue using its
	 * comparator function.
	 *
	 * @param {Number} a
	 * @param {Number} b
	 * @return {Number}
	 * @api private
	 */
	compare(a, b) {
		return this.comparator(this.elements[a], this.elements[b]);
	}

	/**
	 * Swaps the values at position `a` and `b` in the priority queue.
	 *
	 * @param {Number} a
	 * @param {Number} b
	 * @api private
	 */
	swap(a, b) {
		const aux = this.elements[a];
		this.elements[a] = this.elements[b];
		this.elements[b] = aux;
	}
}

const pq = new PriorityQueue();
