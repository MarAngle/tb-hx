import DefaultData from "./DefaultData"

class BaseData extends DefaultData {
  constructor(initOption) {
    super(initOption)
    this.$option = initOption.option || {}
    this.status = {
      operate: 'un',
      load: 'un'
    }
    this.$operate = 0
    this.$appendMethod('$getData', initOption.getData)
    if (this.$option.auto) {
      this.$onLife('binded', () => {
        this.$reloadData(this.$option.reload)
      })
    }
  }
  $bindPage(page) {
    // 将数据绑定到生命周期页面中
    if (this.$unEnum.page.indexOf(page) == -1) {
      if (page.data[this.$prop]) {
        this.$exportMsg(`绑定页面报错,重复绑定!`, 'error')
      }
      this.$appendPage(page)
      this.$triggerLife('binded', page)
      page.$onLife('unload', () => {
        this.$removePage(page)
      })
    }
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
    this.$syncPage()
  }
  $triggerMethod(methodName, args = [], strict = false) {
    if (this[methodName]) {
      if (strict && this.status.operate == 'ing') {
        return Promise.reject({ status: 'fail', code: `operate is ing` })
      } else {
        return new Promise((resolve, reject) => {
          this.$changeOperate('ing')
          this[methodName](...args).then(res => {
            this.$changeOperate('un')
            resolve(res)
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
  $reloadData(force, ...args) {
    this.$loadData(force, ...args).then(() => {}).catch((err) => { console.error(err) })
  }
  $loadData(force, ...args) {
    if (this.status.load == 'success' && !force) {
      return Promise.resolve({ status: 'loaded' })
    } else if (!this.$getData) {
      return Promise.reject({ status: 'fail', code: '$getData is undefined' })
    } else {
      return new Promise((resolve, reject) => {
        this.status.load = 'ing'
        this.$triggerLife('beforeLoad')
        this.$syncPage()
        this.$getData(...args).then(() => {
          this.status.load = 'success'
          this.$triggerLife('loaded')
          this.$syncPage()
          resolve({ status: 'success' })
        }).catch(err => {
          this.status.load = 'un'
          this.$triggerLife('loadFail')
          this.$syncPage()
          console.error(err)
          reject(err)
        })
      })
    }
  }
}

export default BaseData
