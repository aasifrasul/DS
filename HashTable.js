class HashTable {
	constructor(capacity) {
		this.values = {};
		this.count = 0;
		this.capacity = capacity;
	}

	add(key, value) {
		const hash = this.calculateHash(key);
		if (!this.hasHash(hash)) {
			this.values[hash] = {};
		}
		if (!this.hasKey(hash, key)) {
			this.count++;
		}
		this.values[hash][key] = value;
	}

	remove(key) {
		const hash = this.calculateHash(key);
		if (this.hasKey(hash, key)) {
			delete this.values[hash][key];
			this.count--;
		}
	}

	hasHash(hash) {
		return this.values.hasOwnProperty(hash);
	}

	hasKey(hash, key) {
		return this.hasHash(hash) && this.values[hash].hasOwnProperty(key);
	}

	calculateHash(key) {
		return key.toString().length % this.capacity;
	}

	search(key) {
		const hash = this.calculateHash(key);
		return this.hasKey(hash, key) ? this.values[hash][key] : null;
	}

	length() {
		return this.count;
	}

	print() {
		let string = '';
		for (const value in this.values) {
			for (const key in this.values[value]) {
				string += `${this.values[value][key]} `;
			}
		}
		console.log(string.trim());
	}
}

const hashTable = new HashTable(3);
hashTable.add('first', 1);
hashTable.add('second', 2);
hashTable.add('third', 3);
hashTable.add('fourth', 4);
hashTable.add('fifth', 5);
hashTable.print(); // => 2 4 1 3 5
console.log('length gives 5:', hashTable.length()); // => 5
console.log('search second gives 2:', hashTable.search('second')); // => 2
hashTable.remove('fourth');
hashTable.remove('first');
hashTable.print(); // => 2 3 5
console.log('length gives 3:', hashTable.length());
