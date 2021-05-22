class BaseQueue {
	constructor() {
		this.reset();
	}
	enqueue(item) {
		if (item) {
			this.hash.set(this.count, item);
			this.count++;
		}
	}
	dequeue() {
		if (this.size === 0) {
			return undefined;
		}

		const result = this.hash.get(this.lowestCount);
		this.hash.delete(this.lowestCount);
		this.lowestCount++;
		return result;
	}
	reset() {
		this.hash = new Map();
		this.count = 0;
		this.lowestCount = 0;
	}
	get size() {
		return this.count - this.lowestCount;
	}
}

class AsyncQueue extends BaseQueue {
	constructor(maxParallelTasks) {
		super();
		this.pendingCount = 0;
		this.isStopped = false;
		this.isPaused = false;
		this.maxParallelTasks = maxParallelTasks || 5;
	}
	enqueue(action, autoDequeue = true) {
		return new Promise((resolve, reject) => {
			super.enqueue({ action, resolve, reject });
			autoDequeue && this.dequeue();
		});
	}
	async dequeue() {
		// if (this.isPending) {
		if (this.pendingCount > this.maxParallelTasks) {
			console.log('Queue is busy', this.pendingCount);
			return false;
		}

		if (this.isPaused) return false;

		if (this.isStopped) {
			super.reset();
			this.isStopped = false;
			return false;
		}

		const item = super.dequeue();

		if (!item) {
			console.log('No items in queue');
			return false;
		}

		try {
			this.pendingCount++;
			console.log('this.pendingCount', this.pendingCount);
			const payload = await item.action(this);
			console.log('this.pendingCount', this.pendingCount);
			this.pendingCount--;
			item.resolve(payload);
		} catch (e) {
			this.pendingCount--;
			item.reject(e);
		} finally {
			this.dequeue();
		}

		return true;
	}

	stop() {
		this.isStopped = true;
	}

	pause() {
		this.isPaused = true;
	}

	async start() {
		this.isStopped = false;
		this.isPaused = false;
		return await this.dequeue();
	}
}

const asyncQueue = new AsyncQueue(2);

// generates a promise
const asyncGenerator = ({ ms, ...rest } = {}) => () =>
	new Promise((resolve) => setTimeout(resolve, ms, { ...rest, ms }));

// creates a N items promise array
const promises = Array.apply(null, { length: 20 }).map(Function.call, (i) =>
	asyncGenerator.bind(null, { ms: Math.random() * 200, url: `(${++i})`, data: `payload(${i})` })()
);

// start proformance timing
const start = performance.now();

// Pause the queue
//asyncQueue.pause();

// log all the promises when resolved
promises.forEach((promise, idx) =>
	asyncQueue
		.enqueue(promise)
		// .enqueue(promise, ((idx + 1) == promises.length))
		.then(({ ms, url, data }) =>
			console.log(`DONE ${url} => time, delay, data`, performance.now() - start, ms, data)
		)
);

// Now start the queue
//asyncQueue.start();

/*
setTimeout(() => {
	asyncQueue.stop();
	asyncQueue.pause();

	// log all the promises when resolved
	promises.forEach((promise, idx) =>
		asyncQueue
			.enqueue(promise)
			// .enqueue(promise, ((idx + 1) == promises.length))
			.then(({ ms, url, data }) =>
				console.log(`DONE ${url} => time, delay, data`, performance.now() - start, ms, data)
			)
	);
	asyncQueue.start()

}, 1000);
*/
