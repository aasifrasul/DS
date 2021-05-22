var kWeakestRows = function (mat, k) {
	const len = mat.length,
		hash = new Map(),
		res = new Array(len);
	let i = -1,
		idx;

	while (++i < len) {
		idx = mat[i].indexOf(0);
		idx = idx >= 0 ? idx : mat[0].length;
		hash.set(i, idx);
		res[idx] = typeof res[idx] === 'undefined' ? i : Array.isArray(res[idx]) ? [...res[idx], i] : [res[idx], i];
	}

	return res.flat().slice(0, k);
};

var mat = [
	[1, 10, 4, 2],
	[9, 3, 8, 7],
	[15, 16, 17, 12],
];

console.log(kWeakestRows(mat, 4));
