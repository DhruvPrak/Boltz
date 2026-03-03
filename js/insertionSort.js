function insertionSort(arr) {
    let n = arr.length;

    for (let i = 1; i < n; i++) {

        let key = arr[i];     // Element to insert
        let j = i - 1;

        // Shift elements greater than key to the right
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }

        // Place key in correct position
        arr[j + 1] = key;
    }

    return arr;
}