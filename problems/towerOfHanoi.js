// javascript recursive function to
// solve tower of hanoi puzzle
function towerOfHanoi(n, from_rod, to_rod, aux_rod) {
	if (n == 0) return;

	towerOfHanoi(n - 1, from_rod, aux_rod, to_rod);
	console.log(`Move disk ${n} from rod ${from_rod} to rod ${to_rod}`);
	towerOfHanoi(n - 1, aux_rod, to_rod, from_rod);
}

// A, B and C are names of rods
towerOfHanoi(2, 'A', 'C', 'B');

const rod = ['S', 'A', 'D'];
const stacks = [[], [], []];

function moveDisk(a, b) {
	if (
		stacks[b].length === 0 ||
		(stacks[a].length > 0 &&
			stacks[a][stacks[a].length - 1] < stacks[b][stacks[b].length - 1])
	) {
		console.log(
			`Move disk ${stacks[a][stacks[a].length - 1]} from rod ${rod[a]} to rod ${rod[b]}`,
		);
		stacks[b].push(stacks[a].pop());
	} else {
		moveDisk(b, a);
	}
}

function towerOfHanoi(n) {
	let src = 0,
		aux = 1,
		dest = 2;
	for (let i = n; i > 0; i--) stacks[src].push(i);

	let totalMoves = (1 << n) - 1;
	if (n % 2 === 0) [aux, dest] = [dest, aux];

	for (let i = 1; i <= totalMoves; i++) {
		if (i % 3 === 0) moveDisk(aux, dest);
		else if (i % 3 === 1) moveDisk(src, dest);
		else moveDisk(src, aux);
	}
}

towerOfHanoi(3);
