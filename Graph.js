var Graph = (function () {
	const Graph = function (vertices = []) {
		this.vertices = vertices;
		this.edges = [];
		this.dependencyEdges = [];
		this.numberOfEdges = 0;
	};

	Graph.prototype.addVertex = function (vertex) {
		this.vertices.push(vertex);
		this.edges[vertex] = [];
	};

	Graph.prototype.addEdge = function (vertex1, vertex2) {
		[vertex1, vertex2].forEach((i) => {
			if (this.vertices.indexOf(i) === -1) {
				this.addVertex(i);
			}
		});

		this.edges[vertex1].push(vertex2);
		this.edges[vertex2].push(vertex1);

		if (!Array.isArray(this.dependencyEdges[vertex1])) {
			this.dependencyEdges[vertex1] = [];
		}
		this.dependencyEdges[vertex1].push(vertex2);

		this.numberOfEdges++;
	};

	Graph.prototype.print = function () {
		console.log(
			this.vertices
				.map(function (vertex) {
					return `${vertex} -> ${this.edges[vertex].join(', ')}`.trim();
				}, this)
				.join(' | '),
		);
	};

	Graph.prototype.traverseBFS = function (vertex, fn) {
		if (this.vertices.indexOf(vertex) === -1) {
			return console.log('Vertex not found');
		}
		const queue = [vertex];
		const visited = {};
		visited[vertex] = true;
		let items, item;

		while (queue.length) {
			vertex = queue.shift();
			fn(vertex);
			items = this.edges[vertex];
			for (let i = 0; i < items.length; i++) {
				item = items[i];
				if (!visited[item]) {
					visited[item] = true;
					queue.push(item);
				}
			}
		}
	};

	Graph.prototype.traverseDFS = function (vertex, fn) {
		if (this.vertices.indexOf(vertex) === -1) {
			return console.log('Vertex not found');
		}
		const visited = {};
		this._traverseDFS(vertex, visited, fn);
	};

	Graph.prototype._traverseDFS = function (vertex, visited, fn) {
		visited[vertex] = true;
		const items = this.edges[vertex];
		let item;

		fn(vertex);

		for (let i = 0; i < items.length; i++) {
			item = items[i];
			if (!visited[item]) {
				this._traverseDFS(item, visited, fn);
			}
		}
	};

	Graph.prototype.removeVertex = function (vertex) {
		const index = this.vertices.indexOf(vertex);
		if (index >= 0) {
			this.vertices.splice(index, 1);
		}
		const item = this.edges[vertex];
		while (item.length) {
			const adjacentVertex = item.pop();
			this.removeEdge(adjacentVertex, vertex);
		}
	};

	Graph.prototype.removeEdge = function (vertex1, vertex2) {
		const index1 = this.edges[vertex1] ? this.edges[vertex1].indexOf(vertex2) : -1;
		const index2 = this.edges[vertex2] ? this.edges[vertex2].indexOf(vertex1) : -1;
		if (index1 >= 0) {
			this.edges[vertex1].splice(index1, 1);
			this.numberOfEdges--;
		}
		if (index2 >= 0) {
			this.edges[vertex2].splice(index2, 1);
		}
	};

	Graph.prototype.size = function () {
		return this.vertices.length;
	};

	Graph.prototype.relations = function () {
		return this.numberOfEdges;
	};

	Graph.prototype.pathFromTo = function (vertexSource, vertexDestination) {
		if (this.vertices.indexOf(vertexSource) === -1) {
			return console.log('Vertex not found');
		}
		const queue = [];
		queue.push(vertexSource);
		const visited = [];
		visited[vertexSource] = true;
		const paths = [];
		let item = this.edges[vertexSource];

		while (queue.length) {
			const vertex = queue.shift();
			for (let i = 0; i < item.length; i++) {
				if (!visited[item[i]]) {
					visited[item[i]] = true;
					queue.push(item[i]);
					// save paths between vertices
					paths[item[i]] = vertex;
				}
			}
		}
		if (!visited[vertexDestination]) {
			return undefined;
		}

		const path = [];
		for (var j = vertexDestination; j != vertexSource; j = paths[j]) {
			path.push(j);
		}
		path.push(j);
		return path.reverse().join('-');
	};

	return Graph;
})();

var graph = new Graph();

//['A', 'B', 'C', 'D', 'E', 'F'].forEach((i) => graph.addVertex(i));
graph.print();

[
	[1, 0],
	[2, 0],
	[3, 0],
	[3, 2],
	[4, 3],
	[2, 5],
	[0, 6],
].forEach((i) => graph.addEdge(i[0], i[1]));
graph.print();
graph.traverseBFS(6, console.log);

/*
6
0
1
2
3
5
4
// adding edges
graph.addEdge('A', 'B');
graph.addEdge('A', 'D');
graph.addEdge('A', 'E');
graph.addEdge('B', 'C');
graph.addEdge('D', 'E');
graph.addEdge('E', 'F');
graph.addEdge('E', 'C');
graph.addEdge('C', 'F');


console.log("BFS");
graph.traverseBFS('A', console.log);

graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.print(); // 1 -> | 2 -> | 3 -> | 4 -> | 5 -> | 6 ->
graph.addEdge(1, 2);
graph.addEdge(1, 5);
graph.addEdge(2, 3);
graph.addEdge(2, 5);
graph.addEdge(3, 4);
graph.addEdge(4, 5);
graph.addEdge(4, 6);
graph.print(); // 1 -> 2, 5 | 2 -> 1, 3, 5 | 3 -> 2, 4 | 4 -> 3, 5, 6 | 5 -> 1, 2, 4 | 6 -> 4
console.log('graph size (number of vertices):', graph.size()); // => 6
console.log('graph relations (number of edges):', graph.relations()); // => 7
graph.traverseDFS(1, (vertex) => {
	console.log(vertex);
}); // => 1 2 3 4 5 6
console.log('---');
graph.traverseBFS(1, (vertex) => {
	console.log(vertex);
}); // => 1 2 5 3 4 6
graph.traverseDFS(0, (vertex) => {
	console.log(vertex);
}); // => 'Vertex not found'
graph.traverseBFS(0, (vertex) => {
	console.log(vertex);
}); // => 'Vertex not found'
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-5-1
console.log('path from 3 to 5:', graph.pathFromTo(3, 5)); // => 3-2-5
graph.removeEdge(1, 2);
graph.removeEdge(4, 5);
graph.removeEdge(10, 11);
console.log('graph relations (number of edges):', graph.relations()); // => 5
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-3-2-5-1
graph.addEdge(1, 2);
graph.addEdge(4, 5);
console.log('graph relations (number of edges):', graph.relations()); // => 7
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-5-1
graph.removeVertex(5);
console.log('graph size (number of vertices):', graph.size()); // => 5
console.log('graph relations (number of edges):', graph.relations()); // => 4
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)); // => 6-4-3-2-1
*/
