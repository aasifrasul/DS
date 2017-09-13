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
  var exists;
  return arr.filter(n => {
    exists = cleaned[n];
    cleaned[n] = true;
    return !exists;
  });
}
