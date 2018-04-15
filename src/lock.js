export default class Lock {
  constructor() {
    this.state = "locked";
    this.lockTime = 3000;
  }

  lock() {
    this.state = 'locking';
    let self = this;
    setTimeout(() => {
      self.state = 'locked';
    }, self.lockTime)
  }

  unlock() {
    this.state = 'unlocking';
    let self = this;
    setTimeout(() => {
      self.state = 'unlocked';
    }, self.lockTime)
  }
}
