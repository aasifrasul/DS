const LinkedList = (function () {
	const Node = function (data) {
		this.data = data;
		this.next = null;
	};

	const LinkedList = function () {
		this.length = 0;
		this.head = null;
	};

	LinkedList.prototype.increment = function () {
		this.length++;
	};

	LinkedList.prototype.decrement = function () {
		this.length--;
	};

	LinkedList.prototype.size = function () {
		return this.length;
	};

	LinkedList.prototype.toArray = function () {
		const result = [],
			current = this.head;

		while (current) {
			result.push(current.data);
			current = current.next;
		}

		return result;
	};

	LinkedList.prototype.toString = function () {
		return this.toArray().toString();
	};

	LinkedList.prototype.add = function (value) {
		const node = new Node(value);
		let current = this.head;

		this.increment();

		if (!current) {
			this.head = node;
			return node;
		}

		while (current.next) {
			current = current.next;
		}

		current.next = node;
		return node;
	};

	LinkedList.prototype.insertAfter = function (data, toNodeData) {
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
	};

	LinkedList.prototype.traverse = function (fn) {
		let current = this.head;
		while (current) {
			if (fn) {
				fn(current);
			}
			current = current.next;
		}
	};

	LinkedList.prototype.addTop = function (value) {
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
	};

	LinkedList.prototype.print = function (key = 'data') {
		let current = this.head;
		while (current) {
			console.log(current[key]);
			current = current.next;
		}
	};

	LinkedList.prototype.clone = function (pos) {
		let current = this.head,
			clonedLL = new LinkedList();

		while (current) {
			clonedLL.add(current.data);
			current = current.next;
		}

		return clonedLL;
	};

	LinkedList.prototype.get = function (pos) {
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
	};

	LinkedList.prototype.remove = function (posOrValue) {
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
	};

	LinkedList.prototype.delete = function (value) {
		let current = this.head;

		if (!current) {
			return null;
		}

		if (current.data == value) {
			this.head = current.next;
			this.decrement();
			return current;
		}

		while (current.next) {
			const prev = current;
			current = current.next;
			if (current.data == value) {
				prev.next = current.next;
				this.decrement();
				return current;
			}
		}

		return null;
	};

	LinkedList.prototype.searchNodeAt = function (pos) {
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
	};

	LinkedList.prototype.searchNodeByValue = function (val) {
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
	};

	LinkedList.prototype.reverse = function () {
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
	};

	LinkedList.prototype.reverseInPlace = function () {
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
	};

	LinkedList.prototype.detectLoop = function () {
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
	};

	LinkedList.prototype.findLoopStart = function () {
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
	};

	LinkedList.prototype.pushSorted = function (val) {
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
	};

	LinkedList.prototype.pushSortedDesc = function (val) {
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
	};

	LinkedList.prototype.kthFromEnd = function (k) {
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
	};

	LinkedList.prototype.deleteKthFromEnd = function (k) {
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
	};

	LinkedList.prototype.getLength = function () {
		let head = this.head,
			current = head,
			pointer = head,
			anotherPtr,
			len = 0;
		const loopStartNode = head.findLoopStart();
		if (!loopStartNode) {
			while (current) {
				current = current.next;
				len++;
			}
			return len;
		} else {
			anotherPtr = loopStartNode;
			while (pointer != anotherPtr) {
				len += 2;
				pointer = pointer.next;
				anotherPtr = anotherPtr.next;
			}
			return len;
		}
	};

	LinkedList.prototype.rotateByKthNode = function (k) {
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
	};

	// Ascending Sort
	LinkedList.prototype.sort = function () {
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
	};

	// Ascending Sort
	LinkedList.prototype.sort = function () {
		let current = this.head;

		if (current) {
			while (current.next) {
				current = current.next;
			}
		}

		return this;
	};

	// Descending sort
	LinkedList.prototype.sortDesc = function () {
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
	};

	// Removes Duplicates
	// But first sort it
	LinkedList.prototype.dedupe = function () {
		const sortedLL = this.sort();
		let current = sortedLL.head;

		if (!current) {
			return null;
		}

		while (current.next) {
			if (current.data === current.next.data) {
				current.next = (current.next || {}).next;
				sortedLL.decrement();
			} else {
				current = current.next;
			}
		}

		return sortedLL;
	};

	// Removes Duplicates without Modifying the List
	LinkedList.prototype.dedupeWithoutModifying = function () {
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
	};

	// Removes Duplicates
	// But first sort it
	LinkedList.prototype.dedupe = function () {
		const hashUnique = {};
		let current = this.head;

		if (!current) {
			return null;
		}
		hashUnique[current.data] = current.data;

		while (current.next) {
			if (hashUnique[current.next.data]) {
				current.next = (current.next || {}).next;
				this.decrement();
			} else {
				hashUnique[current.next.data] = current.next.data;
				current = current.next;
			}
		}

		return this;
	};

	LinkedList.prototype.fib = function (n) {
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
	};

	LinkedList.prototype.deleteEven = function () {
		let current = this.head;
		let prev;

		if (!current) {
			return null;
		}

		while (current.next) {
			if (current.next.data % 2 === 0) {
				current.next = current.next.next;
				this.decrement();
			} else {
				current = current.next;
			}
		}

		if (current.data % 2 === 0) {
			current = null;
			this.decrement();
		}

		current = this.head;

		if (current.data % 2 === 0) {
			this.head = current.next;
			this.decrement();
		}

		return this;
	};

	LinkedList.prototype.deleteOdd = function () {
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
	};

	return LinkedList;
})();

const linkedList = new LinkedList();

linkedList.add(5);
linkedList.add(4);
linkedList.add(3);
linkedList.add(2);
linkedList.add(1);

linkedList.reverseInPlace();
