import BaseData from "./BaseData"
import PageData from "./mod/PageData"

class ListData extends BaseData {
  constructor(initOption) {
    super(initOption)
    this.list = []
    this.search = {}
    this.$page = initOption.page ? new PageData(initOption.page) : false
    this.$appendMethod('$formatList', initOption.formatList)
    this.$appendMethod('$formatData', initOption.formatData)
    this.$onLife('reseted', (resetOption) => {
      if (resetOption.search !== false) {
        this.$resetSearch()
      }
      if (resetOption.list !== false) {
        this.$resetList()
      }
      if (resetOption.page !== false && this.page) {
        this.$page.reset()
      }
    })
  }
  setSearch(prop, value) {
    this.search[prop] = value
  }
  $getSearch() {
    return this.search
  }
  $resetSearch() {
    this.search = {}
  }
  $resetList() {
    this.list = []
  }
  $formatList(originList) {
    let list = []
    if (originList) {
      originList.forEach(originData => {
        list.push(this.$formatData(originData))
      })
    }
    this.list = list
    this.$syncPage()
  }
}

export default ListData
