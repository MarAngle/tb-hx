
class Data {
  constructor(initOption) {
    this.$prop = initOption.prop
    Object.defineProperty(this, '$page', {
      value: [],
      writable: true,
      enumerable: false,
      configurable: true
    })
  }
  $appendMethod(name, method) {
    if (method !== undefined) {
      if (this[name] !== undefined) {
        this.$exportMsg(`${name}函数被改写！`)
      }
      this[name] = method
    }
  }
  $appendPage(page) {
    if (this.$page.indexOf(page) == -1) {
      this.$page.push(page)
    }
    this.$syncPage(page)
  }
  $syncPage(page) {
    if (page) {
      page.setData(this.$prop, this)
    } else {
      for (let i = 0; i < this.$page.length; i++) {
        const page = this.$page[i]
        page.setData(this.$prop, this)
      }
    }
  }
  $exportMsg(msg, type = 'log', ...args) {
    console[type](`${this.$prop}错误:[${msg}]`, ...args)
  }
}

export default Data
