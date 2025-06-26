/**
 * Represents a Node in the AAS (Almost AVL Tree) / Skew-Split Balanced Binary Search Tree.
 */
class Node {
	/**
	 * @param {*} key - The key of the node.
	 * @param {*} value - The value associated with the key.
	 * @param {number} level - The level of the node in the tree (used for balancing).
	 * @param {Node} left - The left child node.
	 * @param {Node} right - The right child node.
	 */
	constructor(key, value, level, left, right) {
		this.key = key;
		this.value = value;
		this.level = level;
		this.left = left;
		this.right = right;
	}
}

// Sentinel node representing the bottom of the tree.
// Using 'static' properties for a class could be an option here,
// but for a single instance like this, a constant is simpler and clearer.
const bottom = new Node(null, null, 0);
bottom.left = bottom;
bottom.right = bottom;

/**
 * Creates a new Node initialized for insertion into the tree.
 * @param {*} key - The key for the new node.
 * @param {*} value - The value for the new node.
 * @returns {Node} A new Node instance.
 */
const createNewNode = (key, value) => new Node(key, value, 1, bottom, bottom);

/**
 * Default comparison function for keys.
 * @param {*} a - The first key.
 * @param {*} b - The second key.
 * @returns {number} -1 if a < b, 1 if a > b, 0 if a === b.
 */
const defaultCompare = (a, b) => {
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
};

/**
 * Skew operation for AAS tree rebalancing.
 * @param {Node} node - The node to perform the skew operation on.
 * @returns {Node} The rotated node.
 */
const skew = (node) => {
	if (node.left.level === node.level) {
		const temp = node;
		node = node.left;
		temp.left = node.right;
		node.right = temp;
	}
	return node;
};

/**
 * Split operation for AAS tree rebalancing.
 * @param {Node} node - The node to perform the split operation on.
 * @returns {Node} The rotated node.
 */
const split = (node) => {
	if (node.right.right.level === node.level) {
		const temp = node;
		node = node.right;
		temp.right = node.left;
		node.left = temp;
		node.level++;
	}
	return node;
};

/**
 * Represents a Balanced Binary Search Tree (AAS Tree)
 * with methods for finding and inserting nodes.
 */
class BBTree {
	/**
	 * @param {Function} [compareFn] - Optional custom comparison function.
	 */
	constructor(compareFn) {
		this.compare = compareFn || defaultCompare;
		this.root = null;
		// Using a temporary array for the path during insertion/rebalancing
		// This avoids creating a new array in each insert call.
		this.path = [];
	}

	/**
	 * Finds a node with the given key in the tree.
	 * @param {*} key - The key to search for.
	 * @returns {Node|null} The node if found, otherwise null.
	 */
	find(key) {
		let node = this.root;
		const compare = this.compare;

		while (node !== bottom && node !== null) {
			// Added node !== null check for initial empty tree
			const c = compare(key, node.key);
			if (c === 0) return node;
			node = c < 0 ? node.left : node.right;
		}
		return null;
	}

	/**
	 * Inserts a key-value pair into the tree.
	 * @param {*} key - The key to insert.
	 * @param {*} value - The value to associate with the key.
	 * @returns {BBTree} The current BBTree instance for chaining.
	 */
	insert(key, value) {
		const compare = this.compare;
		let node = this.root;
		const path = this.path; // Reuse the path array
		let k = 0; // Index for the path array

		if (!node) {
			this.root = createNewNode(key, value);
			return this;
		}

		while (true) {
			const c = compare(key, node.key);
			if (c === 0) return this; // Key already exists

			path[k++] = node; // Store node in path and increment k

			if (c < 0) {
				if (node.left === bottom) {
					node.left = createNewNode(key, value);
					break;
				}
				node = node.left;
			} else {
				if (node.right === bottom) {
					node.right = createNewNode(key, value);
					break;
				}
				node = node.right;
			}
		}

		// Only pass the relevant portion of the path and the count of nodes in path
		this.rebalance(path, k);

		// Clear the path array for the next insertion (optional, but good practice)
		path.length = 0;

		return this;
	}

	/**
	 * Rebalances the tree after an insertion using the path from the root to the inserted node.
	 * This implements the AAS (Almost AVL Tree) rebalancing logic using skew and split operations.
	 * @param {Node[]} path - An array of nodes from the root to the parent of the newly inserted node.
	 * @param {number} k - The number of nodes in the path array that are relevant.
	 */
	rebalance(path, k) {
		let rotated, node, parent, updated;
		let m = 0; // Counter for consecutive unchanged nodes

		// Iterate up the path from the inserted node's parent to the root
		for (let i = k - 1; i >= 0; i--) {
			node = path[i];
			rotated = node; // Assume no rotation initially

			// Check for level equality for potential level increment
			if (node.level === node.left.level && node.level === node.right.level) {
				node.level++; // Promote the node's level
				updated = true;
			} else {
				// Apply skew and split operations
				rotated = skew(node);
				rotated = split(rotated);
				// If a rotation occurred, it's considered an update
				updated = rotated !== node;
			}

			// If the node was rotated or its level was updated, update its parent's reference
			if (updated) {
				// If it's not the root, update the parent's child pointer
				if (i > 0) {
					parent = path[i - 1];
					if (parent.left === node) {
						parent.left = rotated;
					} else {
						parent.right = rotated;
					}
				} else {
					// If it's the root, update the tree's root
					this.root = rotated;
				}
				m = 0; // Reset consecutive unchanged counter if an update occurred
			} else {
				m++; // Increment counter if no update
			}

			// Stop rebalancing if two consecutive nodes were not updated
			if (m === 2) break;
		}
	}
}

/**
 * Factory function to create a new BalancedBST instance.
 * This can be seen as the public interface, consistent with the original design.
 * @param {Function} [compareFn] - Optional custom comparison function.
 * @returns {BBTree} A new BalancedBST instance.
 */
const BalancedBST = (compareFn) => new BBTree(compareFn);

// For Node.js environments, export the BalancedBST factory function
if (typeof module !== 'undefined' && module.exports) {
	module.exports = BalancedBST;
}

// Example usage (remains similar)
const balancedBST = BalancedBST(); // or new BBTree(); if you prefer direct constructor call
balancedBST.insert(10, 'Value 10');
balancedBST.insert(5, 'Value 5');
balancedBST.insert(15, 'Value 15');
balancedBST.insert(3, 'Value 3');
balancedBST.insert(7, 'Value 7');
balancedBST.insert(12, 'Value 12');
balancedBST.insert(18, 'Value 18');

console.log('Found 7:', balancedBST.find(7)?.value); // Using optional chaining
console.log('Found 100:', balancedBST.find(100)); // Should be null

// A small helper to visualize the tree (for testing/debugging, not part of the core logic)
function printTree(node, indent = '') {
	if (node === bottom || node === null) {
		return;
	}
	console.log(`${indent}Key: ${node.key}, Value: ${node.value}, Level: ${node.level}`);
	printTree(node.left, indent + '  L-');
	printTree(node.right, indent + '  R-');
}

console.log('\nTree Structure:');
printTree(balancedBST.root);
