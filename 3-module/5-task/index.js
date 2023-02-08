function getMinMax(str) {
  let newArray = str.split(' '); 
  let numArray = newArray.filter(item => !isNaN(item));
  numArray = numArray.map(item => Number(item)).sort((a, b) => a - b);
  return {min: numArray[0], max: numArray[numArray.length - 1]};
}
