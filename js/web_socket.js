import Component from './component';

class MyWebSocket extends Component {
  init() {
    this.socket = new WebSocket('ws://ums-honeybadger.herokuapp.com/ums');
    this.socket.onmessage = this.onMessageFun.bind(this);
    this.socket.onopen = this.onOpenFun.bind(this);
    this.socket.onerror = this.onError.bind(this);
    this.socket.onclose = this.onClose.bind(this);
  }

  onMessageFun(message) {
    const data = JSON.parse(message.data);
    console.log('WEB SOCKET - ', data);
    if (data.message) {
      console.log('MESSAGE - ', data.message);
    }
    if (data.action) {
      this.emit('actionEvent', data, document);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  onOpenFun(e) {
    console.log(e);
  }

  // eslint-disable-next-line class-methods-use-this
  onError(e) {
    console.log(e);
  }

  // eslint-disable-next-line class-methods-use-this
  onClose(m) {
    console.log(m);
  }
}

export default MyWebSocket;
