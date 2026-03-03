function selectionSort(arr) {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {

        // Assume current index is minimum
        let minIndex = i;

        // Find actual minimum in remaining unsorted array
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // Swap only if needed
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }

    return arr;
}