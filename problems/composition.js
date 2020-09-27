// Composition

const map = (fn, arr) =>
	arr.reduce((acc, item, index, arr) => {
		return acc.concat(fn(item, index, arr));
	}, []);

const filter = (fn, arr) =>
	arr.reduce((newArr, item) => {
		return fn(item) ? newArr.concat([item]) : newArr;
	}, []);

const trace = (label) => (value) => {
	console.log(`${label}: ${value}`);
	return value;
};

const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

const pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x);
