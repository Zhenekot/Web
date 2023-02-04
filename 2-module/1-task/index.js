function sumSalary(salaries) {
  let sum = 0;
  for (let key in salaries) {
      if(!Number.isNaN(salaries[key]) && Number.isFinite(salaries[key])){
        sum += salaries[key];
      }
  }
  return sum;
}
