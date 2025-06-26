// 1. SIEVE OF ERATOSTHENES - Most efficient for finding all primes up to n
// Time: O(n log log n), Space: O(n)
function sieveOfEratosthenes(n) {
	if (n < 2) return [];

	const isPrime = new Array(n + 1).fill(true);
	isPrime[0] = isPrime[1] = false;
	let i = 2;

	while (i * i <= n) {
		if (isPrime[i]) {
			// Mark all multiples of i as composite
			for (let j = i * i; j <= n; j += i) {
				isPrime[j] = false;
			}
		}
		i++;
	}

	return isPrime.map((prime, index) => (prime ? index : null)).filter((val) => val !== null);
}

// 2. SEGMENTED SIEVE - Memory efficient for very large ranges
// Time: O(n log log n), Space: O(√n)
function segmentedSieve(n) {
	if (n < 2) return [];

	const limit = Math.floor(Math.sqrt(n)) + 1;
	const basePrimes = sieveOfEratosthenes(limit);

	const result = [...basePrimes.filter((p) => p <= n)];

	const segmentSize = Math.max(Math.sqrt(n), 32768);

	for (let low = limit; low <= n; low += segmentSize) {
		const high = Math.min(low + segmentSize - 1, n);
		const isPrime = new Array(high - low + 1).fill(true);

		for (const prime of basePrimes) {
			const start = Math.max(prime * prime, Math.ceil(low / prime) * prime);

			for (let j = start; j <= high; j += prime) {
				isPrime[j - low] = false;
			}
		}

		for (let i = 0; i < isPrime.length; i++) {
			if (isPrime[i] && low + i > limit) {
				result.push(low + i);
			}
		}
	}

	return result.sort((a, b) => a - b);
}

// 3. OPTIMIZED TRIAL DIVISION (our corrected version)
// Time: O(n√n/log n), Space: O(π(n)) where π(n) is count of primes ≤ n
function optimizedTrialDivision(n) {
	if (n < 2) return [];

	const primes = [2];

	for (let i = 3; i <= n; i += 2) {
		let isPrime = true;
		const sqrt = Math.sqrt(i);

		for (let j = 0; j < primes.length && primes[j] <= sqrt; j++) {
			if (i % primes[j] === 0) {
				isPrime = false;
				break;
			}
		}

		if (isPrime) {
			primes.push(i);
		}
	}

	return primes;
}

// 4. WHEEL FACTORIZATION - Skip multiples of small primes
// Time: O(n√n/log n) but with better constants
function wheelFactorization(n) {
	if (n < 2) return [];
	if (n < 3) return [2];
	if (n < 5) return [2, 3];

	const primes = [2, 3, 5];
	const wheel = [4, 6, 10, 12, 16, 18, 22, 24]; // Gaps between numbers not divisible by 2,3,5

	let candidate = 7;
	let wheelIndex = 0;

	while (candidate <= n) {
		let isPrime = true;
		const sqrt = Math.sqrt(candidate);

		for (let i = 0; i < primes.length && primes[i] <= sqrt; i++) {
			if (candidate % primes[i] === 0) {
				isPrime = false;
				break;
			}
		}

		if (isPrime) {
			primes.push(candidate);
		}

		candidate += wheel[wheelIndex];
		wheelIndex = (wheelIndex + 1) % wheel.length;
	}

	return primes;
}

// Performance comparison
function compareAlgorithms(n) {
	console.log(`Finding primes up to ${n}:`);

	const algorithms = [
		{ name: 'Sieve of Eratosthenes', fn: sieveOfEratosthenes },
		{ name: 'Segmented Sieve', fn: segmentedSieve },
		{ name: 'Optimized Trial Division', fn: optimizedTrialDivision },
		{ name: 'Wheel Factorization', fn: wheelFactorization },
	];

	algorithms.forEach(({ name, fn }) => {
		const start = performance.now();
		const result = fn(n);
		const end = performance.now();

		console.log(`${name}: ${result.length} primes found in ${(end - start).toFixed(2)}ms`);
	});
}

// Test with different sizes
compareAlgorithms(1000);
compareAlgorithms(10000);

// Verify results are consistent
const n = 50;
console.log(`\nVerification for n=${n}:`);
console.log('Sieve:', sieveOfEratosthenes(n));
console.log('Trial Division:', optimizedTrialDivision(n));
