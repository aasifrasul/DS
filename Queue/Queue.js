const Queue = (function () {
	const Node = function (data) {
		this.data = data;
		this.next = null;
	};

	const Queue = function () {
		this.head = null;
		this.size = 0;
	};

	Queue.prototype.enqueue = function (data) {
		const node = new Node(data);
		let temp = this.head;

		if (temp) {
			while (temp.next) {
				temp = temp.next;
			}
			temp.next = node;
		} else {
			this.head = node;
		}

		this.size += 1;
		return node;
	};

	Queue.prototype.dequeue = function () {
		if (!this.head) {
			return null;
		}
		const temp = this.head;
		this.head = this.head.next;
		this.size -= 1;
		return temp;
	};

	Queue.prototype.peekAt = function (index) {
		//anything smaller than 0 and equal or greater than count is not at the queue
		if (index > -1 && index < count) {
			let current = head;

			//Navigates through the queue to find the item
			for (let i = 0; i < index; i++) {
				current = current.next;
			}

			return current.data;
		}
		//an index out of the bounds of the queue was chosen.
		else {
			return null;
		}
	};

	Queue.prototype.print = function () {
		let curr = this.head;
		while (curr) {
			console.log(curr.data);
			curr = curr.next;
		}
	};

	Queue.prototype.hasNext = function () {
		return this.head.next != undefined;
	};

	Queue.prototype.isEmpty = function () {
		return this.head == null;
	};

	return Queue;
})();

const queue = new Queue();
