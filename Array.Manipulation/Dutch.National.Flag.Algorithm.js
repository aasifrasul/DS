
// JavaScript program to sort an array of 0s, 1s and 2s
// using Dutch National Flag Algorithm

// Function to sort an array of 0s, 1s and 2s
function sort012(arr) {
    let lo = 0;
    let hi = arr.length - 1;
    let mid = 0;

    // Iterate till all the elements are sorted
    while (mid <= hi) {
        if (arr[mid] === 0) {
            [arr[lo], arr[mid]] = [arr[mid], arr[lo]];
            lo++;
            mid++;
        } else if (arr[mid] === 1) {
            mid++;
        } else {
            [arr[mid], arr[hi]] = [arr[hi], arr[mid]];
            hi--;
        }
    }
}

let arr = [0, 1, 2, 0, 1, 2];
sort012(arr);
console.log(arr.join(' '));
