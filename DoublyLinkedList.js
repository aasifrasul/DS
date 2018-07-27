const DoublyLinkedList = (function() {
	const Node = function(data) {
		(this.data = data), (this.next = null), (this.prev = null);
	};

	const DoublyLinkedList = function() {
		this.head = null;
		this.tail = null;
		this.length = 0;
	};

	DoublyLinkedList.prototype = {
		//restore constructor
		constructor: DoublyLinkedList,

		/**
		 * Appends some data to the end of the list. This method traverses
		 * the existing list and places the value at the end in a new item.
		 * @param {variant} data The data to add to the list.
		 * @return {Void}
		 * @method add
		 */
		add: function(data) {
			//create a new item object, place data in
			const node = new Node(data);

			//special case: no items in the list yet
			if (this.length == 0) {
				this.head = node;
				this.tail = node;
			} else {
				//attach to the tail node
				this.tail.next = node;
				node.prev = this.tail;
				this.tail = node;
			}

			//don't forget to update the count
			this.length++;
		},

		insertAfter: function(data, toNodeData) {
			let current = this.head;
			while (current) {
				if (current.data === toNodeData) {
					const node = new Node(data);
					if (current === this.tail) {
						this.add(data);
					} else {
						current.next.previous = node;
						node.previous = current;
						node.next = current.next;
						current.next = node;
						this.numberOfValues++;
					}
				}
				current = current.next;
			}
		},

		traverse: function(fn) {
			let current = this.head;
			while (current) {
				if (fn) {
					fn(current);
				}
				current = current.next;
			}
		},

		traverseReverse: function(fn) {
			let current = this.tail;
			while (current) {
				if (fn) {
					fn(current);
				}
				current = current.previous;
			}
		},

		/**
		 * Retrieves the data in the given position in the list.
		 * @param {int} index The zero-based index of the item whose value
		 *      should be returned.
		 * @return {variant} The value in the "data" portion of the given item
		 *      or null if the item doesn't exist.
		 * @method item
		 */
		item: function(index) {
			//check for out-of-bounds values
			if (index > -1 && index < this.length) {
				let current = this.head, i = 0;

				while (i++ < index) {
					current = current.next;
				}

				return current.data;
			} else {
				return null;
			}
		},

		/**
		 * Removes the item from the given location in the list.
		 * @param {int} index The zero-based index of the item to remove.
		 * @return {variant} The data in the given position in the list or null if
		 *      the item doesn't exist.
		 * @method remove
		 */
		remove: function(index) {
			//check for out-of-bounds values
			if (index > -1 && index < this.length) {
				let current = this.head, i = 0;

				//special case: removing first item
				if (index === 0) {
					this.head = current.next;

					/*
           * If there's only one item in the list and you remove it,
           * then this.head will be null. In that case, you should
           * also set this.tail to be null to effectively destroy
           * the list. Otherwise, set the prev pointer on the new
           * this.head to be null.
           */
					if (!this.head) {
						this.tail = null;
					} else {
						this.head.prev = null;
					}

					//special case: removing last item
				} else if (index === this.length - 1) {
					current = this.tail;
					this.tail = current.prev;
					this.tail.next = null;
				} else {
					//find the right location
					while (i++ < index) {
						current = current.next;
					}

					//skip over the item to remove
					current.prev.next = current.next;
					current.next.prev = current.prev;
				}

				//decrement the length
				this.length--;

				//return the value
				return current.data;
			} else {
				return null;
			}
		},

		reverse: function() {
			let head = this.head, current = this.head, tmp;
			while (current) {
				tmp = current.next;
				current.next = current.prev;
				current.prev = tmp;
				if (!tmp) {
					this.head = current;
				}
				current = tmp;
			}
			return this;
		},

		delete: function(val) {
			let current = this.head, prev;

			//delete head
			if (current.value == val) {
				this.head = current.next;
				//if there is only one node, then this.head is null
				if (this.head) this.head.prev = null;
				return this;
			}

			while (current.next) {
				if (current.value == val) {
					prev.next = current.next;
					current.next.prev = prev;
					return this;
				}
				prev = current;
				current = current.next;
			}

			//delete last node
			if (current.value == val) {
				prev.next = null;
			}
			return this;
		},

		size: function() {
			return this.length;
		},

		toArray: function() {
			let result = [], current = this.head;

			while (current) {
				result.push(current.data);
				current = current.next;
			}

			return result;
		},

		toString: function() {
			return this.toArray().toString();
		}
	};

	return DoublyLinkedList;
})();

const doublyLinkedList = new DoublyLinkedList();
doublyLinkedList.print(); // => ''
doublyLinkedList.add(1);
doublyLinkedList.add(2);
doublyLinkedList.add(3);
doublyLinkedList.add(4);
doublyLinkedList.print(); // => 1 2 3 4
console.log('length is 4:', doublyLinkedList.length()); // => 4
doublyLinkedList.remove(3); // remove value
doublyLinkedList.print(); // => 1 2 4
doublyLinkedList.remove(9); // remove non existing value
doublyLinkedList.print(); // => 1 2 4
doublyLinkedList.remove(1); // remove head
doublyLinkedList.print(); // => 2 4
doublyLinkedList.remove(4); // remove tail
doublyLinkedList.print(); // => 2
console.log('length is 1:', doublyLinkedList.length()); // => 1
doublyLinkedList.remove(2); // remove tail, the list should be empty
doublyLinkedList.print(); // => ''
console.log('length is 0:', doublyLinkedList.length()); // => 0
doublyLinkedList.add(2);
doublyLinkedList.add(6);
doublyLinkedList.print(); // => 2 6
doublyLinkedList.insertAfter(3, 2);
doublyLinkedList.print(); // => 2 3 6
doublyLinkedList.traverseReverse(node => {
	console.log(node.data);
});
doublyLinkedList.insertAfter(4, 3);
doublyLinkedList.print(); // => 2 3 4 6
doublyLinkedList.insertAfter(5, 9); // insertAfter a non existing node
doublyLinkedList.print(); // => 2 3 4 6
doublyLinkedList.insertAfter(5, 4);
doublyLinkedList.insertAfter(7, 6); // insertAfter the tail
doublyLinkedList.print(); // => 2 3 4 5 6 7
doublyLinkedList.add(8); // add node with normal method
doublyLinkedList.print(); // => 2 3 4 5 6 7 8
console.log('length is 7:', doublyLinkedList.length()); // => 7
doublyLinkedList.traverse(node => {
	node.data = node.data + 10;
});
doublyLinkedList.print(); // => 12 13 14 15 16 17 18
doublyLinkedList.traverse(node => {
	console.log(node.data);
}); // => 12 13 14 15 16 17 18
console.log('length is 7:', doublyLinkedList.length()); // => 7
doublyLinkedList.traverseReverse(node => {
	console.log(node.data);
}); // => 18 17 16 15 14 13 12
doublyLinkedList.print(); // => 12 13 14 15 16 17 18
console.log('length is 7:', doublyLinkedList.length()); // => 7
