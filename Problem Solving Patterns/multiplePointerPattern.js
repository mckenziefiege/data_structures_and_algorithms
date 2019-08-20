// MULTIPLE POINTERS PATTERN
// EXAMPLE #1 - Write a function called sumZero which accepts a SORTED array of integers. The function should
// find the first pair where the sum is 0. Return an array that includes both values that sum to 0 or undefined if a pair does not exist.
// Ex: sumZero([-3, -2, -1, 0, 1, 2, 3]) -> [-3, 3]
// Ex: sumZero([-2, 0, 1, 3]) -> undefined
// Ex: sumZero([1, 2, 3]) -> undefined

// Naive Soluition (not using multiple pointers) - Time complexity - O(n^2), space complexity - O(1)
function sumZero(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++ ) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]]
      }
    }
  }
}

// console.log(sumZero([-2, 0, 1, 3]))

// Refactored Solution - Time complexity - O(n), space complexity - O(1)
function sumZeroRefactored (arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      return [arr[left], arr[right]];
    } else {
      if (sum > 0) {
        right--;
      } else {
        left++;
      }
    }
  }
}

// console.log(sumZeroRefactored([-10, -9, -2, -1, 0, 1, 2, 3]))

// EXAMPLE #2 - CountUniqueValues - create a function called countUniqueValues, which accepts a SORTED array, and
// counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.
// Ex: countUniqueValues([1, 1, 1, 1, 1, 2]) -> 2
// Ex: countUniqueValues([]) -> 0
// Ex: countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]) -> 7
// Ex: countUniqueValues([-2, -1, -1, 0, 1]) -> 4

function countUniqueValues (arr) {
  if (arr.length === 0) {
    return 0;
  }
  let i = 0;
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}

// console.log(countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]));


// areThereDuplicates Mutiple pointers example
function areThereDuplicatesPointer(...args) {
  // Two pointers
 args.sort((a,b) => a > b);
 let start = 0;
 let next = 1;
 while(next < args.length){
   if(args[start] === args[next]){
       return true
   }
   start++
   next++
 }
 return false
}


// averagePair - Mutiple pointers example - write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair
// of value in there array where the average of the pair equals the target avergage. There may be more than one pair that matches the target.
// time - O(n), space - O(1)
// Ex: averagePair([1, 2, 3], 2.5) -> true
// Ex: averagePair([1, 3, 3, 5, 6, 7, 10, 12, 19], 8) -> true
// Ex: averagePair([-1, 0, 3, 4, 5, 6], 4.1) -> false
// Ex: averagePair([], 4) -> false

// Restate the problem: write a function that accepts a sorted array of integers and a target average. Return false, if there is a pair of 2 integers that averages to the target and return false if there isn't.
// Inputs - An array (of sorted integers), and a target average
// outputs - true or false
function averagePair(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right]
    if (sum / 2 === target) {
      return true;
    }
    else {
      if (sum / 2 > target) {
        right--;
      } else {
        left++;
      }
    }
  }
  return false;
}

// console.log(averagePair([1, 3, 3, 5, 5, 7, 10, 12, 25], 8));
