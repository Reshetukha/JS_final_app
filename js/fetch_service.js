import Component from './component';

class FetchService extends Component {
  init() {
    this.on('actionEvent', this.actionEvent.bind(this), document);
    this.on('fetchPutRequest', this.putUserRequest.bind(this), document);
    this.on('fetchPostRequest', this.postUserRequest.bind(this), document);
  }

  actionEvent(data) {
    const action = data.action.split(':');
    if (action[1] === 'updated') {
      this.getRequest(data);
    }
    if (action[1] === 'removed') {
      if (action[0] === 'user') {
        this.emit('userDelete', data.id, document);
      }
      if (action[0] === 'group') {
        this.emit('groupDelete', data.id, document);
      }
    }
  }

  getRequest(data) {
    const action = data.action.split(':');
    const { id } = data;
    const url = `https://ums-honeybadger.herokuapp.com/${action[0]}/${id}`;
    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error();
        }
        return response.json();
      })
      .then((json) => {
        if (action[0] === 'user') {
          this.emit('updateUser', json, document);
        }
        if (action[0] === 'group') {
          this.emit('addGroup', json, document);
        }
        this.emit('renderInit', null, document);
      })
      .catch(console.log);
  }

  // eslint-disable-next-line class-methods-use-this
  putUserRequest(user) {
    const url = `https://ums-honeybadger.herokuapp.com/user/${user.user_id}`;
    fetch(url, {
      method: 'put',
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error();
        }
      })
      .catch(console.log);
  }

  // eslint-disable-next-line class-methods-use-this
  postUserRequest(user) {
    const url = 'https://ums-honeybadger.herokuapp.com/user';
    fetch(url, {
      method: 'post',
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.status !== 201) {
          throw new Error();
        }
      })
      .catch(console.log);
  }
}

export default FetchService;
