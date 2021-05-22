const CircularLinkedList = (function () {
	const Node = function (value) {
		this.value = value;
		this.previous = null;
		this.next = null;
	};

	const CircularLinkedList = function () {
		this.head = null;
	};

	CircularLinkedList.prototype.push = function (val) {
		let head = this.head,
			temp = head,
			node = new Node(val);

		if (!head) {
			node.next = node;
			node.previous = node;
			this.head = node;
		} else {
			while (temp.next != head) {
				temp = temp.next;
			}

			node.next = head;
			node.previous = temp;

			head.previous = node;
			temp.next = node;
		}
	};

	return CircularLinkedList;
})();

const cll = CircularLinkedList;
