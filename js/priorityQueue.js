// ===============================
// Priority Queue (Max Priority First)
// ===============================

class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    enqueue(value, priority) {
        const node = { value, priority };
        this.heap.push(node);
        this._heapifyUp();
    }

    dequeue() {

        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];

        this.heap[0] = this.heap.pop();
        this._heapifyDown();

        return max;
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    _heapifyUp() {

        let index = this.heap.length - 1;

        while (index > 0) {

            let parentIndex = Math.floor((index - 1) / 2);

            if (this.heap[parentIndex].priority >= 
                this.heap[index].priority) break;

            [this.heap[parentIndex], this.heap[index]] =
                [this.heap[index], this.heap[parentIndex]];

            index = parentIndex;
        }
    }

    _heapifyDown() {

        let index = 0;
        let length = this.heap.length;

        while (true) {

            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let largest = index;

            if (left < length &&
                this.heap[left].priority >
                this.heap[largest].priority) {
                largest = left;
            }

            if (right < length &&
                this.heap[right].priority >
                this.heap[largest].priority) {
                largest = right;
            }

            if (largest === index) break;

            [this.heap[index], this.heap[largest]] =
                [this.heap[largest], this.heap[index]];

            index = largest;
        }
    }
}