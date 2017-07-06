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
function stringComperssion(str) {
  var commpressed = '';
  var count = 1;
  
  for(var i = 0; i < str.length; i++) {
    if(str[i] !== str[i-1]) {
      count = 1;
      commpressed += str[i];
      commpressed += count;
    }
    
    else {
      count++;
      commpressed = commpressed.slice(0, -1);
      commpressed += count;
    }
  }
  return commpressed.length < str.length ? commpressed : str;
}

console.log('stringComperssion : ' + stringComperssion('aabcccccaaa'));
/*
======================================================================================
  12. rotateMatrix: Given an image represented by N * N matrix, where each pixel in the image is 4 bytes, write a function to rotate the image by 90 degrees. 
  Can you do that in place?
*/

var matr = [[1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10,11,12],
            [13,14,15,16],]

var matr1 = [[1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10,11,12],
            [13,14,15,16],]


function rotate90(image) {
  var y = image.length-1;
  var z = image.length-1;
  var limit = image.length-1
  
  for(var i = 0; i <image.length; i++) {
    for(var j = 0; j < limit; j++) {
      if(j >= i) {
       
      [image[i][j], image[j][y]] = [image[j][y], image[i][j]];
      [image[i][j], image[y][z]] = [image[y][z], image[i][j]];
      [image[i][j], image[z][i]] = [image[z][i], image[i][j]];  
      
      z--; 
      }
    }
    y--;
    z = y
    limit--;
  }
  return image
  
}

console.log('rotate  90%:' + rotate90(matr))

function rotate180(image) {
 var y = image.length-1;
 var z = image.length-1;
 var type;
 
 //find the type odd or even
 if(image.length %2 === 0) {
   type = 'even';
 } else {
   type = 'odd';
 }
 
 
 for(var i = 0; i < image.length; i++) {
   for(var j = 0; j < image.length; j++) {
     //swap
     [image[i][j], image[y][z]] = [image[y][z], image[i][j]];
     z--;
     
     if(type === 'odd') {
      if(j === (Math.floor(image.length /2)) && i === (Math.floor(image.length /2))) {
        return;
      }  
     } else {
       if(j === image.length-1 && i === Math.floor((image.length-1)/2)) {
          return image;
       }
     }
   }
   y--;
   z = image.length-1;
 }
}

console.log('rotate 180% : '+ rotate180(matr1))

/*
======================================================================================
  13. ZeroMatrix: write an algorith such that if an element in an M*N matrix, is 0, its entire row and culumn are set to 0.
*/

var zeroM = [[1,2,3,4], [5,0,7,8], [9,10,11,12]];

function ZeroMatrix(matrix) {
  zeros = [];
  
  //find zeros
  for(var i = 0; i < matrix.length; i++) {
    for(var j = 0; j < matrix[0].length;j++) {
      if(matrix[i][j] === 0) {
        zeros.push([i,j]);
      }
    }
  }
  
  // convert in accoring to x and y.
  for(z = 0; z < zeros.length; z++) {
    var x = zeros[z][0];
    var y = zeros[z][0];
    
    for(i = 0; i < matrix.length; i++) {
      for(j = 0; j < matrix[0].length; j++) {
        if(i === x || i === y || j ===x || j === y) {
          matrix[i][j] = 0;
        }
      }
    }
  }
  return matrix;
}

console.log('ZeroMatrix : ' + ZeroMatrix(zeroM))
/*
======================================================================================
  14. stringRotation: Assume you have a method "isSubstring" which checks if one word is substring of another, Given two strings, s1, s2, write code to check if s2 is a rotation of s1, using only one call to "isSubstring".
  ex. "waterbottle" is a rotation of "erbottlewat".
*/

/*
======================================================================================
======================================================================================
======================================================================================
========================= Creating a Linked List =====================================
*/

function LinkedList() {
  this.head = null;
  this.tail = null;
}
function Node(value, next, prev) {
  this.value = value;
  this.next = null;
  this.prev = null;
}
LinkedList.prototype.addToHead = function(value) {
  var newNode = new Node(value);
  
  if(!this.head) {
    this.tail = newNode;
  }
  else {
    newNode.next = this.head;
    this.head.prev = newNode
  }
  this.head = newNode;
}

LinkedList.prototype.addToTail = function(value) {
  var newNode = new Node(value);
  
  if(!this.tail) {
    this.head = newNode;
  }
  else {
    newNode.prev = this.tail;
    this.tail.next = newNode;
  }
  this.tail = newNode;
}

LinkedList.prototype.removeHead = function() {
  if(!this.head) {
    return null
  }
  else if(this.head === this.tail) {
    this.head = null;
    this.tail = null;
  }
  else {
    this.head = this.head.next;
    this.head.prev = null;
  }
}
LinkedList.prototype.removeTail = function() {
  if(!this.tail) {
    return null;
  }
  else if(this.tail === this.head) {
    this.head = null;
    this.tail = null;
  }
  else {
    this.tail = this.tail.prev;
    this.tail.next = null;
  }
}

LinkedList.prototype.size = function() {
  if(!this.head) {
    return 0;
  }
  else {
    var size= 0;
    var currentNode = this.head;
    while(currentNode) {
      size++;
      currentNode = currentNode.next;
    }
  }
  return size;
}
LinkedList.prototype.retriveAll = function() {
  var values = [];
  var currentNode = this.head;
  while(currentNode) {
    values.push(currentNode.value);
    
    currentNode = currentNode.next;
  }
  return values;
}

var ll = new LinkedList();

ll.addToHead(2);
ll.addToHead(4);
ll.addToHead(2);
ll.addToHead(4);
ll.addToHead(5);
ll.addToTail(3);
console.log('linkedlist size() : ' + ll.size())

/*
======================================================================================
  15. RemoveDubs:  write a code to remove dublicats from an unsorted linkedlist.
  
  Follow up : How would you do it without using temporary buffer.
*/

function removeDubs(linkedlist) {
  var currentNode = linkedlist.head;
  var hash = {};
  
  while(currentNode) {
    if(!hash[currentNode.value]) {
      hash[currentNode.value] = true;
    } 
    
    else {
      currentNode.prev.next = currentNode.next;
      currentNode.next.prev = currentNode.prev;
    }
    currentNode = currentNode.next;
  }
  return linkedlist;
}
console.log('removeDubs : ' + removeDubs(ll).size())


//==========================================================
//======================= Without buffer ===================

function removeDubsNoBuffer(linkedlist) {
  var currentNode = linkedlist.head;
  
    var findDub = function(ll, node) {
      var otherNode = node.next;
      
      while(otherNode) {
        if (node.value === otherNode.value) {
          otherNode.prev.next = otherNode.next;
          otherNode.next.prev = otherNode.prev;
        }
        otherNode = otherNode.next
      }
      return linkedlist;
    }
    
  while(currentNode) {
    findDub(linkedlist, currentNode);
    currentNode = currentNode.next;
  }
  return linkedlist;
}

console.log('removeDubsNoBuffer : ' + removeDubsNoBuffer(ll).size())


/*
======================================================================================
  16. KthToLast: Implement an algorithm to find the KthToLast element of a singly linked list.
*/

var LL2 = new LinkedList()
LL2.addToHead(3);
LL2.addToHead(2);
LL2.addToHead(4);
LL2.addToHead(2);
LL2.addToHead(4);
LL2.addToHead(5);

function KthToLast(linkedlist, target) {
  var result = [];
  var currentIndex = 0;
  var currentNode = linkedlist.head;
  
  while(currentNode) {
    currentIndex++;
    if(currentIndex === target) {
      while(currentNode) {
        result.push(currentNode);
        currentNode = currentNode.next;
      }
    }
    if(result.length) {
      return result;
    }
    currentNode = currentNode.next
  }
}

console.log('KthToLast : ' + KthToLast(LL2, 3))

/*
======================================================================================
  17. deleteMiddleNode: Implement an algorithm to delete a node in the middle of  a linkedlist(ie, any node but the first and the last)
  of a singly linked list, given only access to that node
*/
function singlyLinkedList() {
  this.head = null;
  this.tail = null;
}
function singlyNode(value) {
  this.value = value;
  this.next = null;
}
singlyLinkedList.prototype.addToHead = function(value) {
  if(typeof value !== Object) {
    var newNode = new singlyNode(value);
  } else {
    var newNode = value;
  }
    if(!this.head) {
      this.tail = newNode;
    } else {
      newNode.next = this.head;
    }
    this.head = newNode
}
singlyLinkedList.prototype.size = function() {
  if(!this.head) { return null;}
  var count = 0, currentNode = this.head;
  
  while(currentNode) {
    count++;
    currentNode = currentNode.next;
  }
  return count;
}

var sLL = new singlyLinkedList()
sLL.addToHead(3)
sLL.addToHead(2)
sLL.addToHead(4)
sLL.addToHead(2)
sLL.addToHead(4)
sLL.addToHead(5)
console.log(sLL.size())

function deleteMiddleNode(linkedlist, node) {
  if(!node.next) {
    node = null;
  }
  else {
    node.value = node.next.value;
    node.next = node.next.next;
  }
  console.log(linkedlist)
  return linkedlist;
}

console.log('deleteMiddleNode : ' + deleteMiddleNode(sLL, sLL.head.next.next).size())


/*
======================================================================================
  19. sumList: you have two numbers represented by a linked list, where each node contains a single digit. the digits are stored in reverse order, such that the 1's digit is the head of the list, write a function that adds the two numbers and returns the sum as a linked list
*/

var linked1 = new LinkedList();
linked1.addToHead(6);
linked1.addToHead(1);
linked1.addToHead(7);

var linked2 = new LinkedList();
linked2.addToHead(2);
linked2.addToHead(9);
linked2.addToHead(5);

function sumListBW(list1, list2) {
  var remaining = 0, total = 0, node1 = list1.head, node2 = list2.head;
  var answer = new LinkedList();
  while(node1 || node2) {
    if(!node1) {
      total = node2.value + remaining;
    }
    else if(!node2) {
      total = node1.value + remaining;
    }
    else {
      total = node1.value + node2.value + remaining;
    }
    
    remaining = 0;
    
    if(total <= 9 ) {
      answer.addToTail(total)
    } else {
      remaining = 1;
      answer.addToTail(total % 10);
    }
    node1 = node1.next;
    node2 = node2.next;
  }
  return answer;
}
console.log('sumListBW: ', sumListBW(linked1, linked2))

//================================================
console.log('-----------------------------------')
//=================== Follow Up ==================

function sumListFW(list1, list2) {
  var arr1 = [], arr2 = [], remaining =0, total =0;
  var maxLength;
  var node1 = list1.head, node2 = list2.head;
  var result = new LinkedList();
  
  //while loop to fill the arrs
  while(node1 || node2) {
    if(node1) {
      arr1.push(node1.value);
    }
    if(node2) {
      arr2.push(node2.value);
    }
    node1 = node1.next;
    node2 = node2.next;
  }
  
  maxLength = Math.max(arr1.length, arr2.length);
  //macking the calculation
  for(var i = 0; i < maxLength; i++) {
    if(arr1[i] && arr2[i]) {
      total = arr1[i] + arr2[i] + remaining;
    }
    else if(!arr1[i] && arr2[i]) {
      total = arr2[i] + remaining;
    }
    else if(!arr2[i] && arr1[i]){
      total = arr2[i] + remaining;
    } else {
      total = remaining
    }
    remaining = 0;
    
    if(total <= 9) {
      result.addToHead(total)
    } else {
      remaining = 1;
      result.addToHead(total % 10);
    }
    
  }
  return result;
}

console.log('sumListFW: ', sumListFW(linked1, linked2))

console.log('-----------------------------------')

/*
======================================================================================
  20. palindromeList: Implement a function to check if a liked list is a plindrome;

  */
var pList = new LinkedList();
pList.addToHead(5);
pList.addToHead(4);
pList.addToHead(1);
pList.addToHead(4);
pList.addToHead(5);

function palindromeList(list) {
  //1 . retriveAll values;
  var values = [];
  var currentNode = list.head;
  while(currentNode) {
    values.push(currentNode.value);
    currentNode = currentNode.next;
  }
  //2. check if palindrom
  return values.join('') === values.reverse().join('');
}

console.log('palindromeList: ' + palindromeList(pList));

console.log('-----------------------------------')

/*
======================================================================================
  21. Intersection: Given two (singly) linkedlists, determine if the two lists intersect. Return the intersection node, 
  Note -> the intersection is defined bassed on referance, not value. that is if the kth node of the first list is the exact note by referance as the jth node of the second linkedlist, then thet are intersecting.
*/

var obj = {}
obj.value = 5;

var listA = new singlyLinkedList();

listA.addToHead(obj)
listA.addToHead(3);
listA.addToHead(4);
listA.addToHead(6)

var listB = new singlyLinkedList();

listB.addToHead(obj);
listB.addToHead(4);
listB.addToHead(2);
listB.addToHead(6);

function intersectingList(l1, l2) {
  var currentNode = l1.head;
  var intersection;
  
  //  helper function
  function find(node, list) {
    var otherNode = list.head
    while(otherNode) {
      if(node.value === otherNode.value) {
        if(Object.keys(node).length === Object.keys(otherNode).length) {
          for(var i in node) {
            if(node[i] !== otherNode[i]) {
              return;
            }
          }
          intersection = node;
        }
      }
      otherNode = otherNode.next;
    }
  }
  
  while(currentNode) {
    find(currentNode, listB);
    currentNode = currentNode.next;
  }
  return intersection;
}
console.log('intersectingList : ' + intersectingList(listA, listB));
console.log('-----------------------------------')

/*
======================================================================================
  22. loopDetection: Given a circulat linked list, Implement an algorithm that returns the node at the begining of the loop
*/

var circulatList = new singlyLinkedList()

circulatList.addToHead('l')
circulatList.addToHead('k')
circulatList.addToHead('j')
circulatList.addToHead('i')
circulatList.addToHead('h')
circulatList.addToHead('g')
circulatList.addToHead('f')
circulatList.addToHead('e')
circulatList.addToHead('d')
circulatList.addToHead('c')
circulatList.addToHead('b')
circulatList.addToHead('a')
circulatList.tail.next = circulatList.head.next.next.next

function loopDetection(list) {
  var currentNode = list.head;
  var s = currentNode, f = currentNode;
  while(currentNode) {
    
    if(s.value == f.value) {
      return true;
    }
    s = s.next;
    f = f.next.next;
    currentNode = currentNode.next
  }
  return false;
}

console.log('loopDetection : ' + loopDetection(circulatList));
console.log('-----------------------------------')
//======================================================================================
//======================================================================================
          // building a stack
function Stack() {
  this.storage = [];
  this.min = [];
}
//pop push, peek isEmpty
Stack.prototype.pop = function() {
  var val = this.storage.pop();
  if(val = this.min[this.min-1]) {
    this.min.pop();
  }
  return val;
}
Stack.prototype.push = function(value) {
  this.storage.push(value);
  if(value <= this.min[this.min.length-1]) {
    this.min.push(value);
  }
}
Stack.prototype.peek = function() {
  var val = this.storage[this.storage.length-1];
  return val;
}
Stack.prototype.isEmpty = function() {
  return this.storage.length == 0 ? true : false;
}

var stack = new Stack();
stack.push(4)
stack.push(3)
stack.push(2)
stack.push(1)
console.log(stack)

/*
======================================================================================

  23. How would you design a stack which in addition to push and pop, has a function min. which returns the minimum element? push, pop and min should all operate in O(1)time
*/

Stack.prototype.min = function() {
  return this.min[this.min.length-1];
}



console.log('-----------------------------------')
/*
======================================================================================

  24. stckOfPlates: imagine a (literal) stack of plates. if the stak gets too high, it mighty topple therefore, in real life stack, we would likely start a  new stack when the previous one exceeds some threhold. Implement a data-structure SetOfStacks that mimics this SetOfStacks should be SetOfStacks.push() and SetOfStacks.pop(), should behave identically to a single stack.
  That is pop should return the same value as it would if there were just a single stack;
*/

function SetOfStacks(n){
  this.max = n;
  this.count = 0;
  this.storage = [[]]
}
SetOfStacks.prototype.push = function(value) {
  if(this.storage[this.count].length === this.max) {
    this.count++;
    this.storage[this.count] = [];
  }
  this.storage[this.count].push(value);
}
SetOfStacks.prototype.pop = function() {
  var val = this.storage[this.count][this.storage[this.count].length-1]
  this.storage[this.count].pop();
  return val;
}
var setof = new SetOfStacks(3);
setof.push(1);
setof.push(2);
setof.push(3);
setof.push(4);
setof.push(5);
setof.push(6);
setof.push(7);
setof.push(8);
setof.push(9);
//console.log(setof.pop())
console.log(setof)
console.log('---------------')
//======================================================================================

console.log('Follow Up')
console.log('---------------')
//    Follow up
// Implement a function popAt(index) which performs a pop operation on a spacific sub- stack

SetOfStacks.prototype.popAt = function(index) {
  var count = 0;
  
  for(var i = 0; i < this.storage.length; i++) {
    for(j = 0; j < this.max; j++) {
      count++
      if(count === index) {
        var val = this.storage[i][j];
        this.storage[i].splice(j, 1);
      }
    }
  }
  for(i = 0; i < this.storage.length; i++) {
    if(this.storage[i].length < this.max && this.storage[i+1]) {
      this.storage[i].push(this.storage[i+1][0]);
      this.storage[i+1].splice(0,1);
    }
  }
  return val == undefined ? null: val;
}

console.log(setof.popAt(9))
console.log(setof)
/*
======================================================================================

======================================================================================
  26. Animal shulter: an animal shulter which holds only dogs and cats operats on a strictly "first in first out " basic, people must adopt either the oldest "based on arrival time =", of all animals ata the shelter or they can selct whether they would prefer a dog or a cat, (and will receive the oldest animal of that type) they cannot select a specific animal. create the data-structure to maintain this system and Implement operations such as enqueue, dequeue.
*/

function animal(type, name, age) {
  this.type = type;
  this.name = name;
  this.age = age;
}

function shulterQueue() {
  this.queue = [];
}
shulterQueue.prototype.receiveAnAnimal = function(animal) {
  this.queue.push(animal);
};

shulterQueue.prototype.adopt = function(type) {
  var animal;
  if(!type) {
    animal = this.queue.shift();
    return animal;
  } else {
    for(var i = 0; i < this.queue.length; i++) {
      if(this.queue[i].type == type) {
        animal = this.queue.splice(i, 1);
      }
    }
  }
  return animal;
};

var shulter = new shulterQueue()
var roy = new animal('dog', 'Roy', '3');
var shiba = new animal ('dog', 'shiba', '9')
var poo = new animal ('cat', 'Poo', '4')
var susu = new animal ('cat', 'Susu', '9');

shulter.receiveAnAnimal(roy);
shulter.receiveAnAnimal(poo);
shulter.receiveAnAnimal(susu);
shulter.receiveAnAnimal(shiba);

console.log(shulter.adopt())
console.log(shulter.adopt('dog'))
console.log(shulter)

console.log('-----------------------------------')


/*
======================================================================================
================= BUILDING GRAPH CONSTRUCTOR ====================

*/
console.log('------------- GRAPH --------------')
function Graph() {
  this.vertices = {};
  this.totalVertices = 0;
  this.totalEdges = 0;
}
function Vertax(id) {
  id = {value: id, edges: {}};
  return id;
}
// add Vertax
Graph.prototype.addVertax = function(id) {
  if(!this.vertices[id]) {
    this.vertices[id] = new Vertax(id);
    this.totalVertices++;
  } else {
    return;
  }
};

//get Vertax
Graph.prototype.getVertax = function(id) {
  if(!this.vertices[id]) {
    return null;
  }
  else {
    return this.vertices[id];
  }
};


// addEdge
Graph.prototype.addEdge = function(id1, id2) {
  if(!this.vertices[id1] || !this.vertices[id2]) {
    return null;
  }
  else {
    this.vertices[id1].edges[id2] = true;
    this.vertices[id2].edges[id1] = true;
    
    this.totalEdges++;
  }
};

// removeEdge
Graph.prototype.removeEdge = function(id1, id2) {
  if(!this.vertices[id1] || !this.vertices[id2]) {
    return null;
  }
  else if(this.vertices[id1].edges[id2]) {
    delete this.vertices[id1].edges[id2];
    delete this.vertices[id2].edges[id1];
    
    this.totalEdges--;
  }
  else {
    return null;
  }

  //removeVertex
Graph.prototype.removeVertex = function(id) {
  if(this.vertices[id]) {
    for(var neighbor in this.vertices[id].edges) {
      delete this.vertices[neighbor].edges[id];
      this.totalEdges--;
    }
    
    delete this.vertices[id];
    this.totalVertices--;
  }
  
  else {
    return null;
  }
};

// findNeighbors
Graph.prototype.findNeighbors = function(id) {
  if(this.vertices[id]) {
    return this.vertices[id].edges;
  }
  else {
    return null;
  }
};

//forEachVertex
Graph.prototype.forEachVertex = function(opertation) {
  for(var i in this.vertices) {
    if(this.vertices[i]) {
      opertation(this.vertices[i]);
    }
  }
};


//forEachEdge
Graph.prototype.forEachEdge = function(opertation) {
  for(var vertax in this.vertices) {
    //console.log(this.vertices[vertax])
    for(var neighbor in this.vertices[vertax].edges) {
      var connection = [this.vertices[vertax].value , neighbor]
      opertation(connection)
    }
  }
};

var g = new Graph();
g.addVertax(1)
g.addVertax(2)
g.addVertax(3)
g.addVertax(4)
g.addVertax(5)
g.addEdge(1,5)

console.log('-----------------------------------')

/*
======================================================================================
  28. RouteBetweenNodes: Given a directed graph, design an algorithm to findout whether there is a route between two nodes; 
*/

function RouteBetweenNodes (graph, node1, node2) {
  if(graph.vertices[node1].edges[node2] || graph.vertices[node2].edges[[node1]]) {
    return true;
  } else {
    return false;
  }
}


console.log('RouteBetweenNodes : ' + RouteBetweenNodes(g, 1, 5))
console.log('-----------------------------------')

/*
======================================================================================
  30. minimalTree: given a sorted(icreasing order) array with unique intiger elements, write an algorithm to create a binary tree with minimal height
*/

var arrInt = []

for(var i = 1; i <= 10; i++) {
  arrInt.push(i);
}

function BST(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
function minTree(arr) {
  
  var mid = Math.floor(arr.length/2)
  var root = new BST(arr[mid])
  var left = arr.slice(0, mid);
  var right = arr.slice(mid+1, arr.length)
  
  function build(subArr, node) {
    if(subArr.length < 1) {
      return
    }
    mid = Math.floor(subArr.length/2)
    var newNode = new BST (subArr[mid])
    var subLeft = subArr.slice(0, mid);
    var subRight = subArr.slice(mid+1, subArr.length)
    
    
    if(newNode.value < node.value) {
      node.left = newNode;
    }
    
    else if(newNode.value > node.value) {
      node.right = newNode;
    }
    
    build(subLeft, newNode)
    build(subRight, newNode)
  }
  
  build(left, root)
  build(right, root)
  
  //console.log(root)
  return root;
}
console.log('minTree ' + minTree(arrInt))

console.log('-----------------------------------')

/*
======================================================================================
  31. listOfDepths: Given a binary tree, design an algorithm which creats a linked list of all the modes at each depth (rg. if you have a tree with depth D, you'll have a D linked lists)
*/
var bTree = minTree(arrInt)


function listOfDepths(tree) {
  var depth = 1
  var max = 1;
  var result = [];
  
  function find(node, depth) {
    max = Math.max(max, depth);
    if(!result[depth-1]) {
      result[depth-1] = [node.value];
    }else {
      result[depth-1].push(node.value)
    }
    if(node.left) {
      find(node.left, depth+1);
    }
    if(node.right) {
      find(node.right, depth+1);
    }
  }
  find(tree, depth)
  console.log(result);
  return result
}
console.log('listOfDepths: ' + listOfDepths(bTree))



console.log('-----------------------------------')

/*
======================================================================================
  32. checkBalanced: Implement a function to check if a binary tree is balanced. For the purpose of the question, a balanced tree is defined to be a tree such that the heights of the two subtrees of any node never differ by more than one.
*/

var unbalncedT = new BST(10)
unbalncedT.left = new BST(9)
unbalncedT.right = new BST(11)
unbalncedT.left.left = new BST(8)
unbalncedT.left.left.left = new BST(7)

function isBalancedTree(tree) {
  var leftDepth = 1;
  var max = 1;
  var rightDepth = 1;
  
  function isBalanced(node, depth) {
    if(node.left) {
      isBalanced(node.left, depth+1);
    }
    if(node.right) {
      isBalanced(node.left, depth+1);
    }
    max = Math.max(max, depth)
  }
 isBalanced(tree.left, leftDepth);
 leftDepth = max;
 max = 1;
 isBalanced(tree.right, rightDepth)
 rightDepth = max;
 
 if(leftDepth - rightDepth === 0 || leftDepth - rightDepth === 1 || leftDepth - rightDepth === -1) {
   return true;
 } else {
   return false;
 }
 
}

console.log('isBalancedTree : ' + isBalancedTree(unbalncedT));


console.log('-----------------------------------')

/*
======================================================================================
  33. validateBST: implement a function to check if a binary tree is a binary search tree
*/


function isValideTree(tree) {
  //chack left
  function checkLeft(node, root) {
    if(!node) {
      return;
    }
    
    if(node.value > root.value || (node.left && node.left.value > node.value) || (node.right && node.right.value < node.value)) {
      return false;
    } else {
      checkLeft(node.left, root);
      checkLeft(node.right, root)
    }
    
    return true
  }
  //check right;
  function checkRight(node, root) {
    if(!node) {
      return;
    }
    
    if(node.value < root.value || (node.left && node.left.value > node.value) || (node.right && node.right.value < node.value)) {
      return false;
    }
    
    return true;
  }
  if(checkLeft(tree.left, tree) && checkRight(tree.right, tree)) {
    return true;
  } else {
    return false;
  }
  
}
console.log('isValideTree : ' + isValideTree(unbalncedT))

console.log('-----------------------------------')
/*
======================================================================================
  34. successor: write an algorithm to find the next node in (ie. in order successor) of a given node in a binart seach tree, you may assume that each node  has a link to its parent.
*/

function BST(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
}

BST.prototype.insert = function(value) {
  var newNode = new BST(value);
  
  if(newNode.value <= this.value) {
    if(!this.left) {
      this.left = newNode;
      newNode.parent = this;
    } else {
      this.left.insert(value);
    }
  }
  else if(newNode.value > this.value) {
    if(!this.right) {
      this.right = newNode;
      newNode.parent = this;
    } else {
      this.right.insert(value)
    }
  }
}


BST.prototype.inOrderTraversal = function() {
  var result = [];
  
  function build(tree) {
    if(tree.left) {
      build(tree.left);
    }
    result.push(tree.value);
    
    if(tree.right) {
      build(tree.right);
    }
  }
  build(this)
  return result;
}

var sTree = new BST(6);
sTree.insert(3)
sTree.insert(5)
sTree.insert(2)
sTree.insert(1)
sTree.insert(4)
sTree.insert(9)
sTree.insert(8)
sTree.insert(7)
sTree.insert(10)

sTree.inOrderTraversal()

function successor (tree) {
  var result;
  
  function findSuccessor(node) {
    if(node.left) {
      findSuccessor(node.left)
    }
    else {
      result = node.value;
    }
  }
  
  function findParentSuccesso(node) {
    if(node.value > tree.value) {
      result = node.value;
      return;
    }
    if(node.parent) {
      findParentSuccesso(node.parent)
    }
  }
  
  // ====
  
  if(tree.right) {
    findSuccessor(tree.right);  
  }
  else if(tree.parent) {
    findParentSuccesso(tree.parent)
  }
  
  return result;
}




console.log('successor: ' + successor(sTree.right.left))
console.log('-----------------------------------')
/*
======================================================================================
  35. buildOrder : you are given a list of porjects and a list of dependencies (which is a list of pairs of projects, where the second project is dependent on the first project) All of a project dependencies must be built befor the project is. Find a build order that will allow the projects to be built.
  if there is no valid build order, return an error.
  
  ex. PROJECTS:     a, b, c, d, e, f
      DEPENDENCIES: (a,d), (f,b), (b,d), (f,a), (d,c)
  
  Output: f, e, a, b, d, c
*/

var projectsList = ['a', 'b', 'c', 'd', 'e', 'f'];
var dependenciesList = [['a','d'], ['f','b'], ['b','d'], ['f','a'], ['d','c']];

function buildOrder(projects, dep) {
  var result = {};
  var resultLen = 0
  
  
  while(resultLen < projects.length) {
    
    for(var i = 0; i < projects.length; i++) {
      var tempFlag = false;
      for(var j = 0; j < dep.length;j++) {
        if(projects[i] === dep[j][1]) {
          tempFlag = true;
        }
      }
      if(tempFlag === false) {
        result[projects[i]] = true;
        resultLen++;
      }
    } 
    
      
    for( i = 0; i < projects.length; i++) {
      for( j = 0; j < dep.length; j++) {
        if(!result[projects[i]] && projects[i] == dep[j][1]) {
          if(result[dep[j][0]]) {
            result[dep[j][1]] = true;
            resultLen++;
          }
        }
      }
    }
  }
  
  return Object.keys(result)
}


console.log('buildOrder:  ' + buildOrder(projectsList,dependenciesList ))

console.log('-----------------------------------')


/*
======================================================================================
  36. firstCommonAncestor: Design an algorithm and write code to find the first common ancestor of two nodes in a bianary tree. avoid storing additional nodes in a data data-structure. Note this is not necessarily a binary search tree
  
*/

var sTree = new BST(3)
sTree.left = new BST(6)
sTree.left.left = new BST(2)
sTree.left.right = new BST(11)
sTree.left.right.left = new BST(9)
sTree.left.right.right = new BST(5)
sTree.right = new BST(8)
sTree.right.right = new BST(13)
sTree.right.right.left = new BST(7)

function LCI(root, n1, n2) {
  if(!root) { return null; }
  if(root == n1 || root == n2) { return root; }
  
  var left = LCI(root.left, n1, n2)
  var right = LCI(root.right, n1, n2)
  
  if(!left && !right) { return null; }
  if(left && right) { return root; }
  
  return left !== null ? left : right;
}
console.log('firstCommonAncestor: ' + LCI(sTree, sTree.right, sTree.right.right.left).value)

console.log('-----------------------------------')


/*
======================================================================================
  37. BSTSequences: A binary search tree was created by traversing an array from left to right and inserting each element.
  Given a binary search tree with distinct elements. print all possible arrys that cold have led to this tree;
*/


/*
======================================================================================
  38.  checkSubtree: T1 and T2 are two very large binary trees, with T1 much bigger than T2, create an algorithm to determin if T2 is a subtree of T1.
*/
// === creating T1 ===
// === creating T1 ===
var t1 = new BST(50);
t1.insert(20)
t1.insert(60)
t1.insert(15)
t1.insert(17)
t1.insert(58)
t1.insert(10)
t1.insert(16)
t1.insert(57)
t1.insert(59)
t1.insert(8)
t1.insert(14)
t1.insert(5)
t1.insert(9)
t1.left.left.left.parent = null;

// === creating T1 ===
var t2 = new BST(10);
t2.insert(8)
t2.insert(14)
t2.insert(5)
t2.insert(9)

// == the function
function checkSubtree(T1, T2) {
 
  function findMatch(tree1, tree2) {
    if(!tree1) {return false}
     
    if(tree1.value === tree2.value) {
      return tree1;
    }
     
    else if(tree1.value > tree2.value) {
      return findMatch(tree1.left, tree2)
    }
     
    else if(tree1.value < tree2.value) {
      return findMatch(tree1.right, tree2)  
    }   
  }
   
   
  if(findMatch(T1, T2)) {
    var subTree = findMatch(T1, T2)
  } else {
    return false;
  }
  
  function isIdentical(root1, root2) {
    if((root1.value !== root2.value) || ((root1.left && !root2.left) || (!root1.left && root2.left)) || ((root1.right && !root2.right) || (!root1.right && root2.right))) {
      console.log(root1.value + ', ' + root2.value)
      return false;
    }
    if(root1.left && root2.left) {
      return isIdentical(root1.left, root2.left)  
    }
    if(root1.right && root2.right) {
      return isIdentical(root1.right, root2.right)  
    }
    return true
  }
  
  if(isIdentical(subTree, T2)) {
    return true;
  } else {
    return false
  }
   
}
console.log('checkSubtree : ' + checkSubtree(t1, t2))


console.log('-----------------------------------');

/*
======================================================================================
  39. GetRandomNode: you are implemnting a binary tree class from scrach which in addition to insert, find and delete has a method GetRandomNode(), which returns a random node fro the tree . all nodes should be equally likely to be chossen 
*/

BST.prototype.getRandomNode = function() {
  var allNodes = [];
  
  function collectNodes(node) {
    if(node) {
      allNodes.push(node);
      collectNodes(node.left);
      collectNodes(node.right);
    }
    
  }
  collectNodes(this);
  
  if(allNodes.length) {
    var randomNum = Math.floor(Math.random() * allNodes.length);
    return allNodes[randomNum]
  } else {
    return null;
  }
}
console.log('getRandomNode: ' + t2.getRandomNode().value);

console.log('-----------------------------------')

/*
======================================================================================
  40. Given a binary tree and a sum, return the path between the root and a leaf node that add up to the sum 
*/

var sumTree = new BST(10);
sumTree.left = new BST(16)
sumTree.left.right = new BST(-3)
sumTree.right = new BST(5)
sumTree.right.left = new BST(4)
sumTree.right.right = new BST(11)

function SumPath(node, sum, arr) {
  if(!node) {return false;}
  if(!node.left && !node.right) {
    if(node.value === sum) {
      arr.push(node.value);
      return true;
    } else { return false; }
  }
  
  if(SumPath(node.left, (sum - node.value), arr)) {
    arr.push(node.value);
    return arr
  }
  if(SumPath(node.right, (sum - node.value), arr)) {
    arr.push(node.value);
    return arr
  }
  return false;
}
console.log('SumPath: ' + SumPath(sumTree, 26, []))
console.log('-----------------------------------')

/*
======================================================================================
  =========================================================
  ========== Recursion and Dynamic Programming ============
  =========================================================
*/


/*
======================================================================================
  42.TripleStep: A child is running up the staircase with n step and can hop either 1 step, 2 steps, or 3 steps at a time, implement a method to count how many possible ways the child can run up the stairs. 
*/

function tripleStep(n) {
  var memo = {};
  function countWays(n) {
    if(n < 0) { return 0; }
    else if(n === 0) { return 1; }
    else if(memo[n]) { return memo[n]; }
    else {
      memo[n] = countWays(n-1) + countWays(n-2) + countWays(n-3);
    }
    return memo[n];
  }
  countWays(n);
  return memo[n];
}

console.log('42. TripleStep: ' + tripleStep(5));

console.log('-----------------------------------')