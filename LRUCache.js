class LRUCache {
	constructor(capacity) {
		this.cache = new Map();
		this.capacity = capacity;
	}

	get(key) {
		if (!this.cache.has(key)) return -1;
		const value = this.cache.get(key);
		this.moveToFront(key, value);
		return value;
	}

	moveToFront(key, value) {
		if (this.cache.has(key)) {
			this.cache.delete(key);
		}
		this.cache.set(key, value);
	}

	put(key, value) {
		this.moveToFront(key, value);
		this.evictLRU();
	}

	evictLRU() {
		if (this.cache.size > this.capacity) {
			this.cache.delete(this.cache.keys().next().value);
		}
	}
}

class Node {
	constructor(key, value) {
		this.key = key; // Store the key
		this.value = value;
		this.next = null; // Will store next node's key
		this.prev = null; // Will store prev node's key
	}
}

class LRUCache {
	constructor(limit) {
		this.limit = limit;
		this.hash = Object.create(null);
		this.head = null; // Stores key of most recently used node
		this.tail = null; // Stores key of least recently used node
		this.size = 0;
	}

	get(key) {
		if (!(key in this.hash)) return -1;
		this.moveToTop(key);
		return this.hash[key].value;
	}

	put(key, value) {
		if (key in this.hash) {
			// Update existing
			this.hash[key].value = value;
			this.moveToTop(key);
			return;
		}

		// Add new node
		const newNode = new Node(key, value);
		this.hash[key] = newNode;

		if (!this.head) {
			// First node
			this.head = key;
			this.tail = key;
		} else {
			// Add to head
			this.addToTop(key);
		}

		this.size++;

		// Evict if over capacity
		if (this.size > this.limit) {
			this.evictLRU();
		}
	}

	moveToTop(key) {
		if (key === this.head) return; // Already at top

		const node = this.hash[key];

		// Remove from current position
		if (key === this.tail) {
			// Node is at tail
			this.tail = node.prev;
			if (this.tail) this.hash[this.tail].next = null;
		} else {
			// Node is in middle
			if (node.prev) this.hash[node.prev].next = node.next;
			if (node.next) this.hash[node.next].prev = node.prev;
		}

		// Add to head
		this.addToTop(key);
	}

	addToTop(key) {
		const node = this.hash[key];
		node.next = this.head;
		node.prev = null;

		if (this.head) {
			this.hash[this.head].prev = key;
		}

		this.head = key;

		// If this is the only node, it's also the tail
		if (!this.tail) {
			this.tail = key;
		}
	}

	evictLRU() {
		if (!this.tail) return;

		const tailNode = this.hash[this.tail];

		// Update tail pointer
		this.tail = tailNode.prev;

		// If there are remaining nodes, update the new tail
		if (this.tail) {
			this.hash[this.tail].next = null;
		} else {
			// List is now empty
			this.head = null;
		}

		// Remove from hash
		delete this.hash[this.tail];
		this.size--;
	}
}

class Node {
	constructor(key, value) {
		this.key = key; // Store the key with the node
		this.value = value;
		this.next = null;
		this.prev = null;
	}
}

class LRUCache {
	constructor(limit) {
		this.limit = limit;
		this.hash = Object.create(null);
		this.head = null; // Most recently used
		this.tail = null; // Least recently used
		this.size = 0;
	}

	get(key) {
		if (!(key in this.hash)) return -1;

		const node = this.hash[key];
		this.removeFromList(node);
		this.addToHead(node);
		return node.value;
	}

	put(key, value) {
		// Update existing key
		if (key in this.hash) {
			const node = this.hash[key];
			node.value = value;
			this.removeFromList(node);
			this.addToHead(node);
			return;
		}

		// Add new key
		const newNode = new Node(key, value);
		this.hash[key] = newNode;
		this.addToHead(newNode);
		this.size++;

		// Evict if over capacity
		if (this.size > this.limit) {
			this.removeTail();
		}
	}

	addToHead(node) {
		if (!this.head) {
			// Empty list
			this.head = node;
			this.tail = node;
		} else {
			// Non-empty list
			node.next = this.head;
			this.head.prev = node;
			this.head = node;
		}
	}

	removeFromList(node) {
		// If node is the only one in the list
		if (node === this.head && node === this.tail) {
			this.head = null;
			this.tail = null;
			return;
		}

		// If node is head
		if (node === this.head) {
			this.head = node.next;
			this.head.prev = null;
			return;
		}

		// If node is tail
		if (node === this.tail) {
			this.tail = node.prev;
			this.tail.next = null;
			return;
		}

		// Node is in the middle
		node.prev.next = node.next;
		node.next.prev = node.prev;
	}

	removeTail() {
		const key = this.tail.key;

		if (this.head === this.tail) {
			this.head = null;
			this.tail = null;
		} else {
			this.tail = this.tail.prev;
			this.tail.next = null;
		}

		delete this.hash[key];
		this.size--;
	}
}

//Example usage:
const lru = new LRUCache(2);
lru.put(1, 1);
lru.put(2, 2);
console.log(lru.get(1));
lru.put(3, 3);
console.log(lru.get(2));
lru.put(4, 4);
console.log(lru.get(1));
console.log(lru.get(3));
console.log(lru.get(4));
