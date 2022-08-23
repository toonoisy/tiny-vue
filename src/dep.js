class Dep {
  target = null;
  constructor () {
    this.subs = new Set();
  }

  addSub (sub) {
    this.subs.add(sub);
  }

  notify () {
    this.subs.forEach(sub => {
      sub.update();
    })
  }
}

export default Dep;