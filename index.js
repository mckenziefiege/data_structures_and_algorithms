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

console.log(charCountRefactored("Helllo WORLDDD!!"));

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
