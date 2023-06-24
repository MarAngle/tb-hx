import BaseData from "../../class/BaseData"

class ProductData extends BaseData{
  constructor(initOption) {
    super(initOption)
    this.service = initOption.service
    if (!this.service.method) {
      this.service.method = 'get'
    }
    if (!this.service.data) {
      this.service.data = 'data'
    }
    this.$appendMethod('getSearch', initOption.getSearch)
    this.$appendMethod('formatData', initOption.formatData)
    this.list = []
  }
  $getSearch() {
    if (this.getSearch) {
      return this.getSearch()
    } else {
      return {}
    }
  }
  formatData(res) {
    console.log('暂时写死数据，等待接口！')
    this.list = [
      {
        name: '衣鞋洗护专区',
        id: 1,
        icon: ''
      },
      {
        name: '家纺专区',
        id: 2,
        icon: ''
      },
      {
        name: '奢护专区',
        id: 3,
        icon: ''
      },
    ]
  }
  $getData() {
    return new Promise((resolve, reject) => {
      const search = this.getSearch()
      reject[this.service.method]({
        url: this.service.url,
        [this.service.data]: search,
        timeout: 0,
        token: false
      }).then(res => {
        this.formatData(res)
        resolve()
      }).catch(err => {
        rejecr(err)
      })
    })
  }
}

export default ProductData
