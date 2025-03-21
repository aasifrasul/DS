const DoublyList = (function () {
	const Node = function (value) {
		this.data = value;
		this.previous = null;
		this.next = null;
	};

	const DoublyList = function () {
		this.count = 0;
		this.head = null;
		this.tail = null;
	};

	DoublyList.prototype.add = function (value) {
		const node = new Node(value);

		if (this.count) {
			this.tail.next = node;
			node.previous = this.tail;
			this.tail = node;
		} else {
			this.head = node;
			this.tail = node;
		}

		this.count++;

		return node;
	};

	DoublyList.prototype.reverse = function () {
		let head = this.head,
			current = this.head,
			tmp;
		while (current) {
			tmp = current.next;
			current.next = current.previous;
			current.previous = tmp;
			if (!tmp) {
				//set the last node as header
				this.tail = this.head;
				this.head = current;
			}
			current = tmp;
		}
		return this;
	};

	DoublyList.prototype.searchNodeAt = function (position) {
		let currentNode = this.head,
			count = this.count,
			count = 1,
			message = {
				failure: 'Failure: non-existent node in this list.',
			};

		// 1st use-case: an invalid position
		if (count === 0 || position < 1 || position > count) {
			throw new Error(message.failure);
		}

		// 2nd use-case: a valid position
		while (count < position) {
			currentNode = currentNode.next;
			count++;
		}

		return currentNode;
	};

	DoublyList.prototype.remove = function (position) {
		let currentNode = this.head,
			count = this.count,
			count = 1,
			message = {
				failure: 'Failure: non-existent node in this list.',
			},
			beforeNodeToDelete = null,
			nodeToDelete = null,
			deletedNode = null;

		// 1st use-case: an invalid position
		if (count === 0 || position < 1 || position > count) {
			throw new Error(message.failure);
		}

		// 2nd use-case: the first node is removed
		if (position === 1) {
			this.head = currentNode.next;

			// 2nd use-case: there is a second node
			if (!this.head) {
				this.head.previous = null;
				// 2nd use-case: there is no second node
			} else {
				this.tail = null;
			}

			// 3rd use-case: the last node is removed
		} else if (position === this.count) {
			this.tail = this.tail.previous;
			this.tail.next = null;
			// 4th use-case: a middle node is removed
		} else {
			while (count < position) {
				currentNode = currentNode.next;
				count++;
			}

			beforeNodeToDelete = currentNode.previous;
			nodeToDelete = currentNode;
			afterNodeToDelete = currentNode.next;

			beforeNodeToDelete.next = afterNodeToDelete;
			afterNodeToDelete.previous = beforeNodeToDelete;
			deletedNode = nodeToDelete;
			nodeToDelete = null;
		}

		this.count--;

		return message.success;
	};

	return DoublyList;
})();

const dll = DoublyList;
