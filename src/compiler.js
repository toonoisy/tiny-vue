import Watcher from './watcher';

class Compiler {
  constructor (el, vm) {
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    this.compile(this.$el);
  }

  isElementNode (node) {
    return node.nodeType === 1;
  }

  isTextNode (node) {
    return node.nodeType === 3;
  }

  isDirective (attrName) {
    return attrName.startsWith('v-');
  }

  compile (el) {
    [...el.childNodes].forEach(node => {
      if (this.isElementNode(node)) {
        this.compileElement(node);
      } else if (this.isTextNode){
        this.compileText(node);
      }

      // compile children nodes
      if (node.childNodes.length) {
        this.compile(node);
      }
    });
  }

  compileElement (node) {
    [...node.attributes].forEach(attr => {
      const attrName = attr.name;
      if (this.isDirective(attrName)) {
        const [ name, arg ] = attrName.substring(2).split(':');
        const key = attr.value;
        this.processDirective(node, key, name, arg);
      }
    })
  }

  compileText (node) {
    const textContent = node.textContent;
    if ((/({{.+?}})/g).test(textContent)) {
      const key = textContent.replace(/^{{|}}$/g, '').trim();
      key && new Watcher(key, this.$vm, (val) => {
        node.textContent = val;
      })
    }
  }

  processDirective (node, key, name, arg) {
    switch (name) {
      case 'on':
        node.addEventListener(arg, this.$vm[key].bind(this.$vm));
        break;
      case 'model':
        new Watcher(key, this.$vm, (val) => {
          node.value = val;
        });
        node.addEventListener('input', () => {
          this.$vm[key] = node.value;
        });
        break;
      default:
        break;
    }
  }
}

export default Compiler;