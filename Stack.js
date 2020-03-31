const Stack = (function () {
	const Node = function (data) {
		this.data = data;
		this.previous = null;
	};

	const Stack = function () {
		this.top = null;
		this.size = 0;
	};

	Stack.prototype.push = function (data) {
		const node = new Node(data);

		node.previous = this.top;
		this.top = node;
		this.size += 1;
		return this.top;
	};

	Stack.prototype.pop = function () {
		if (!this.top) {
			return null;
		}
		const temp = this.top;
		this.top = this.top.previous;
		this.size -= 1;
		return temp;
	};

	Stack.prototype.Peek = function () {
		return (this.top || {}).data;
	};

	Stack.prototype.print = function () {
		const temp = this.top;
		while (temp) {
			console.log(temp.data);
			temp.previous = temp;
		}
	};

	Stack.prototype.hasNext = function () {
		return this.previous != undefined;
	};

	Stack.prototype.isEmpty = function () {
		return this.top == undefined;
	};

	return Stack;
})();

const stack = new Stack();
