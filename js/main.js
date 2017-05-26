 // 1. isPrime
function isPrime(n) {
  for(var x =2; x*x <= n; x++) {
    if(n % x === 0) {
      return false;
    }
  }
  return true;
}

console.log('isPrime : ' + isPrime(11));

//=============================================
// 2. nFactorial

function factorial(n) {
  if(n < 0) { return -1; }
  if(n === 0) { return 1; }
  else {
    return n * factorial(n-1);
  }
}
console.log('factorial : ' + factorial(5))

//=============================================


// 3. string permutation


// 3. string permutation
function stringPermutation(str) {
  var results = [];
  
  function permutations(subStr, prefix) {
    //base case 
    if(subStr <= 0) {
      results.push(prefix);
    }
    
    else {
      for(var i = 0; i < subStr.length; i++) {
        var rem = subStr.substring(0, i) + subStr.substring(i + 1);
        permutations(rem, prefix + subStr.charAt(i));
      }
    }
  }
  permutations(str, '');
  return results;
}

console.log('stringPermutation : ' + stringPermutation('abc'));

/*
======================================================================================
  4. Given a smaller str A and a bigger str B. design an algorithm to find all the permutations in the shorter str whith in the longer one, 
  Print the location of each permutation
*/

function matchPremutations(strA, strB) {
  var len = strA.length;
  var outPut = [];
  //find premutations in A
  var results = {};

  function findPremutations(str, prefix) {
    //base case
    if(str.length <= 0) {
      results[prefix] = true;
    }
    
    else {
      for(var i = 0; i < str.length; i++) {
        var rem = str.substring(0, i) + str.substring(i + 1);
        findPremutations(rem, prefix + str.charAt(i));
      }
    }
  }
  findPremutations(strA,'');
  
  //loop through B and match
  for(i = 0; i < strB.length -3; i++) {
    var tempStr = strB.substring(i, i + len);
    if(results[tempStr]) {
      outPut.push(i);
    }
  }
  return outPut;
}

console.log('matchPremutations : ' + matchPremutations('abbc','cbabadcbbabbcbabaabccbabc'));

/*
======================================================================================
 5. Given two sorted arrys, find the number of elements in common. The arrys are of the same length.
  
  - time: O(n), space: O(1) => there for no hash table allowed 
*/

function findMatch(a, b) {
  var start = 0;
  var currentIndex, currentElement, result= '';
  
  function search(searchElement, minIndex) {
    var maxIndex = a.length-1;
      
    while(minIndex <= maxIndex) {
      currentIndex = Math.floor((minIndex + maxIndex) /2);
      currentElement = a[currentIndex];
      
      if(currentElement < searchElement) {
        minIndex = currentIndex +1;
      }
      
      else if(currentElement > searchElement) {
        maxIndex = currentIndex -1;
      }
      else {
        result += (currentElement + ', ');
        start = currentIndex;
        return;
      }
    }
    return -1; 
    
  }
  
  for(var i = 0; i < b.length; i++) {
    search(b[i], start);
  }
  
  return result;
    
}

console.log('findMatch: ', findMatch([13,27,35,40,49,55,59],[17,35,39,40,55,58,60]));

/*
======================================================================================
  6. Implement an algorithm to determine if a string has all unique characters. What is you can not use additional data-structure?
*/

function isUnique(str) {
  var hash = {};
  
  for(var i = 0; i < str.length; i++) {
    if(hash[str[i]]) {
      return false;
    } else {
      hash[str[i]] = true;
    }
  }
  return true;
}

console.log('isUnique: ' , isUnique('ahmed'))

/*
======================================================================================
  7. Given two strings, write a method to decide if one is permutation of the other one
*/