class TokenBucketRateLimiter {
	constructor(maxTokens, refillRate) {
		this.maxTokens = maxTokens; // Maximum tokens the bucket can hold
		this.refillRate = refillRate; // Tokens added per second
		this.tokens = maxTokens; // Current token count
		this.lastRefillTimestamp = Date.now();
	}

	// Check if request is allowed
	allowRequest() {
		this.refill();

		if (this.tokens >= 1) {
			this.tokens -= 1;
			return true;
		}

		return false;
	}

	// Refill tokens based on elapsed time
	refill() {
		const now = Date.now();
		const timeElapsed = (now - this.lastRefillTimestamp) / 1000; // in seconds
		const tokensToAdd = timeElapsed * this.refillRate;

		this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
		this.lastRefillTimestamp = now;
	}
}

// Usage example
const limiter = new TokenBucketRateLimiter(10, 2); // 10 max tokens, refills 2 tokens per second
