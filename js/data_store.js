import Component from './component';

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
    //window.addEventListener('click', this.renderInitFun.bind(this), false);
  }

  renderInitFun() {
    this.sortData();
    function fun() {
      this.emit('renderGroups', this.groups, document);
      this.emit('renderUsers', this.users, document);
    }
    setTimeout(fun.bind(this), 5);
  }

  actionEventFun(data) {
    // console.log('data', data);
    let action = data.action.split(':');
    if ( action[1] == 'updated') {
      this.fetchFun(data);
    }
    if ( action[1] == 'removed') {
      if ( action[0] == 'user' ) {
        userDelete(data.id);
      }
      if ( action[0] == 'group' ) {
        groupDelete(data.id);
      }
    }
    // this.fetchFun(data);
  }

  userDelete(id) {
    let temp = this.users.find( (item) => item.user_id == id );
    let index = this.users.indexOf(temp);
    this.users.splice(index, 1);
    this.emit('renderInit', null, document);
  }

  groupDelete(id) {
    let temp = this.groups.find( (item) => item.group_id == id );
    let index = this.groups.indexOf(temp);
    this.groups.splice(index, 1);
    this.emit('renderInit', null, document);
  }

  fetchFun(data) {
    // console.log(data);
    let action = data.action.split(':');
    let id = data.id;
    let url = `https://ums-honeybadger.herokuapp.com/${action[0]}/${id}`;
    fetch(url)
      .then( (response) => response.json() )
      .then( (json) => {
        // console.log('json', json);
        if (action[0] === 'user'){
          this.addUser(json);
        }
        if (action[0] === 'group'){
          this.addGroup(json);
        }
        this.emit('renderInit', null, document);
      })
    .catch( console.log );
  }

  addUser(user) {
    // console.log('user', user);
    let temp = this.users.find( (item) => item.user_id == user.user_id );
    // console.log('temp', temp)
    if (temp) {
      // console.log('inside AddUser If');
      let index = this.users.indexOf(temp);
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
    this.groups.forEach( (group) => {
      group.amountOfUsers = this.users.reduce( (acc, cur) => {
        if ( cur.group_id === group.group_id ) return acc + 1;
        return acc;
      }, 0);
    });
  }

  putUserRequest(obj) {
    console.log('putUserRequest');
    let url = `https://ums-honeybadger.herokuapp.com/user/${obj.user_id}`;
    let temp = new UserObj(obj);
    fetch(url, {
      method: 'put',
      body: JSON.stringify(temp)
    });
  }

  postUserRequest(obj) {
    const url = 'https://ums-honeybadger.herokuapp.com/user';
    // console.log(obj);
    let temp = new UserObj(obj);
    temp.user_id = undefined;
    temp = JSON.stringify(temp);
    // console.log(temp);

    fetch(url, {
      method: 'post',
      body: temp
    });
  }

  postBlankEmit() {
    this.emit('postSendData', this.groups, document);
  }

  editBlankEmit(id) {
    let user = this.users.find( (item) => item.user_id == id )
    this.emit('editSendData', [user, this.groups], document);
  }

  sortData() {
    this.users.sort( (a, b) => {
      return a.user_id - b.user_id;
    });
    this.groups.sort( (a, b) => {
      return a.group_id - b.group_id;
    });
  }
  
}

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

export default DataStore;



// const url = 'https://ums-honeybadger.herokuapp.com/user';
//     fetch(url, {
//       method: 'post',
//       body: '{"user_id":123461,"group_id":4,"name":"More Koch","street":"779 Lynch Street","zip_code":6178,"city":"Newcastle","phone":"+35 (983) 666-3423","credits":100}'
//     });

// {"group_id":5,"name":"1 2","street":"3","zip_code":4,"city":"5","phone":"6","credits":4418}