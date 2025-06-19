/**
 * A very optimized Queue implementation.
 * Also handles prequeue
 */
class Queue {
	#elements = {};
	#upperLimit = 0;
	#lowerLimit = 0;
	enqueue(element) {
		this.#elements[++this.#upperLimit] = element;
	}
	prequeue(element) {
		this.#elements[this.#lowerLimit--] = element;
	}
	dequeue() {
		if (this.isEmpty()) return null;
		const element = this.#elements[++this.#lowerLimit];
		delete this.#elements[this.#lowerLimit];
		return element;
	}
	isEmpty() {
		return this.size === 0;
	}
	get size() {
		return this.#upperLimit - this.#lowerLimit;
	}
}

// =============================================================================
// SIMPLE ASSERTION FRAMEWORK
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
	if (condition) {
		console.log(`✅ PASS: ${message}`);
		testsPassed++;
	} else {
		console.log(`❌ FAIL: ${message}`);
		testsFailed++;
	}
}

function assertEquals(actual, expected, message) {
	const passed = actual === expected;
	if (passed) {
		console.log(`✅ PASS: ${message}`);
		testsPassed++;
	} else {
		console.log(`❌ FAIL: ${message}`);
		console.log(`   Expected: ${expected}, Got: ${actual}`);
		testsFailed++;
	}
}

function assertArrayEquals(actual, expected, message) {
	const passed = JSON.stringify(actual) === JSON.stringify(expected);
	if (passed) {
		console.log(`✅ PASS: ${message}`);
		testsPassed++;
	} else {
		console.log(`❌ FAIL: ${message}`);
		console.log(`   Expected: [${expected.join(', ')}], Got: [${actual.join(', ')}]`);
		testsFailed++;
	}
}

function describe(suiteName, testFunction) {
	console.log(`\n🧪 ${suiteName}`);
	console.log('='.repeat(50));
	testFunction();
}

function printSummary() {
	console.log('\n' + '='.repeat(50));
	console.log(`📊 TEST SUMMARY`);
	console.log(`✅ Passed: ${testsPassed}`);
	console.log(`❌ Failed: ${testsFailed}`);
	console.log(
		`📈 Success Rate: ${((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1)}%`,
	);
}

// =============================================================================
// TEST SUITES
// =============================================================================

describe('Basic Queue Operations', () => {
	const q = new Queue();

	// Test initial state
	assert(q.isEmpty(), 'New queue should be empty');
	assertEquals(q.size, 0, 'New queue should have size 0');
	assertEquals(q.dequeue(), null, 'Dequeue from empty queue should return null');

	// Test single enqueue/dequeue
	q.enqueue('first');
	assert(!q.isEmpty(), 'Queue with one element should not be empty');
	assertEquals(q.size, 1, 'Queue with one element should have size 1');

	const result = q.dequeue();
	assertEquals(result, 'first', 'Should dequeue the enqueued element');
	assert(q.isEmpty(), 'Queue should be empty after dequeuing only element');
	assertEquals(q.size, 0, 'Size should be 0 after dequeuing only element');
});

describe('FIFO Behavior', () => {
	const q = new Queue();
	const testData = ['a', 'b', 'c', 'd', 'e'];

	// Enqueue all elements
	testData.forEach((item) => q.enqueue(item));
	assertEquals(
		q.size,
		testData.length,
		`Size should be ${testData.length} after enqueuing all elements`,
	);

	// Dequeue all elements and verify order
	const results = [];
	while (!q.isEmpty()) {
		results.push(q.dequeue());
	}

	assertArrayEquals(results, testData, 'Elements should be dequeued in FIFO order');
	assert(q.isEmpty(), 'Queue should be empty after dequeuing all elements');
});

describe('Prequeue Operations', () => {
	const q = new Queue();

	// Test basic prequeue
	q.prequeue('first');
	assertEquals(q.size, 1, 'Size should be 1 after prequeue');
	assertEquals(q.dequeue(), 'first', 'Should dequeue the prequeued element');

	// Test prequeue with existing elements
	q.enqueue('middle');
	q.prequeue('front');
	assertEquals(q.size, 2, 'Size should be 2 after enqueue and prequeue');
	assertEquals(q.dequeue(), 'front', 'Should dequeue prequeued element first');
	assertEquals(q.dequeue(), 'middle', 'Should dequeue enqueued element second');
});

describe('Mixed Operations', () => {
	const q = new Queue();

	// Complex sequence: prequeue, enqueue, prequeue, enqueue
	q.prequeue('pre1');
	q.enqueue('post1');
	q.prequeue('pre2');
	q.enqueue('post2');

	assertEquals(q.size, 4, 'Size should be 4 after mixed operations');

	// Expected order: pre2, pre1, post1, post2
	const results = [];
	while (!q.isEmpty()) {
		results.push(q.dequeue());
	}

	assertArrayEquals(
		results,
		['pre2', 'pre1', 'post1', 'post2'],
		'Mixed operations should maintain correct order',
	);
});

describe('Edge Cases', () => {
	const q = new Queue();

	// Test with null and undefined
	q.enqueue(null);
	q.enqueue(undefined);
	assertEquals(q.size, 2, 'Should handle null and undefined values');
	assertEquals(q.dequeue(), null, 'Should return null value correctly');
	assertEquals(q.dequeue(), undefined, 'Should return undefined value correctly');

	// Test with various data types
	const testValues = [0, '', false, [], {}, 42, 'string', true];
	testValues.forEach((val) => q.enqueue(val));

	const results = [];
	while (!q.isEmpty()) {
		results.push(q.dequeue());
	}

	assert(results.length === testValues.length, 'Should handle all data types');

	// Test alternating operations
	for (let i = 0; i < 10; i++) {
		q.enqueue(i);
		if (i % 2 === 0) {
			q.prequeue(-i);
		}
	}

	assert(q.size > 0, 'Queue should have elements after alternating operations');

	// Clear the queue
	while (!q.isEmpty()) {
		q.dequeue();
	}
	assert(q.isEmpty(), 'Queue should be empty after clearing');
});

describe('Performance & Stress Test', () => {
	const q = new Queue();
	const iterations = 10000;

	console.log(`   Running stress test with ${iterations} operations...`);

	// Add many elements
	const startTime = Date.now();
	for (let i = 0; i < iterations; i++) {
		if (i % 3 === 0) {
			q.prequeue(`pre-${i}`);
		} else {
			q.enqueue(`post-${i}`);
		}
	}

	assertEquals(
		q.size,
		iterations,
		`Should have ${iterations} elements after stress enqueue`,
	);

	// Remove all elements
	let count = 0;
	while (!q.isEmpty()) {
		q.dequeue();
		count++;
	}

	const endTime = Date.now();
	assertEquals(count, iterations, `Should have dequeued ${iterations} elements`);
	assert(q.isEmpty(), 'Queue should be empty after stress test');

	console.log(`   ⏱️  Completed ${iterations * 2} operations in ${endTime - startTime}ms`);
});

describe('State Consistency', () => {
	const q = new Queue();

	// Test that size is always consistent
	let expectedSize = 0;

	for (let i = 0; i < 100; i++) {
		// Randomly enqueue, prequeue, or dequeue
		const operation = Math.floor(Math.random() * 3);

		if (operation === 0 && expectedSize > 0) {
			// Dequeue
			q.dequeue();
			expectedSize--;
		} else if (operation === 1) {
			// Enqueue
			q.enqueue(`e-${i}`);
			expectedSize++;
		} else {
			// Prequeue
			q.prequeue(`p-${i}`);
			expectedSize++;
		}

		assertEquals(q.size, expectedSize, `Size should be consistent after operation ${i}`);
		assertEquals(
			q.isEmpty(),
			expectedSize === 0,
			`isEmpty should be consistent after operation ${i}`,
		);
	}
});

describe('Boundary Conditions', () => {
	const q = new Queue();

	// Test single element operations
	q.enqueue('only');
	assertEquals(q.dequeue(), 'only', 'Single element enqueue/dequeue');

	q.prequeue('only');
	assertEquals(q.dequeue(), 'only', 'Single element prequeue/dequeue');

	// Test rapid add/remove cycles
	for (let i = 0; i < 5; i++) {
		q.enqueue(i);
		assertEquals(q.dequeue(), i, `Immediate enqueue/dequeue cycle ${i}`);
		assert(q.isEmpty(), `Queue should be empty after cycle ${i}`);
	}

	// Test interleaved operations
	q.enqueue(1);
	q.prequeue(0);
	q.enqueue(2);
	assertEquals(q.dequeue(), 0, 'First dequeue should be prequeued element');
	q.prequeue(-1);
	assertEquals(q.dequeue(), -1, 'Next dequeue should be newly prequeued element');
	assertEquals(q.dequeue(), 1, 'Next dequeue should be first enqueued element');
	assertEquals(q.dequeue(), 2, 'Last dequeue should be second enqueued element');
});

// =============================================================================
// RUN ALL TESTS
// =============================================================================

console.log('🚀 Running Queue Tests...\n');

describe('Basic Queue Operations', () => {
	const q = new Queue();

	assert(q.isEmpty(), 'New queue should be empty');
	assertEquals(q.size, 0, 'New queue should have size 0');
	assertEquals(q.dequeue(), null, 'Dequeue from empty queue should return null');

	q.enqueue('first');
	assert(!q.isEmpty(), 'Queue with one element should not be empty');
	assertEquals(q.size, 1, 'Queue with one element should have size 1');

	const result = q.dequeue();
	assertEquals(result, 'first', 'Should dequeue the enqueued element');
	assert(q.isEmpty(), 'Queue should be empty after dequeuing only element');
	assertEquals(q.size, 0, 'Size should be 0 after dequeuing only element');
});

describe('FIFO Behavior', () => {
	const q = new Queue();
	const testData = ['a', 'b', 'c', 'd', 'e'];

	testData.forEach((item) => q.enqueue(item));
	assertEquals(
		q.size,
		testData.length,
		`Size should be ${testData.length} after enqueuing all elements`,
	);

	const results = [];
	while (!q.isEmpty()) {
		results.push(q.dequeue());
	}

	assertArrayEquals(results, testData, 'Elements should be dequeued in FIFO order');
	assert(q.isEmpty(), 'Queue should be empty after dequeuing all elements');
});

describe('Prequeue Operations', () => {
	const q = new Queue();

	q.prequeue('first');
	assertEquals(q.size, 1, 'Size should be 1 after prequeue');
	assertEquals(q.dequeue(), 'first', 'Should dequeue the prequeued element');

	q.enqueue('middle');
	q.prequeue('front');
	assertEquals(q.size, 2, 'Size should be 2 after enqueue and prequeue');
	assertEquals(q.dequeue(), 'front', 'Should dequeue prequeued element first');
	assertEquals(q.dequeue(), 'middle', 'Should dequeue enqueued element second');
});

describe('Mixed Operations', () => {
	const q = new Queue();

	q.prequeue('pre1');
	q.enqueue('post1');
	q.prequeue('pre2');
	q.enqueue('post2');

	assertEquals(q.size, 4, 'Size should be 4 after mixed operations');

	const results = [];
	while (!q.isEmpty()) {
		results.push(q.dequeue());
	}

	assertArrayEquals(
		results,
		['pre2', 'pre1', 'post1', 'post2'],
		'Mixed operations should maintain correct order',
	);
});

describe('Edge Cases', () => {
	const q = new Queue();

	q.enqueue(null);
	q.enqueue(undefined);
	assertEquals(q.size, 2, 'Should handle null and undefined values');
	assertEquals(q.dequeue(), null, 'Should return null value correctly');
	assertEquals(q.dequeue(), undefined, 'Should return undefined value correctly');

	const testValues = [0, '', false, [], {}, 42, 'string', true];
	testValues.forEach((val) => q.enqueue(val));

	const results = [];
	while (!q.isEmpty()) {
		results.push(q.dequeue());
	}

	assert(results.length === testValues.length, 'Should handle all data types');

	for (let i = 0; i < 10; i++) {
		q.enqueue(i);
		if (i % 2 === 0) {
			q.prequeue(-i);
		}
	}

	assert(q.size > 0, 'Queue should have elements after alternating operations');

	while (!q.isEmpty()) {
		q.dequeue();
	}
	assert(q.isEmpty(), 'Queue should be empty after clearing');
});

describe('Performance & Stress Test', () => {
	const q = new Queue();
	const iterations = 1000; // Reduced for console output

	console.log(`   Running stress test with ${iterations} operations...`);

	const startTime = Date.now();
	for (let i = 0; i < iterations; i++) {
		if (i % 3 === 0) {
			q.prequeue(`pre-${i}`);
		} else {
			q.enqueue(`post-${i}`);
		}
	}

	assertEquals(
		q.size,
		iterations,
		`Should have ${iterations} elements after stress enqueue`,
	);

	let count = 0;
	while (!q.isEmpty()) {
		q.dequeue();
		count++;
	}

	const endTime = Date.now();
	assertEquals(count, iterations, `Should have dequeued ${iterations} elements`);
	assert(q.isEmpty(), 'Queue should be empty after stress test');

	console.log(`   ⏱️  Completed ${iterations * 2} operations in ${endTime - startTime}ms`);
});

printSummary();
