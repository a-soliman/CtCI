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