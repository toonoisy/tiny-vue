/*
a even more tiny example of reactivity
*/

let dep = null;
const effects = [];

// 定义数据劫持行为
function defineProxy() {
  return {
    get(obj, key, ctx) {
      dep && effects.push(dep);
      return Reflect.get(obj, key, ctx);
    },
    set(obj, key, val, ctx) {
      Reflect.set(obj, key, val, ctx);
      effects.length && effects.forEach((fn) => fn());
    },
  };
}

// 递归劫持
function track(data, handlerObj) {
  if (typeof data !== "object") return data;
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      data[key] = track(data[key], handlerObj);
    }
  }
  return new Proxy(data, handlerObj);
}

// 创建副作用
function effect(fn) {
  dep = fn;
  fn();
  dep = null;
}

// 创建响应式数据
function dataProxy(obj) {
  return track(obj, defineProxy());
}

// ------------------ test ------------------

const initialData = {
  count: 0,
};

const data = dataProxy(initialData); // 创建响应式数据

// 副作用行为
effect(() => {
  console.log("count", data.count);
});

data.count = 1; // 修改响应式数据，使用了该数据的副作用函数会被执行
