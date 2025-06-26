class Graph {
	#vertices = new Set();
	#edges = {};
	#numberOfEdges = 0;

	constructor(vertices = []) {
		vertices.forEach((vertex) => this.#vertices.add(vertex));
	}

	addVertex(vertex) {
		if (this.#vertices.has(vertex)) {
			console.log(`Vertex ${vertex} is already present`);
			return;
		}
		this.#vertices.add(vertex);
		this.#edges[vertex] = new Set();
	}

	areConnected(vertex1, vertex2) {
		if (!this.#vertices.has(vertex1)) return false;
		if (!this.#vertices.has(vertex2)) return false;
		return this.#edges[vertex1].has(vertex2);
	}

	addEdge(vertex1, vertex2) {
		this.addVertex(vertex1);
		this.addVertex(vertex2);

		if (this.areConnected(vertex1, vertex2)) {
			console.log('edge already present');
			return;
		}

		this.#edges[vertex1].add(vertex2);
		this.#edges[vertex2].add(vertex1);
		this.#numberOfEdges++;
	}

	removeEdge(vertex1, vertex2) {
		if (!this.areConnected(vertex1, vertex2)) {
			console.log('edge not present');
			return;
		}

		this.#edges[vertex1].delete(vertex2);
		this.#edges[vertex2].delete(vertex1);
		this.#numberOfEdges--;
	}

	removeVertex(vertex) {
		if (!(vertex in this.#edges)) {
			console.log('vertex not present');
			return;
		}

		this.#edges[vertex].forEach((connectdVertex) => {
			this.removeEdge(vertex, connectdVertex);
		});

		this.#vertices.delete(vertex);
		delete this.#edges[vertex];
	}

	print() {
		let output = '';

		this.#vertices.forEach((vertex) => {
			let connections = '';
			this.#edges[vertex].forEach((connectedVertex) => {
				connections += connectedVertex + ', ';
			});

			output += (connections || 'none') + '|';
		});

		return output;
	}

	traverseBFS(startVertex, callback) {
		if (!this.#vertices.has(startVertex)) {
			console.warn(`DFS: Vertex '${startVertex}' not found.`);
			return;
		}

		if (typeof callback !== 'function') {
			console.warn(`DFS: Callback '${callback}' is not a function.`);
			return;
		}

		const queue = [startVertex];
		const visited = new Set([startVertex]);

		while (queue.length) {
			const currentVertex = queue.shift();
			callback(currentVertex);

			this.#edges[currentVertex].forEach((neighbor) => {
				if (!visited.has(neighbor)) {
					visited.add(neighbor);
					queue.push(neighbor);
				}
			});
		}
	}

	traverseDFS(startVertex, callback) {
		if (!this.#vertices.has(startVertex)) {
			console.warn(`DFS: Vertex '${startVertex}' not found.`);
			return;
		}

		if (typeof callback !== 'function') {
			console.warn(`DFS: Callback '${callback}' is not a function.`);
			return;
		}

		callback(startVertex);

		const visited = new Set([startVertex]);

		this.#edges[startVertex].forEach((neighbour) => {
			if (!visited.has(neighbour)) {
				visited.add(neighbour);
				this.traverseDFS(neighbour, callback);
			}
		});
	}

	get size() {
		return this.#vertices.size;
	}

	relations() {
		return this.#numberOfEdges;
	}

	pathFromTo(startVertex, endVertex) {
		if (!this.#vertices.has(startVertex) || !this.#vertices.has(endVertex)) {
			return;
		}

		const queue = [startVertex];
		const predecessors = {};

		while (queue.length) {
			const currentVertex = queue.shift();

			if (currentVertex === endVertex) {
				const path = [];
				let crawl = endVertex;
				while (crawl !== startVertex) {
					path.push(crawl);
					crawl = predecessors[crawl];
				}

				path.push(startVertex);
				return path.reverse.join('-');
			}

			this.#edges[currentVertex].forEach((neighbour) => {
				if (!(neighbour in predecessors)) {
					visited.add(neighbour);
					predecessors[neighbour] = currentVertex;
					queue.push(neighbour);
				}
			});
		}
	}

	getReachableVertices(startVertex) {
		if (!this.#vertices.has(startVertex)) {
			return [];
		}

		const reachable = [];
		this.traverseBFS(startVertex, (vertex) => reachable.push(vertex));
		return reachable;
	}

	isConnected() {
		if (!this.#vertices.size === 0) return true;

		const firstVertex = this.#vertices.values().next().value;
		const reachable = this.getReachableVertices(firstVertex);

		return reachable.length === this.#vertices.size;
	}
}

const graph = new Graph();

console.log('--- Initial Graph ---');
graph.print(); // Graph is empty.

[
	[1, 0],
	[2, 0],
	[3, 0],
	[3, 2],
	[4, 3],
	[2, 5],
	[0, 6],
].forEach(([v1, v2]) => graph.addEdge(v1, v2));
