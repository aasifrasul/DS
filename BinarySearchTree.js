const BinarySearchTree = (function () {
	const Node = function (value) {
		this.value = value;
		this.left = null;
		this.right = null;
	};

	const BinarySearchTree = function () {
		this.root = null;
	};

	BinarySearchTree.prototype = {
		constructor: BinarySearchTree,

		add(value) {
			let node = new Node(value),
				current;

			if (!this.root) {
				this.root = node;
			} else {
				current = this.root;
				while (true) {
					if (value < current.value) {
						if (current.left === null) {
							current.left = node;
							break;
						} else {
							current = current.left;
						}
					} else if (value > current.value) {
						if (current.right === null) {
							current.right = node;
							break;
						} else {
							current = current.right;
						}
					} else {
						break;
					}
				}
			}
			return this;
		},

		contains(value) {
			let found = false,
				current = this.root;

			while (!found && current) {
				if (value < current.value) {
					current = current.left;
				} else if (value > current.value) {
					current = current.right;
				} else {
					found = true;
				}
			}

			return found;
		},

		remove(value) {
			let found = false,
				parent = null,
				current = this.root,
				childCount,
				replacement,
				replacementParent;

			while (!found && current) {
				if (value < current.value) {
					parent = current;
					current = current.left;
				} else if (value > current.value) {
					parent = current;
					current = current.right;
				} else {
					found = true;
				}
			}

			if (found) {
				childCount =
					(current.left !== null ? 1 : 0) +
					(current.right !== null ? 1 : 0);

				if (current === this.root) {
					switch (childCount) {
						case 0:
							this.root = null;
							break;
						case 1:
							this.root =
								current.right === null
									? current.left
									: current.right;
							break;
						case 2:
							replacement = this.root.left;
							while (replacement.right !== null) {
								replacementParent = replacement;
								replacement = replacement.right;
							}
							if (replacementParent !== null) {
								replacementParent.right = replacement.left;
								replacement.right = this.root.right;
								replacement.left = this.root.left;
							} else {
								replacement.right = this.root.right;
							}

							this.root = replacement;
					}
				} else {
					switch (childCount) {
						case 0:
							if (current.value < parent.value) {
								parent.left = null;
							} else {
								parent.right = null;
							}
							break;
						case 1:
							if (current.value < parent.value) {
								parent.left =
									current.left === null
										? current.right
										: current.left;
							} else {
								parent.right =
									current.left === null
										? current.right
										: current.left;
							}
							break;
						case 2:
							replacement = current.left;
							replacementParent = current;
							while (replacement.right !== null) {
								replacementParent = replacement;
								replacement = replacement.right;
							}

							replacementParent.right = replacement.left;
							replacement.right = current.right;
							replacement.left = current.left;

							if (current.value < parent.value) {
								parent.left = replacement;
							} else {
								parent.right = replacement;
							}
					}
				}
			}
		},

		traverseDF(callback) {
			const recurse = function (node) {
				if (node) {
					const { left, right, value } = node;
					callback.call(this, value);
					if (!!left) {
						recurse(left);
					} else {
						recurse(right);
					}
				}
			};
			recurse(this.root);
		},

		traverseBF(callback) {
			const queue = new Queue();

			queue.enqueue(this.root);

			currentTree = queue.dequeue();

			while (currentTree) {
				for (
					let i = 0, length = currentTree.children.length;
					i < length;
					i++
				) {
					queue.enqueue(currentTree.children[i]);
				}

				callback(currentTree);
				currentTree = queue.dequeue();
			}
		},

		size() {
			let length = 0;
			this.traverse((node) => length++);
			return length;
		},

		toArray() {
			const result = [];
			this.traverse((node) => result.push(node.value));
			return result;
		},

		toString() {
			return this.toArray().toString();
		},

		traverse(process) {
			function inOrder(node) {
				if (node) {
					const { left, right, value } = node;
					if (!!left) {
						inOrder(left);
					}
					process.call(this, value);
					if (!!right) {
						inOrder(right);
					}
				}
			}

			inOrder(this.root);
		},
	};

	return BinarySearchTree;
})();

const bst = new BinarySearchTree();
