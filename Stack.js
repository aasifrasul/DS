var Stack = (function() {
	var Node = function(data) {
		this.data = data;
		this.previous = null;
	};

	var Stack = function() {
		this.top = null;
		this.size = 0;
	};

	Stack.prototype.push = function(data) {
		var node = new Node(data);

		node.previous = this.top;
		this.top = node;
		this.size += 1;
		return this.top;
	};

	Stack.prototype.pop = function() {
		if (!this.top) {
			return null;
		}
		var temp = this.top;
		this.top = this.top.previous;
		this.size -= 1;
		return temp;
	};

	Stack.prototype.Peek = function() {
		return (top || {}).data;
	};

	Stack.prototype.print = function() {
		var temp = this.top;
		while (temp) {
			console.log(temp.data);
			temp.previous = temp;
		}
	};

	Stack.prototype.hasNext = function() {
		return this.previous != undefined;
	};

	Stack.prototype.isEmpty = function() {
		return this.top == undefined;
	};

	return Stack;
})();

var stack = new Stack();
