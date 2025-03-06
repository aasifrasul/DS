class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
		this.prev = null; // Key addition for DLL
	}
}

class Queue {
	constructor() {
		this.head = null;
		this.tail = null; // Key addition for DLL
		this.size = 0;
	}

	enqueue(data) {
		const node = new Node(data);

		if (this.tail) {
			// List is not empty
			this.tail.next = node;
			node.prev = this.tail; // Connect the new node's prev to the old tail
			this.tail = node; // Update the tail
		} else {
			// List is empty
			this.head = node;
			this.tail = node;
		}

		this.size++;
		return node;
	}

	dequeue() {
		if (!this.head) {
			return null;
		}
		const temp = this.head;
		this.head = this.head.next;
		this.size -= 1;
		return temp;
	}

	peekAt(index) {
		if (this.head === null) {
			// Handle empty queue
			return null;
		}

		if (index >= 0 && index < this.size) {
			let current = this.head;
			for (let i = 0; i < index; i++) {
				current = current.next;
			}
			return current.data;
		} else {
			return null; // Index out of bounds
		}
	}

	print() {
		let current = this.head;
		while (current) {
			console.log(current.data);
			current = current.next;
		}
	}

	hasNext() {
		return this.head.next != undefined;
	}

	isEmpty() {
		return this.head == null;
	}
}

const queue = new Queue();
