
class Data {
  constructor(initOption) {
    this.$prop = initOption.prop
    Object.defineProperty(this, '$unEnum', {
      value: {
        page: [],
        next: false
      },
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
    if (this.$unEnum.page.indexOf(page) == -1) {
      this.$unEnum.page.push(page)
    }
    this.$syncTargetPage(page)
  }
  $syncPage(force) {
    if (force) {
      for (let i = 0; i < this.$unEnum.page.length; i++) {
        this.$syncTargetPage(this.$unEnum.page[i])
      }
    } else {
      // 刷新页面数据添加判断，减少不必要刷新机制，后期考虑升级成微任务
      if (!this.$unEnum.next) {
        this.$unEnum.next = true
        setTimeout(() => {
          for (let i = 0; i < this.$unEnum.page.length; i++) {
            this.$syncTargetPage(this.$unEnum.page[i])
          }
          this.$unEnum.next = false
        }, 0)
      }
    }
  }
  $syncTargetPage(page) {
    page.setData({
      [this.$prop]: this
    })
  }
  $exportMsg(msg, type = 'log', ...args) {
    console[type](`${this.$prop}错误:[${msg}]`, ...args)
  }
}

export default Data
