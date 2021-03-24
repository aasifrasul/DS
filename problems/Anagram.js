const hash = {};
const fib = (n) => {
	if (n < 2) return 1;
	if (!hash[n]) {
		hash[n] = fib(n - 1) + fib(n - 2);
	}
	return hash[n];
};

const hashLetters = {
	a: 3,
	b: 4,
	c: 5,
	d: 6,
	e: 7,
	f: 8,
	g: 9,
	h: 10,
	i: 11,
	j: 12,
	k: 13,
	l: 14,
	m: 15,
	n: 16,
	o: 17,
	p: 18,
	q: 19,
	r: 20,
	s: 21,
	t: 22,
	u: 23,
	v: 24,
	w: 25,
	x: 26,
	y: 27,
	z: 28,
};

for (char in hashLetters) {
	hashLetters[char] = fib(hashLetters[char]);
}

const hashLetters = {
	a: 3,
	b: 5,
	c: 8,
	d: 13,
	e: 21,
	f: 34,
	g: 55,
	h: 89,
	i: 144,
	j: 233,
	k: 377,
	l: 610,
	m: 987,
	n: 1597,
	o: 2584,
	p: 4181,
	q: 6765,
	r: 10946,
	s: 17711,
	t: 28657,
	u: 46368,
	v: 75025,
	w: 121393,
	x: 196418,
	y: 317811,
	z: 514229,
};

const Anagram = function (arr) {
	if (!Array.isArray(arr) || !arr.length) {
		console.log('Invalid Array');
		return arr;
	}
	let i,
		str,
		key = 1;
	const hash = {},
		res = {};

	for (i = 0; i < arr.length; i++) {
		str = arr[i];
		console.log('str', str);
		for (var j = 0; j < str.length; j++) {
			key *= hashLetters[str[j]];
		}
		console.log('key', key);
		console.log('hash[key]', hash[key]);
		if (!hash[key]) {
			hash[key] = true;
		}
		if (hash[key]) {
			if (!res[key]) {
				res[key] = [];
			}
			res[key].push(str);
		}
		console.log('hash[key]', hash[key]);
		key = 1;
	}
	return res;
};

const Anagram = function (arr) {
	if (!Array.isArray(arr) || !arr.length) {
		console.log('Invalid Array');
		return arr;
	}
	let i,
		str,
		key = 1;
	const hash = {},
		res = {};

	for (i = 0; i < arr.length; i++) {
		str = arr[i];
		console.log('str', str);
		for (var j = 0; j < str.length; j++) {
			key *= hashLetters[str[j]];
		}
		console.log('key', key);
		console.log('hash[key]', hash[key]);
		if (!hash[key]) {
			hash[key] = true;
		}
		if (hash[key]) {
			if (!res[key]) {
				res[key] = [];
			}
			res[key].push(str);
		}
		console.log('hash[key]', hash[key]);
		key = 1;
	}
	return res;
};

const Anagram = function (arr) {
	if (!Array.isArray(arr) || !arr.length) {
		console.log('Invalid Array');
		return arr;
	}
	let i,
		key = '';
	const hash = {};

	for (i = 0; i < arr.length; i++) {
		key = arr[i] || '';
		key = key.split('').sort();
		if (!hash[key]) {
			hash[key] = [];
		}
		if (hash[key]) {
			hash[key].push(arr[i]);
		}
	}
	return hash;
};
