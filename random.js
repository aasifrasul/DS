function add(n) {
  var sum = n;
  var f = function f(m) {
    sum += m;
    return f;
  }
  f.toString = function() {
    return sum;
  }
  return f;
}

function mul(n) {
  var res = n;
  var f = function f(m) {
    res *= m;
    return f;
  }
  f.toString = function() {
    return res;
  }
  return f;
}

function isPrime(n) {
  if (n === 1 || n === 2) {
    return true;
  }
  if (n % 2 === 0) {
    return false;
  }
  var divisor = 3;

  while (divisor < n / 2) {
    if (n % divisor === 0) {
      return false;
    }
    divisor += 2;
  }
  return true;
}

function primeFactors(n) {
  var factors = {},
    divisor = 3;
  if (n === 1 || n === 2) {
    return true;
  }
  if (n % 2 === 0) {
    factors[2] = 2;
  }
  while (n > 2) {
    if (n % divisor == 0) {
      factors[divisor] = divisor;
      n = n / divisor;
    } else {
      divisor += 2;
    }
  }
  return Object.keys(factors);
}

function dedupe(arr) {
  var cleaned = {};
  return arr.filter(n => !cleaned[n] && (cleaned[n] = true));
}

var greatestCommonDivisor = (a, b) => (b == 0) ? a : greatestCommonDivisor(b, a%b);

function mergeSortedArray(a, b){
  var merged = [], 
      aElm = a[0],
      bElm = b[0],
      i = 1,
      j = 1;
  
  if(a.length ==0)
    return b;
  if(b.length ==0)
    return a;
  /* 
  if aElm or bElm exists we will insert to merged array
  (will go inside while loop)
   to insert: aElm exists and bElm doesn't exists
             or both exists and aElm < bElm
    this is the critical part of the example            
  */
  while(aElm || bElm){
   if((aElm && !bElm) || aElm < bElm){
     merged.push(aElm);
     aElm = a[i++];
   }   
   else {
     merged.push(bElm);
     bElm = b[j++];
   }
  }
  return merged;
}

var reverse = str => (str === '') ? '' : reverse(str.substr(1)) + str.charAt(0);

function reverseWords(str){
 var rev = [], 
     wordLen = 0;
 for(var i = str.length-1; i>=0; i--){
   if(str[i]==' ' || i==0){
     rev.push(str.substr(i,wordLen+1));
     wordLen = 0;
   }
   else
     wordLen++;
 }
 return rev.join(' ');
}

function firstNonRepeatChar(str){
  var len = str.length,
      char, 
      charCount = {};
  for(var i =0; i<len; i++){
    char = str[i];
    if(charCount[char]){
      charCount[char]++;
    }
    else
      charCount[char] = 1;
  }
  for (var j in charCount){
    if (charCount[j]==1)
       return j;
  }
}

function removeDuplicateChar(str){
  var len = str.length,
      char, 
      charCount = {}, 
      newStr = '';
  for(var i =0; i<len; i++){
    char = str[i];
    if(charCount[char]){
      charCount[char]++;
    }
    else
      charCount[char] = 1;
  }
  for (var j in charCount){
    if (charCount[j]==1)
       newStr += j;
  }
  return newStr;
}

function isPalindrome(str){
  var i, len = str.length;
  for(i =0; i<len/2; i++){
    if (str[i]!== str[len -1 -i])
      return false;
  }
  return true;
}
