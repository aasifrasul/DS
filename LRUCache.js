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

class LRUCache {
	constructor(capacity) {
		this.capacity = capacity;
		this.cache = new Map(); // Hash map for O(1) key lookup
		this.head = null; // Head of the doubly linked list (most recent)
		this.tail = null; // Tail of the doubly linked list (least recent)
	}

	get(key) {
		if (!this.cache.has(key)) return -1;

		const node = this.cache.get(key);
		this.moveToFront(node); // Move the accessed node to the front
		return node.value;
	}

	put(key, value) {
		if (this.cache.has(key)) {
			const node = this.cache.get(key);
			node.value = value; // Update the value
			this.moveToFront(node);
			return;
		}

		if (this.cache.size >= this.capacity) {
			this.evictLRU(); // Remove the least recently used node
		}

		const newNode = { key, value, prev: null, next: null };
		this.cache.set(key, newNode);
		this.addToFront(newNode); // Add the new node to the front
	}

	moveToFront(node) {
		if (node === this.head) return; // Already at the front

		if (node === this.tail) {
			this.tail = node.prev;
		}

		// Remove node from its current position
		if (node.prev) {
			node.prev.next = node.next;
		}

		if (node.next) {
			node.next.prev = node.prev;
		}

		// Add it to the front
		this.addToFront(node);
	}

	addToFront(node) {
		node.next = this.head;
		node.prev = null;

		if (this.head) {
			this.head.prev = node;
		}

		this.head = node;

		//If only one element
		if (!this.tail) {
			this.tail = this.head;
		}
	}

	evictLRU() {
		if (!this.tail) return; //Nothing to remove

		this.cache.delete(this.tail.key);

		this.tail = this.tail.prev;

		if (this.tail) {
			this.tail.next = null;
		} else {
			//If cache becomes empty
			this.head = null;
		}
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
