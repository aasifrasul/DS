class OrderLog {
	constructor(N) {
		this.N = N;
		this.buffer = new Array(N);
		this.nextIndex = 0;
		this.length = 0;
	}

	record(order_id) {
		this.buffer[this.nextIndex] = order_id;
		this.nextIndex = (this.nextIndex + 1) % this.N;
		if (this.length < this.N) {
			this.length++;
		}
	}

	get_last(i) {
		if (i < 1 || i > this.length) {
			return null;
		}
		const index = (this.nextIndex - i + this.N) % this.N;
		return this.buffer[index];
	}
}

const orderLog = new OrderLog(5);
orderLog.record(1);
orderLog.record(2);
orderLog.record(3);
orderLog.record(4);
orderLog.record(5);

console.log(orderLog.get_last(1)); // 5
console.log(orderLog.get_last(2)); // 4
console.log(orderLog.get_last(3)); // 3
console.log(orderLog.get_last(4)); // 2
console.log(orderLog.get_last(5)); // 1
console.log(orderLog.get_last(6)); // null
