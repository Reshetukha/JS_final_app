import Component from './component';

class UsersView extends Component {
  init() {
    document.querySelector('main').innerHTML = `
    <table class="striped">
        <thead>
        <tr>
            <th>Name</th>
            <th>Street</th>
            <th>Zip code</th>
            <th>City</th>
            <th>Phone</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `;
    this.on('renderUsers', this.renderUsers.bind(this), document);
    this.usersTableBodySel = document.querySelector('.striped').querySelector('tbody');
  }

  // eslint-disable-next-line class-methods-use-this
  renderUsers(users) {
    this.usersTableBodySel.innerHTML = '';
    users.forEach((user) => {
      const hash = parseFloat(document.location.hash.split(/[#/]/)[1]);
      if (hash === user.group_id) {
        const myTemplate = `
        <tr id="${user.user_id}">
          <td>${user.name}</td>
          <td>${user.street}</td>
          <td>${user.zip_code}</td>
          <td>${user.city}</td>
          <td>${user.phone}</td>
        </tr>
        `;
        this.usersTableBodySel.innerHTML += myTemplate;
      }
    });
  }
}

export default UsersView;
