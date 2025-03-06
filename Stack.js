class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class Stack {
	constructor() {
		this.top = null;
		this.size = 0;
	}

	push(data) {
		const node = new Node(data);

		node.next = this.top;
		this.top = node;
		this.size += 1;
		return this.top;
	}

	pop() {
		if (!this.top) {
			return null;
		}
		const temp = this.top;
		this.top = this.top.next;
		this.size -= 1;
		return temp;
	}

	peek() {
		return (this.top || {}).data;
	}

	print() {
		const temp = this.top;
		while (temp) {
			temp.next = temp;
		}
	}

	hasNext() {
		return !!this.next;
	}

	isEmpty() {
		return !this.size;
	}
}

const stack = new Stack();
