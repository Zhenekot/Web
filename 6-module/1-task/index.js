
export default class UserTable {
  rows = [];
  constructor(rows) {
    this.rows = rows || this.rows;
    this.elem = document.createElement('table');
    this.object();
    this.addButton();
  }

  object() {
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
        ${this.rows.map(elem => `
        <tr>
        <td>${elem.name}</td>
        <td>${elem.age}</td>
        <td>${elem.salary}</td>
        <td>${elem.city}</td>
        <td><button>X</button></td>
        </tr>`).join('')}
  </tbody>`
  }
  addButton() {
    for (const button of this.elem.querySelectorAll("button"))
      button.addEventListener('click', (event) =>
        event.target.closest("tr").remove())
  }
}