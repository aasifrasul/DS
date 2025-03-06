class Stack {
	private count: number;
	private hash: Record<typeof this.count, number>;

	constructor() {
		this.count = 0;
		this.hash = {};
	}

	push(val: number): void {
		++this.count;
		this.hash[this.count] = val;
	}

	pop(): number {
		const item = this.top();
		delete this.hash[this.count];
		--this.count;
		return item;
	}

	top(): number {
		return this.hash[this.count];
	}
}

class MinMaxStack {
	private stack: Stack;
	private minStack: Stack;
	private maxStack: Stack;

	constructor() {
		this.stack = new Stack();
		this.minStack = new Stack();
		this.maxStack = new Stack();
	}

	push(val: number): void {
		this.stack.push(val);

		const minVal = this.minStack.top();
		const maxVal = this.maxStack.top();

		if (typeof minVal !== 'number' || val < minVal) {
			this.minStack.push(val);
		} else {
			this.minStack.push(minVal);
		}

		if (typeof maxVal !== 'number' || val > maxVal) {
			this.maxStack.push(val);
		} else {
			this.maxStack.push(maxVal);
		}
	}

	pop(): number {
		this.stack.pop();
		this.minStack.pop();
		this.maxStack.pop();
		return this.stack.top();
	}

	top(): number {
		return this.stack.top();
	}

	getMin(): number {
		return this.minStack.top();
	}

	getMax(): number {
		return this.maxStack.top();
	}
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
