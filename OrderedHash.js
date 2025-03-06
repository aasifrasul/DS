class OrderedHash {
	constructor() {
		this.keys = [];
		this.vals = {};
	}

	// Add method to get key at position
	keyAt(pos) {
		return this.keys[pos];
	}

	// Add method to get value at position
	valueAt(pos) {
		return this.vals[this.keys[pos]];
	}

	exists(k) {
		return k in this.vals;
	}

	push(k, v) {
		if (!this.exists(k)) this.keys.push(k);
		this.vals[k] = v;
	}

	find(k) {
		return this.keys.indexOf(k);
	}

	insert(pos, k, v) {
		if (this.exists(k)) {
			return false;
		}
		this.keys.splice(pos, 0, k);
		this.vals[k] = v;
		return true;
	}

	remove(pos, howMany = 1) {
		const removedKeys = this.keys.splice(pos, howMany); // Store the removed keys
		for (let i = 0; i < removedKeys.length; i++) {
			delete this.vals[removedKeys[i]]; // Use the stored keys for deletion
		}
	}

	delete(k) {
		const index = this.keys.indexOf(k); // Use indexOf
		if (index !== -1) {
			this.remove(index); // Call remove with the correct index.
			return true;
		}
		return false;
	}

	value(k) {
		return this.vals[k];
	}

	length() {
		return this.keys.length;
	}

	*keys() {
		yield* this.keys;
	}

	*values() {
		for (const key of this.keys) {
			yield this.vals[key];
		}
	}

	*entries() {
		yield* this[Symbol.iterator]();
	}

	// Add iterator support
	*[Symbol.iterator]() {
		for (const key of this.keys) {
			yield [key, this.vals[key]];
		}
	}
}
