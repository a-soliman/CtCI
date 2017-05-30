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

function isPermutation(str1, str2) {
  //check the length
  if(str1.length !== str2.length) {
    return false;
  }
  
  else {
    var hash = {};
    
    for(var i = 0; i < str1.length; i++) {
      hash[str1[i]] = true;
    }
    
    for(i =0; i < str2.length; i++ ) {
      if(!hash[str2[i]]) {
        return false;
      }
    }
  }
  return true;
}

console.log('isPermutation : ' + isPermutation('abc', 'cba'));
console.log('isPermutation : ' + isPermutation('abc', 'acv'));

/*
======================================================================================
  8. write a method to replace all spaces in astring with '20%' you may assume that the stiring has sufficient space at the end to hold the additional characters, and that you are given the true length of the string. (Note: if implemnting in JAVA, Please use a character Array so that you can perform this operation in place)
*/

function replaceSpace(str) {
  for(var i = 0; i < str.length; i++) {
    if(str[i] === ' ') {
      str = str.replace(' ', '20%');  
    }
  }
  return str;
}
console.log('replaceSpace: ', replaceSpace('Mr John Smith.'));
 // ====================================================
        //other way

function replaceSpace2(str) {
  str = str.replace(/ /g, '20%');
  return str;
}

console.log('replaceSpace2 : ', replaceSpace2('Mr John Smith.'));

/*
======================================================================================
  9. Palidrom Permutation: Given a string, write a function to check if it is a permutation of a plindrome. 
  ex. input: Tact Coa
      outPut: True(permutations: "taco cat", "atco cta", etc/)
*/

function palindromePermutation(str) {
  var hash = {};
  var odds = 0;
  
  for(var i = 0; i < str.length; i++) {
    if(str[i] !== ' ') {
      if(!hash[str[i]]) {
        hash[str[i]] = 1;
      }
      else {
        hash[str[i]]++;
      }
    }
  }
  for(var key in hash) {
    if(hash[key] % 2 === 1) {
      odds++;
    }
  }
  
  if(odds === 1 || odds === 0) {
    return true;
  } else {
    return false;
  }
  
}
console.log('palindromePermutation: ' + palindromePermutation('tact coa'))



/*
======================================================================================
  10. One Away: There are three types of edits that can be performed on strings: A) insert a character, B) remove a character, c) replace a character.
  Given two strings, write a function to check if they are one edit (or zero edits) away.
  Examples : 
    pale, ple     -> true
    pales, pale   -> true
    pale, bale    -> true
    pale, bake    -> false
*/

function oneAway(str1, str2) {
  console.log('-------------------------------')
  return 'YOU HAVE TO DO THIS!'
}
console.log('oneAway : ', oneAway('pale', 'ple'))
console.log('-------------------------------')

/*
======================================================================================
  11. stringComperssion: Implement a mthod to perform basic string compression using counts of repeated characters, for example aabcccccaaa -> a2b1c5a3,
  if the compressed string would not become smaller than the original string, your method should return the original string, you may assume the string has only uppercase and lowercase letters(a-z)
*/