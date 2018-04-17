import { WebSocketBridge } from 'django-channels'

export default class Lock {
  constructor() {
    this.id = null;
    this.state = "locked";
    this.lockTime = 3000;
    this.ws = new WebSocketBridge();
  }

  connect(addr) {
    let self = this;
    self.ws.connect(addr);
    
    self.ws.listen((action, stream) => {
      if (action.error) {
        console.error(action.error);
        self.disconnect();
        return;
      }
      if (action.command == 'ident') {
        self.ws.send({ id: self.id });
      }
      if (action.command == 'lock') {
        self.lock();
      }
      if (action.command == 'unlock') {
        self.unlock();
      }
    });
  }

  disconnect() {
    this.ws.socket.close(1000, '', {keepClosed: true});
    this.ws = new WebSocketBridge();
  }
  
  setState(state) {
    this.state = state;

    if (this.ws.socket) {
      this.ws.send({ state });
    }
  }

  lock() {
    this.setState('locking');

    let self = this;
    setTimeout(() => {
      this.setState('locked');
    }, self.lockTime);
  }

  unlock() {
    this.setState('unlocking');

    let self = this;
    setTimeout(() => {
      this.setState('unlocked');
    }, self.lockTime);
  }
}
