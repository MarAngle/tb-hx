
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
    this.$syncPage(page)
  }
  $syncPage(page) {
    if (page) {
      page.setData(this.$prop, this)
    } else {
      // 刷新页面数据添加判断，减少不必要刷新机制，后期考虑升级成微任务
      if (!this.$unEnum.next) {
        this.$unEnum.next = true
        setTimeout(() => {
          for (let i = 0; i < this.$unEnum.page.length; i++) {
            const page = this.$unEnum.page[i]
            page.setData({
              [this.$prop]: this
            })
          }
          this.$unEnum.next = false
        }, 0)
      }
    }
  }
  $exportMsg(msg, type = 'log', ...args) {
    console[type](`${this.$prop}错误:[${msg}]`, ...args)
  }
}

export default Data
