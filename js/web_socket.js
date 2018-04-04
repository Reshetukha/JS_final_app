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
        // console.log(message);
        let data = JSON.parse(message.data);
        console.log('WEB SOCKET - ', data);
        if (data.message){
            // console.log('MESSAGE - ', data.message);
        }
        if (data.action){
            //let action = data.action.split(':');
            //let id = data.id;
            //console.log(action);
            this.emit('actionEvent', data, document);
            // if (action[0] === 'user'){
            //     if (action[1] === 'updated'){
            //         let userId = data.id;
            //         console.log('userId updated', userId);
            //     }
            // }
            // if (action[0] === 'group'){
            //     if (action[1] === 'updated'){
            //         let  groupId = data.id;
            //         console.log('groupId updated ', groupId);
            //     }
            // }
        }
    }

    onOpenFun(e) {
        console.log(e);
    }

    onError(e) {
        console.log(e);
    }

    onClose(m) {
        console.log(m);
    }
}

export default MyWebSocket;