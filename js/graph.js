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

        this.adjList[v1] =
            this.adjList[v1].filter(v => v !== v2);

        this.adjList[v2] =
            this.adjList[v2].filter(v => v !== v1);
    }

    // Remove vertex
    removeVertex(vertex) {

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
// Breadth First Search (BFS)
// =======================================

bfs(start) {

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
// Depth First Search (DFS - Recursive)
// =======================================

dfs(start) {

    const visited = {};
    const result = [];

    const dfsHelper = (vertex) => {

        if (!vertex) return;

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
// Cycle Detection (Undirected Graph)
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
}