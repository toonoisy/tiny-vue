# tiny-vue
实现一个简易的 2.x 版本 Vue，方便更好地理解其响应式原理。

## 核心类和它们的分工
### Observer  (创建响应式)

作为数据监听器，它的作用是劫持 `data` 选项中声明的对象属性，通过 `Object.defineProperty` 为其递归添加 getter/setter，使其成为响应式对象，并为其创建对应的 dep。

### Dep （收集 watcher）

管理订阅者 watcher 的订阅器，定义响应式属性时被创建，每个响应式属性都有对应的 dep。读取数据触发 getter 时，它将对应的 watcher 添加为订阅者，修改数据触发 setter 时，也是由它通知所有订阅的 watcher 重新渲染视图。

### Watcher （副作用）

所有在模板中绑定的值（事件除外）都有对应的 watcher，初始化编译模板时被创建。作为订阅数据变化的订阅者，收到 dep 通知后会去更新视图。

### Compiler  （编译模版）

作为模版编译器，它为模板中绑定的数据创建对应的 watcher，watcher 会去读取数据，从而建立起与 dep 的关系。

### Instance

生成实例的构造器，整和以上几大类，并使用  `Object.defineProperty` 将 `data` , `computed` 属性等代理到实例上，使它们能够直接通过 this.xx 进行访问。
