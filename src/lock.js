import { WebSocketBridge } from "django-channels";

export default class Lock {
  constructor() {
    this.id = null;
    this.state = "locked";
    this.lockTime = 3000;
    this.ws = new WebSocketBridge();
    this.currentLocation = null;
    this.locationOptions = [
      {
        text: "Infinity quad",
        value: {
          lat: 43.084239,
          lon: -77.677103
        }
      },
      {
        text: "Dorms",
        value: {
          lat: 43.084969497463426,
          lon: -77.66809342460635
        }
      },
      {
        text: "Golisano Test",
        value: {
          lat: 43.08429881270753,
          lon: -77.68011275678873
        }
      },
      {
        text: "Perkins",
        value: {
          lat: 43.08573676229464,
          lon: -77.65925205026247
        }
      },
      {
        text: "Global village",
        value: {
          lat: 43.0828651755582,
          lon: -77.67961200695049
        }
      }
    ];
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
      if (action.command == "ident") {
        self.ws.send({ id: self.id });
      }
      if (action.command == "lock") {
        self.lock();
      }
      if (action.command == "unlock") {
        self.unlock();
      }
    });
  }

  disconnect() {
    this.ws.socket.close(1000, "", { keepClosed: true });
    this.ws = new WebSocketBridge();
  }

  setState(state) {
    this.state = state;

    if (this.ws.socket) {
      this.ws.send({ state });
    }
  }

  lock() {
    this.setState("locking");

    let self = this;
    setTimeout(() => {
      this.setState("locked");
    }, self.lockTime);
  }

  unlock() {
    this.setState("unlocking");

    let self = this;
    setTimeout(() => {
      this.setState("unlocked");
    }, self.lockTime);
  }

  updateLocation(location) {
    const data = {
      state: {
        location
      }
    };
    console.log(data);
    this.ws.send(data);
  }
}
