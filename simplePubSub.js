var pubsub = {};
(function (q) {
	var topics = {},
		subUid = -1;
	q.subscribe = function (topic, callback) {
		if (!topics[topic]) {
			topics[topic] = [];
		}
		var token = (++subUid).toString();
		topics[topic].push({
			token,
			callback,
		});
		return token;
	};

	q.publish = function (topic, args) {
		if (!topics[topic]) {
			return false;
		}
		setTimeout(function () {
			var subscribers = topics[topic] || [],
				len = subscribers.length;

			while (len--) {
				subscribers[len].callback(topic, args);
			}
		}, 0);
		return true;
	};

	q.unsubscribe = function (token) {
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
	};
})(pubsub);
