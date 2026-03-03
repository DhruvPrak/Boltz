function bubbleSort(arr) {
    let n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {

        swapped = false;

        // Last i elements are already sorted
        for (let j = 0; j < n - 1 - i; j++) {

            if (arr[j] > arr[j + 1]) {

                // Swap
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                swapped = true;
            }
        }

        // If no swaps happened, array is sorted
        if (!swapped) break;
    }

    return arr;
}