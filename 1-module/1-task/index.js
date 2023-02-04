function factorial(n) {
  let count = 1;
  while (n) {
    count *= n;
    n--;
  }
  return count;
}
