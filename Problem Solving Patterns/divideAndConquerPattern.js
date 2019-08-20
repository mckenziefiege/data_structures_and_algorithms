// DIVIDE AND CONQUER PATTERN
// EXAMPLE #1 - binary search
// Given a sorted array of integers, write a function called search, that accepts a value and returns the index
// where the value passed to the function is located. If the value is not found, return -1.
// Ex: search([1, 2, 3, 4, 5, 6], 4) -> 3
// Ex: search([1, 2, 3, 4, 5, 6], 5) -> 5
// Ex: search([1, 2, 3, 4, 5, 6], 11) -> -1

// NAIVE SOLUTION - linear search => O(n)
function search (arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      return i
    }
  }
  return -1;
}

// Refactored version using Binary Search & divide and conquer - time complexity Log(n)

function searchRefactored(arr, val) {
  let min = 0;
  let max = arr.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let currentElement = arr[middle];

    if (arr[middle] < val) {
      min = middle + 1;
    }
    else if (arr[middle] > val) {
      max = middle - 1;
    }
    else {
      return middle
    }
  }
  return -1;
}
