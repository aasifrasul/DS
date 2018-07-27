const Tree = (function() {
	const Node = function(data) {
		this.data = data;
		this.parent = null;
		this.children = [];
	};

	const Tree = function(data) {
		const node = new Node(data);
		this._root = node;
	};

	Tree.prototype.traverseDF = function(callback) {
		(function recurse(currentNode) {
			for (let i = 0, length = currentNode.children.length; i < length; i++) {
				recurse(currentNode.children[i]);
			}
			callback(currentNode);
		})(this._root);
	};

	Tree.prototype.traverseBF = function(callback) {
		const queue = new Queue();

		queue.enqueue(this._root);

		currentTree = queue.dequeue();

		while (currentTree) {
			for (let i = 0, length = currentTree.children.length; i < length; i++) {
				queue.enqueue(currentTree.children[i]);
			}
			callback(currentTree);
			currentTree = queue.dequeue();
		}
	};

	Tree.prototype.contains = function(callback, traversal) {
		traversal.call(this, callback);
	};

	Tree.prototype.add = function(data, toData, traversal) {
		let child = new Node(data),
            parent = null,
            callback = function(node) {
				if (node.data === toData) {
					parent = node;
				}
			};

		this.contains(callback, traversal);

		if (parent) {
			parent.children.push(child);
			child.parent = parent;
		} else {
			throw new Error('Cannot add node to a non-existent parent.');
		}
	};

	Tree.prototype.remove = function(data, fromData, traversal) {
		let tree = this, parent = null, childToRemove = null, index;

		const callback = function(node) {
			if (node.data === fromData) {
				parent = node;
			}
		};

		this.contains(callback, traversal);

		if (parent) {
			index = findIndex(parent.children, data);

			if (index === undefined) {
				throw new Error('Node to remove does not exist.');
			} else {
				childToRemove = parent.children.splice(index, 1);
			}
		} else {
			throw new Error('Parent does not exist.');
		}

		return childToRemove;
	};

	function findIndex(arr, data) {
		let index;

		for (let i = 0; i < arr.length; i++) {
			if (arr[i].data === data) {
				index = i;
			}
		}

		return index;
	}

	return Tree;
})();

const tree = new Tree();
