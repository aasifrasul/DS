class PriorityQueue {
	constructor() {
		this.reset();
	}

	enqueue(element, priority) {
		if (this.isEmpty()) {
			this.lowerLimit = priority;
			this.upperLimit = priority;
		} else if (priority < this.lowerLimit) {
			this.lowerLimit = priority;
		} else if (priority > this.upperLimit) {
			this.upperLimit = priority;
		}

		this.items.set(priority, element);
	}

	dequeue() {
		if (this.isEmpty()) {
			throw new Error('Queue is empty');
		}

		const result = this.items.get(this.lowerLimit);
		this.items.delete(this.lowerLimit);

		// Find next lowest priority
		let nextPriority = this.lowerLimit;
		while (!this.items.has(nextPriority) && nextPriority <= this.upperLimit) {
			nextPriority++;
		}
		this.lowerLimit = nextPriority;

		return result;
	}

	front() {
		if (this.isEmpty()) {
			console.log('No elements in Queue');
			return;
		}
		return this.items.get(this.lowerLimit);
	}

	rear() {
		if (this.isEmpty()) {
			console.log('No elements in Queue');
			return;
		}
		return this.items.get(this.upperLimit);
	}

	printPQueue() {
		return [...this.items.keys()]
			?.sort()
			?.map((key) => this.items.get(key))
			?.join(' -> ');
	}

	reset() {
		this.items = new Map();
		this.lowerLimit = 0;
		this.upperLimit = 0;
	}

	get size() {
		return this.items.size;
	}

	isEmpty() {
		return this.size === 0;
	}
}

const pq = new PriorityQueue();

pq.enqueue('A', 2);
pq.enqueue('B', 1);
pq.enqueue('C', 3);

console.log(pq.printPQueue()); // B A C

console.log(pq.front()); // B
console.log(pq.rear()); // C

pq.dequeue();
console.log(pq.printPQueue()); // A C
let item;

while ((item = pQueue.dequeue())) {
	console.log(item);
}
