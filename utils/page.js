import DefaultData from "./../class/DefaultData"

const defaultData = new DefaultData({ prop: 'createLifePage' })

export const createLifePage = function(option, life) {
  option.$onLife = defaultData.$onLife
  option.$triggerLife = defaultData.$triggerLife
  option.$offLife = defaultData.$offLife
  option.$clearLife = defaultData.$clearLife
  option.$resetLife = defaultData.$resetLife
  option.$exportMsg = defaultData.$exportMsg
  option.onLoad = function(query) {
    this.$life = {}
    if (life) {
      for (const prop in life) {
        this.$onLife(prop, life[prop])
      }
    }
    this.$triggerLife('load', query)
  }
  option.onReady = function() {
    this.$triggerLife('ready')
  }
  option.onShow = function() {
    this.$triggerLife('show')
  }
  option.onHide = function() {
    this.$triggerLife('hide')
  }
  option.onUnload = function() {
    this.$triggerLife('unload')
  }
  // 添加默认函数
  option.$toPage = function(e) {
    my.navigateTo({
      url: e.target.dataset.page
    })
  }
  return option
}

