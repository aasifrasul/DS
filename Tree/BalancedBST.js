const BalancedBST = (function () {
	'use strict';

	if (typeof module !== 'undefined') module.exports = BalancedBST;

	function Node(key, value, level, left, right) {
		this.key = key;
		this.value = value;

		this.level = level;
		this.left = left;
		this.right = right;
	}

	const bottom = new Node(null, null, 0);
	bottom.left = bottom;
	bottom.right = bottom;

	function newNode(key, value) {
		return new Node(key, value, 1, bottom, bottom);
	}

	function BalancedBST(compareFn) {
		return new BBTree(compareFn);
	}

	function BBTree(compareFn) {
		this.compare = compareFn || defaultCompare;
		this.path = [];
	}

	BBTree.prototype.find = function (key) {
		let node = this.root,
			compare = this.compare;

		while (node !== bottom) {
			const c = compare(key, node.key);
			if (c === 0) return node;
			node = c < 0 ? node.left : node.right;
		}
		return null;
	};

	BBTree.prototype.insert = function (key, value) {
		let compare = this.compare,
			node = this.root,
			path = this.path;

		if (!node) {
			this.root = newNode(key, value);
			return this;
		}

		let k = 0;

		while (true) {
			const c = compare(key, node.key);
			if (!c) return this;

			path[k] = node;
			k++;

			if (c < 0) {
				if (node.left === bottom) {
					node.left = newNode(key, value);
					break;
				}
				node = node.left;
			} else {
				if (node.right === bottom) {
					node.right = newNode(key, value);
					break;
				}
				node = node.right;
			}
		}

		this.rebalance(path, k);

		return this;
	};

	BBTree.prototype.rebalance = function (path, k) {
		let rotated,
			node,
			parent,
			updated,
			m = 0;

		for (let i = k - 1; i >= 0; i--) {
			rotated = node = path[i];

			if (node.level === node.left.level && node.level === node.right.level) {
				updated = true;
				node.level++;
			} else {
				rotated = skew(node);
				rotated = split(rotated);
			}

			if (rotated !== node) {
				updated = true;
				if (i) {
					parent = path[i - 1];
					if (parent.left === node) parent.left = rotated;
					else parent.right = rotated;
				} else this.root = rotated;
			}
			if (!updated) m++;
			if (m === 2) break;
		}
	};

	function defaultCompare(a, b) {
		return a < b ? -1 : a > b ? 1 : 0;
	}

	function skew(node) {
		if (node.left.level === node.level) {
			const temp = node;
			node = node.left;
			temp.left = node.right;
			node.right = temp;
		}
		return node;
	}

	function split(node) {
		if (node.right.right.level === node.level) {
			const temp = node;
			node = node.right;
			temp.right = node.left;
			node.left = temp;
			node.level++;
		}
		return node;
	}

	return BalancedBST;
})();

const balancedBST = new BalancedBST();
