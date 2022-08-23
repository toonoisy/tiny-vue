import Dep from './dep';

class Watcher {
  constructor (key, vm, callback) {
    this.$vm = vm;
    this.key = key;
    this.callback = callback;
    this.value = this.get();
    this.update();
  }

  get() {
    Dep.target = this;
    // trigger getter to call Dep.addSub(dep.target)
    const value = this.getValue();
    Dep.target = null;
    return value;
  }

  getValue () {
    const chain = this.key.split('.');
    // this.xx.xx ...
    const value = chain.reduce((acc, cur) => {
      return acc[`${cur}`];
    }, this.$vm);
    return value;
  }

  update () {
    const newValue = this.get();
    this.callback(newValue);
  }
}

export default Watcher;