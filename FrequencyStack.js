const Stack = (function() {
	const Stack = function() {
		this.pos = 0;
		this.count = 0;
		this.storage = {};
		this.frequency = {};
		this.freqStore = {};
		this.maxFrequency = 0;
	};

	Stack.prototype.setFrequency = function(value) {
		const frequency = (this.frequency[value] || 0) + 1;
		this.frequency[value] = frequency;
		this.maxFrequency = frequency > this.maxFrequency ? frequency : this.maxFrequency;
		this.freqStore[frequency] = this.freqStore[frequency] || [];
		this.freqStore[frequency].push({
			value,
			pos: this.pos
		});
	};

	Stack.prototype.push = function(value) {
		this.pos += 1;
		this.count += 1;
		this.setFrequency(value);
		this.storage[this.pos] = value;
	};

	Stack.prototype.pop = function() {
		if (this.pos === 0) {
			return undefined;
		}

		this.count -= 1;

		const result = this.freqStore[this.maxFrequency].pop() || {};
		this.frequency[result.value] -= 1;
		delete this.storage[result.pos];
		if (!this.freqStore[this.maxFrequency].length) {
			delete this.freqStore[this.maxFrequency];
			this.maxFrequency = this.maxFrequency - 1;
		}
		return result;
	};

	Stack.prototype.size = function() {
		return this.count;
	};

	Stack.prototype.print = function() {
		let count = this.count;
		while (--count) {
			console.log(this.storage[count]);
		}
	};

	return Stack;
})();

const stack = new Stack();
