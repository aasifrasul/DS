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
		let result = [],
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
		let node = new Node(value),
			current = this.head;

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

	LinkedList.prototype.remove = function (pos) {
		let current = this.head,
			count = 0,
			prevNode = null;
		if (pos > this.length) {
			return "Doesn't Exist!";
		}
		if (pos === 0) {
			this.head = current.next;
			this.decrement();
			return this.head;
		}
		while (count < pos) {
			prevNode = current;
			current = current.next;
			count++;
		}
		prevNode.next = current.next;
		current = null;
		this.decrement();

		return this.head;
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
			const previous = current;
			current = current.next;
			if (current.data == value) {
				previous.next = current.next;
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

	LinkedList.prototype.remove = function (pos) {
		let current = this.head,
			length = this.length,
			count = 0,
			message = {
				failure: 'Failure: non-existent node in this list.'
			},
			beforeNodeToDelete = null,
			nodeToDelete = null,
			deletedNode = null;

		if (typeof pos === 'undefined' || pos < 0 || pos > length) {
			throw new Error(message.failure);
		}

		if (!current) {
			return null;
		}

		if (pos === 0) {
			this.head = current.next;
			deletedNode = current;
			current = null;
			this.decrement();

			return deletedNode;
		}

		while (count < pos) {
			beforeNodeToDelete = current;
			nodeToDelete = current.next;
			count++;
		}

		beforeNodeToDelete.next = nodeToDelete.next;
		deletedNode = Object.assign({}, nodeToDelete);
		nodeToDelete = null;
		this.decrement();

		return deletedNode;
	};

	LinkedList.prototype.reverse = function () {
		if (!this.head || !this.head.next) return this;

		let current = this.head;
		const reversedLL = new LinkedList();

		while (current) {
			reversedLL.addTop(current.data);
			current = current.next;
		}

		return reversedLL;
	};

	LinkedList.prototype.reverseInPlace = function () {
		if (!this.head || !this.head.next) return this;

		let current = this.head, prev = null, next = null;

		while (current) {
			next = current.next;
			console.log('next=', next);
			current.next = prev;
			console.log('After current.next = prev; current=', current);
			prev = current;
			console.log('After prev = current; prev=', prev);
			current = next;
			console.log('After current = next; current=', current);
		}
		this.head = prev;

		return this;
	};

	// LinkedList.prototype.reverseInPlace = function () {
	// 	if (!this.head || !this.head.next) return this;

	// 	let current = this.head;

	// 	if (current) {
	// 		while (current.next) {
	// 			this.addTop(current.next.data);
	// 			current.next = current.next.next;
	// 			this.decrement();
	// 		}
	// 	}

	// 	return this;
	// };

	LinkedList.prototype.detectLoop = function () {
		let slow = this.head,
			fast = this.head;

		while (slow && fast) {
			slow = slow.next;
			fast = (fast.next || {}).next;

			if (slow == fast) {
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
			if (slow == fast) {
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
		let head = this.head,
			current = head,
			node = new Node(val),
			previous;

		this.increment();

		if (!this.head) {
			this.head = node;
			return this;
		}
		//value lower than head value
		if (val < this.head.data) {
			node.next = head;
			this.head = node;
			return this;
		}

		while (current) {
			if (current.data > val) {
				node.next = current;
				previous.next = node;
				return this;
			}
			previous = current;
			current = current.next;
		}
		node.next = null;
		previous.next = node;
		return this;
	};

	LinkedList.prototype.pushSortedDesc = function (val) {
		if (!val) {
			return null;
		}
		let head = this.head,
			current = head,
			node = new Node(val),
			previous;

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
				previous.next = node;
				return this;
			}
			previous = current;
			current = current.next;
		}
		node.next = null;
		previous.next = node;
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
			kthNode, previous;
		if (k <= 0) return this;

		while (node) {
			if (i == k) {
				kthNode = this.head;
			} else if (i - k > 0) {
				previous = kthNode;
				kthNode = kthNode.next;
			}
			i++;

			node = node.next;
		}
		if (!previous) this.head = this.head.next;
		else {
			previous.next = kthNode.next;
		}
		return this;
	};

	LinkedList.prototype.getLength = function () {
		let head = this.head,
			current = head,
			pointer = head,
			anotherPtr, len = 0;
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
			previous = this.head,
			current = this.head,
			i = 1;
		while (current.next) {
			if (i == k + 1) {
				this.head = current;
				previous.next = null;
			}
			previous = current;
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
		let previous;

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
		let previous;

		if (!current) {
			return null;
		}

		while (current.next) {
			const {
				data,
				next
			} = current.next;
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
