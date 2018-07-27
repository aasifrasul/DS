var CircularLinkedList = (function() {
	var Node = function(value) {
		this.value = value;
		this.previous = null;
		this.next = null;
	};

	var CircularLinkedList = function() {
		this.head = null;
	};

	CircularLinkedList.prototype.push = function(val) {
		var head = this.head,
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

var cll = CircularLinkedList;
