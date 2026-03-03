function quickSort(arr, low = 0, high = arr.length - 1) {

    if (low < high) {

        let pivotIndex = partition(arr, low, high);

        // Sort left of pivot
        quickSort(arr, low, pivotIndex - 1);

        // Sort right of pivot
        quickSort(arr, pivotIndex + 1, high);
    }

    return arr;
}

function partition(arr, low, high) {

    let pivot = arr[high];   // Choose last element as pivot
    let i = low - 1;         // Index of smaller element

    for (let j = low; j < high; j++) {

        if (arr[j] < pivot) {
            i++;

            // Swap arr[i] and arr[j]
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    // Place pivot in correct position
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
}