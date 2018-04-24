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
    if (data.message) {
      console.log('MESSAGE - ', data.message);
    }
    if (data.action) {
      this.emit('actionEvent', data, document);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  onOpenFun(e) {
    M.toast({ html: `WebSocket connected! ${e}`, classes: 'green' });
  }

  // eslint-disable-next-line class-methods-use-this
  onError(e) {
    M.toast({ html: `WebSocket error! ${e}`, classes: 'red', displayLength: Infinity });
  }

  // eslint-disable-next-line class-methods-use-this
  onClose(m) {
    M.toast({ html: `WebSocket closed! ${m}`, classes: 'red', displayLength: Infinity });
  }
}

export default MyWebSocket;
