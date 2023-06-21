import DefaultData from "./DefaultData"

class BaseData extends DefaultData {
  constructor(initOption) {
    super(initOption)
    this.status = {
      operate: 'un',
      load: 'un'
    }
    this.$operate = 0
    this.$getData = initOption.getData
  }
  $changeOperate(target) {
    if (target == 'un') {
      this.$operate--
      if (this.$operate == 0) {
        this.status.operate = 'un'
      }
    } else if (target == 'ing') {
      this.$operate++
      this.status.operate = 'ing'
    }
  }
  $triggerMethod(methodName, args = [], strict = false) {
    if (this[methodName]) {
      if (strict && this.status.operate == 'ing') {
        return Promise.resolve({ status: 'fail', code: `operate is ing` })
      } else {
        return new Promise((resolve, reject) => {
          this.$changeOperate('ing')
          this[methodName](...args).then(() => {
            this.$changeOperate('un')
            resolve({ status: 'success' })
          }).catch(err => {
            this.$changeOperate('un')
            console.error(err)
            reject(err)
          })
        })
      }
    } else {
      this.$exportMsg(`${methodName}不存在！`, 'warn')
      return Promise.reject({ status: 'fail', code: `method is undefined` })
    }
  }
  $loadData(force, ...args) {
    if (this.status.load == 'success' && !force) {
      return Promise.resolve({ status: 'loaded' })
    } else if (!this.$getData) {
      return Promise.reject({ status: 'fail', code: '$getData is undefined' })
    } else {
      return new Promise((resolve, reject) => {
        this.status.load = 'ing'
        this.$getData(...args).then(() => {
          this.status.load = 'success'
          resolve({ status: 'success' })
        }).catch(err => {
          this.status.load = 'un'
          console.error(err)
          reject(err)
        })
      })
    }
  }
}

export default BaseData
