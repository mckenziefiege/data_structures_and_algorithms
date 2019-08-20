// Calculate the sum of all #sfrom 1, up to & including num
function addUpTo(n) {
  let total = 0;
  for (let i = 0; i <= n; i++) {
    total += i;
  }
  return total;
}
// console.log(addUpTo(100));



// Write a function which takes in a string & returns counts of each character in the string
// Only need to keep track of alphanumeric characters (ex: not spaces or punctuation), only lowercase
function charCount(str) {
  // make object to return at end
  let result = {}
  // loop over string, for each character...
  for (let i = 0; i < str.length; i++) {
    // make lowercase
    let char = str[i].toLowerCase();
    // if the char is a #/letter AND is a key in obj, add 1 to count
    // if char is something else, (punctuation, space, etc.), do nothing
    if (/[a-z0-9]/.test(char)){
      if (result[char] > 0) {
        result[char]++;
      // if char is a #/letter AND is not in object, add it to the obj and set value to 1
      } else {
        result[char] = 1;
      }
    }
  }
  //return object at end
  return result;
}
// console.log(charCount("Hi there"));


function charCountRefactored(str) {
  let obj = {};
  for (let char of str) {
    char = char.toLowerCase();
    if (isAlphaNumeric(char)) {
      obj[char] = ++obj[char] || 1;
    }
  }
  return obj;
}

// console.log(charCountRefactored("Helllo WORLDDD!!"));

function isAlphaNumeric(char) {
  let code = char.charCodeAt(0);
  if (!(code > 47 && code < 58) && // 0-9 numeric
      !(code > 64 && code < 91) && // A-Z
      !(code > 96 && code < 123)) { // a-z
    return false;
  } else {
    return true;
  }
}

// FREQUENCY COUNTER EXAMPLE #1
// Write a function called same that accepts 2 arrays. The function should return true if every value in the array
// has it's corresponding value squared in the second array. The frequency of values must be the same. Order doesn't matter.
// Ex: [1,2,3] and [4, 1, 9] -> true
// Ex: [1,2,3] and [1, 9] -> false
// Ex: [1,2,1] and [4, 4, 1] -> false  (must be same frequency)

// Naive solution: O(n^2)
function same (arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let i = 0; i < arr1.length; i++) {
    // loop over the first array and ask for the index of that square within the second array
    let correctIndex = arr2.indexOf(arr1[i] ** 2)
    if (correctIndex === -1) {
      // if it is -1 (meaning that the square it not in the second array, return false)
      return false
    }
    // If the index is within the second array, we are then going to remove it from the array and then contiue on with
    // the next index of the first array
    arr2.splice(correctIndex,1)
  }
  return true
}

// console.log(same([1,2,3], [4, 1, 2]))

// Refactored better solution - O(n)
// multiple loops is better than one nested loop
function sameRefactored(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false
  }
  let frequencyCounter1 = {}
  let frequencyCounter2 = {}
  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1
  }
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1
  }
  for (let key in frequencyCounter1) {
    // is the square of the number a key is the second array? If it's not, then return false
    if (!(key ** 2 in frequencyCounter2)) {
      return false
    }
    // Do the values of the keys match? if not, return false.
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false
    }
  }
  return true
}

// console.log(sameRefactored([1,2,3], [4, 1, 9, 2]))


// FREQUENCY COUNTER EXAMPLE #2 - O(n)
// Anagrams: Given 2 strings, write a function to determine if the second string is an anagram of the first.
// An anagram is a word, phrase or name formed by rearranging the letters of another, such as cinema, formed from iceman.
// Assume all inputs are single words. No spaces or punctuation, all lowercase, no numbers.
// Ex: validAnagram("", "") -> true
// Ex: validAnagram("aaz", "zza") -> false
// Ex: validAnagram("anagram", "nagaram") -> true

function validAnagram(str1, str2) {
  if (str1.length !== str2.length) {
    return false;
  }
  let frequency1 = {};
  let frequency2 = {};
  for (let letter of str1) {
    frequency1[letter] = (frequency1[letter] || 0) + 1
  }
  for (let letter of str2) {
    frequency2[letter] = (frequency2[letter] || 0) + 1
  }
  for (let key in frequency1) {
    if (!(key in frequency2)) {
      return false;
    }
    if (frequency1[key] !== frequency2[key]){
      return false;
    }
  }
  return true;
}

// console.log(validAnagram("anagram", "nagaram"));

// Second Solution
function validAnagram2(first, second) {
  if (first.length !== second.length) {
    return false;
  }
  const lookup = {};
  for (let letter of first) {
    lookup[letter] ? lookup[letter] += 1 : lookup[letter] = 1;
  }
  for (let i = 0; i < second.length; i++) {
    let letter = second[i];
    // If you can't find letter or if letter is 0 (since 0 is falsey), then return false
    if(!lookup[letter]) {
      return false;
    } else {
      lookup[letter] -= 1;
    }
  }
  return true;
}

// console.log(validAnagram2("anagram", "nagaram"));


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



// Frequency Counter - O(n)
// write a function called sameFrequency. Given 2 positive integers, find out if the two #'s have the same freqeuncy of digits.
// Ex: sameFrequency(182, 281) -> true
// Ex: sameFrequency(34, 14) -> false
// Ex: sameFrequency(3589578, 5879385) -> true
// Ex: sameFrequency(22, 222) -> false


// Restate the problem: Write a function that accepts 2 positive numbers and returns true if the 2 nums have the same frequency of digits and false if they don't.
// What are the inputs?: Accepts 2 numbers. positive integers.
// What are the outputs?: true or false.
// Break it down:
// 1) frequency counter pattern -> create an object for each with the key as the num and the value as the frequency
// turn each num into a string
function sameFrequency(num1, num2) {
  if (num1.toString().length !== num2.toString().length) {
    return false;
  }
  let num1Freq = {};
  let num2Freq = {};
  for (let char of num1.toString()) {
    num1Freq[char] ? num1Freq[char] += 1 : num1Freq[char] = 1;
  }
  for (let char of num2.toString()) {
    num2Freq[char] ? num2Freq[char] += 1 : num2Freq[char] = 1;
  }
  for (let key in num1Freq) {
    if (!num2Freq[key]) {
      return false;
    }
    if (num1Freq[key] !== num2Freq[key]) {
      return false;
    }
  }
  return true;
}

// console.log(sameFrequency(3589578, 5879385));


// areThereDuplicates - write a function called areThereDuplicates which accepts a variable number of arguments, and checks
// whether there are any duplicates among the arguments passed. You can solve this using the frequency countern pattern or the multiple pointers pattern.
// Ex: areThereDuplicates(1, 2, 3) -> false
// Ex: areThereDuplicates(1, 2, 2) -> true
// Ex: areThereDuplicates('a', 'b', 'c', 'a') -> true

function areThereDuplicates(...args) {
  let frequencyObj = {};
  if (args.length === 0 || args.length === 1) {
    return false;
  }
  for (let val of args) {
    frequencyObj[val] ? frequencyObj[val] += 1 : frequencyObj[val] = 1;
  }
  for (let key in frequencyObj) {
    if (frequencyObj[key] > 1) {
      return true;
    }
  }
  return false;
}

// console.log(areThereDuplicates(1, 2, 3, 4));

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
