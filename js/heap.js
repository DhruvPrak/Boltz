// ===============================
// Min Heap
// ===============================

class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        // Step 1: Add to end
        this.heap.push(value);

        // Step 2: Heapify Up
        this._heapifyUp();
    }

    _heapifyUp() {
        let index = this.heap.length - 1;

        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);

            // If heap property satisfied, stop
            if (this.heap[parentIndex] <= this.heap[index]) break;

            // Swap
            [this.heap[parentIndex], this.heap[index]] =
                [this.heap[index], this.heap[parentIndex]];

            index = parentIndex;
        }
    }
    // ===============================
// Extract Min
// ===============================
extractMin() {

    if (this.heap.length === 0) return null;

    if (this.heap.length === 1) {
        return this.heap.pop();
    }

    // Step 1: Store minimum
    let min = this.heap[0];

    // Step 2: Move last element to root
    this.heap[0] = this.heap.pop();

    // Step 3: Heapify Down
    this._heapifyDown();

    return min;
}

_heapifyDown() {

    let index = 0;
    let length = this.heap.length;

    while (true) {

        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let smallest = index;

        if (left < length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }

        if (right < length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }

        if (smallest === index) break;

        // Swap
        [this.heap[index], this.heap[smallest]] =
            [this.heap[smallest], this.heap[index]];

        index = smallest;
    }
}
// ===============================
// Build Heap (O(n))
// ===============================
buildHeap(array) {

    this.heap = array.slice(); // copy array

    let n = this.heap.length;

    // Start from last non-leaf node
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        this._heapifyDownFrom(i);
    }
}

_heapifyDownFrom(index) {

    let length = this.heap.length;

    while (true) {

        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let smallest = index;

        if (left < length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }

        if (right < length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }

        if (smallest === index) break;

        [this.heap[index], this.heap[smallest]] =
            [this.heap[smallest], this.heap[index]];

        index = smallest;
    }
}

}

// ===============================
// Max Heap
// ===============================

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        this.heap.push(value);
        this._heapifyUp();
    }

    _heapifyUp() {
        let index = this.heap.length - 1;

        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);

            if (this.heap[parentIndex] >= this.heap[index]) break;

            [this.heap[parentIndex], this.heap[index]] =
                [this.heap[index], this.heap[parentIndex]];

            index = parentIndex;
        }
    }

    extractMax() {

        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        let max = this.heap[0];

        this.heap[0] = this.heap.pop();

        this._heapifyDown();

        return max;
    }

    _heapifyDown() {

        let index = 0;
        let length = this.heap.length;

        while (true) {

            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let largest = index;

            if (left < length && this.heap[left] > this.heap[largest]) {
                largest = left;
            }

            if (right < length && this.heap[right] > this.heap[largest]) {
                largest = right;
            }

            if (largest === index) break;

            [this.heap[index], this.heap[largest]] =
                [this.heap[largest], this.heap[index]];

            index = largest;
        }
    }
}
