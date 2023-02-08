function camelize(str) {
  let newArr = str.split('-');
  return newArr.map((item, index) => !index ? item : item[0].toUpperCase() + item.slice(1)).join('');
}