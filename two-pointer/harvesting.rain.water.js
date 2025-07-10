function maxWater(arr) {
    const n = arr.length;

    let left = Array(n);
    let right = Array(n);
    let res = 0;

    // Fill left array
    left[0] = arr[0];
    for (let i = 1; i < n; i++) {
        left[i] = Math.max(left[i - 1], arr[i]);
    }

    // Fill right array
    right[n - 1] = arr[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        right[i] = Math.max(right[i + 1], arr[i]);
    }

    // Calculate the accumulated water element by element
    for (let i = 1; i < n - 1; i++) {
        let minOf2 = Math.min(left[i], right[i]);
        res += minOf2 - arr[i];
    }

    return res;
}

// Example usage
maxWater([2, 1, 5, 3, 1, 0, 4]); // Output: 9

function harvestingRainWater(arr) {
    let left = 1;
    let right = arr.length - 2;

    // lMax : Maximum in subarray arr[0..left-1]
    // rMax : Maximum in subarray arr[right+1..n-1]
    let lMax = arr[left - 1];
    let rMax = arr[right + 1];

    let res = 0;
    while (left <= right) {
        // If rMax is smaller, then we can decide the
        // amount of water for arr[right]
        if (rMax <= lMax) {
            // Add the water for arr[right]
            res += Math.max(0, rMax - arr[right]);

            // Update right max
            rMax = Math.max(rMax, arr[right]);

            // Update right pointer as we have decided
            // the amount of water for this
            right -= 1;
        } else {
            // Add the water for arr[left]
            res += Math.max(0, lMax - arr[left]);

            // Update left max
            lMax = Math.max(lMax, arr[left]);

            // Update left pointer as we have decided water for this
            left += 1;
        }
    }
    return res;
}

// Driver code
harvestingRainWater([2, 1, 5, 3, 1, 0, 4]);
