import DefaultData from "../DefaultData"

class PageData extends DefaultData {
  constructor(initOption) {
    super(initOption)
    this.current = 1
    this.size = initOption.size || 10
    this.total = 1
    this.num = 0
  }
  getCurrent() {
    return this.current
  }
  getSize() {
    return this.size
  }
  setNum(num) {
    this.num = num || 0
    if (this.num) {
      this.total = Math.ceil(this.num / this.size)
    } else {
      this.total = 1
    }
    if (this.current > this.total) {
      this.setCurrent(this.total)
    }
  }
  setCurrent(current) {
    if (current !== this.current) {
      if (current <= this.total) {
        this.current = current
      } else {
        this.current = this.total
      }
    }
  }
  reset() {
    this.setCurrent(1)
    this.setNum(0)
  }
}

export default PageData
