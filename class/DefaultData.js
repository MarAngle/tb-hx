import Data from "./Data"

let lifeId = 0

function getLifeId () {
  lifeId++
  return lifeId
}

class DefaultData extends Data {
  constructor(initOption) {
    super(initOption)
    this.$extra = initOption.extra || {}
    this.$life = {}
  }
  $setExtra(prop, value) {
    this.$extra[prop] = value
  }
  $getExtra(prop) {
    return this.$extra[prop]
  }
  $resetExtra() {
    this.$extra = {}
  }
  $onLife(lifeName, data) {
    if (!this.$life[lifeName]) {
      this.$life[lifeName] = {}
    }
    if (typeof data === 'function') {
      data = {
        data: data
      }
    }
    if (!data.id) {
      data.id = getLifeId()
    }
    if (this.$life[lifeName][data.id] && !data.replace) {
      this.$exportMsg(`${data.id}回调存在!`, 'warn', this, data)
      return
    }
    if (data.immediate && data.once) {
      data.data.call(this)
      return
    }
    this.$life[lifeName][data.id] = data
    if (data.immediate) {
      data.data.call(this)
    }
    return data.id
  }
  $triggerLife(lifeName, ...args) {
    if (this.$life[lifeName]) {
      for (const id in this.$life[lifeName]) {
        const data = this.$life[lifeName][id]
        if (data) {
          data.data.call(this, ...args)
          if (data.once) {
            this.$life[lifeName][id] = undefined
          }
        }
      }
    }
  }
  $offLife(lifeName, id) {
    if (this.$life[lifeName] && this.$life[lifeName][id]) {
      this.$life[lifeName][id] = undefined
    }
  }
  $clearLife(lifeName) {
    if (this.$life[lifeName]) {
      this.$life[lifeName] = {}
    }
  }
  $resetLife() {
    this.$life = {}
  }
}

export default DefaultData
