function showSalary(users, age) {
    let newArr = users.filter(data => data.age <= age);
    return newArr.map(data => `${data.name}, ${data.balance}`).join('\n');
}