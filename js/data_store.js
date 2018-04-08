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
    this.on('actionEvent', this.actionEventFun.bind(this), document);
    this.on('renderInit', this.renderInitFun.bind(this), document);
    this.on('postRequestData', this.postBlankEmit.bind(this), document);
    this.on('editRequestData', this.editBlankEmit.bind(this), document);
    this.on('fetchPostRequest', this.postUserRequest.bind(this), document);
    this.on('fetchPutRequest', this.putUserRequest.bind(this), document);
  }

  renderInitFun() {
    this.sortData();
    console.log('users', this.users);
    console.log('groups', this.groups);
    function fun() {
      this.emit('renderGroups', this.groups, document);
      this.emit('renderUsers', this.users, document);
    }
    setTimeout(fun.bind(this), 5);
  }

  actionEventFun(data) {
    const action = data.action.split(':');
    if (action[1] === 'updated') {
      this.fetchFun(data);
    }
    if (action[1] === 'removed') {
      if (action[0] === 'user') {
        this.userDelete(data.id);
      }
      if (action[0] === 'group') {
        this.groupDelete(data.id);
      }
    }
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

  fetchFun(data) {
    console.log('data', data);
    const action = data.action.split(':');
    const id = data.id;
    // const { action, id } = data;
    // action = action.split(':');
    console.log('action', action);
    console.log('id', id);
    const url = `https://ums-honeybadger.herokuapp.com/${action[0]}/${id}`;
    fetch(url)
      .then((response) => {
        console.log('response', response);
        if (response.status !== 200) {
          throw new Error();
        }
        return response.json();
      })
      .then((json) => {
        if (action[0] === 'user') {
          this.addUser(json);
        }
        if (action[0] === 'group') {
          this.addGroup(json);
        }
        this.emit('renderInit', null, document);
      })
      .catch(console.log);
  }

  addUser(user) {
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

  // eslint-disable-next-line class-methods-use-this
  putUserRequest(obj) {
    const url = `https://ums-honeybadger.herokuapp.com/user/${obj.user_id}`;
    const temp = new UserObj(obj);
    fetch(url, {
      method: 'put',
      body: JSON.stringify(temp),
    })
      .then((response) => {
        console.log('response', response);
        if (response.status !== 200) {
          throw new Error();
        }
      })
      .catch(console.log);
  }

  // eslint-disable-next-line class-methods-use-this
  postUserRequest(obj) {
    const url = 'https://ums-honeybadger.herokuapp.com/user';
    const temp = new UserObj(obj);
    temp.user_id = undefined;

    fetch(url, {
      method: 'post',
      body: JSON.stringify(temp),
    })
      .then((response) => {
        console.log('response', response);
        if (response.status !== 201) {
          throw new Error();
        }
      })
      .catch(console.log);
  }

  postBlankEmit() {
    this.emit('postSendData', this.groups, document);
  }

  editBlankEmit(id) {
    const user = this.users.find(item => item.user_id == id);
    this.emit('editSendData', [user, this.groups], document);
  }

  sortData() {
    this.users.sort((a, b) => a.user_id - b.user_id);
    this.groups.sort((a, b) => a.group_id - b.group_id);
  }
}

export default DataStore;
