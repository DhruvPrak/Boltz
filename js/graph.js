// =======================================
// Graph (Adjacency List - Undirected)
// =======================================

class Graph {

    constructor() {
        this.adjList = {};
    }

    // Add vertex
    addVertex(vertex) {
        if (!this.adjList[vertex]) {
            this.adjList[vertex] = [];
        }
    }

    // Add edge (undirected)
    addEdge(v1, v2) {

        if (!this.adjList[v1]) this.addVertex(v1);
        if (!this.adjList[v2]) this.addVertex(v2);

        this.adjList[v1].push(v2);
        this.adjList[v2].push(v1);
    }

    // Remove edge
    removeEdge(v1, v2) {

        if (!this.adjList[v1] || !this.adjList[v2]) return;

        this.adjList[v1] =
            this.adjList[v1].filter(v => v !== v2);

        this.adjList[v2] =
            this.adjList[v2].filter(v => v !== v1);
    }

    // Remove vertex
    removeVertex(vertex) {

        if (!this.adjList[vertex]) return;

        while (this.adjList[vertex].length) {
            const adjacent = this.adjList[vertex].pop();
            this.removeEdge(vertex, adjacent);
        }

        delete this.adjList[vertex];
    }

    print() {
        console.log(this.adjList);
    }

    // =======================================
    // BFS
    // =======================================

    bfs(start) {

        if (!this.adjList[start]) return null;

        const visited = {};
        const queue = [];
        const result = [];

        queue.push(start);
        visited[start] = true;

        while (queue.length) {

            const vertex = queue.shift();
            result.push(vertex);

            for (let neighbor of this.adjList[vertex]) {

                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            }
        }

        return result;
    }

    // =======================================
    // DFS (Recursive)
    // =======================================

    dfs(start) {

        if (!this.adjList[start]) return null;

        const visited = {};
        const result = [];

        const dfsHelper = (vertex) => {

            visited[vertex] = true;
            result.push(vertex);

            for (let neighbor of this.adjList[vertex]) {
                if (!visited[neighbor]) {
                    dfsHelper(neighbor);
                }
            }
        };

        dfsHelper(start);

        return result;
    }

    // =======================================
    // Cycle Detection (Undirected)
    // =======================================

    hasCycle() {

        const visited = {};

        const dfsCycle = (vertex, parent) => {

            visited[vertex] = true;

            for (let neighbor of this.adjList[vertex]) {

                if (!visited[neighbor]) {
                    if (dfsCycle(neighbor, vertex)) {
                        return true;
                    }
                }
                else if (neighbor !== parent) {
                    return true;
                }
            }

            return false;
        };

        for (let vertex in this.adjList) {

            if (!visited[vertex]) {
                if (dfsCycle(vertex, null)) {
                    return true;
                }
            }
        }

        return false;
    }

    // =======================================
    // Shortest Path (Unweighted - BFS)
    // =======================================

    shortestPath(start, end) {

        if (!this.adjList[start] || !this.adjList[end]) return null;

        const visited = {};
        const queue = [];
        const previous = {};

        queue.push(start);
        visited[start] = true;
        previous[start] = null;

        while (queue.length) {

            const vertex = queue.shift();

            if (vertex === end) break;

            for (let neighbor of this.adjList[vertex]) {

                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    previous[neighbor] = vertex;
                    queue.push(neighbor);
                }
            }
        }

        const path = [];
        let current = end;

        while (current !== null) {
            path.push(current);
            current = previous[current];
        }

        path.reverse();

        if (path[0] !== start) return null;

        return path;
    }
}


// =======================================
// Weighted Graph (Adjacency List)
// =======================================

class WeightedGraph {

    constructor() {
        this.adjList = {};
    }

    addVertex(vertex) {
        if (!this.adjList[vertex]) {
            this.adjList[vertex] = [];
        }
    }

    addEdge(v1, v2, weight) {

        if (!this.adjList[v1]) this.addVertex(v1);
        if (!this.adjList[v2]) this.addVertex(v2);

        this.adjList[v1].push({ node: v2, weight });
        this.adjList[v2].push({ node: v1, weight });
    }

    print() {
        console.log(this.adjList);
    }

    // =======================================
    // Dijkstra's Algorithm
    // =======================================

    dijkstra(start) {

        const distances = {};
        const previous = {};
        const pq = new MinHeap();

        for (let vertex in this.adjList) {
            distances[vertex] = Infinity;
            previous[vertex] = null;
        }

        distances[start] = 0;
        pq.insert({ node: start, distance: 0 });

        while (pq.heap.length > 0) {

            const smallest = pq.extractMin();
            const currentNode = smallest.node;

            for (let neighbor of this.adjList[currentNode]) {

                let candidate = distances[currentNode] + neighbor.weight;

                if (candidate < distances[neighbor.node]) {

                    distances[neighbor.node] = candidate;
                    previous[neighbor.node] = currentNode;

                    pq.insert({
                        node: neighbor.node,
                        distance: candidate
                    });
                }
            }
        }

        return { distances, previous };
    }

    // =======================================
    // Get Shortest Path
    // =======================================

    getShortestPath(start, end) {

        const { distances, previous } = this.dijkstra(start);

        if (distances[end] === Infinity) return null;

        const path = [];
        let current = end;

        while (current !== null) {
            path.push(current);
            current = previous[current];
        }

        path.reverse();

        return {
            distance: distances[end],
            path: path
        };
    }
}