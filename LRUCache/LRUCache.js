class OptimizedLRUCache {
	constructor(limit) {
		this.limit = limit;
		this.hash = Object.create(null);
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	get(key) {
		const node = this.hash[key];
		if (!node) return null;

		// Only move if not already at head
		if (key !== this.head) {
			this.moveToHead(key, node);
		}
		return node.value;
	}

	put(key, value) {
		if (this.get(key)) {
			this.hash[key].value = value;
			return;
		}

		// Add new node
		const newNode = { key, value, prev: null, next: this.head };
		this.hash[key] = newNode;

		// Update head linkage
		if (this.head) {
			this.hash[this.head].prev = key;
		}
		this.head = key;

		// Set tail if first node
		if (!this.tail) {
			this.tail = key;
		}

		this.size++;

		// Evict if necessary
		if (this.size > this.limit) {
			this.evictTail();
		}
	}

	moveToHead(key, node) {
		// Remove from current position
		this.unlinkNode(key, node);

		// Add to head
		node.prev = null;
		node.next = this.head;

		if (this.head) {
			this.hash[this.head].prev = key;
		}
		this.head = key;

		// Update tail if this was the only node
		if (!this.tail) {
			this.tail = key;
		}
	}

	unlinkNode(key, node) {
		const { prev, next } = node;

		// Update previous node's next pointer
		if (prev) {
			this.hash[prev].next = next;
		}

		// Update next node's prev pointer
		if (next) {
			this.hash[next].prev = prev;
		}

		// Update tail if this node was tail
		if (key === this.tail) {
			this.tail = prev;
		}
	}

	evictTail() {
		if (!this.tail) return;

		const tailNode = this.hash[this.tail];
		const newTail = tailNode.prev;

		// Update new tail's next pointer
		if (newTail) {
			this.hash[newTail].next = null;
		} else {
			// List becomes empty
			this.head = null;
		}

		// Remove evicted node
		delete this.hash[this.tail];
		this.tail = newTail;
		this.size--;
	}

	// Debug utility
	toString() {
		const items = [];
		let current = this.head;
		while (current) {
			const node = this.hash[current];
			items.push(`${current}:${node.value}`);
			current = node.next;
		}
		return `[${items.join(' -> ')}] (size: ${this.size})`;
	}
}

class Node {
	constructor(value) {
		this.value = value;
		this.next = null; // Key of next node
		this.prev = null; // Key of previous node
	}
}

class LRUCache {
	constructor(limit) {
		this.limit = limit;
		this.hash = Object.create(null);
		this.head = null; // Key of most recently used node
		this.tail = null; // Key of least recently used node
		this.size = 0;
	}

	get(key) {
		if (!(key in this.hash)) return -1;
		this.moveToTop(key);
		return this.hash[key].value;
	}

	put(key, value) {
		if (key in this.hash) {
			this.hash[key].value = value;
			this.moveToTop(key);
			return;
		}

		this.size++;
		if (this.size > this.limit) {
			this.evictLRU();
		}

		this.hash[key] = new Node(value);

		if (!this.head) {
			// First element
			this.head = key;
			this.tail = key;
		} else {
			this.addToTop(key);
		}
	}

	evictLRU() {
		if (!this.tail) return;

		const tailKey = this.tail;
		const tailNode = this.hash[tailKey];

		// Update tail pointer
		this.tail = tailNode.prev;

		if (this.tail) {
			this.hash[this.tail].next = null;
		} else {
			// List is now empty
			this.head = null;
		}

		delete this.hash[tailKey];
		this.size--;
	}

	moveToTop(key) {
		if (key === this.head) return;

		const node = this.hash[key];

		// Remove from current position
		if (key === this.tail) {
			// Update tail
			this.tail = node.prev;
			if (this.tail) {
				this.hash[this.tail].next = null;
			}
		} else {
			// Node is in middle
			if (node.prev) {
				this.hash[node.prev].next = node.next;
			}
			if (node.next) {
				this.hash[node.next].prev = node.prev;
			}
		}

		// Add to head
		this.addToTop(key);
	}

	addToTop(key) {
		if (this.head === key) return;

		const node = this.hash[key];
		node.next = null;
		node.prev = null;

		if (this.head) {
			node.next = this.head;
			this.hash[this.head].prev = key;
		} else {
			// If no head, also update tail
			this.tail = key;
		}

		this.head = key;
	}
}

class LRUCache {
	constructor(limit) {
		this.limit = limit;
		this.upperLimit = 0;
		this.lowerLimit = 0;
		this.size = 0;

		this.keysHash = Object.create(null);
		this.indexHash = Object.create(null);
	}

	get(key) {
		if (!(key in this.keysHash)) return -1;
		return this.deleteAndAddToTop(key);
	}

	deleteAndAddToTop(key) {
		const { value, index } = this.keysHash[key];
		if (index === this.upperLimit) return value;

		delete this.keysHash[key];
		delete this.indexHash[index];

		if (index === this.lowerLimit) {
			this.updateLowerLimit();
		}

		this.addToTop(key, value);
		return value;
	}

	put(key, value) {
		if (key in this.keysHash) {
			const item = this.keysHash[key];
			this.keysHash[key] = { value, index: item.index };
			this.deleteAndAddToTop(key);
		} else {
			this.size++;
			this.addToTop(key, value);

			if (!this.lowerLimit) {
				this.lowerLimit = this.upperLimit;
			}

			if (this.size > this.limit) {
				const key = this.indexHash[this.lowerLimit];
				delete this.keysHash[key];
				delete this.indexHash[this.lowerLimit];
				this.updateLowerLimit();
			}
		}
	}

	addToTop(key, value) {
		this.keysHash[key] = { value, index: ++this.upperLimit };
		this.indexHash[this.upperLimit] = key;
	}

	updateLowerLimit() {
		let min = Number.POSITIVE_INFINITY;

		for (const key in this.indexHash) {
			min = Math.min(key, min);
		}

		this.lowerLimit = min;
	}
}

const lruCache = new LRUCache(5);
lruCache.put('a', 'A');
lruCache.put('b', 'B');
lruCache.put('c', 'C');
lruCache.put('d', 'D');
lruCache.put('e', 'E');
lruCache.put('f', 'F');
