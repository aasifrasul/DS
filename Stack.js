const Stack = (function () {
	const Node = function (data) {
		this.data = data;
		this.next = null;
	};

	const Stack = function () {
		this.top = null;
		this.size = 0;
	};

	Stack.prototype.push = function (data) {
		const node = new Node(data);

		node.next = this.top;
		this.top = node;
		this.size += 1;
		return this.top;
	};

	Stack.prototype.pop = function () {
		if (!this.top) {
			return null;
		}
		const temp = this.top;
		this.top = this.top.next;
		this.size -= 1;
		return temp;
	};

	Stack.prototype.peek = function () {
		return (this.top || {}).data;
	};

	Stack.prototype.print = function () {
		const temp = this.top;
		while (temp) {
			temp.next = temp;
		}
	};

	Stack.prototype.hasNext = function () {
		return !!this.next;
	};

	Stack.prototype.isEmpty = function () {
		return !this.size;
	};

	return Stack;
})();

const stack = new Stack();
