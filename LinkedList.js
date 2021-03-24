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
			curr = this.head;

		while (curr) {
			result.push(curr.data);
			curr = curr.next;
		}

		return result;
	};

	LinkedList.prototype.toString = function () {
		return this.toArray().toString();
	};

	LinkedList.prototype.add = function (value) {
		let node = new Node(value),
			curr = this.head;

		this.increment();

		if (!curr) {
			this.head = node;
			return node;
		}

		while (curr.next) {
			curr = curr.next;
		}

		curr.next = node;
		return node;
	};

	LinkedList.prototype.insertAfter = function (data, toNodeData) {
		let curr = this.head;
		while (curr) {
			if (curr.data === toNodeData) {
				const node = new Node(data);
				if (curr === this.tail) {
					this.tail.next = node;
					this.tail = node;
				} else {
					node.next = curr.next;
					curr.next = node;
				}
				this.numberOfValues++;
			}
			curr = curr.next;
		}
	};

	LinkedList.prototype.traverse = function (fn) {
		let curr = this.head;
		while (curr) {
			if (fn) {
				fn(curr);
			}
			curr = curr.next;
		}
	};

	LinkedList.prototype.addTop = function (value) {
		const node = new Node(value),
			curr = this.head;

		this.increment();

		if (!curr) {
			this.head = node;
			return node;
		}

		node.next = curr;
		this.head = node;
		return node;
	};

	LinkedList.prototype.print = function (key = 'data') {
		let curr = this.head;
		while (curr) {
			console.log(curr[key]);
			curr = curr.next;
		}
	};

	LinkedList.prototype.clone = function (pos) {
		let curr = this.head,
			clonedLL = new LinkedList();

		while (curr) {
			clonedLL.add(curr.data);
			curr = curr.next;
		}

		return clonedLL;
	};

	LinkedList.prototype.get = function (pos) {
		let curr = this.head,
			count = 0;

		if (pos > this.length) {
			return "Doesn't Exist!";
		}
		while (count < pos) {
			curr = curr.next;
			count++;
		}
		return curr;
	};

	LinkedList.prototype.remove = function (pos) {
		let curr = this.head,
			count = 0,
			prevNode = null;
		if (pos > this.length) {
			return "Doesn't Exist!";
		}
		if (pos === 0) {
			this.head = curr.next;
			this.decrement();
			return this.head;
		}
		while (count < pos) {
			prevNode = curr;
			curr = curr.next;
			count++;
		}
		prevNode.next = curr.next;
		curr = null;
		this.decrement();

		return this.head;
	};

	LinkedList.prototype.delete = function (value) {
		let curr = this.head;

		if (!curr) {
			return null;
		}

		if (curr.data == value) {
			this.head = curr.next;
			this.decrement();
			return curr;
		}

		while (curr.next) {
			const prev = curr;
			curr = curr.next;
			if (curr.data == value) {
				prev.next = curr.next;
				this.decrement();
				return curr;
			}
		}

		return null;
	};

	LinkedList.prototype.searchNodeAt = function (pos) {
		let curr = this.head;
		let count = 0;

		if (!curr) {
			return null;
		}

		while (curr.next) {
			count++;
			if (pos == count) {
				return curr;
			}
			curr = curr.next;
		}

		return null;
	};

	LinkedList.prototype.searchNodeByValue = function (val) {
		let curr = this.head;

		if (!curr) {
			return null;
		}

		if (curr.data == val) {
			return curr;
		}

		while (curr.next) {
			curr = curr.next;
			if (curr.data == val) {
				return curr;
			}
		}

		return null;
	};

	LinkedList.prototype.remove = function (pos) {
		let curr = this.head,
			length = this.length,
			count = 0,
			message = {
				failure: 'Failure: non-existent node in this list.',
			},
			beforeNodeToDelete = null,
			nodeToDelete = null,
			deletedNode = null;

		if (typeof pos === 'undefined' || pos < 0 || pos > length) {
			throw new Error(message.failure);
		}

		if (!curr) {
			return null;
		}

		if (pos === 0) {
			this.head = curr.next;
			deletedNode = curr;
			curr = null;
			this.decrement();

			return deletedNode;
		}

		while (count < pos) {
			beforeNodeToDelete = curr;
			nodeToDelete = curr.next;
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

		let curr = this.head,
			node;
		const reversedLL = new LinkedList();

		while (curr) {
			node = new Node(curr.data);
			node.next = reversedLL.head;
			reversedLL.head = node;
			curr = curr.next;
		}
		/*
				while (curr) {
					reversedLL.addTop(curr.data);
					curr = curr.next;
				}
		*/
		return reversedLL;
	};

	LinkedList.prototype.reverseInPlace = function () {
		if (!this.head || !this.head.next) return this;

		let curr = this.head,
			prev = null,
			next = null;

		while (curr) {
			next = curr.next;
			console.log('next = curr.next; next=', next);
			curr.next = prev;
			console.log('curr.next = prev; curr=', curr);
			prev = curr;
			console.log('prev = curr; prev=', prev);
			curr = next;
			console.log('curr = next; curr=', curr);
			console.log('---------------------------------------------------');
		}
		this.head = prev;

		return this;
	};

	LinkedList.prototype.reverseInPlace = function () {
		let curr = this.head;

		if (curr) {
			while (curr.next) {
				node = new Node(curr.next.data);
				node.next = this.head;
				this.head = node;
				curr.next = curr.next.next;
			}
		}

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
		let curr = this.head,
			node = new Node(val),
			prev;

		this.increment();

		if (!this.head) {
			this.head = node;
			return this;
		}
		//value lower than head value
		if (val < this.head.data) {
			node.next = curr;
			this.head = node;
			return this;
		}

		while (curr) {
			if (curr.data > val) {
				node.next = curr;
				prev.next = node;
				return this;
			}
			prev = curr;
			curr = curr.next;
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
			curr = head,
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

		while (curr) {
			if (curr.data < val) {
				node.next = curr;
				prev.next = node;
				return this;
			}
			prev = curr;
			curr = curr.next;
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
			curr = head,
			pointer = head,
			anotherPtr,
			len = 0;
		const loopStartNode = head.findLoopStart();
		if (!loopStartNode) {
			while (curr) {
				curr = curr.next;
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
			curr = this.head,
			i = 1;
		while (curr.next) {
			if (i == k + 1) {
				this.head = curr;
				prev.next = null;
			}
			prev = curr;
			curr = curr.next;
			i++;
		}
		curr.next = prevHead;
		return this;
	};

	// Ascending Sort
	LinkedList.prototype.sort = function () {
		let curr = this.head;
		const newLL = new LinkedList();

		if (!curr) {
			return null;
		}

		while (curr.next) {
			newLL.pushSorted(curr.data);
			curr = curr.next;
		}

		return newLL;
	};

	// Ascending Sort
	LinkedList.prototype.sort = function () {
		let curr = this.head;

		if (curr) {
			while (curr.next) {
				curr = curr.next;
			}
		}

		return this;
	};

	// Descending sort
	LinkedList.prototype.sortDesc = function () {
		let curr = this.head;
		const newLL = new LinkedList();

		if (!curr) {
			return null;
		}

		while (curr.next) {
			newLL.pushSortedDesc(curr.data);
			curr = curr.next;
		}

		return newLL;
	};

	// Removes Duplicates
	// But first sort it
	LinkedList.prototype.dedupe = function () {
		const sortedLL = this.sort();
		let curr = sortedLL.head;

		if (!curr) {
			return null;
		}

		while (curr.next) {
			if (curr.data === curr.next.data) {
				curr.next = (curr.next || {}).next;
				sortedLL.decrement();
			} else {
				curr = curr.next;
			}
		}

		return sortedLL;
	};

	// Removes Duplicates without Modifying the List
	LinkedList.prototype.dedupeWithoutModifying = function () {
		const uniqueLL = {};
		const clonedLL = this.clone();
		let curr = clonedLL.head;

		if (!curr) {
			return null;
		}

		while (curr.next) {
			if (uniqueLL[curr.next.data]) {
				curr.next = (curr.next || {}).next;
				clonedLL.decrement();
			} else {
				uniqueLL[curr.data] = curr.data;
				curr = curr.next;
			}
		}

		return clonedLL;
	};

	// Removes Duplicates
	// But first sort it
	LinkedList.prototype.dedupe = function () {
		const hashUnique = {};
		let curr = this.head;

		if (!curr) {
			return null;
		}
		hashUnique[curr.data] = curr.data;

		while (curr.next) {
			if (hashUnique[curr.next.data]) {
				curr.next = (curr.next || {}).next;
				this.decrement();
			} else {
				hashUnique[curr.next.data] = curr.next.data;
				curr = curr.next;
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

		let curr = this.head;

		while (n-- > 2) {
			this.add(curr.data + curr.next.data);
			curr = curr.next;
		}
		this.print();
	};

	LinkedList.prototype.deleteEven = function () {
		let curr = this.head;
		let prev;

		if (!curr) {
			return null;
		}

		while (curr.next) {
			if (curr.next.data % 2 === 0) {
				curr.next = curr.next.next;
				this.decrement();
			} else {
				curr = curr.next;
			}
		}

		if (curr.data % 2 === 0) {
			curr = null;
			this.decrement();
		}

		curr = this.head;

		if (curr.data % 2 === 0) {
			this.head = curr.next;
			this.decrement();
		}

		return this;
	};

	LinkedList.prototype.deleteOdd = function () {
		let curr = this.head;
		let prev;

		if (!curr) {
			return null;
		}

		while (curr.next) {
			const { data, next } = curr.next;
			if (data && data % 2 === 1) {
				curr.next = next;
				this.decrement();
			} else {
				curr = curr.next;
			}
		}

		if (curr.data && curr.data % 2 === 1) {
			curr = null;
			this.decrement();
		}

		curr = this.head;

		if (curr.data && curr.data % 2 === 1) {
			this.head = curr.next;
			this.decrement();
		}

		return this;
	};

	return LinkedList;
})();

const linkedList = new LinkedList();
