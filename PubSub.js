const PubSub = (function () {
	const subscribers = new Map();
	const DEFAULT_NAMESPACE = '*';

	const matchNamespace = (pattern, eventName) => {
		const patternParts = pattern.split('/');
		const eventParts = eventName.split('/');
		return patternParts.every((part, i) => part === '*' || part === eventParts[i]);
	};

	const subscribe = (eventName, callback) => {
		if (typeof callback !== 'function' || typeof eventName !== 'string') {
			throw new Error('Invalid eventName or callback');
		}

		if (!subscribers.has(eventName)) {
			subscribers.set(eventName, new Set());
		}

		subscribers.get(eventName).add(callback);

		return {
			unsubscribe() {
				const subs = subscribers.get(eventName);
				if (subs) {
					subs.delete(callback);
					if (subs.size === 0) {
						subscribers.delete(eventName);
					}
				}
			},
		};
	};

	const once = (eventName, callback) => {
		const subscription = subscribe(eventName, (...args) => {
			callback(...args);
			subscription.unsubscribe();
		});
		return subscription;
	};

	const publish = (eventName, data) => {
		if (typeof eventName !== 'string') {
			throw new Error('Invalid eventName');
		}

		subscribers.forEach((subs, pattern) => {
			if (matchNamespace(pattern, eventName)) {
				Array.from(subs).forEach((cb) => {
					try {
						cb(data);
					} catch (err) {
						console.error(`Error in subscriber callback: ${err}`);
					}
				});
			}
		});
	};

	const subscriberCount = (eventName) => subscribers.get(eventName)?.size ?? 0;

	const getEvents = () => Array.from(subscribers.keys());

	const clear = (eventName) => {
		if (eventName) {
			subscribers.delete(eventName);
		} else {
			subscribers.clear();
		}
	};

	// Auto cleanup empty events every 5 minutes
	setInterval(() => {
		subscribers.forEach((subs, event) => {
			if (subs.size === 0) subscribers.delete(event);
		});
	}, 300000);

	return {
		subscribe,
		once,
		publish,
		clear,
		subscriberCount,
		getEvents,
	};
})();

// Example usage:
/*
PubSub.subscribe('page/*', data => console.log('All page events:', data));
PubSub.once('page/load', data => console.log('One-time handler:', data));
console.log('Event count:', PubSub.subscriberCount('page/load'));
console.log('Active events:', PubSub.getEvents());
*/
