import Component from './component';

class UserObj {
  constructor(user) {
    this.user_id = parseFloat(user.user_id);
    this.group_id = parseFloat(user.group_id);
    this.name = user.name;
    this.street = user.street;
    this.zip_code = parseFloat(user.zip_code);
    this.city = user.city;
    this.phone = user.phone;
    this.credits = parseFloat(user.credits);
  }
}

class GroupObj {
  constructor(g) {
    this.group_id = g.group_id;
    this.name = g.name;
    this.is_admin = g.is_admin;
  }
}

class DataStore extends Component {
  init() {
    this.users = [];
    this.groups = [];
    this.on('renderInit', this.renderInit.bind(this), document);
    this.on('postRequestData', this.postBlankEmit.bind(this), document);
    this.on('editRequestData', this.editBlankEmit.bind(this), document);
    this.on('userDelete', this.userDelete.bind(this), document);
    this.on('groupDelete', this.groupDelete.bind(this), document);
    this.on('updateUser', this.updateUser.bind(this), document);
    this.on('addGroup', this.addGroup.bind(this), document);
  }

  renderInit() {
    this.sortData();
    this.emit('renderGroups', this.groups, document);
    this.emit('renderUsers', this.users, document);
  }

  updateUser(user) {
    const temp = this.users.find(item => item.user_id === user.user_id);
    if (temp) {
      const index = this.users.indexOf(temp);
      this.users.splice(index, 1);
    }
    this.users.push(new UserObj(user));
    this.countUsersInGroups();
  }

  addGroup(group) {
    this.groups.push(new GroupObj(group));
    this.countUsersInGroups();
  }

  countUsersInGroups() {
    this.groups.forEach((group) => {
      group.amountOfUsers = this.users.reduce((acc, cur) => {
        if (cur.group_id === group.group_id) return acc + 1;
        return acc;
      }, 0);
    });
  }

  userDelete(id) {
    const temp = this.users.find(item => item.user_id === id);
    const index = this.users.indexOf(temp);
    this.users.splice(index, 1);
    this.emit('renderInit', null, document);
  }

  groupDelete(id) {
    const temp = this.groups.find(item => item.group_id === id);
    const index = this.groups.indexOf(temp);
    this.groups.splice(index, 1);
    this.emit('renderInit', null, document);
  }

  postBlankEmit() {
    this.emit('postSendData', this.groups, document);
  }

  editBlankEmit(id) {
    const user = this.users.find(item => item.user_id === parseFloat(id));
    this.emit('editSendData', [user, this.groups], document);
  }

  sortData() {
    this.users.sort((a, b) => a.user_id - b.user_id);
    this.groups.sort((a, b) => a.group_id - b.group_id);
  }
}

export default DataStore;
