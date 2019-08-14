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

console.log(validAnagram2("anagram", "nagaram"));
