var RandomizedSet = function () {
	this.hash = {};
	this.indexes = {};
	this.count = 0;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.add = function (val) {
	if (val in this.indexes) {
		return false;
	} else {
		this.indexes[val] = ++this.count;
		this.hash[this.count] = val;
		return true;
	}
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
	if (val in this.indexes) {
		const index = this.indexes[val];

		delete this.hash[index];
		delete this.indexes[val];

		if (index < this.count) {
			const lastItem = this.hash[this.count];
			delete this.hash[this.count];
			delete this.indexes[lastItem];
			this.hash[index] = lastItem;
			this.indexes[lastItem] = index;
		}

		--this.count;

		return true;
	} else {
		return false;
	}
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
	return this.hash[Math.ceil(this.count * Math.random())];
};

var randomizedSet = new RandomizedSet();

[1, 3, 5, 7, 9, 11].forEach((item) => randomizedSet.add(item));
