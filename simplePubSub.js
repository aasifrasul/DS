const pubsub = (function () {
	const topics = {};
	let subUid = -1;

	const getRandomId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

	function subscribe(topic, callback) {
		if (!topics[topic]) {
			topics[topic] = [];
		}
		const token = getRandomId();
		topics[topic].push({
			token,
			callback,
		});
		return token;
	}

	function publish(topic, args) {
		if (!topics[topic]) {
			return false;
		}
		setTimeout(function () {
			const subscribers = topics[topic] || [];
			let len = subscribers.length;

			while (len--) {
				subscribers[len].callback(topic, args);
			}
		}, 0);
		return true;
	}

	function unsubscribe(token) {
		for (var m in topics) {
			if (topics[m]) {
				for (var i = 0, j = topics[m].length; i < j; i++) {
					if (topics[m][i].token === token) {
						topics[m].splice(i, 1);
						return token;
					}
				}
			}
		}
		return false;
	}

	return {
		publish,
		subscribe,
		unsubscribe,
	};
})();
