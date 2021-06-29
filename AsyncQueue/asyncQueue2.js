function queue(concurrency = 1) {
	let running = 0;
	const taskQueue = [];

	const dequeue = () => taskQueue.shift();

	const enqueue = (task) => taskQueue.push(task);

	function done() {
		running--;
		const task = dequeue();
		task && run(task);
	}

	function run(task) {
		running++;
		task(done);
	}

	const push = (task) => (running < concurrency ? run(task) : enqueue(task));

	return {
		push,
	};
}

// generates n tasks which are functions
// Each Task Accepts a parameter which is a callback
// This callback is executed inside the function within a setTimeout
const tasks = new Array(50).fill(0).map((i, idx) => (done) => {
	// "done" is a callback function passed when a task is run
	const delay = Math.random() * 10;
	setTimeout(() => {
		console.log(idx, delay);
		done();
	}, delay);
});

console.log('concurrency of 5');
console.log(tasks);
const { push } = queue(5);

tasks.forEach(push);
