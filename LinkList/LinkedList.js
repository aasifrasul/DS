class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.length = 0;
		this.head = null;
		this.tail = null;
	}

	increment() {
		this.length++;
	}

	decrement() {
		this.length--;
	}

	size() {
		return this.length;
	}

	toArray() {
		const result = [],
			current = this.head;

		while (current) {
			result.push(current.data);
			current = current.next;
		}

		return result;
	}

	toString() {
		return this.toArray().toString();
	}

	add(value) {
		const node = new Node(value);
		this.increment();

		if (!this.head) {
			this.head = node;
			this.tail = node; // Update tail
			return node;
		}

		this.tail.next = node; // Use tail for efficient append
		this.tail = node; // Update tail
		return node;
	}

	insertAfter(data, toNodeData) {
		let current = this.head;
		while (current) {
			if (current.data === toNodeData) {
				const node = new Node(data);
				if (current === this.tail) {
					this.tail.next = node;
					this.tail = node;
				} else {
					node.next = current.next;
					current.next = node;
				}
				this.numberOfValues++;
			}
			current = current.next;
		}
	}

	traverse(fn) {
		let current = this.head;
		while (current) {
			if (fn) {
				fn(current);
			}
			current = current.next;
		}
	}

	addTop(value) {
		const node = new Node(value),
			current = this.head;

		this.increment();

		if (!current) {
			this.head = node;
			return node;
		}

		node.next = current;
		this.head = node;
		return node;
	}

	print(key = 'data') {
		let current = this.head;
		while (current) {
			console.log(current[key]);
			current = current.next;
		}
	}

	clone() {
		const clonedLL = new LinkedList();
		let current = this.head;

		while (current) {
			const newNode = new Node(current.data);
			if (!clonedLL.head) {
				clonedLL.head = newNode;
				clonedLL.tail = newNode;
			} else {
				clonedLL.tail.next = newNode;
				clonedLL.tail = newNode;
			}
			clonedLL.length++; // Efficiently update length
			current = current.next;
		}

		return clonedLL;
	}

	get(pos) {
		let current = this.head,
			count = 0;

		if (pos > this.length) {
			return "Doesn't Exist!";
		}
		while (count < pos) {
			current = current.next;
			count++;
		}
		return current;
	}

	remove(posOrValue) {
		let current = this.head;
		let previous = null;
		let removedNode = null;

		if (typeof posOrValue === 'number') {
			// Remove by position
			if (posOrValue < 0 || posOrValue >= this.length) {
				return null; // Or throw an error if you prefer
			}
			if (posOrValue === 0) {
				this.head = current.next;
				removedNode = current;
			} else {
				let count = 0;
				while (count < posOrValue) {
					previous = current;
					current = current.next;
					count++;
				}
				previous.next = current.next;
				removedNode = current;
			}
		} else {
			// Remove by value
			while (current && current.data !== posOrValue) {
				previous = current;
				current = current.next;
			}
			if (!current) {
				return null; // Value not found
			}
			if (!previous) {
				// Removing head
				this.head = current.next;
			} else {
				previous.next = current.next;
			}
			removedNode = current;
		}

		if (removedNode) {
			this.decrement();
		}

		return removedNode;
	}

	searchNodeAt(pos) {
		let current = this.head;
		let count = 0;

		if (!current) {
			return null;
		}

		while (current.next) {
			count++;
			if (pos == count) {
				return current;
			}
			current = current.next;
		}

		return null;
	}

	searchNodeByValue(val) {
		let current = this.head;

		if (!current) {
			return null;
		}

		if (current.data == val) {
			return current;
		}

		while (current.next) {
			current = current.next;
			if (current.data == val) {
				return current;
			}
		}

		return null;
	}

	reverse() {
		if (!this.head || !this.head.next) return this;

		let current = this.head,
			node;
		const reversedLL = new LinkedList();

		while (current) {
			node = new Node(current.data);
			node.next = reversedLL.head;
			reversedLL.head = node;
			current = current.next;
		}
		/*
		while (current) {
			reversedLL.addTop(current.data);
			current = current.next;
		}
		*/
		return reversedLL;
	}

	reverseInPlace() {
		let prev = null;
		let current = this.head;
		let next = null;
		while (current) {
			next = current.next;
			current.next = prev;
			prev = current;
			current = next;
		}
		this.head = prev; // Crucial: Update the head!
		return this;
	}

	detectLoop() {
		let slow = this.head,
			fast = this.head;

		while (slow && fast) {
			slow = slow.next;
			fast = (fast.next || {}).next;

			if (slow === fast) {
				return true;
			}
		}
		return false;
	}

	findLoopStart() {
		let slow = this.head,
			fast = this.head;
		while (slow && fast) {
			slow = slow.next;

			if (!fast.next) {
				return null;
			}

			fast = fast.next.next;
			if (slow === fast) {
				slow = this.head;
				while (slow != fast) {
					slow = slow.next;
					fast = fast.next;
				}
				return slow;
			}
		}
	}

	pushSorted(val) {
		if (!val) {
			return null;
		}
		let current = this.head,
			node = new Node(val),
			prev;

		this.increment();

		if (!this.head) {
			this.head = node;
			return this;
		}
		//value lower than head value
		if (val < this.head.data) {
			node.next = current;
			this.head = node;
			return this;
		}

		while (current) {
			if (current.data > val) {
				node.next = current;
				prev.next = node;
				return this;
			}
			prev = current;
			current = current.next;
		}
		node.next = null;
		prev.next = node;
		return this;
	}

	pushSortedDesc(val) {
		if (!val) {
			return null;
		}
		let head = this.head,
			current = head,
			node = new Node(val),
			prev;

		this.increment();

		if (!this.head) {
			this.head = node;
			return this;
		}
		if (val > this.head.data) {
			node.next = head;
			this.head = node;
			return this;
		}

		while (current) {
			if (current.data < val) {
				node.next = current;
				prev.next = node;
				return this;
			}
			prev = current;
			current = current.next;
		}
		node.next = null;
		prev.next = node;
		return this;
	}

	kthFromEnd(k) {
		let node = this.head,
			i = 1,
			kthNode;
		if (k <= 0) return;

		while (node) {
			if (i == k) kthNode = this.head;
			else if (i - k > 0) {
				kthNode = kthNode.next;
			}
			i++;

			node = node.next;
		}
		return kthNode;
	}

	deleteKthFromEnd(k) {
		let node = this.head,
			i = 1,
			kthNode,
			prev;
		if (k <= 0) return this;

		while (node) {
			if (i == k) {
				kthNode = this.head;
			} else if (i - k > 0) {
				prev = kthNode;
				kthNode = kthNode.next;
			}
			i++;

			node = node.next;
		}
		if (!prev) this.head = this.head.next;
		else {
			prev.next = kthNode.next;
		}
		return this;
	}

	getLength() {
		let current = this.head;
		let len = 0;
		while (current) {
			len++;
			current = current.next;
		}
		return len;
	}

	rotateByKthNode(k) {
		let prevHead = this.head,
			prev = this.head,
			current = this.head,
			i = 1;
		while (current.next) {
			if (i == k + 1) {
				this.head = current;
				prev.next = null;
			}
			prev = current;
			current = current.next;
			i++;
		}
		current.next = prevHead;
		return this;
	}

	// Ascending Sort
	sort() {
		let current = this.head;
		const newLL = new LinkedList();

		if (!current) {
			return null;
		}

		while (current.next) {
			newLL.pushSorted(current.data);
			current = current.next;
		}

		return newLL;
	}

	// Ascending Sort
	sort() {
		let current = this.head;

		if (current) {
			while (current.next) {
				current = current.next;
			}
		}

		return this;
	}

	// Descending sort
	sortDesc() {
		let current = this.head;
		const newLL = new LinkedList();

		if (!current) {
			return null;
		}

		while (current.next) {
			newLL.pushSortedDesc(current.data);
			current = current.next;
		}

		return newLL;
	}

	// Removes Duplicates
	dedupe() {
		const seen = new Set();
		let current = this.head;
		let prev = null;

		while (current) {
			if (seen.has(current.data)) {
				if (prev) {
					prev.next = current.next;
				} else {
					this.head = current.next; // Removing head
				}
				if (!current.next) {
					this.tail = prev; // Update tail if removing last element
				}
				this.decrement();
			} else {
				seen.add(current.data);
				prev = current;
			}
			current = current.next;
		}
		return this;
	}

	// Removes Duplicates without Modifying the List
	dedupeWithoutModifying() {
		const uniqueLL = {};
		const clonedLL = this.clone();
		let current = clonedLL.head;

		if (!current) {
			return null;
		}

		while (current.next) {
			if (uniqueLL[current.next.data]) {
				current.next = (current.next || {}).next;
				clonedLL.decrement();
			} else {
				uniqueLL[current.data] = current.data;
				current = current.next;
			}
		}

		return clonedLL;
	}

	fib(n) {
		if (n < 2) {
			return 1;
		}

		this.head = null;

		this.add(1);
		this.add(1);

		let current = this.head;

		while (n-- > 2) {
			this.add(current.data + current.next.data);
			current = current.next;
		}
		this.print();
	}

	deleteEven() {
		let current = this.head;
		while (current && current.next) {
			if (current.next.data % 2 === 0) {
				current.next = current.next.next;
				this.decrement();
			} else {
				current = current.next;
			}
		}

		if (this.head && this.head.data % 2 === 0) {
			this.head = this.head.next;
			this.decrement();
		}
		return this;
	}

	deleteOdd() {
		let current = this.head;
		let prev;

		if (!current) {
			return null;
		}

		while (current.next) {
			const { data, next } = current.next;
			if (data && data % 2 === 1) {
				current.next = next;
				this.decrement();
			} else {
				current = current.next;
			}
		}

		if (current.data && current.data % 2 === 1) {
			current = null;
			this.decrement();
		}

		current = this.head;

		if (current.data && current.data % 2 === 1) {
			this.head = current.next;
			this.decrement();
		}

		return this;
	}
}

const linkedList = new LinkedList();

linkedList.add(5);
linkedList.add(4);
linkedList.add(3);
linkedList.add(2);
linkedList.add(1);

linkedList.reverseInPlace();
