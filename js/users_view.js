import Component from './component';

const usersTableBodySel = document.querySelector('.striped').querySelector('tbody');

class UsersView extends Component {

  init() {
    this.on('renderUsers', this.renderUsers.bind(this), document);
  }

  // eslint-disable-next-line class-methods-use-this
  renderUsers(users) {
    usersTableBodySel.innerHTML = '';
    users.forEach( (user) => {
      let hash = document.location.hash.split(/[#\/]/);
      if (hash.some( (item) => item == user.group_id)) {
        let myTemplate = `
        <tr id="${user.user_id}">
          <td>${user.name}</td>
          <td>${user.street}</td>
          <td>${user.zip_code}</td>
          <td>${user.city}</td>
          <td>${user.phone}</td>
        </tr>
        `;
        usersTableBodySel.innerHTML += myTemplate;
      }
    });
  }

}

export default UsersView;