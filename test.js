class BaseQueue {
	constructor() {
		this.storage = [];
	}

	enqueue(data) {
		data && this.storage.push(data);
	}

	dequeue() {
		return this.storage.shift();
	}

	get size() {
		this.storage.length;
	}
}

class AsyncQueue extends BaseQueue {
	constructor(concurrency = 3) {
		super();
		this.concurrency = concurrency;
		this.isProcessing = false;
		this.isPaused = false;
		this.processingCount = 0;
	}

	push(task) {
		this.processingCount < this.concurrency ? this.run(task) : this.enqueue(task);
	}

	enqueue(task, autoDequeue = true) {
		super.enqueue(task);
	}

	async run(task) {
		if (!task) {
			console.log('Queue is Empty!');
			return;
		}

		if (this.isPaused) {
			console.log('Queue is Paused!');
			return;
		}

		try {
			this.processingCount++;
			const payload = await task();
			console.log('comPleted', payload);
			this.processingCount--;
		} catch (e) {
			this.processingCount--;
			//item.reject(new Error('Some Error'));
		} finally {
			await this.run(super.dequeue());
		}
	}

	pause() {
		this.isPaused = true;
	}

	resume() {
		this.isPaused = false;
		this.run();
	}
}

const asyncQueue = new AsyncQueue();

const promiseFactory = (delay, data) => () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve({ ...data, delay });
		}, delay);
	});
};

const promises = new Array(10)
	.fill(0)
	.map((item, idx) => promiseFactory(Math.random() * 200, { id: ++idx }));

// asyncQueue.pause();

promises.forEach((task) => {
	asyncQueue.push(task);
});

//asyncQueue.resume();
