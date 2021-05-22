function queue(concurrency = 1) {
	let running = 0;
	const taskQueue = [];

	const dequeue = () => taskQueue.shift();

	const runTask = (task) => {
		running++;
		task &&
			task((_) => {
				running--;
				runTask(dequeue());
			});
	};

	const enqueueTask = (task) => taskQueue.push(task);

	const push = (task) => (running < concurrency ? runTask(task) : enqueueTask(task));

	return {
		push,
	};
}

const tasks = new Array(10).fill(0).map((i, idx) => (done) => {
	const delay = Math.random() * 100;
	setTimeout((_) => {
		console.log(idx, delay);
		done();
	}, delay);
});

console.log('concurrency of 2');
const { push } = queue(2);

tasks.forEach(push);
