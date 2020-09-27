const FrequencyStore = (function () {
	const FrequencyStore = function () {
		this.pos = 0;
		this.count = 0;
		this.storage = {};
		this.frequency = {};
		this.frequencyStore = {};
		this.maxFrequency = 0;
	};

	FrequencyStore.prototype.setFrequency = function (value) {
		const frequency = (this.frequency[value] || 0) + 1;
		this.frequency[value] = frequency;
		this.maxFrequency = Math.max(frequency, this.maxFrequency);
		this.frequencyStore[frequency] = this.frequencyStore[frequency] || [];
		this.frequencyStore[frequency].push({
			value,
			pos: this.pos,
		});
	};

	FrequencyStore.prototype.push = function (value) {
		this.pos += 1;
		this.count += 1;
		this.setFrequency(value);
		this.storage[this.pos] = value;
	};

	FrequencyStore.prototype.pop = function () {
		if (this.pos === 0) {
			return undefined;
		}

		this.count -= 1;

		const result = this.frequencyStore[this.maxFrequency].pop() || {};
		this.frequency[result.value] -= 1;
		delete this.storage[result.pos];
		if (!this.frequencyStore[this.maxFrequency].length) {
			delete this.frequencyStore[this.maxFrequency];
			this.maxFrequency = this.maxFrequency - 1;
		}
		return result;
	};

	FrequencyStore.prototype.size = function () {
		return this.count;
	};

	FrequencyStore.prototype.print = function () {
		let count = this.count;
		while (--count) {
			console.log(this.storage[count]);
		}
	};

	return FrequencyStore;
})();

const store = new FrequencyStore();
