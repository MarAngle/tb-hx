import BaseData from "./BaseData"

class InfoData extends BaseData {
  constructor(initOption) {
    super(initOption)
    this.id = {}
    this.info = {}
    this.$appendMethod('$formatData', initOption.formatData)
    this.$onLife('reseted', (resetOption) => {
      if (resetOption.id !== false) {
        this.$resetId()
      }
      if (resetOption.info !== false) {
        this.$resetInfo()
      }
    })
  }
  $resetId() {
    this.id = {}
  }
  $resetInfo() {
    this.info = {}
  }
  setId(id, prop = 'data') {
    this.id[prop] = id
    this.$syncPage()
  }
  getId(prop = 'data') {
    return this.id[prop]
  }
  $formatInfo(originData) {
    this.info = this.$formatData(originData)
    this.$syncPage()
  }
}

export default InfoData
