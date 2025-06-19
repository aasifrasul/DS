class Node {
	constructor(data) {
		this.data = data;
		this.children = [];
	}
}

class Tree {
	constructor() {
		this.root = null;
	}

	add(data, toNodeData) {
		const node = new Node(data);
		const parent = this.findBFS(toNodeData);
		if (parent) {
			parent.children.push(node);
		} else {
			if (!this.root) {
				this.root = node;
			} else {
				return 'Root node is already assigned';
			}
		}
	}

	contains(data) {
		return this.findBFS(data) ? true : false;
	}

	findBFS(data) {
		if (!this.root) return null;
		const queue = [this.root];
		while (queue.length) {
			const node = queue.shift();
			if (node.data === data) {
				return node;
			}
			for (const child of node.children) {
				queue.push(child);
			}
		}
		return null;
	}

	// Depth-First Search (DFS) traversals
	#preOrder(node, fn) {
		// Private helper method
		if (node) {
			fn && fn(node);
			for (const child of node.children) {
				this.#preOrder(child, fn);
			}
		}
	}

	#postOrder(node, fn) {
		// Private helper method
		if (node) {
			for (const child of node.children) {
				this.#postOrder(child, fn);
			}
			fn && fn(node);
		}
	}

	traverseDFS(fn, method = 'preOrder') {
		const current = this.root;
		if (method === 'preOrder') {
			this.#preOrder(current, fn);
		} else if (method === 'postOrder') {
			this.#postOrder(current, fn);
		} else {
			console.warn(`Unknown DFS method: ${method}. Defaulting to preOrder.`);
			this.#preOrder(current, fn);
		}
	}

	traverseBFS(fn) {
		if (!this.root) return;
		const queue = [this.root];
		while (queue.length) {
			const node = queue.shift();
			if (fn) fn(node);
			for (const child of node.children) {
				queue.push(child);
			}
		}
	}

	remove(data) {
		if (!this.root) return;

		if (this.root.data === data) {
			this.root = null;
			return;
		}

		const queue = [this.root];
		while (queue.length) {
			const node = queue.shift();

			for (let i = 0; i < node.children.length; i++) {
				if (node.children[i].data === data) {
					node.children.splice(i, 1);
					return; // Found and removed, exit
				} else {
					queue.push(node.children[i]);
				}
			}
		}
	}

	print() {
		if (!this.root) {
			return console.log('No root node found');
		}
		const newline = new Node('|');
		const queue = [this.root, newline];
		let string = '';
		while (queue.length) {
			const node = queue.shift();
			string += `${node.data.toString()} `;
			if (node === newline && queue.length) {
				queue.push(newline);
			}
			for (const child of node.children) {
				queue.push(child);
			}
		}
		console.log(string.slice(0, -2).trim());
	}

	printByLevel() {
		if (!this.root) {
			return console.log('No root node found');
		}
		const newline = new Node('\n');
		const queue = [this.root, newline];
		let string = '';
		while (queue.length) {
			const node = queue.shift();
			string += `${node.data.toString()}${node.data !== '\n' ? ' ' : ''}`;
			if (node === newline && queue.length) {
				queue.push(newline);
			}
			for (const child of node.children) {
				queue.push(child);
			}
		}
		console.log(string.trim());
	}
}

// --- Example Usage ---
const tree = new Tree();
tree.add('ceo');
tree.add('cto', 'ceo');
tree.add('dev1', 'cto');
tree.add('dev2', 'cto');
tree.add('dev3', 'cto');
tree.add('cfo', 'ceo');
tree.add('accountant', 'cfo');
tree.add('cmo', 'ceo');

tree.print();
tree.printByLevel();
console.log('tree contains dev1 is true:', tree.contains('dev1'));
console.log('tree contains dev4 is false:', tree.contains('dev4'));

console.log('--- BFS');
tree.traverseBFS((node) => {
	console.log(node.data);
});

console.log('--- DFS preOrder');
tree.traverseDFS((node) => {
	console.log(node.data);
}, 'preOrder');

console.log('--- DFS postOrder');
tree.traverseDFS((node) => {
	console.log(node.data);
}, 'postOrder');

tree.remove('cmo');
tree.print();
tree.remove('cfo');
tree.print();
