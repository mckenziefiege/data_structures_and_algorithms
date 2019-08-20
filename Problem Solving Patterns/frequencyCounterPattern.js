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
