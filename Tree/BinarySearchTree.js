/**
 * Represents a Node in a Binary Search Tree.
 */
class Node {
	value;
	left;
	right;

	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}

/**
 * A basic Queue implementation for use in BFS traversal.
 * This is a simple in-memory queue. For very large trees,
 * a more optimized queue implementation might be considered.
 */
class Queue {
	#elements = {};
	#upperLimit = 0;
	#lowerLimit = 0;

	enqueue(element) {
		this.#elements[++this.#upperLimit] = element;
	}

	prequeue(element) {
		this.#elements[this.#lowerLimit--] = element;
	}

	dequeue() {
		if (this.isEmpty()) return null;

		const element = this.#elements[++this.#lowerLimit];
		delete this.#elements[this.#lowerLimit];
		return element;
	}

	isEmpty() {
		return this.size === 0;
	}

	get size() {
		return this.#upperLimit - this.#lowerLimit;
	}
}

/**
## Enhanced ES6 Binary Search Tree
*/
class BinarySearchTree {
	#root = null; // Private class field for the root

	/**
	 * Adds a new value to the binary search tree.
	 * @param {*} value The value to add.
	 * @returns {BinarySearchTree} The current instance of the BST for chaining.
	 */
	add(value) {
		if (value === null || value === undefined) {
			throw new Error('Cannot add null or undefined values');
		}
		const newNode = new Node(value);

		if (!this.#root) {
			this.#root = newNode;
			return this;
		}

		let current = this.#root;
		while (true) {
			if (value < current.value) {
				if (current.left === null) {
					current.left = newNode;
					break;
				}
				current = current.left;
			} else if (value > current.value) {
				if (current.right === null) {
					current.right = newNode;
					break;
				}
				current = current.right;
			} else {
				// Value already exists, do not add duplicates
				break;
			}
		}
		return this;
	}

	/**
	 * Checks if the tree contains a specific value.
	 * @param {*} value The value to search for.
	 * @returns {boolean} True if the value is found, false otherwise.
	 */
	contains(value) {
		let current = this.#root;
		while (current) {
			if (value < current.value) {
				current = current.left;
			} else if (value > current.value) {
				current = current.right;
			} else {
				return true; // Value found
			}
		}
		return false; // Value not found
	}

	/**
	 * Removes a value from the binary search tree.
	 * This implementation covers all three cases: no children, one child, and two children.
	 * @param {*} value The value to remove.
	 */
	remove(value) {
		this.#root = this.#removeNode(this.#root, value);
	}

	/**
	 * Helper method for recursive node removal.
	 * @param {Node} node The current node being considered.
	 * @param {*} value The value to remove.
	 * @returns {Node|null} The modified node or null if the node is removed.
	 */
	#removeNode(node, value) {
		if (node === null) {
			return null;
		}

		if (value < node.value) {
			node.left = this.#removeNode(node.left, value);
			return node;
		} else if (value > node.value) {
			node.right = this.#removeNode(node.right, value);
			return node;
		} else {
			// Node with the value to be removed found

			// Case 1: No child or one child
			if (node.left === null) {
				return node.right;
			} else if (node.right === null) {
				return node.left;
			}

			// Case 2: Two children
			// Find the in-order successor (smallest value in the right subtree)
			let tempNode = node.right;
			while (tempNode.left !== null) {
				tempNode = tempNode.left;
			}
			node.value = tempNode.value; // Replace current node's value with successor's value
			node.right = this.#removeNode(node.right, tempNode.value); // Remove the successor node
			return node;
		}
	}

	/**
	 * Performs a Depth-First Traversal (in-order by default) and applies a callback function to each node's value.
	 * Uses recursion for a cleaner implementation.
	 * @param {function(value: *)} callback The function to call for each node's value.
	 * @param {string} [type='inOrder'] The type of DFS traversal: 'inOrder', 'preOrder', or 'postOrder'.
	 */
	traverseDF(callback, type = 'inOrder') {
		const recurse = (node) => {
			if (node) {
				if (type === 'preOrder') {
					callback(node.value);
				}
				recurse(node.left);
				if (type === 'inOrder') {
					callback(node.value);
				}
				recurse(node.right);
				if (type === 'postOrder') {
					callback(node.value);
				}
			}
		};
		recurse(this.#root);
	}

	/**
	 * Performs a Breadth-First Traversal and applies a callback function to each node.
	 * @param {function(node: Node)} callback The function to call for each node.
	 */
	traverseBF(callback) {
		if (!this.#root) {
			return;
		}

		const queue = new Queue();
		queue.enqueue(this.#root);

		while (!queue.isEmpty()) {
			const current = queue.dequeue();
			callback(current.value); // You might want to pass the whole node or just the value

			if (current.left) {
				queue.enqueue(current.left);
			}
			if (current.right) {
				queue.enqueue(current.right);
			}
		}
	}

	// Add height calculation
	getHeight() {
		const calculateHeight = (node) => {
			if (!node) return -1;
			return 1 + Math.max(calculateHeight(node.left), calculateHeight(node.right));
		};
		return calculateHeight(this.#root);
	}

	/**
	 * Calculates the number of nodes in the tree.
	 * @returns {number} The size of the tree.
	 */
	size() {
		let count = 0;
		this.traverseDF(() => count++);
		return count;
	}

	/**
	 * Converts the tree values into an array using in-order traversal.
	 * @returns {Array<*>} An array containing all values in ascending order.
	 */
	toArray() {
		const result = [];
		this.traverseDF((value) => result.push(value));
		return result;
	}

	/**
	 * Returns a string representation of the tree (in-order).
	 * @returns {string} A string of the tree values.
	 */
	toString() {
		return this.toArray().toString();
	}

	/**
	 * An alias for traverseDF with default in-order traversal.
	 * @param {function(value: *)} process The function to call for each node's value.
	 */
	traverse(process) {
		this.traverseDF(process, 'inOrder');
	}
}

// Example Usage:
const bst = new BinarySearchTree();
bst.add(10).add(5).add(15).add(3).add(7).add(12).add(18);

console.log('Contains 7:', bst.contains(7)); // true
console.log('Contains 9:', bst.contains(9)); // false
console.log('Tree size:', bst.size()); // 7
console.log('Tree toArray (in-order):', bst.toArray()); // [3, 5, 7, 10, 12, 15, 18]

console.log('\n--- Depth-First Traversal (Pre-Order) ---');
bst.traverseDF((value) => console.log(value), 'preOrder'); // 10, 5, 3, 7, 15, 12, 18

console.log('\n--- Breadth-First Traversal ---');
bst.traverseBF((value) => console.log(value)); // 10, 5, 15, 3, 7, 12, 18

console.log('\nRemoving 5 (node with two children):');
bst.remove(5);
console.log('Tree toArray after removing 5:', bst.toArray()); // [3, 7, 10, 12, 15, 18]
console.log('Contains 5:', bst.contains(5)); // false

console.log('\nRemoving 18 (leaf node):');
bst.remove(18);
console.log('Tree toArray after removing 18:', bst.toArray()); // [3, 7, 10, 12, 15]

console.log('\nRemoving 10 (root node):');
bst.remove(10);
console.log('Tree toArray after removing 10:', bst.toArray()); // [3, 7, 12, 15]
