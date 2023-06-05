// fake fetch for demo purposes only
const fetch = (url, options) =>
	new Promise((resolve) => setTimeout(resolve, options?.delay, { url, options }));

// task executor
const addTask = (() => {
	let pending = Promise.resolve();

	const run = async (url, options) => {
		try {
			await pending;
		} finally {
			return fetch(url, options);
		}
	};

	// update pending promise so that next task could await for it
	return (url, options) => (pending = run(url, options));
})();

new Array(10)
	.fill(0)
	.forEach((i, idx) =>
		addTask(`url` + idx, { options: idx, delay: Math.random() * 1000 }).then((data) =>
			console.log(JSON.stringify(data))
		)
	);
