
export default class UserTable {
  rows = [];
  constructor(rows) {
    this.rows = rows || this.rows;
    this.elem = document.createElement('table');
    this.render();
  }

  render() {
    this.elem.innerHTML = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${this.rows.map(row => `
        <tr>
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button>X</button></td>
        </tr>`).join('')}
  </tbody>`
        this.elem.addEventListener('click', event => {
          if(event.target.tagName === 'BUTTON'){
            event.target.closest("tr").remove()
          }
        })
  }

  
}