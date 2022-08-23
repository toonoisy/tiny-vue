import Dep from './dep';

class Observer {
  constructor (data) {
    this.observe(data);
  }

  // hijack data properties, turn them into reactive
  observe (data) {
    if (!data || typeof data !== 'object') return;
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }

  defineReactive (data, key, value) {
    const dep = new Dep();
    this.observe(value);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get () {
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set (newValue) {
        if (value === newValue) return;
        value = newValue;
        dep.notify();
      }
    });
  }
}

export default Observer;