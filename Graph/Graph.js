class Graph {
	constructor(vertices = []) {
		this.vertices = new Set();
		this.edges = {}; // Each vertex maps to a Set of connected vertices
		this.numberOfEdges = 0;

		// Use addVertex for each initial vertex
		vertices.forEach((vertex) => this.addVertex(vertex));
	}

	/**
	 * Adds a vertex to the graph.
	 * @param {*} vertex - The vertex to add.
	 */
	addVertex(vertex) {
		if (!this.vertices.has(vertex)) {
			this.vertices.add(vertex);
			this.edges[vertex] = new Set(); // Use Set instead of array
		} else {
			console.warn(`Vertex '${vertex}' already exists.`);
		}
	}

	/**
	 * Adds an edge between two vertices. If vertices don't exist, they are added.
	 * This implementation creates an undirected edge.
	 * @param {*} vertex1 - The first vertex.
	 * @param {*} vertex2 - The second vertex.
	 */
	addEdge(vertex1, vertex2) {
		// Ensure both vertices exist
		this.addVertex(vertex1);
		this.addVertex(vertex2);

		// Add undirected edge -
		if (!this.edges[vertex1].has(vertex2)) {
			this.edges[vertex1].add(vertex2);
			this.edges[vertex2].add(vertex1);
			this.numberOfEdges++;
		} else {
			console.warn(`Edge between '${vertex1}' and '${vertex2}' already exists.`);
		}
	}

	/**
	 * Checks if two vertices are connected by an edge.
	 * @param {*} vertex1 - The first vertex.
	 * @param {*} vertex2 - The second vertex.
	 * @returns {boolean} True if vertices are connected, false otherwise.
	 */
	areConnected(vertex1, vertex2) {
		if (!this.vertices.has(vertex1) || !this.vertices.has(vertex2)) {
			return false;
		}
		return this.edges[vertex1].has(vertex2);
	}

	/**
	 * Removes an edge between two vertices.
	 * @param {*} vertex1 - The first vertex of the edge.
	 * @param {*} vertex2 - The second vertex of the edge.
	 */
	removeEdge(vertex1, vertex2) {
		if (!this.areConnected(vertex1, vertex2)) {
			console.warn(`Edge between '${vertex1}' and '${vertex2}' does not exist.`);
			return;
		}

		// Remove edge from both directions
		this.edges[vertex1].delete(vertex2);
		this.edges[vertex2].delete(vertex1);
		this.numberOfEdges--;
	}

	/**
	 * Removes a vertex and all its associated edges from the graph.
	 * @param {*} vertex - The vertex to remove.
	 */
	removeVertex(vertex) {
		if (!this.vertices.has(vertex)) {
			console.warn(`Vertex '${vertex}' not found.`);
			return;
		}

		this.edges[vertex].forEach((connectedVertex) =>
			this.removeEdge(vertex, connectedVertex),
		);

		// Remove vertex from data structures
		this.vertices.delete(vertex);
		delete this.edges[vertex];
	}

	/**
	 * Prints the graph's adjacency list representation.
	 */
	print() {
		if (this.vertices.size === 0) {
			console.log('Graph is empty.');
			return;
		}

		const output = Array.from(this.vertices)
			.map((vertex) => {
				const connections = Array.from(this.edges[vertex]); // Convert Set to Array for display
				const connected = connections.length > 0 ? connections.join(', ') : 'none';
				return `${vertex} -> ${connected}`;
			})
			.join(' | ');

		console.log(output);
	}

	/**
	 * Traverses the graph using Breadth-First Search (BFS) from a starting vertex.
	 * @param {*} startVertex - The vertex to start the traversal from.
	 * @param {function} callback - A function to call for each visited vertex.
	 */
	traverseBFS(startVertex, callback) {
		if (!this.vertices.has(startVertex)) {
			console.warn(`BFS: Vertex '${startVertex}' not found.`);
			return;
		}

		if (typeof callback !== 'function') {
			console.warn('BFS: Callback must be a function.');
			return;
		}

		const queue = [startVertex];
		const visited = new Set([startVertex]);

		while (queue.length > 0) {
			const currentVertex = queue.shift();
			callback(currentVertex);

			for (const neighbor of this.edges[currentVertex]) {
				if (!visited.has(neighbor)) {
					visited.add(neighbor);
					queue.push(neighbor);
				}
			}
		}
	}

	/**
	 * Traverses the graph using Depth-First Search (DFS) from a starting vertex.
	 * @param {*} startVertex - The vertex to start the traversal from.
	 * @param {function} callback - A function to call for each visited vertex.
	 */
	traverseDFS(startVertex, callback) {
		if (!this.vertices.has(startVertex)) {
			console.warn(`DFS: Vertex '${startVertex}' not found.`);
			return;
		}

		if (typeof callback !== 'function') {
			console.warn('DFS: Callback must be a function.');
			return;
		}

		const visited = new Set();
		this.#traverseDFS(startVertex, visited, callback);
	}

	/**
	 * Private helper method for DFS.
	 * @param {*} vertex - The current vertex being visited.
	 * @param {Set} visited - A Set to keep track of visited vertices.
	 * @param {function} callback - A function to call for each visited vertex.
	 * @private
	 */
	#traverseDFS(vertex, visited, callback) {
		visited.add(vertex);
		callback(vertex);

		// Iterate over Set directly
		for (const neighbor of this.edges[vertex]) {
			if (!visited.has(neighbor)) {
				this.#traverseDFS(neighbor, visited, callback);
			}
		}
	}

	/**
	 * Returns the number of vertices in the graph.
	 * @returns {number} The number of vertices.
	 */
	size() {
		return this.vertices.size; // Use Set.size instead of Array.length
	}

	/**
	 * Returns the number of edges in the graph.
	 * @returns {number} The number of edges.
	 */
	relations() {
		return this.numberOfEdges;
	}

	/**
	 * Finds the shortest path between two vertices using BFS.
	 * @param {*} startVertex - The starting vertex.
	 * @param {*} endVertex - The destination vertex.
	 * @returns {string|undefined} A string representing the path (e.g., "A-B-C") or undefined if no path exists.
	 */
	pathFromTo(startVertex, endVertex) {
		if (!this.vertices.has(startVertex) || !this.vertices.has(endVertex)) {
			console.warn('Path finding: One or both vertices not found.');
			return undefined;
		}

		if (startVertex === endVertex) {
			return String(startVertex);
		}

		const queue = [startVertex];
		const visited = new Set([startVertex]);
		const predecessors = {}; // To reconstruct the path

		while (queue.length > 0) {
			const currentVertex = queue.shift();

			if (currentVertex === endVertex) {
				// Path found, reconstruct it
				const path = [];
				let crawl = endVertex;
				while (crawl !== startVertex) {
					path.push(crawl);
					crawl = predecessors[crawl];
				}
				path.push(startVertex);
				return path.reverse().join('-');
			}

			// Iterate over Set directly
			for (const neighbor of this.edges[currentVertex]) {
				if (!visited.has(neighbor)) {
					visited.add(neighbor);
					queue.push(neighbor);
					predecessors[neighbor] = currentVertex;
				}
			}
		}

		return undefined; // No path found
	}

	/**
	 * Gets all vertices that are reachable from a given vertex.
	 * @param {*} startVertex - The vertex to start from.
	 * @returns {Array} Array of reachable vertices.
	 */
	getReachableVertices(startVertex) {
		if (!this.vertices.has(startVertex)) {
			console.warn(`Vertex '${startVertex}' not found.`);
			return [];
		}

		const reachable = [];
		this.traverseBFS(startVertex, (vertex) => reachable.push(vertex));
		return reachable;
	}

	/**
	 * Checks if the graph is connected (all vertices are reachable from any vertex).
	 * @returns {boolean} True if the graph is connected, false otherwise.
	 */
	isConnected() {
		if (this.vertices.size === 0) return true;

		const firstVertex = this.vertices.values().next().value; // Get first vertex from Set
		const reachable = this.getReachableVertices(firstVertex);
		return reachable.length === this.vertices.size;
	}

	/**
	 * Gets the degree (number of connections) of a vertex
	 * @param {*} vertex - The vertex to check.
	 * @returns {number} The degree of the vertex.
	 */
	getDegree(vertex) {
		if (!this.vertices.has(vertex)) {
			console.warn(`Vertex '${vertex}' not found.`);
			return 0;
		}
		return this.edges[vertex].size;
	}

	/**
	 * Gets all neighbors of a vertex as an array.
	 * @param {*} vertex - The vertex to get neighbors for.
	 * @returns {Array} Array of neighboring vertices.
	 */
	getNeighbors(vertex) {
		if (!this.vertices.has(vertex)) {
			console.warn(`Vertex '${vertex}' not found.`);
			return [];
		}
		return Array.from(this.edges[vertex]);
	}
}

// --- Example Usage (same as before) ---
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

console.log('\n--- Graph after adding edges ---');
graph.print();

console.log('\n--- Performance Test: New O(1) Operations ---');
console.log('Degree of vertex 0:', graph.getDegree(0)); // O(1)
console.log('Are 1 and 0 connected?', graph.areConnected(1, 0)); // O(1)
console.log('Neighbors of vertex 3:', graph.getNeighbors(3)); // O(1) to get Set, O(k) to convert to array

console.log('\n--- Edge removal now O(1) ---');
console.time('Remove edge');
graph.removeEdge(1, 0); // O(1) instead of O(n)
console.timeEnd('Remove edge');

console.log('\n--- All other functionality works the same ---');
console.log('Path from 6 to 5:', graph.pathFromTo(6, 5));
console.log('Is graph connected?', graph.isConnected());
