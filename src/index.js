import Compiler from './compiler';
import Observer from './observer';

class Instance {
  constructor (options = {}) {
    this.$options = options;
    new Observer(options.data);
    this._initProxy(options);
    new Compiler(options.el, this);
  }

  _initProxy ({ data, computed, methods }) {
    this.dataProxy(data);
    this.computedProxy(computed);
    this.methodsProxy(methods);
  }

  dataProxy (data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key];
        },
        set(newValue) {
          data[key] = newValue;
        }
      })
    });
  }

  computedProxy (computed) {
    Object.keys(computed).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return computed[key].call(this);
        },
        set() {}
      })
    });
  }

  methodsProxy (methods) {
    Object.keys(methods).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return methods[key];
        },
        set() {}
      })
    });
  }
}

export default Instance;