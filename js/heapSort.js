function heapSort(arr) {
    let n = arr.length;

    // Step 1: Build Max Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Step 2: Extract elements one by one
    for (let i = n - 1; i > 0; i--) {

        // Swap root (max) with last element
        let temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;

        // Heapify reduced heap
        heapify(arr, i, 0);
    }

    return arr;
}

function heapify(arr, size, rootIndex) {

    let largest = rootIndex;
    let left = 2 * rootIndex + 1;
    let right = 2 * rootIndex + 2;

    // If left child is larger
    if (left < size && arr[left] > arr[largest]) {
        largest = left;
    }

    // If right child is larger
    if (right < size && arr[right] > arr[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest !== rootIndex) {

        let temp = arr[rootIndex];
        arr[rootIndex] = arr[largest];
        arr[largest] = temp;

        // Recursively heapify affected subtree
        heapify(arr, size, largest);
    }
}