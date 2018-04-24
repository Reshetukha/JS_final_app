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

  Fetch(whom, id, methodProp = 'GET', bodyProp) {
    this.url = `https://ums-honeybadger.herokuapp.com/${whom}`;
    if (id) this.url += `/${id}`;
    return fetch(this.url, {
      method: methodProp,
      body: JSON.stringify(bodyProp),
    }).then((response) => {
      if ((response.status !== 200 && methodProp === 'GET') ||
          (response.status !== 200 && methodProp === 'PUT') ||
          (response.status !== 201 && methodProp === 'POST')) {
        throw new Error(response.status);
      }
      return response.json();
    }).catch((msg) => {
      M.toast({ html: `Network failure! ${msg}`, classes: 'red', displayLength: Infinity });
    });
  }

  getRequest(data) {
    const action = data.action.split(':')[0];
    const { id } = data;
    this.Fetch(action, id)
      .then((json) => {
        if (action === 'user') {
          this.emit('updateUser', json, document);
        }
        if (action === 'group') {
          this.emit('addGroup', json, document);
        }
        this.emit('renderInit', null, document);
      })
      .catch((msg) => {
        M.toast({ html: `Client failure! ${msg}`, classes: 'red', displayLength: Infinity });
      });
  }

  putUserRequest(user) {
    this.Fetch('user', user.user_id, 'PUT', user);
  }

  postUserRequest(user) {
    this.Fetch('user', null, 'POST', user);
  }
}

export default FetchService;
