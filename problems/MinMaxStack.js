class MinMaxStack {
	constructor() {
		this.stack = [];
		// Keep track of min/max at each stack level
		this.minStack = [];
		this.maxStack = [];
	}

	isEmpty(stack = 'stack') {
		return this[stack].length === 0;
	}

	getLastItem(stack = 'stack') {
		const arr = this[stack];
		return arr[arr.length - 1];
	}

	push(num) {
		this.stack.push(num);

		// Update min stack
		if (this.isEmpty('minStack') || num <= this.getLastItem('minStack')) {
			this.minStack.push(num);
		} else {
			this.minStack.push(this.getLastItem('minStack'));
		}

		// Update max stack
		if (this.isEmpty('maxStack') || num >= this.getLastItem('maxStack')) {
			this.maxStack.push(num);
		} else {
			this.maxStack.push(this.getLastItem('maxStack'));
		}
	}

	pop() {
		if (this.isEmpty()) {
			return null;
		}
		const value = this.stack.pop();

		// Remove from min/max stacks
		this.minStack.pop();
		this.maxStack.pop();

		return value;
	}

	updateMinMaxValues(stack, num) {
		if (this.isEmpty(stack) || num <= this.getLastItem(stack)) {
			this[stack].push(num);
		} else {
			this[stack].push(this.getLastItem(stack));
		}
	}

	peek() {
		return this.isEmpty() ? null : this.getLastItem();
	}

	getMin() {
		return this.isEmpty() ? null : this.getLastItem('minStack');
	}

	getMax() {
		return this.isEmpty() ? null : this.getLastItem('maxStack');
	}

	print(callback = console.log) {
		for (let i = 1; i <= this.stack.length; i++) {
			callback(this.stack[i]);
		}
	}
}

// Test cases
const stack = new MinMaxStack();
stack.push(3); // Stack: [3]
console.log('Min:', stack.getMin()); // 3
console.log('Max:', stack.getMax()); // 3

stack.push(1); // Stack: [3, 1]
console.log('Min:', stack.getMin()); // 1
console.log('Max:', stack.getMax()); // 3

stack.push(4); // Stack: [3, 1, 4]
console.log('Min:', stack.getMin()); // 1
console.log('Max:', stack.getMax()); // 4

stack.pop(); // Stack: [3, 1]
console.log('Min:', stack.getMin()); // 1
console.log('Max:', stack.getMax()); // 3
