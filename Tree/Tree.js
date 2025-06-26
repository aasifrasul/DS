class Queue {
	constructor() {
		this.upperLimit = 0;
		this.lowerLimit = 0;
		this.data = {}; // Use _data for internal array
	}

	enqueue(item) {
		this.data[++this.upperLimit] = item;
	}

	prequeue(item) {
		this.data[this.lowerLimit--] = item;
	}

	dequeue() {
		if (this.isEmpty()) return undefined;

		const item = this.data[++this.lowerLimit];
		delete this.data[this.lowerLimit];
		return item;
	}

	peek() {
		if (this.isEmpty()) return undefined;

		return this.data[this.upperLimit];
	}

	isEmpty() {
		return this.size === 0;
	}

	get size() {
		return this.upperLimit - this.lowerLimit;
	}
}

class Node {
	/**
	 * Creates a new Node.
	 * @param {*} data - The data to store in the node.
	 */
	constructor(data) {
		this.data = data;
		this.parent = null;
		this.children = [];
	}
}

class Tree {
	/**
	 * Creates a new Tree.
	 * @param {*} data - The data for the root node.
	 * @throws {Error} If no data is provided for the root node.
	 */
	constructor(data) {
		if (data === undefined || data === null) {
			throw new Error('Tree must be initialized with data for the root node.');
		}
		this.root = new Node(data);
	}

	/**
	 * Performs a depth-first traversal of the tree (pre-order).
	 * @param {function(Node): void} callback - A function to call for each node.
	 */
	traverseDF(callback) {
		function recurse(currentNode) {
			callback(currentNode); // Pre-order: process node before children
			for (const child of currentNode.children) {
				recurse(child);
			}
		}
		recurse(this.root);
	}

	/**
	 * Performs a breadth-first traversal of the tree.
	 * @param {function(Node): void} callback - A function to call for each node.
	 */
	traverseBF(callback) {
		const queue = new Queue();
		queue.enqueue(this.root);

		while (queue.length) {
			let currentNode = queue.dequeue();
			callback(currentNode);
			for (const child of currentNode.children) {
				queue.enqueue(child);
			}
		}
	}

	/**
	 * Checks if a node exists in the tree based on a callback and traversal method.
	 * This method is primarily an internal helper for add/remove, allowing
	 * them to find a target node.
	 * @param {function(Node): boolean} predicate - A function that returns true if the node is found.
	 * @param {function(function(Node): void): void} traversal - The traversal method (e.g., this.traverseDF, this.traverseBF).
	 * @returns {Node|null} The found node, or null if not found.
	 */
	contains(predicate, traversal) {
		let foundNode = null;
		const callback = (node) => {
			if (predicate(node)) {
				foundNode = node;
				// In a real scenario, for efficiency, you might want to stop traversal early
				// if a node is found, but standard traversal methods don't typically support this.
				// For 'contains', one might implement a specific search function that returns early.
			}
		};
		traversal.call(this, callback);
		return foundNode;
	}

	/**
	 * Adds a new node to the tree as a child of a specified parent node.
	 * @param {*} data - The data for the new child node.
	 * @param {*} toData - The data of the parent node to which the new node will be added.
	 * @param {function(function(Node): void): void} [traversal=this.traverseDF] - The traversal method to find the parent. Defaults to depth-first.
	 * @throws {Error} If the parent node does not exist.
	 */
	add(data, toData, traversal = this.traverseDF) {
		const child = new Node(data);
		const parent = this.contains((node) => node.data === toData, traversal);

		if (parent) {
			parent.children.push(child);
			child.parent = parent;
		} else {
			throw new Error(
				`Cannot add node with data "${data}": Parent node with data "${toData}" does not exist.`,
			);
		}
	}

	/**
	 * Removes a node from the tree.
	 * Note: This only removes the specified node and its children.
	 * If the node to remove is the root, this operation might need special handling
	 * or be disallowed depending on tree design. Current implementation does not
	 * allow removal of the root by this method.
	 * @param {*} data - The data of the node to remove.
	 * @param {*} fromData - The data of the parent node from which the node will be removed.
	 * @param {function(function(Node): void): void} [traversal=this.traverseDF] - The traversal method to find the parent. Defaults to depth-first.
	 * @returns {Node|null} The removed node, or null if not found.
	 * @throws {Error} If the parent node does not exist.
	 * @throws {Error} If the node to remove does not exist as a child of the specified parent.
	 * @throws {Error} If attempting to remove the root node using this method.
	 */
	remove(data, fromData, traversal = this.traverseDF) {
		if (this.root.data === data && fromData === undefined) {
			throw new Error(
				'Cannot remove the root node directly using this method. Consider re-initializing the tree.',
			);
		}

		const parent = this.contains((node) => node.data === fromData, traversal);

		if (parent) {
			const index = parent.children.findIndex((child) => child.data === data);

			if (index === -1) {
				throw new Error(
					`Node with data "${data}" to remove does not exist as a child of node with data "${fromData}".`,
				);
			} else {
				const [childToRemove] = parent.children.splice(index, 1);
				childToRemove.parent = null; // Detach from parent
				return childToRemove;
			}
		} else {
			throw new Error(`Parent node with data "${fromData}" does not exist.`);
		}
	}
}

// --- Example Usage ---
console.log('--- Initializing Tree ---');
try {
	// const myTree = new Tree(); // This will now throw an error
	const myTree = new Tree('root');
	console.log('Tree root data:', myTree.root.data);

	console.log('\n--- Adding Nodes ---');
	myTree.add('child1', 'root');
	myTree.add('child2', 'root');
	myTree.add('grandchild1', 'child1');
	myTree.add('grandchild2', 'child1');
	myTree.add('grandchild3', 'child2');

	// Trying to add to a non-existent parent
	try {
		myTree.add('orphan', 'nonexistent');
	} catch (error) {
		console.error('Add Error (expected):', error.message);
	}

	console.log('\n--- Depth-First Traversal (Pre-order) ---');
	myTree.traverseDF((node) => console.log(node.data));
	// Expected output order: root, child1, grandchild1, grandchild2, child2, grandchild3

	console.log('\n--- Breadth-First Traversal ---');
	myTree.traverseBF((node) => console.log(node.data));
	// Expected output order: root, child1, child2, grandchild1, grandchild2, grandchild3

	console.log('\n--- Contains Check ---');
	console.log(
		"Tree contains 'grandchild2':",
		!!myTree.contains((node) => node.data === 'grandchild2', myTree.traverseDF),
	); // Using !! to convert to boolean
	console.log(
		"Tree contains 'nonexistent':",
		!!myTree.contains((node) => node.data === 'nonexistent', myTree.traverseBF),
	);

	console.log('\n--- Removing Nodes ---');
	console.log("Removing 'grandchild1' from 'child1'");
	const removedNode = myTree.remove('grandchild1', 'child1');
	console.log('Removed node data:', removedNode ? removedNode.data : 'None');

	console.log('\n--- Tree after removal (DF) ---');
	myTree.traverseDF((node) => console.log(node.data));

	// Trying to remove non-existent node
	try {
		myTree.remove('nonexistent', 'child1');
	} catch (error) {
		console.error('Remove Error (expected):', error.message);
	}

	// Trying to remove from non-existent parent
	try {
		myTree.remove('child1', 'nonexistent');
	} catch (error) {
		console.error('Remove Error (expected):', error.message);
	}

	// Trying to remove root
	try {
		myTree.remove('root');
	} catch (error) {
		console.error('Remove Root Error (expected):', error.message);
	}
} catch (e) {
	console.error('Fatal Tree Error:', e.message);
}
