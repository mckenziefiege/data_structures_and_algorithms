// SLIDING WINDOW PATTERN
// EXAMPLE #1 - Write a function called maxSubarraySum which accepts an array of integers and a number called n. The function
// should calculate the maximum sum of n consecutive elements in the array
// Ex: maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2) -> 10
// Ex: maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4) -> 17
// Ex: maxSubarraySum([4, 2, 1, 6], 1) -> 6
// Ex:  maxSubarraySum([], 4) -> null


// A naive solution - O(n^2)
function maxSubarraySum (arr, num) {
  // create edge case
  if (num > arr.length) {
    return null;
  }
  // Start at negative infinity in case the array was all negative numbers
  let max = -Infinity;
  // Can't loop until the end of the array since num may be more than 0. if num is 4, the last # we could start at would be the 4th to last num in the array
  for (let i = 0; i < arr.length - num + 1; i++) {
    // This will store our max each time through
    temp = 0;
    // Second loop starts
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    // only update if the temp is greater than max
    if (temp > max) {
      max = temp
    }
  }
  return max;
}

// console.log(maxSubarraySum([], 4));

// EXAMPLE #2 - time complexity O(n)
function maxSubarraySumRefactored (arr, num) {
  let max = 0;
  let temp = 0;
  // edge case
  if (arr.length < num) return null;
  // Loop through the first num #'s, add them together and set it to max
  for (let i = 0; i < num; i++) {
    max += arr[i]
  }

  temp = max;
  for (let i = num; i < arr.length; i++) {
    // take the next num numbers, subtract the first, and add the last
    temp = temp - arr[i - num] + arr[i];
    // updates max if temp is greater than max
    max = Math.max(max, temp);
  }
  return max;
}
