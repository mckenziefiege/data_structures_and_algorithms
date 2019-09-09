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


// Sliding Window - minSubArrayLen - write a function that accepts 2 parameters- and array of positive integers, and a positive integers
// the function should return a minimal length of a contiguous subarray of which the sum is greater than or equal to the integer passed to the function
// if there isn't one, return 0.
// Time complexity O(n)
// Ex: minSubArrayLen([2, 3, 1, 2, 4, 3], 7) -> 2 (b/c [4, 3] is the smallest subarray)
// Ex: minSubArrayLen([2, 1, 6, 5, 4], 9) -> 2 (b/c [5, 4])
// Ex: minSubArrayLen([3, 1, 7, 11, 2, 9, 8, 62, 33], 52) -> 1 (b/c [62] is greater than 52)
// Ex: minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 55) -> 5
// Ex: minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95) -> 0

function minSubArrayLen(arr, sum) {
  let total = 0;
  let start = 0;
  let end = 0;
  let min = Infinity;

  while (start < arr.length) {
    // if current window doesn't add up to the given sum then
		// move the window to right
    if(total < sum && end < arr.length){
      total += arr[end];
			end++;
    }
    // if current window adds up to at least the sum given then
		// we can shrink the window
    else if(total >= sum){
      min = Math.min(min, end - start);
			total -= arr[start];
			start++;
    }
    // current total less than required total but we reach the end, need this or else we'll be in an infinite loop
    else {
      break;
    }
  }
  return min === Infinity ? 0 : min;
}

// console.log(minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 55));



// findLongestSubstring - write a function which accepts a string and returns the length of the longest substring with all distinct characters
// time complexity - O(n)
// Ex: findLongestSubstring('') -> 0
// Ex: findLongestSubstring('rithmschool') -> 7
// Ex: findLongestSubstring('thisisawesome') -> 6
// Ex: findLongestSubstring('thecatinthehat') -> 7
// Ex: findLongestSubstring('bbbbb') -> 1
// Ex: findLongestSubstring('thisishowwedoit') -> 6

function findLongestSubstring(str) {
  let longest = 0;
  let seen = {};
  let start = 0;

  if (str.length === 0) return 0;

  // loop over string a great variable for current letter
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    // check if the letter is already in the object
    if (seen[char]) {
      start = Math.max(start, seen[char]);
    }

    longest = Math.max(longest, i - start + 1);

    seen[char] = i + 1;
  }

  return longest;
}

// console.log(findLongestSubstring('thecatinthehat'))
